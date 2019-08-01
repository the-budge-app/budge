import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* fetchRating(action) {
    try {
        console.log('buyer id is', action.payload);
        // const paymentResponse = yield axios.put(`/api/payment/${action.payload.id}`, action.payload);
        // console.log('payment', paymentResponse.data);
        // yield takeLatest({type: 'HANDLE_PAYMENT', payload: paymentResponse.data})
        // console.log('payment', paymentResponse.data);
    } catch (error) {
        // add error handling for issue with fetching venues
        console.log(error);
    }
}

function* customerRating() {
    yield takeLatest('FETCH_RATING', fetchRating);
}

export default customerRating;