import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchVenueInfo(action) {
    try {
        const venueInfoResponse = yield axios.get(`/api/venues/${action.payload.restaurant_id}`);
        console.log(venueInfoResponse);
        yield put({type: 'SET_VENUE_INFO', payload: venueInfoResponse.data})
    } catch (error) {
        // add error handling for issue with fetching venue info
        console.log(error);
    }
}

function* venueInfoSaga() {
    yield takeLatest('FETCH_VENUE_INFO', fetchVenueInfo);
}

export default venueInfoSaga