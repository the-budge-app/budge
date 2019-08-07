
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// get request to get offers for a single user
// id is the waitlist id for the user
router.get('/user', (req, res) => {
    console.log('Getting offers for user', req.query);
    console.log(req.user.id);
    // get the offer the user has made first
    pool.query(`SELECT *, "offer"."id" AS "offer_id" FROM "offer"
        JOIN "waitlist" ON "offer"."waitlist_id" = "waitlist"."id"
        WHERE "buyer_id" = $1
        AND "waitlist"."restaurant_id"=$2
        AND "offer"."status_code"=1;`, [req.user.id, req.query.venue])
        .then(result => {
            console.log('offerMade:', result.rows[0]);
            let offers = { offerMade: result.rows[0], }
            // we have the offer that was made, 
            // now lets get any offer received
            pool.query(`SELECT "offer"."id" AS "offer_id", * FROM "offer"  
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
    console.log('updating offer', req.body.offerId, 'to code', req.body.statusCode)
    pool.query(`UPDATE "offer" SET "status_code" = $1 WHERE "id" = $2;`, [req.body.statusCode, req.body.offerId])
        .then(result => {
            res.sendStatus(200)
        })
        .catch(error => {
            console.log('Error with updating seller rejected offer', error);
        })
})

// to retract an offer, we have to change the status of the offer
// and then get the waitlist id to update to waitlist status back to active
router.put('/buyer-retract', (req, res) => {
    console.log('Updating offer', req.body.offerId, 'to status', req.body.statusCode);
    pool.query(`UPDATE "offer" SET "status_code" = $1, "status_time"=NOW() WHERE "id" = $2;`, [req.body.statusCode, req.body.offerId])
        .then(result => {
            console.log('Getting the id for the waitlist');
            pool.query(`SELECT "waitlist_id" from "offer" WHERE "id" = $1;`, [req.body.offerId])
                .then(result => {
                    console.log('updating waitlist spot', result.rows[0].waitlist_id)
                    pool.query(`UPDATE "waitlist" SET "status_code" = 1 WHERE id=$1;`, [result.rows[0].waitlist_id])
                        .then(result => {
                            console.log('all done!');
                            res.sendStatus(200);
                        })
                        .catch(error => console.log('Error updating waitlist status on retract offer', error))
                })
                .catch(error => console.log('Error in SELECT query for waitlist id on retract offer', error))
        })
        .catch(error => {
            console.log('Error with updating seller rejected offer', error);
        })
})

router.post('/make-new', (req, res) => {

    // TODO research async/await

    // for making a new offer, we need to insert into 
    // the offer table with the data for the new offer
    // then change the status on the waitlist for the 
    // seller to show the inactive so they
    // wont receive any other offers
    console.log('Making new offer', req.body);
    pool.query(`INSERT INTO "offer" (waitlist_id, buyer_id, offer_price, status_time, status_code)
        VALUES ($1, $2, $3, NOW(), '1') RETURNING "id";`, [req.body.waitlistId, req.user.id, req.body.offerPrice])
        .then(result => {
            const newOfferId = result.rows[0].id;
            // new row inserted into the table. now change the status of the seller
            // get the user_id that owns the waitlist spot we are making an offer on
            pool.query(`SELECT "user_id" FROM "waitlist" WHERE "id"=$1;`, [req.body.waitlistId])
                .then(result => {
                    const sellerId = result.rows[0];
                    // now that we have the user_id of the spot owner, lets change their status to pending
                    pool.query(`UPDATE "waitlist" SET "status_code" = 3 WHERE "user_id" = $1 AND "restaurant_id"=$2 AND "status_code"=1;`, [sellerId.user_id, req.body.venueId])
                        .then(result => {
                            // status changed for that waitlist spot to pending
                            // new offer is now complete on the db side, so lets notify the seller
                            pool.query(`SELECT "phone_number" FROM "user" WHERE "id" = $1;`, [sellerId.user_id])
                                .then(result => {
                                    const sellerPhone = result.rows[0].phone_number;
                                    client.messages
                                        .create({
                                            body: `Someone's trying Budge you! View it: http://thebudgeapp.herokuapp.com/seller-offer?offerId=${newOfferId}&buyer=${req.user.id}&venue=${req.body.venueId}&waitlist=${req.body.waitlistId}`,
                                            from: '+16125025504',
                                            to: `+1${sellerPhone}`
                                        })
                                        .then(message => console.log(message.sid));
                                        res.sendStatus(200);
                                })
                                .catch(error => {
                                    console.log('Error with getting user phone', error)
                                    res.sendStatus(500);
                                })
                            
                        })
                        .catch(error => {
                            console.log('Error in updating waitlist status to pending', error);
                            res.sendStatus(500);
                        })
                })
                .catch(error => {
                    console.log('Error in selecting user id from waitlist', error);
                    res.sendStatus(500);
                })
        })
        .catch(error => {
            console.log('Error making new offer', error)
            res.sendStatus(500);
        })
})

// route to check for any active offers by current user
router.get('/check-offers', (req, res) => {
    pool.query(`SELECT * FROM "offer" WHERE "buyer_id"=$1 AND "status_code"=1;`, [req.user.id])
        .then(result => {
            // if we get something back, user has an active offer
            // and we do not want to give them the ok to view another spot
            if( result.rows.length ){
                res.send({hasActiveOffer: true})
            }
            else {
                //user does not have an active offer, give them the ok to view another spot
                res.send({hasActiveOffer: false})
            }
        })
})

//route to get the last rejected price for the selected spot
router.get('/last-rejected/:waitlistId', (req, res) => {
    // console.log(req.params.waitlistId);
    pool.query(`SELECT * FROM "offer" 
        WHERE "waitlist_id" = $1
        AND "status_code" = 2
        ORDER BY "status_time" DESC
        LIMIT 1;`, [req.params.waitlistId])
        .then(result => {
            res.send(result.rows[0])
        }) 
})

module.exports = router;