import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//fetching buyer information for seller receive offer page
function* fetchBuyerInfo(action) {
    try {
        const buyerInfoResponse = yield axios.get(`/api/seller_confirmation/buyer?waitlistId=${action.payload.waitlist_id}&venueId=${action.payload.venue_id}&buyerId=${action.payload.buyer_id}`);
        console.log(buyerInfoResponse);
        yield put({type: 'FETCH_RATING', payload: buyerInfoResponse.data.buyer_id})
        yield put({type: 'SET_BUYER_INFO', payload: buyerInfoResponse.data});
    } catch (error) {
        console.log('Error in fetching buyer info.', error)
    }
}

//fetching seller information for seller receive offer page
function* fetchSellerInfo(action) {
    try {
        const sellerInfoResponse = yield axios.get(`/api/seller_confirmation/seller/${action.payload.waitlist_id}`);
        console.log(sellerInfoResponse);
        yield put({type: 'SET_SELLER_INFO', payload: sellerInfoResponse.data})
    } catch (error) {
        console.log('Error in fetching seller info.', error)
    }
}

function* sellerConfirmSaga() {
    yield takeLatest('FETCH_BUYER_INFO', fetchBuyerInfo);
    yield takeLatest('FETCH_SELLER_INFO', fetchSellerInfo);
    
}

export default sellerConfirmSaga;