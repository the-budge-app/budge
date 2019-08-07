
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/singleSpot/:id', (req, res) => {
    // console.log('getting the data for waitList spot', req.params.id);
    pool.query(`SELECT *, ROUND("quote_time" - EXTRACT(EPOCH FROM (NOW() - "waitlist"."join_waitlist_time"))/60)
    AS "latest_wait_time" 
    FROM "waitlist" WHERE "id" = $1;`, [req.params.id])
        .then(result => {
            console.log(result.rows)
            res.send(result.rows[0])
        })
        .catch(error => {
            console.log('Error in SELECT query for waitlist', error);
            res.sendStatus(500);
        });
})


// route to check whether the user is currently active on a waitlist
router.get('/check-waitlist-status', (req, res) => {
    pool.query(`SELECT * FROM "waitlist"
    WHERE "user_id" = $1 AND "status_code" = 1;`, [req.user.id])
        .then( result => {
            if ( result.rows.length ){
                // user is active on another waitlist
                res.send({isActiveOnWaitlist: true});
            }
            else {
                // user is not active on any waitlist
                res.send({isActiveOnWaitlist: false});
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
    const queryText = `INSERT INTO "waitlist" ("user_id", "reservation_name", "party_size", "quote_time", "restaurant_id", "status_code")
    VALUES ($1, $2, $3, $4, $5, 1)`;
    pool.query(queryText, [user_id, reservation_name, party_size, quote_time, id])
        .then(() => res.sendStatus(201))
        .catch(error => {
            console.log('Error in adding to WL', error);
            res.sendStatus(500);
        });
});

//put route to swap spots after seller accepts the offer
router.put('/swap', (req, res) => {
    console.log('in swap');
    console.log('buyer_waitlist', req.query.buyerWaitlist);
    console.log('seller_waitlist', req.query.sellerWaitlist);
    pool.query(`UPDATE "waitlist" SET "user_id" = $1, "status_code" = 1 
        WHERE "id" = $2
        AND "user_id" = $3;`,
        [req.query.buyer, req.query.sellerWaitlist, req.user.id])
        .then(
            ()=>{
                pool.query('UPDATE "waitlist" SET "user_id" = $1 WHERE "id" = $2;',
                [req.user.id, req.query.buyerWaitlist]);
                res.sendStatus(201);
            }            
        )
        .catch(error => {
            console.log('error with swap spots', error);
            res.sendStatus(500);
        })
})

//put route to update waitlist status from pending to active after seller rejects offer
router.put('/reject/:waitlistId', (req, res) => {
    pool.query(`UPDATE "waitlist" SET "status_code" = 1
    WHERE "id" = $1
    AND "user_id" = $2;`, [req.params.waitlistId, req.user.id])
        .then(
            result => res.sendStatus(201)
        )
        .catch( error => {
            console.log('error with update WL status', error)
        })
})

router.put('/leave/:id', (req, res) => {
    pool.query(`UPDATE "waitlist" SET "status_code" = 2 
    WHERE "id" =$1 AND "user_id" =$2;`, [req.params.id, req.user.id])
    .then(
        result => res.sendStatus(201)
    )
    .catch ( error => {
        console.log('error with PUT request for leaving waitlist', error)
    })
})

module.exports = router;