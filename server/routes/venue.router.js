const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get request for all participating venues in db
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "restaurant"`)
        .then( response => {
            res.send(response.rows);
        }) 
        .catch( error => {
            console.log('Error in SELECT query from restaurant:', error)
        })   
})

//get request to get the single restaurant + waitlist information that the user selected
router.get('/:restaurant_id', (req, res) => {
    console.log(req.params.restaurant_id);
    pool.query(`SELECT "waitlist"."id" AS "waitlist_id", "waitlist"."quote_time", "waitlist"."party_size", "waitlist"."user_id", ARRAY_AGG("rejected_offer"."offer_price" ORDER BY "rejected_offer"."status_time" DESC ) AS "rejected_price"
    FROM  "waitlist"
    LEFT JOIN (SELECT * FROM "offer" WHERE "offer"."status_code" = 2) AS "rejected_offer" 
    ON "rejected_offer"."waitlist_id" = "waitlist"."id"
    WHERE "waitlist"."status_code" = 1
    AND "waitlist"."restaurant_id" = $1
    GROUP BY "waitlist"."id";`, [req.params.restaurant_id])
        .then(result => {
            res.send(result.rows);
        })
        .catch( error => {
            console.log('error with getting one restaurant', error);
            res.sendStatus(500);
        })
})
module.exports = router;