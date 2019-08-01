import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import venueInfoSaga from './venueInfoSaga';
import waitListSpotSaga from './waitListSpotSaga'
import paymentSaga from './paymentSaga';
import waitlistJoinLeave from './waitlistJoinLeaveSaga';
import sellerConfirmation from './sellerConfirmationSaga';
import customerRating from './customerRatingSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    venueInfoSaga(),
    waitListSpotSaga(),
    paymentSaga(),
    waitlistJoinLeave(),
    sellerConfirmation(),
    customerRating(),
  ]);
}
