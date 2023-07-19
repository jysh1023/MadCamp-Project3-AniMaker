# Mad Camp 3주차 과제 🔥

Download APK File: [COGAWE][apklink]

[apklink]: app/release/app-release.apk

### 자율 과제 Ⅲ (7/13 ~ 7/19) - AniMaker
#### 📌 목적
- 딥러닝 모델을 서비하고, User Interactive한 App 개발하기

#### 🌟 결과물
- 나만의 캐릭터를 그린 후 촬영하거나 업로드하면, 자동으로 움직임을 주는 App
  - 기능 1: 캐릭터 자동 인식
    - 내 캐릭터를 촬영하면, 자동 segmentation 및 joint detection
  - 기능 2: 캐릭터 구성 수정
    - 유저가 직접 segmentation mask와 joint 수정할 수 있는 UI 구현
  - 기능 3: 다양한 움직임 적용 
    - 여러가지 움직임을 캐릭터에 각각 적용 가능
  - 기능 4: 나만의 움직임 적용
    - 모션 캡쳐를 통해 나만의 움직임을 캐릭터에 적용 가능 

👥 팀원
-------------
- 양성현 (카이스트 전산학부)
- 전지민 (지스트 전기전자컴퓨터공학부)


💻 개발 환경
-------------
- Front End
- <img src="https://img.shields.io/badge/ReactNative-#61DAFB?style=for-the-badge&logo=React&logoColor=white">

<br>

💫 결과물
-------------


### TAB 1 : 연락처 📞
#### Features
> - `assets/contact.json`에 저장된 연락처 불러오기
> - Main 화면 : 연락처 검색하기 (이름 혹은 전화번호로 검색 가능)
> - Detail 화면: 연락처 상세 정보 (이름, 전화번호, 학교, 관심사) & 전화걸기
> - New contact 화면: 연락처 추가하기 (비워진 필드가 있을 경우 Toast로 경고 메시지 표시)

<img src="/Screenshots/Contact_main.png" width="30%" alt="Contact Main"></img>
<img src="/Screenshots/Contact_detail.png" width="30%"  alt="Contact Detail"></img>
<img src="/Screenshots/Contact_new.png" width="30%" alt="Contact New"></img>
<img src="/Screenshots/Contact.gif" width="30%" alt="Contact GIF"></img>

<br>

### TAB 2 : 갤러리 🌃
#### Features
> - `assets/gallery.json`에 저장되어 있는 이미지 주소를 기반으로 사진을 보여주는 갤러리
> - Preview 화면: 사진 터치(해당 사진의 detail을 보여주는 화면으로 이동)
> - Detail 화면: pinch zoom(확대/축소), double tap(이미지 사이즈 리셋), 좌우 swipe(이전/이후 이미지로 이동), 뒤로가기(preview 화면으로 돌아가기)

<img src="/Screenshots/Gallery_main.png" width="30%" alt="Gallery Main"></img>
<img src="/Screenshots/Gallery.gif" width="30%" alt="Gallery GIF"></img>

<br>

### TAB 3 : 날씨🌈
#### Features
> - 현재 날씨 실황 (기온, 하늘상태, 풍속, 습도)
> - 단기 날씨 예보 (추후 6시간, 기온, 하늘상태)
> - 새로고침하여 현재 정보 받아오기 (마지막으로 새로고침한 시각 표시)

<img src="/Screenshots/Weather_main.png" width="30%" alt="Weather Main"></img>
<img src="/Screenshots/Weather.gif" width="30%" alt="Weather GIF"></img>
