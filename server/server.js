
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const venueRouter = require('./routes/venue.router');
<<<<<<< HEAD
const waitListRouter = require('./routes/waitList.router')
=======
const paymentRouter = require('./routes/payment.router');
>>>>>>> master

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

// Routes for venues
app.use('/api/venues', venueRouter);

<<<<<<< HEAD
// Routes for waitList data
app.use('/api/waitList', waitListRouter);
=======
// Routes for payments
app.use('/api/payment', paymentRouter);
>>>>>>> master

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
