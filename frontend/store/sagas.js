import { takeEvery, put, call, fork, select, throttle } from 'redux-saga/effects'
import * as actions from './actions'

export function* watchInitialCountry(action){
    const response_continent = yield call (fetch, `/api/continent.json`, {method: "GET",})
    if(!response_continent.ok) return
    const response_name = yield call (fetch, `/api/names.json`, {method: "GET",})
    if(!response_name.ok) return
    const response_capital = yield call (fetch, `/api/capital.json`, {method: "GET",})
    if(!response_capital.ok) return
    const response_phone = yield call (fetch, `/api/phone.json`, {method: "GET",})
    if(!response_phone.ok) return
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
}

export default function* () {
    yield fork(watchInitialCountry)
    yield takeEvery(actions.INITIAL_COUNTRY, watchInitialCountry)
}