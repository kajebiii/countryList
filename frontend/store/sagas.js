import { takeEvery, put, call, fork, select, throttle } from 'redux-saga/effects'
import { delay } from 'redux-saga';
import * as actions from './actions'

export function* watchInitialAll(action){
    yield put(actions.initial_sort())
    yield put(actions.initial_search())
    yield put(actions.send_alert('대륙정보 가져오는 중..'))
    const response_continent = yield call (fetch, `/api/continent.json`, {method: "GET",})
    if(!response_continent.ok) {
        yield put(actions.send_alert('ERROR (/api/continent.json)'))
        return
    }
    yield put(actions.send_alert('이름정보 가져오는 중..'))
    const response_name = yield call (fetch, `/api/names.json`, {method: "GET",})
    if(!response_name.ok) {
        yield put(actions.send_alert('ERROR (/api/continent.json)'))
        return
    }
    yield put(actions.send_alert('수도정보 가져오는 중..'))
    const response_capital = yield call (fetch, `/api/capital.json`, {method: "GET",})
    if(!response_capital.ok) {
        yield put(actions.send_alert('ERROR (/api/capital.json)'))
        return
    }
    yield put(actions.send_alert('전화정보 가져오는 중..'))
    const response_phone = yield call (fetch, `/api/phone.json`, {method: "GET",})
    if(!response_phone.ok) {
        yield put(actions.send_alert('ERROR (/api/phone.json)'))
        return
    }
    const data_continent = yield call(() => response_continent.json())
    const data_name = yield call(() => response_name.json())
    const data_capital = yield call(() => response_capital.json())
    const data_phone = yield call(() => response_phone.json())

    let country_dictionary = {}
    Object.keys(data_continent).map( (code) => {
        let continent = data_continent[code]
        let name = data_name[code]
        let capital = data_capital[code]
        let phone = data_phone[code]
        country_dictionary[code] = {continent:continent, name:name, capital:capital, phone:phone}
    })
    yield put(actions.set_country(country_dictionary))
    yield put(actions.send_alert('성공적으로 정보를 가져왔습니다.'))
}
export function* watchAddCheckCountry(action) {
    const country_state = yield select((state) => state.country_state)
    const {code, continent, name, capital, phone} = action
    if(code in country_state) {
        yield put(actions.send_alert('이미 존재하는 국가 코드입니다.'))
    }else{
        yield put(actions.add_country(code, continent, name, capital, phone))
        yield put(actions.send_alert('정상적으로 추가되었습니다.'))
    }
}
export function* watchModifyCheckCountry(action) {
    const country_state = yield select((state) => state.country_state)
    const {beforeCode, code, continent, name, capital, phone} = action
    if(beforeCode !== code && code in country_state) {
        yield put(actions.send_alert('이미 존재하는 국가 코드입니다.'))
    }else{
        yield put(actions.modify_country(beforeCode, code, continent, name, capital, phone))
        yield put(actions.send_alert('정상적으로 수정되었습니다.'))
    }
}

export function* watchSendAlert(action) {
    yield put(actions.add_alert(action.message))
    yield call(delay, 5000)
    yield put(actions.del_alert())
}


export default function* () {
    yield fork(watchInitialAll)
    yield takeEvery(actions.INITIAL_ALL, watchInitialAll)
    yield takeEvery(actions.ADD_CHECK_COUNTRY, watchAddCheckCountry)
    yield takeEvery(actions.MODIFY_CHECK_COUNTRY, watchModifyCheckCountry)

    yield takeEvery(actions.SEND_ALERT, watchSendAlert)
}