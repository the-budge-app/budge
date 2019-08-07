import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* fetchRating(action) {
    try {
        // console.log('buyer id is', action.payload);
        const ratingResponse = yield axios.get(`/api/rating/getrating/${action.payload}`);
        console.log('the rating is ', ratingResponse.data);
        yield put({ type: 'SET_USER_RATING', payload: ratingResponse.data });
    } catch (error) {
        // add error handling for issue with fetching venues
        console.log(error);
    }
}

function* fetchUserToRate(action) {
    try {
        console.log('in rate sagaaaaaaaaa', action.payload)
        const getUserResponse = yield axios.get(`/api/rating/getusername/${action.payload}`);
        console.log('username is ', getUserResponse.data );
        yield put({ type: 'SET_OTHER_USER', payload: getUserResponse.data });
    }catch (error) {
        console.log('error getting other user', error)
    }
}

function* postRating(action) {
    try {
        yield axios.post('/api/rating/', action.payload);
    } catch (error) {
        console.log('error adding user to waitlist', error)
    }
}

function* customerRating() {
    yield takeLatest('FETCH_RATING', fetchRating);
    yield takeLatest('POST_RATING', postRating);
    yield takeLatest('FETCH_USER_TO_RATE', fetchUserToRate);
}

export default customerRating;