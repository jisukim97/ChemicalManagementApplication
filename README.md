# ChemicalManagementApplication

* 서강대학교 융합소프트웨어종합설계 수업 3팀이 개발한 'SYLVY' (실험실 비서) 어플리케이션의 기획 단계부터 개발 단계까지의 산출물들이 저장되어있는 repository 입니다.
* 본 어플리케이션은 화학약품 종합 관리 시스템이라는 주제로 만들어졌으며, 화학 실험실에서 일어나는 사건들을 어플리케이션을 통해 간편하게 해결할 수 있는 기능들을 가지고 있습니다. 

## 팀원
* 정\*모 이\*무 문\*주 강\*영 이\*빈 김\*수

## 개발기간
* 2019.9.8 ~ 2019.12.9

## 어플리케이션 개발 환경
* Spring boot 2.1.4
* React 16.8.6
* Flask 1.1.1
* +) RDBMS (RDS MySQL in my case)

## Directories
* Dev - 실제 어플리케이션 개발 소스 파일
* Document - 개발 과정 중 발생한 문서 산출물
* PMP / PSP
* 최종 산출물 - 어플리케이션 완성본, SRS, SAD를 포함한 모든 최종 산출물

## How to run?
### Backend
* Dev/chemical 디렉토리에 있는 spring boot project 파일의 src/main/resources/application.properties에 rdbms 계정 정보 입력 
* Build project by maven
```
java -jar {target file name}
```
### Frontend
* Dev/Front 디렉토리에서 
```
npm start
```
### Crawler
* Dev/Crawler 디렉토리에서
```
phthon3 flasktest.py
```

## 어플리케이션 주요 기능
* 약품 재고 관리 : 약품 추가 및 폐기, 사용량 업데이트, 보관 장소 추천
* 기기 예약 : 실험실 기기들에 대해 사용 예약
* 3종류의 알림 : 약품에 대한 유효기간 알림, 재고소진 알림, 의심질병 알림
* my Lab 멤버 관리 : 팀원들을 초대 혹은 lab에 가입 해서 약품 재고 상황을 공유 가능

## Screenshots
* <img src='https://github.com/yeongmo-j/ChemicalManagementApplication/blob/master/Document/4_수정중/GUI/photo/chemicals.png?raw=true' height=300>
* <img src='https://github.com/yeongmo-j/ChemicalManagementApplication/blob/master/Document/4_수정중/GUI/photo/chemicals2.png?raw=true' height=300>

* <img src='https://github.com/yeongmo-j/ChemicalManagementApplication/blob/master/Document/4_수정중/GUI/photo/apparatus.png?raw=true' height=300>
* <img src='https://github.com/yeongmo-j/ChemicalManagementApplication/blob/master/Document/4_수정중/GUI/photo/alarm.png?raw=true' height=300>
* <img src='https://github.com/yeongmo-j/ChemicalManagementApplication/blob/master/Document/4_수정중/GUI/photo/myLab.png?raw=true' height=300>

## Demo video
* <a href='https://github.com/yeongmo-j/ChemicalManagementApplication/tree/master/최종산출물/5_Implementation%20Model'> Click! </a>
