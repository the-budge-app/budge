
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get request to get offers for a single user
// id is the waitlist id for the user
router.get('/user', (req, res) => {
    console.log('Getting offers for user', req.query);
    console.log(req.user.id);
    // get the offer the user has made first
    pool.query(`SELECT * FROM "offer"
        JOIN "waitlist" ON "offer"."waitlist_id" = "waitlist"."id"
        WHERE "buyer_id" = $1
        AND "waitlist"."restaurant_id"=$2
        AND "offer"."status_code"=1;`, [req.user.id, req.query.venue])
        .then( result => {
            console.log('offerMade:',result.rows[0]);
            let offers = {offerMade: result.rows[0],}
            // we have the offer that was made, 
            // now lets get any offer received
            pool.query(`SELECT * FROM "offer" 
                JOIN "waitlist" ON "waitlist"."id" = "offer"."waitlist_id" 
                WHERE "waitlist"."id" = $1 
                AND "offer"."status_code"=1
                AND "waitlist"."user_id"=$2;`, [req.query.waitlist, req.user.id])
                .then(result => {
                    console.log('offerReceived:', result.rows[0]);
                    offers = {
                        ...offers,
                        offerReceived: result.rows[0],
                    }
                    res.send(offers);
                })      
        })
})

router.put('/update', (req, res) => {
    console.log('Retracting offer', req.body)
    pool.query(`UPDATE "offer" SET "status_code" = $1 WHERE "id" = $2;`, [req.body.offerId, req.body.statusCode])
        .then(result => {
            res.sendStatus(200)
        })
        .catch( error => {
            console.log('Error with updating seller rejected offer', error);
        })
})

router.post('/make-new', (req, res) => {
    // for making a new offer, we need to insert into 
    // the offer table with the data for the new offer
    // then change the status on the waitlist for the 
    // seller to show the inactive so they
    // wont receive any other offers
    console.log('Making new offer', req.body);
    pool.query(`INSERT INTO "offer" (waitlist_id, buyer_id, offer_price, status_time, status_code)
        VALUES ($1, $2, $3, NOW(), '1');`, [req.body.waitlistId, req.user.id, req.body.offerPrice])
        .then(result => {
            // new row inserted into the table. now change the status of the seller
            // get the user_id that owns the waitlist spot we are making an offer on
            pool.query(`SELECT "user_id" FROM "waitlist" WHERE "id"=$1;`, [req.body.waitlistId])
                .then( result => {
                    const sellerId = result.rows[0];
                    console.log(sellerId);
                    // now that we have the user_id of the spot owner, lets change their status to pending
                    pool.query(`UPDATE "waitlist" SET "status_code" = 3 WHERE "user_id" = $1 AND "restaurant_id"=$2;`, [sellerId.user_id, req.body.venueId])
                        .then(result => {
                            // status changed for that waitlist spot to pending
                            res.sendStatus(200);
                        })
                        .catch(error=> {
                            console.log('Error in updating waitlist status to pending', error);
                        })
                })
                .catch(error=> {
                    console.log('Error in selecting user id from waitlist', error);
                })
        })
        .catch(error => {
            console.log('Error making new offer', error)
        })
})

module.exports = router;




// --offer received by the user
// SELECT * FROM "offer" 
//     JOIN "waitlist" ON "waitlist"."id" = "offer"."waitlist_id" 
//     WHERE "waitlist"."id" = 1 
//     AND "offer"."status_code"=1
//     AND "waitlist"."user_id"=1; 

// -- offer sent by the user
// SELECT * FROM "offer"
//     JOIN "waitlist" ON "offer"."waitlist_id" = "waitlist"."id"
//     WHERE "buyer_id" = 1
//     AND "waitlist"."restaurant_id"=1
//     AND "offer"."status_code"=1;