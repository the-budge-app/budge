import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchComments(action) {
    try {
        const commentsResponse = yield axios.get(`/api/admin`);
        console.log(commentsResponse);
        yield put({type: 'SET_COMMENTS', payload: commentsResponse.data})
    } catch (error) {
        // add error handling for issue with fetching venue info
        console.log(error);
    }
}
function* commentsSaga() {
    yield takeLatest('FETCH_COMMENTS', fetchComments);
}

export default commentsSaga