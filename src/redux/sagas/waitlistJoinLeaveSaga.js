import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addToWaitlist() {
    try {
        yield axios.post('/api/waitlist/', action.payload);
        console.log(action.payload)
    } catch (error) {
        console.log('Error adding user to waitlist', error)
    }
}

function* waitlistJoinLeave() {
    yield takeLatest('ADD_TO_WAITLIST', addToWaitlist);
}

export default waitlistJoinLeave