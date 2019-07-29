import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchVenues() {
    try {
        const venueListResponse = yield axios.get('/api/venues')
        yield put({type: 'SET_VENUE_LIST', payload: venueListResponse.data})
    } catch (error) {
        // add error handling for issue with fetching venues
        console.log(error);
    }
}

function* venueSaga() {
    yield takeLatest('FETCH_VENUE_LIST', fetchVenues);
}

export default venueSaga