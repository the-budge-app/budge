const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
//get route to get buyer information for seller receive offer page
router.get(`/buyer/:waitlist_id/:offer_id`, (req, res) => {
    console.log('user id', req.user.id);
    console.log('offer id is', req.params.offer_id);
    pool.query(`SELECT * FROM "waitlist"
        WHERE "id" = $1
        AND "user_id" = $2;`, [req.params.waitlist_id, req.user.id])
        .then(result => {
            if (result.rows.length) {
                console.log('inside buyer query');
                pool.query(`SELECT * FROM "offer" 
                JOIN "user" ON "user"."id" = "offer"."buyer_id" 
                JOIN "waitlist" ON "waitlist"."user_id" = "offer"."buyer_id"
                AND "offer"."id" = $1
                AND "offer"."status_code" = 1
                AND "waitlist"."status_code" = 1;`, [req.params.offer_id] )
                .then(
                    result => {
                        console.log('buyer', result.rows);
                        res.send(result.rows[0]);
                    })
            }
            
        })
        .catch(error => {
            console.log('error with getting buyer information for seller confirmation page');
            res.sendStatus(500);
        })
})

//get route to get seller information for seller receive offer page
router.get(`/seller/:waitlist_id`, (req, res) => {
    console.log('waitlist id is', req.params.waitlist_id);
    pool.query(`SELECT * FROM "waitlist"
        JOIN "user" ON "user"."id" = "waitlist"."user_id"
        WHERE "waitlist"."user_id" = $1
        AND "waitlist"."id" = $2
        AND "waitlist"."status_code" = 1; `, [req.user.id, req.params.waitlist_id])
        .then(result => {
            console.log('seller', result.rows);
            res.send(result.rows[0]);
        })
        .catch(error => {
            console.log('error with getting buyer information for seller confirmation page');
            res.sendStatus(500);
        })
})







module.exports = router;