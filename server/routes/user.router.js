const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {  
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const email_address = req.body.email_address;
  const phone_number = req.body.phone_number;

  const queryText = 'INSERT INTO "user" (username, password, email_address, phone_number) VALUES ($1, $2, $3, $4) RETURNING id';
  pool.query(queryText, [username, password, email_address, phone_number])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.put('/profile/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `UPDATE "user"
  SET "username" = $1, "email_address" = $2, "phone_number" = $3
  WHERE "id" = $4;`
  const queryValues = [req.body.username, req.body.email_address, req.body.phone_number, req.params.id]
  pool.query(queryText, queryValues)
  .then(() => { res.sendStatus(200); })
  .catch((err) => {
    console.log('Error completing UPDATE query', err);
    res.sendStatus(500);
  });
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = 'DELETE FROM "user" WHERE id=$1';
  pool.query(queryText, [req.params.id])
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing DELETE query', err);
      res.sendStatus(500);
    });
});
module.exports = router;
