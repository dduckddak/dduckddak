<img  src="/Ddukddak/README_assets/뚝딱뚝딱.png" alt="" width="500px">

> **2024.02.19 ~ 2024.04.04**

## ✅ 프로젝트 소개

▪️ **기획의도 및 배경**

- 만 4-6세의 아동기 아이들의 책 읽기 흥미 향상

[문제제기]

맞벌이 가정의 증가로 아이가 혼자 있는 시간이 많아짐

→ 부모와의 물리적, **심리적 거리가 멀어지고** 외벌이 가족과 비교했을 때 상대적으로 **정서적 스트레스, 불안감**을 느끼는 아이가 많아짐.

[문제제기 2]
아이들이 읽어달라는 책을 모두 읽어주다 성대결절이 온 부모님도 계심

[문제제기 3]
맞벌이로 인해 힘도들고 지친상태에서 육아까지 하려니 많이 힘든 부모님들

[문제제기 4]
하지만 책을 안읽어주자니 책읽기의 수많은 장점들..

[솔루션 도출]
아이가 주인공이 되어 책읽기에 흥미도 붙이고 창의력도 높아질 수 있도록함
목소리를 학습해서 주인공과 등장인물의 목소리 및 내래이션의 목소리를 선택하여 세상에 단 하나밖에 없는 나만의 동화책을 생성할 수 있음

▪️ **서비스 목적**

- 부모님이 지치고 힘들어도 녹음되어 있는 목소리로 아이에게 동화책을 만들어 읽어줄 수도 있고, 맞벌이 부모를 둔 아이의 심리적 안정감과 책읽기에 대한 흥미도 또한 올려줄 수 있음

▪️ **기대효과**

- 부모 아이간 물리적으로 거리가 멀어도, 동화를 직접 읽어주었을때의 긍정적 효과를 얻을 수 있음
- 원하는 목소리를 녹음하면 학습되어 어떠한 동화든 읽어줄 수 있음
- 아이들이 책읽기에 대한 흥미 및 창의력을 향상시킬 수 있음

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
        <td> <img src="/Ddukddak/README_assets/랜딩.gif" alt="" width="500px"> </td>
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
        <td> <img src="/Ddukddak/README_assets/로그인.jpg" alt="" width="500px"> </td>
        <td> <img src="/Ddukddak/README_assets/회원가입.jpg" alt="" width="500px"> </td>
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
        <td> <img src="/Ddukddak/README_assets/인트로.gif" alt="" width="500px"> </td>
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
        <td> <img src="/Ddukddak/README_assets/메인.gif" alt="" width="500px"> </td>
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
        <td> <img src="/Ddukddak/README_assets/사진뚝딱.gif" alt="" width="500px"> </td>
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
        <td> <img src="/Ddukddak/README_assets/목소리추가.gif" alt="" width="500px"> </td>
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
        <td> <img src="/Ddukddak/README_assets/색칠하기.gif" alt="" width="500px"> </td>
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
        <td> <img src="/Ddukddak/README_assets/동화뚝딱.gif" alt="" width="500px"> </td>
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
        <td> <img src="/Ddukddak/README_assets/뚝딱대화.gif" alt="" width="500px"> </td>
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
        <td> <img src="/Ddukddak/README_assets/최종피그마.png" alt="" width="500px"></td>
        <td> <img src="/Ddukddak/README_assets/API.gif" alt="" width="500px"></td>
    </tr>
</table>
<table>
    <tr align="center" > 
      <td><strong>ERD</strong></td>
      <td><strong>아키텍처</strong></td>
    </tr>
    <tr align="center">
        <td> <img title="" src="/Ddukddak/README_assets/ERD_DDUKDDAK.png" alt="" width="500px" /></td>
        <td> <img src="/Ddukddak/README_assets/architecture.png" alt="" width="500px" /></td>
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
        <td> <img src="/Ddukddak/README_assets/5ndB.PNG" alt="" width="500px"> </td>
        <td> <img  src="/Ddukddak/README_assets/4ndB.PNG" alt="" width="500px"> </td>
        <td><img  src="/Ddukddak/README_assets/3ndB.PNG" alt="" width="500px"></td>
        <td><img  src="/Ddukddak/README_assets/2ndB.PNG" alt="" width="500px"></td>
        <td><img  src="/Ddukddak/README_assets/1ndB.PNG" alt="" width="500px"></td>
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

<img  src="/Ddukddak/README_assets/팀원.PNG" alt="" width="500px">
