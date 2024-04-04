# 1. 빌드 배포 정리

## 목차

1. [기술 스택](#기술-스택)
2. [빌드 및 배포](#빌드-및-배포)


## 기술 스택

1. 이슈 관리 : Jira
2. 형상 관리 : Gitlab
3. 빌드/배포 관리 : Jenkins `2.426.3`
4. 커뮤니케이션 : MatterMost, Notion, Discord
5. 개발 환경
    1) 운영체제 Window10
    2) IDE
        - VSCode `1.85.1`
        - InteliJ `2023.3.2`
    3) 데이터베이스 : MySQL `8.3.0`
    4) 서버 : AWS EC2
        - Ubuntu `20.04 LTS`
        - Docker `25.0.0`
        - docker-compose `2.24.2`
        - Openvidu `2.29.0`
        - Nginx `1.18.0(ubuntu)`
        - Https/SSL `Let's Encrypt`
6. 세부사항
    1) Frontend
        - lang: HTML5, CSS3, Typescript, Node.js `16.16.0`
        - Framework:
            * React: `18.2.0`
            * React Native: `0.73.6`
        - 주요 Libraries
            * axios: `1.6.7`
            * zustand `4.5.2`
        - 개발 도구
            * Expo: `50.0.14`
            * ESLint: `8.56.0`
            * Prettier `3.2.4`

    2) Backend
        - Language: Java 17
        - Framework:
            *  Spring Boot: 3.1.9
            *  Spring Security: 3.2.1
            *  Spring Data JPA
        - 주요 Libraries:
            * Lombok
            * unirest: `1.4.9`
            * firebase `9.2.0`
        -  개발 도구:
            *  Spring Boot Devtools
            *  Gradle `8.5`
        -  API 문서화:
            *  Swagger
    
    3) Backend(Fastapi)
        - Language : Python 3.9.10
        - Framework :
            * FastAPI : `0.110.0`
        - 주요 Libraries:
            * pandas : `2.2.1`
            * numpy : `1.26.4`
            * dlib : `19.24.2`
            * pytorch `2.2.1`
            * openai-whisper

    


## 빌드 및 배포


### 1. AWS EC2 기본 설정 및 nginx 설치
1) (선택) 우분투 미러서버 변경
    - 처음 우분투를 받았을 때 기본설정 되어 있는 미러서버는 느리거나 update시 일부 다운로드가 되지 않는 오류가 발생하는 경우가 있음
    - 국내에서 접근 가능한 가장 빠른 카카오 미러서버로 기본설정 변경

    ```bash
    $ sudo vim /etc/apt/sources.list

    # esc버튼 클릭 후
    :%s/{기존에 입력되어 있던 미러서버 주소}/mirror.kakao.com
    :wq

    deb http://mirror.kakao.com/ubuntu/ focal main restricted

    deb http://mirror.kakao.com/ubuntu/ focal-updates main restricted

    deb http://mirror.kakao.com/ubuntu/ focal-updates universe

    deb http://mirror.kakao.com/ubuntu/ focal multiverse

    deb http://mirror.kakao.com/ubuntu/ focal-updates multiverse

    deb http://mirror.kakao.com/ubuntu/ focal-backports main restricted universe multiverse
    ```

2) nginx 설치 및 SSL 인증서 발급, 적용
    ```bash
    # nginx 설치
    sudo apt-get update
    sudo apt-get install nginx

    # 설치 및 버전 확인
    nginx -v
    ```

    - nginx설치후 letsencrypt를 이용해 SSL 인증서 발급
    ```bash
    sudo apt-get install letsencrypt # letsencrypt 설치

    sudo systemctl stop nginx # 발급을 위한 nginx 정지

    sudo letsencrypt certonly --standalone -d {도메인 주소} # letsencrypt로 서버 domain에 SSL 인증서 발급
    ```

    - nginx 설정 파일을 프로젝트에 맞게 수정
    ```
    sudo vim /etc/nginx/sites-available/default

    server {

            location /api/v1/ {
            proxy_pass http://localhost:{백엔드 포트번호}/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            }


        listen [::]:443 ssl ipv6only=on; # managed by Certbot
        listen 443 ssl; # managed by Certbot
        ssl_certificate /etc/letsencrypt/live/{my url}/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/{my url}/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

    }


    server {
        if ($host = {my-url}) {
            return 301 https://$host$request_uri;
        } # managed by Certbot


            listen 80 ;
            listen [::]:80 ;
        server_name {my url};
        return 404; # managed by Certbot
    }

    ```

    * nginx 테스트 후 재가동
    ```bash
    $ sudo nginx -t
    $ sudo systemctl restart nginx
    ```

3) 백엔드 빌드
    * BackEnd Dockerfile
    ```dockerfile
    FROM openjdk:17-jdk-alpine as build

    WORKDIR /workspace

    COPY gradlew .
    COPY gradle gradle
    COPY build.gradle .
    COPY settings.gradle .
    COPY src src

    RUN chmod +x ./gradlew

    RUN ./gradlew clean build

    FROM openjdk:17-jdk-alpine

    EXPOSE 8090

    COPY --from=build /workspace/build/libs/*.jar /app/app.jar

    ENTRYPOINT ["java","-jar","/app/app.jar"]
    ```

    * jenkins에서 Push 알림을 받아 clone 후 자동 배포
    ```bash
    docker stop spring-server || true && docker rm spring-server || true

    # 기존 Docker 이미지 삭제
    docker image rm back-spring || true
    
    # Docker 이미지 빌드
    docker build -t back-spring .
    
    # Docker 이미지 실행
    docker run -d --name spring-server -p 8090:8080  back-spring
    ```

    * ❗ application-local.yaml 파일은 git에 업로드되지 않으므로 따로 설정해줌
    ```yaml
    # JWT Secret Key
    secret-key: {secret key}
    
    spring:
      datasource:
        url: {DB URL}
        username: {DB USENAME}
        password: {DB PW}
        driver-class-name: com.mysql.cj.jdbc.Driver
    redis:
      host:  {Redis HOST}
      password: {Redis PW}
      port: {Redis Port}
    
    cloud:
      aws:
        s3:
          bucket: {S3 Bucker name}
        credentials:
          access-key: {S3 Access key}
          secret-key: {S3 Secret key}
        region:
          static: {region}
          auto: false
        stack:
          auto: false
    
    eleven-labs:
      key: {eleven labs ket}
    
    fast-api:
      url: {Fast API URL}
    
    open-ai:
      key: {Open AI key}
    ```

4) 프론트엔드 빌드

* EAS JSON파일 
```json
{
"cli": {
  "version": ">= 7.6.0"
},
"build": {
  "development": {
    "developmentClient": true,
    "distribution": "internal",
    "channel": "development"
  },
"preview": {
  "distribution": "internal",
  "channel": "preview",
  "android" :  {
    "buildType" : "apk"
  }
},
"production": {
  "channel": "production"
}
},
"submit": {
  "production": {}
}
}
```
   

* eas cli 인스톨

```bash
npm install --global eas-cli
```

* apk build 

```bash
eas build -p android --profile preview
```

   
   
