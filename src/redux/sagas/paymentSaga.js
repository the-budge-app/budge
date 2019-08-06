import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* addFunds(action) {
    try {
        const paymentResponse = yield axios.put(`/api/payment/${action.payload.id}`, action.payload);
        console.log('payment', paymentResponse.data);
        yield put({type: 'HANDLE_PAYMENT', payload: paymentResponse.data})
        yield put({type: 'FETCH_USER'})
        console.log('payment', paymentResponse.data);
        // yield action.payload.history.push(`/waitlist-spot/${action.payload.waitlistId}`)
    } catch (error) {
        // add error handling for issue with fetching venues
        console.log(error);
    }
}

function* paymentSaga() {
    yield takeLatest('ADD_FUNDS', addFunds);
}

export default paymentSaga