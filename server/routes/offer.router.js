
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