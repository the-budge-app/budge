const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/singleSpot/:id', (req, res) => {
    // console.log('getting the data for waitList spot', req.params.id);
    pool.query(`SELECT * FROM "waitlist" WHERE "id" = $1;`, [req.params.id])
        .then(result => {
            res.send(result.rows[0])
        })
        .catch(error => {
            console.log('Error in SELECT query for waitlist', error);
            res.sendStatus(500);
        });
})


router.get('/check-waitlist-status', (req, res) => {
    pool.query(`SELECT * FROM "waitlist"
    WHERE "user_id" = $1 AND "status_code" = 1;`, [req.user.id])
        .then( result => {
            if ( !result.rows.length) {
                // user is not active on a waitlist, send code 200 - ok
                res.sendStatus(200);
            } 
            // otherwise, send 204 - no content
            else {
                res.sendStatus(204);
            }
        })
        .catch(error => {
            console.log('Error in checking waitlist for user', error);
            res.sendStatus(500);
        })
})

router.post('/join', (req, res) => {
    const user_id = req.body.user_id
    const id = req.body.id
    const reservation_name = req.body.reservation_name
    const party_size = req.body.party_size
    const quote_time = req.body.quote_time

    // check to see if the user is already active on another venue waitlist


    const queryText = `INSERT INTO "waitlist" ("user_id", "reservation_name", "party_size", "quote_time", "restaurant_id", "status_code")
    VALUES ($1, $2, $3, $4, $5, 1)`;
    pool.query(queryText, [user_id, reservation_name, party_size, quote_time, id])
    .then(() => res.sendStatus(201))
    .catch(error => {
        console.log('Error in adding to WL', error);
        res.sendStatus(500);
    });
    });

module.exports = router;