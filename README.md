# CountryList

## Backend
### 실행방법
```
$ pipenv install
$ pipenv shell
[pipenv]$ python manage.py runserver [port 번호]
```
기본포트는 8000번이다.

### 설명
- Data URL을 그대로 전달해주는 서버
	- http://country.io/continent.json
	- http://country.io/names.json
	- http://country.io/capital.json
	- http://country.io/phone.json
- cors로 인해 전달 서버가 필요하다
- 각각, `/continent.json`, `/names.json`, `/capital.json`, `/phone.json`로 접근 가능하다.

## Frontend
### 실행방법
```
$ npm install
$ npm start
```
기본포트는 3000번이다.

### 설명
- 리액트 페이지 개발
	- 나라 정보(코드, 수도, 이름, 국가, 대륙, 전화번호)를 GET 으로 가져와 정보를 리스팅해주는 페이지
	- 버튼을 누르면 각 필드별 오름차순, 내림차순 정렬이 됨
	- 검색 창이 있어 통합 검색이 됨 (Case Sensitive, 연속부분문자열)
	- 각 나라의 데이터 Row에 삭제 버튼이 있어 누르면 삭제 가능 (Row를 선택하면 삭제 버튼이 생김)
	- 나라 정보를 입력해서 추가할 수 있어야 함 (맨 위에 Form이 존재)
	- 일부만 로딩 후 스크롤 아래로 갈 시 추가 로딩
	- 추가, 삭제시 css 애니메이션
	- redux-form 사용하여 개발
	- Row의 데이터를 클릭하면 input field로 바뀌고, 데이터를 수정하여 엔터키를 누르면 수정되는 기능 개발

- 개발 조건
	- 보일러 플레이트(create-react-app 등)를 사용하지 않음
	- react, redux, redux-saga, webpack을 베이스로 사용하여 개발함
	- 모든 상태(나라 목록, 정렬 상태, 검색어 등)은 redux에 저장됨
	- Network 통신은 redux-saga 통해함
	- Country Model을 정의하여 개발함

- TODO
	- 성능 최적화
	- Design
	- Row의 데이터를 수정할 때에도 redux-form 사용하게 바꾸기
	- 전체 초기화를 하면 모든 Component의 State 값도 초기화 하기


