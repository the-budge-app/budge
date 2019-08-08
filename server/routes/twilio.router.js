const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// import twilio keys
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// notify the buyer that the seller has accepted their offer
// takes data object that includes the buyer id and preferably the offerId
router.post('/accept-offer', rejectUnauthenticated, (req, res) => {
    // get the phone number for the buyer
    pool.query(`SELECT "phone_number" FROM "user" WHERE "id" = $1;`, [req.body.buyerId])
        .then(result => {
            const buyerPhone = result.rows[0].phone_number;
            console.log(buyerPhone);
            client.messages
                .create({
                    body: `Your offer has been accepted! View it: http://thebudgeapp.herokuapp.com/buyer-confirm?offerId=${req.body.offerId}`,
                    from: '+16125025504',
                    to: `+1${buyerPhone}`
                })
                .then(message => console.log(message.sid));
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('Error sending SMS to buyer', error);
        })
})

module.exports = router;