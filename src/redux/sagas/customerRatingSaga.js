import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* fetchRating(action) {
    try {
        // console.log('buyer id is', action.payload);
        const ratingResponse = yield axios.get(`/api/rating/${action.payload}`);
        console.log('the rating is!!!!!!', ratingResponse.data);
        yield put({type: 'SET_USER_RATING', payload: ratingResponse.data});    
    } catch (error) {
        // add error handling for issue with fetching venues
        console.log(error);
    }
}

function* customerRating() {
    yield takeLatest('FETCH_RATING', fetchRating);
}

export default customerRating;