# Mad Camp 3주차 과제 🔥

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
#### ☑️ Front End
  ![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

#### ☑️ Back End
  ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
  ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)


<br>

💫 결과물
-------------
#### 앱 로고: AniMaker
<img src="/assets/AniMaker_logo.png" width="30%" alt="Logo"></img>

### 로그인 / 회원가입
<img src="/screenshots/SignIn.png" width="30%" alt="Upload Image 1"></img>
<img src="/screenshots/SignUp.png" width="30%"  alt="Upload Image 2"></img>

### 기능 1: 캐릭터 자동 인식
- 갤러리 버튼 -> 핸드폰 이미지 저장공간 접근 -> 그림 선택
- 업로드 버튼 -> DB에 새로운 캐릭터에 대한 파일 생성
- 각 캐릭터에 대한 파일에는 TouchServe를 통해 생성된 mask, joint data, 등을 보유

<img src="/screenshots/UploadImage_1.png" width="30%" alt="Upload Image 1"></img>
<img src="/screenshots/UploadImage_2.png" width="30%"  alt="Upload Image 2"></img>

<br>

### 기능 2: 캐릭터 구성 수정
- 모델이 완벽히 배경과 캐릭터를 분리하지 못하거나, joint를 정확히 mapping하지 못할 경우를 대비해 수정 기능 구현

<img src="/screenshots/EditMask_1.png" width="30%" alt="Edit Mask 1"></img>
<img src="/screenshots/EditMask_2.png" width="30%" alt="Edit Mask 2"></img>

<img src="/screenshots/EditJoint.png" width="30%" alt="Edit Joint"></img>
<img src="/screenshots/EditJoint.gif" width="30%" alt="Edit Joint GIF"></img>


<br>

### 기능 3: 다양한 움직임 적용 

- 메인화면에는 유저가 보유하고 있는 캐릭터의 갤러리와 Animated Drawings을 통해 생성된 모션을 띄어줌
  - 첫번째 캐릭터는 앱의 마스코트가 디폴트
- 모션을 선택 시 선택한 캐릭터의 다양한 에니메이션을 감상 할 수 있음 

<img src="/screenshots/Home.png" width="30%" alt="Home"></img>
<img src="/screenshots/NewCharacter.png" width="30%" alt="New Character"></img>
<img src="/screenshots/Demo.gif" width="30%" alt="Demo"></img>

### 기능 4: 나만의 움직임 적용
시간 관계상 이 기능까지 구현하지 못하였지만, 동영상 파일을 업로드하면 bvh 파일로 변환하여 motion capture data로 나만의 무브먼트를 추가해 캐릭터에 적용하려고 하였다
