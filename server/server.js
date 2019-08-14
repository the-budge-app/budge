

const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const venueRouter = require('./routes/venue.router');
const waitListRouter = require('./routes/waitlist.router')
const paymentRouter = require('./routes/payment.router');
const sellerConfirmation = require('./routes/sellerConfirmation.router');
const offerRouter = require('./routes/offer.router');
const contactRouter = require('./routes/contact.router');
const ratingRouter = require('./routes/rating.router');
const twilioRouter = require('./routes/twilio.router');
const adminRouter = require('./routes/admin.router');
const searchRouter = require('./routes/search.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/contact', contactRouter);
app.use('/api/admin', adminRouter);

// Routes for venues
app.use('/api/venues', venueRouter);

// Routes for waitList data
app.use('/api/waitList', waitListRouter);
// Routes for payments
app.use('/api/payment', paymentRouter);
// Routes for seller confirmation page
app.use('/api/seller_confirmation', sellerConfirmation);

//Routes for offers
app.use('/api/offers', offerRouter);

//Route to calculate customer rating
app.use('/api/rating', ratingRouter);

//Routes for twilio messaging
app.use('/api/twilio', twilioRouter)

//Route for searching a venue
app.use('/api/search', searchRouter)

// Serve static files
app.use(express.static('build'));


// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
