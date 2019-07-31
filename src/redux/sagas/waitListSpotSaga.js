import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getSelectedSpot(action) {
    const waitListSpotResponse = yield axios.get(`/api/waitlist/singleSpot/${action.payload}`)
    console.log(waitListSpotResponse.data)
    yield put({type: 'SET_SELECTED_SPOT', payload: waitListSpotResponse.data})
}


function* waitListSpotSaga() {
    yield takeLatest('FETCH_SELECTED_SPOT_DATA', getSelectedSpot);
}

export default waitListSpotSaga