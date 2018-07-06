# CountryList

## Backend
### 실행방법
```
$ pipenv install
$ pipenv shell
[pipenv]$ python manage.py runserver [port 번호]
```
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
### 설명
- TODO

