import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* addToWaitlist(action) {
    try {
        yield axios.post('/api/waitList/join', action.payload);
        yield action.payload.history.push('/venue/' + action.payload.id);

    } catch (error) {
        console.log('Error adding user to waitlist', error)
    }
}

function* leaveWaitlist(action) {
    try {
        yield axios.put(`/api/waitlist/leave/` + action.payload.id, action.payload);
        yield put({type: 'FETCH_WAITLIST', payload: action.payload })
    } catch (error) {
        console.log('error removing from waitlist', error)
    }
}

function* waitlistJoinLeave() {
    yield takeLatest('ADD_TO_WAITLIST', addToWaitlist);
    yield takeLatest('LEAVE_WAITLIST', leaveWaitlist);
}

export default waitlistJoinLeave;