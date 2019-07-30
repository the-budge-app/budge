import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* addFunds(action) {
    try {
        const paymentResponse = yield axios.put(`/api/payment/${action.payload.id}`, action.payload);
        console.log('payment', paymentResponse.data);
        yield takeLatest({type: 'HANDLE_PAYMENT', payload: paymentResponse.data})
        console.log('payment', paymentResponse.data);
    } catch (error) {
        // add error handling for issue with fetching venues
        console.log(error);
    }
}

function* paymentSaga() {
    yield takeLatest('ADD_FUNDS', addFunds);
}

export default paymentSaga