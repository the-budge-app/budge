import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchWaitlist(action) {
    try {
        const waitlistResponse = yield axios.get(`/api/venues/waitlist/${action.payload.restaurant_id}`);
        console.log(waitlistResponse);
        yield put({type: 'SET_VENUE_INFO', payload: waitlistResponse.data})
    } catch (error) {
        // add error handling for issue with fetching venue info
        console.log(error);
    }
}

function* fetchBudgableWaitlist(action) {
    try {
        const waitlistResponse = yield axios.get(`/api/venues/budgable/${action.payload.restaurant_id}`);
        console.log(waitlistResponse);
        yield put({type: 'SET_VENUE_INFO', payload: waitlistResponse.data})
    } catch (error) {
        // add error handling for issue with fetching venue info
        console.log(error);
    }
}

function* fetchUserWaitlist(action) {
    try {
        const userWaitListResponse = yield axios.get(`/api/venues/user_waitlist/${action.payload}`);
        // console.log(userWaitListResponse);
        yield put({type: 'SET_USER_WAITLIST', payload: userWaitListResponse.data})
    } catch (error) {
        // add error handling for issue with fetching venue info
        console.log(error);
    }
}

function* venueInfoSaga() {
    yield takeLatest('FETCH_WAITLIST', fetchWaitlist);
    yield takeLatest('FETCH_BUDGABLE_WAITLIST', fetchBudgableWaitlist);
    yield takeLatest('FETCH_USER_WAITLIST', fetchUserWaitlist);
}

export default venueInfoSaga