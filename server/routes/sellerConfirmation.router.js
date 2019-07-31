const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get(`/:offer_id`, (req, res) => {
    console.log('offer id is', req.params.offer_id);
    pool.query(`SELECT * FROM "offer" 
        JOIN "user" ON "user"."id" = "offer"."buyer_id"
        JOIN "waitlist" ON "waitlist"."id" = "offer"."waitlist_id"
        WHERE "waitlist"."user_id" = $1
        AND "offer"."id" = $2; `, [req.user.id, req.params.offer_id])
    .then(result => {
        console.log(result.rows);
        res.send(result.rows[0]);
    })
    .catch(error => {
        console.log('error with getting buyer information for seller confirmation page');
        res.sendStatus(500);
    })
})









module.exports = router;