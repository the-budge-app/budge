import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchBuyerInfo(action) {
    // payload should be a single id - not in an object
    try {
        const buyerInfoResponse = yield axios.get(`/api/seller_confirmation/${action.payload}`);
        console.log(buyerInfoResponse);
        yield put({type: 'SET_BUYER_INFO', payload: buyerInfoResponse.data})
    } catch (error) {
        console.log('Error in fetching buyer info.', error)
    }
}


function* sellerConfirmSaga() {
    yield takeLatest('FETCH_BUYER_INFO', fetchBuyerInfo);
    
}

export default sellerConfirmSaga;