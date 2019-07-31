import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* addToWaitlist(action) {    
    try {
        yield axios.post('/api/waitList/join', action.payload);
    } catch (error) {
        console.log('Error adding user to waitlist', error)
    }
}

function* waitlistJoinLeave() {
    yield takeLatest('ADD_TO_WAITLIST', addToWaitlist);
}

export default waitlistJoinLeave;