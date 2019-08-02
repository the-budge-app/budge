import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* addEntry(action) {
    try {
      yield axios.post('/api/contact', action.payload);
    } catch (error) {
      console.log('error with posting an entry:', error);
    }
  }

function* contactSaga() {
    yield takeLatest('ADD_ENTRY', addEntry);
}

export default contactSaga