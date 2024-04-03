# 뚝딱뚝딱

- 사진 넣을 자리

> **2024.02.19 ~ 2024.04.04**

## ✅ 프로젝트 소개

▪️**기획의도 및 배경**

- 만 4-6세의 아동기 아이들의 책 읽기 흥미 향상

[문제제기]

맞벌이 가정의 증가로 아이가 혼자 있는 시간이 많아짐

→ 부모와의 물리적, **심리적 거리가 멀어지고** 외벌이 가족과 비교했을 때 상대적으로 **정서적 스트레스, 불안감**을 느끼는 아이가 많아짐.

[문제제기 2]

결제 때 마다 미리 할인 혜택을 알아보는 것이 귀찮기도 하고, 결제 직전에 ‘잠깐만요!’를 외치며 주섬주섬 적합한 카드를 찾는게 민망한 상황이 연출 되기도 함

[솔루션 도출]

부모의 목소리를 AI를 통해 동화를 낭독하여, 아이의 정서적 안정감을 채워주자

▪️**서비스 목적**

- AI를 활용한 부모의 목소리를 통해 부모와 아이의 심리적 거리를 좁혀주고 아이에게 심리적 안정감을 제공하는 것.

▪️**서비스 목표**

- 부모의 목소리를 녹음하여 가상의 목소리 생성
- 위에서 생성된 목소리를 활용한 동화 낭독
- 그 외, 부모 아이간 유대감을 형성할 수 있는 컨텐츠 제작 (편지, 앨범 등)

▪️**기대효과**

- 부모 아이간 물리적으로 거리가 멀어도, 동화를 직접 읽어주었을때의 긍정적 효과를 얻을 수 있음
- 부모 아이간 정서적 안정감, 유대감 형성
- 아이가 책에 대한 친밀감 형성

## ✅ 개발 환경

### ⚙ Management Tool

- 형상 관리 : Gitlab
- 이슈 관리 : Jira
- 커뮤니케이션 : Mattermost, Webex, Notion, Discord
- 디자인 : Figma, PowerPoint

### 💻 IDE

- Visual Studio Code `1.18.5`
- IntelliJ IDEA community `2023.3.2`

### 📱 Frontend

- React `18.2.0`
- React Native `0.73.6`
- Expo `50.0.14`
- Typescript `5.2.2`
- Zustand `4.5.2`
- Axios `1.6.7`

### 💾 Backend

- Springboot `3.22`
- Spring Data JPA
- MySql 8.0.34

### Infra

- AWS S3
- AWS EC2
- Nginx 1.18.0
- Docker: 25.0.3
  - openvidu: 2.29.0
  - mysql: 8.3.0
- Ubuntu 20.04.6 LTS

## ✅ 기능 소개

### 랜딩화면

<table>    
    <tr align="center" > 
        <td><strong>랜딩화면</strong></td>
    </tr>
    <tr align="center"> 
        <td> <img src= "assets/아이/아이로그인.gif"> </td>
    </tr>
    <tr> 
        <td>
            1. 간략한 전체 서비스를 볼수 있다.
        </td>
</table>

### 회원가입, 로그인

<table>    
    <tr align="center" > 
        <td><strong>로그인</strong></td>
        <td><strong>회원가입</strong></td>
    </tr>
    <tr align="center"> 
        <td> <img src= "assets/아이/로그인.gif"> </td>
        <td> <img src= "assets/아이/회원가입.gif"> </td>
    </tr>
    <tr> 
        <td>
            1. 일반 로그인
        </td>
        <td>
            1. 일반 회원가입
        </td>
</table>

### 인트로

<table>    
    <tr align="center" > 
        <td><strong>인트로</strong></td>
    </tr>
    <tr align="center"> 
        <td> <img src= "assets/공통/스플래시.gif"> </td>
    </tr>
    <tr> 
        <td>
            1. 아이 친화적인 UI<br>
            2. 책 추천을 통해 동화 추천 받음<br>
            3. 애니메이션과 배경음을 사용하여 흥미를 유도<br>
            4. 간단한 이용 방법을 설명
        </td>
</table>

### 메인 화면

<table>    
    <tr align="center" > 
        <td><strong>메인</strong></td>
    </tr>
    <tr align="center"> 
        <td> <img src= "assets/아이/아이메인.gif"> </td>
    </tr>
    <tr> 
        <td>
            1. 아이를 위한 직관적이고 귀여운 UI<br>
        </td>
</table>

### 사진 저장

<table>    
    <tr align="center" > 
        <td><strong>사진 뚝딱</strong></td>
    </tr>
    <tr align="center"> 
        <td> <img src= "assets/아이/토끼와거북이.gif"> </td>
    </tr>
    <tr> 
        <td>
            1. 얼굴이 한명만 나오게 저장해야함 <br>
            2. 갤러리에서 불러오기 <br>
            3. 카메라로 촬영
        </td>
</table>

### 목소리 저장

<table>    
    <tr align="center" > 
        <td><strong>소리 뚝딱</strong></td>
    </tr>
    <tr align="center"> 
        <td> <img src= "assets/아이/동물고르기.gif"> </td>
    </tr>
    <tr> 
        <td>
            1. 간단한 동화를 30초 이상 읽기 <br>
            2. 목소리를 저장시키며 AI 학습
        </td>
</table>

### 색칠하기

<table>    
    <tr align="center" > 
        <td><strong>색칠 뚝딱</strong></td>
    </tr>
    <tr align="center"> 
        <td> <img src= "assets/부모/녹음및다시듣기.gif"> </td>
    </tr>
    <tr> 
        <td>
            1. 원하는 그림을 선택<br>
            2. 색을 고르며 색칠할수있음            
        </td>
</table>

### 동화생성

<table>    
    <tr align="center" > 
        <td><strong>동화 뚝딱</strong></td>
    </tr>
    <tr align="center">
        <td> <img src= "assets/공통/편지보내기.gif"> </td>
    </tr>
    <tr> 
        <td>
            1. 주인공의 얼굴과 소리 추가 <br>
            2. 서브역할의 얼굴과 소리 추가<br>
            3. 내래이션 소리 추가<br>
            4. 동화책의 이름 정하기 <br>
            5. 동화생성이 완료되면 푸쉬알람
        </td>
</table>

### 동화 속 주인공과 대화하기

<table>    
    <tr align="center" > 
        <td><strong>뚝딱 대화</strong></td>
    </tr>
    <tr align="center">
        <td> <img src= "assets/공통/편지보내기.gif"> </td>
    </tr>
    <tr> 
        <td>
            1. 동화에 나오는 캐릭터와 대화하기            
        </td>
</table>

## ✅ 활용기술, 기술 설명

## ✅ 산출물

<table>    
    <tr align="center" > 
        <td><strong>개발 목업</strong></td>
        <td><strong>API 명세서</strong></td>
    </tr>
    <tr align="center">
        <td> <img src="README_assets/ERD_DDUKDDAK.png"></td>
        <td> <img src="assets/api명세서.png"></td>
    </tr>
</table>
<table>
    <tr align="center" > 
      <td><strong>ERD</strong></td>
      <td><strong>아키텍처</strong></td>
    </tr>
    <tr align="center">
        <td> <img title="" src="/Ddukddak/README_assets/architecture.png" alt="" width="800px" /></td>
        <td> <img src="README_assets/ERD_DDUKDDAK.png"></td>
    </tr>

</table>
<br>
<table>
    <tr align="center" > 
        <th>5주차 번다운차트</th>
        <th>4주차 번다운차트</th>
        <th>3주차 번다운차트</th>
        <th>2주차 번다운차트</th>
        <th>1주차 번다운차트</th>
    </tr>
    <tr align="center">
        <td> <img src="README_assets/5ndB.png"> </td>
        <td> <img src="README_assets/4ndB.png"> </td>
        <td><img src="README_assets/3ndB.png"></td>
        <td><img src="README_assets/2ndB.png"></td>
        <td><img src="README_assets/1ndB.png"></td>
    </tr>
</table>

## 🧾컴포넌트

### FE

<details>
<summary>Front-End</summary>
<div markdown="1">

```
┗📦src
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📜 AlertModal.tsx
 ┃ ┃ ┣ 📜 Button.tsx
 ┃ ┃ ┣ 📜 Design.tsx
 ┃ ┃ ┣ 📜 Error.tsx
 ┃ ┃ ┣ 📜 Footer.tsx
 ┃ ┃ ┣ 📜 Icons.tsx
 ┃ ┃ ┣ 📜 LoadingOrError.tsx
 ┃ ┃ ┣ 📜 NavBar.tsx
 ┃ ┃ ┣ 📜 Pagination.tsx
 ┃ ┃ ┣ 📜 TextSearch.tsx
 ┃ ┃ ┣ 📜 Title.tsx
 ┃ ┣ 📂users
 ┃ ┃ ┣ 📜 Card.tsx
 ┃ ┃ ┣ 📜 ContentBox.tsx
 ┃ ┃ ┣ 📜 KakaoMap.tsx
 ┃ ┃ ┣ 📜 Line.tsx
 ┃ ┃ ┣ 📜 ProfileBox.tsx
 ┃ ┃ ┣ 📜 ProfileEditModal.tsx
 ┃ ┃ ┣ 📜 Title.tsx
 ┃ ┣ 📂animalinfo
 ┃ ┃ ┣ 📜Input.tsx
 ┃ ┃ ┣ 📜LikeButton.tsx
 ┃ ┃ ┣ 📜search.css
 ┃ ┃ ┣ 📜style.tsx
 ┃ ┃ ┣ 📂lostanimals
 ┃ ┃ ┃ ┣ 📜LostAnimalCard.tsx
 ┃ ┃ ┃ ┣ 📜LostAnimalSearch.tsx
 ┃ ┃ ┣ 📂mungbti
 ┃ ┃ ┃ ┣ 📜 AnimalMatching.tsx
 ┃ ┃ ┣ 📂savedanimals
 ┃ ┃ ┃ ┣ 📜SaveAnimalCard.tsx
 ┃ ┃ ┃ ┣ 📜SaveAnimalSearch.tsx
 ┃ ┃ ┃ ┣ 📜SavedAnimalList.tsx
 ┃ ┣ 📂	articles
 ┃ ┃ ┣ 📜ArticleCard.tsx
 ┃ ┃ ┣ 📜 ArticleContent.tsx
 ┃ ┃ ┣ 📜 ArticleEditor.tsx
 ┃ ┃ ┣ 📜 ArticleInterface.ts
 ┃ ┃ ┣ 📜 ArticleList.tsx
 ┃ ┃ ┣ 📜 Likes.tsx
 ┃ ┃ ┣ 📜 PreviewModal.tsx
 ┃ ┃ ┣ 📂comments
 ┃ ┃ ┃ ┣  📜Comment.tsx
 ┃ ┃ ┃ ┣  📜CommentForm.tsx
 ┃ ┃ ┃ ┣  📜CommentList.tsx
 ┃ ┣ 📂Broadcast
 ┃ ┃ ┣ 📜 AnimalList.tsx
 ┃ ┃ ┣ 📜 AnimalSearchForBroadcast.tsx
 ┃ ┃ ┣ 📜 BroadcastDetail.tsx
 ┃ ┃ ┣ 📜 BroadcastForm.tsx
 ┃ ┃ ┣ 📜 Chat.tsx
 ┃ ┃ ┣ 📜 MyVideo.tsx
 ┃ ┃ ┣ 📜 SessionComponent.tsx
 ┃ ┃ ┣ 📜 simpleEncrypt.ts
 ┃ ┣ 📂notificationss
 ┃ ┃ ┣ 📜NotiModal.tsx
 ┃ ┣ 📂visits
 ┃ ┃ ┣ 📜 AdoptionInfoModal.tsx
 ┃ ┃ ┣ 📜 ReservationInfo.tsx
 ┃ ┃ ┣ 📜 ReservationList.tsx
 ┃ ┃ ┣ 📜ScheduleCard.tsx
 ┣ 📂pages
 ┃ ┣ 📂	users
 ┃ ┃ ┣ 📜SignUpPage.tsx
 ┃ ┃ ┣ 📜SignUpPage.tsx
 ┃ ┃ ┣ 📜ProfilePage.tsx
 ┃ ┃ ┣ 📜VisitManagementPage.tsx
 ┃ ┣ 📂	home
 ┃ ┃ ┣ 📜HomePage.tsx
 ┃ ┃ ┣ 📜LandingPage.tsx
 ┃ ┣ 📂animals
 ┃ ┃ ┣ 📜SavedAnimalManagementPage.tsx
 ┃ ┃ ┣ 📜StyleDetail.tsx
 ┃ ┃ ┣ 📂lostanimals
 ┃ ┃ ┃ ┣ 📜LostAnimalDetailPage.tsx
 ┃ ┃ ┃ ┣ 📜LostAnimalFormPage.tsx
 ┃ ┃ ┃ ┣ 📜LostAnimalListPage.tsx
 ┃ ┃ ┃ ┣ 📜LostAnimalUpdatePage.tsx
 ┃ ┃ ┣ 📂mungbti
 ┃ ┃ ┃ ┣ 📜MungBTIPage.tsx
 ┃ ┃ ┣ 📂savedanimals
 ┃ ┃ ┃ ┣ 📜AnimalDetailPage.tsx
 ┃ ┃ ┃ ┣ 📜AnimalFormPage.tsx
 ┃ ┃ ┃ ┣ 📜AnimalListPage.tsx
 ┃ ┃ ┃ ┣ 📜AnimalUpdatePage.tsx
 ┃ ┣ 📂	visits
 ┃ ┃ ┣ 📜VisitManagementPage.tsx
 ┃ ┃ ┣ 📜VisitReservationListPage.tsx
 ┃ ┃ ┣ 📜VisitReservationPage.tsx
 ┃ ┣ 📂articles
 ┃ ┃ ┣ 📜ArticleDetailPage.tsx
 ┃ ┃ ┣ 📜ArticleListPage.tsx
 ┃ ┃ ┣ 📜articleLoader.ts
 ┃ ┃ ┣ 📜ArticleWritePage.tsx
 ┃ ┣ 📂broadcast
 ┃ ┃ ┣ 📜BoradcastListPage.tsx
 ┃ ┃ ┣ 📜BroadCastPage.tsx
 ┃ ┣ 📂notice
 ┃ ┃ ┣ 📜NoticeListPage.tsx
 ┃ ┣ 📂admin
 ┃ ┃ ┣ 📜AdminPage.tsx
 ┃ ┣ 📂message
 ┃ ┃ ┣ 📜MessageListPage.tsx
 ┣ 📂store
 ┃ ┣ 📜 broadcastSlice.ts
 ┃ ┣ 📜 store.ts
 ┣ 📂utils
 ┃ ┣ 📜articleAPI.ts
 ┃ ┣ 📜axios.ts
 ┃ ┣ 📜broadcastAPI.ts
 ┃ ┣ 📜LostAPI.ts
 ┃ ┣ 📜notificationsAPI.ts
 ┃ ┣ 📜S3.ts
 ┃ ┣ 📜SaveAPI.ts
 ┃ ┣ 📜tanstackQuery.ts
 ┃ ┣ 📜uitl.ts
 ┃ ┣ 📜UserAPI.ts
 ┃ ┣ 📜VisitAPI.ts
 ┣ 📜App.tsx
 ┗ 📜main.tsx
```

</div>
</details>

## ✅ 팀원소개
