const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// get request for all participating venues in db
//this route is open to unauthenticated users
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "restaurant"`)
        .then( response => {
            res.send(response.rows);
        }) 
        .catch( error => {
            console.log('Error in SELECT query from restaurant:', error)
        })   
})

// get request to get the single restaurant info that the user clicked to view
//this route is unauthenticated
router.get('/selected/:id', (req, res) => {
    pool.query(`SELECT * from "restaurant" WHERE "id" = $1 LIMIT 1;`, [req.params.id])
        .then(result => {
            res.send(result.rows[0]);
        })
        .catch( error => {
            console.log('Error in SELECT query from selected route.', error);
        })
})

//get request to get only the budgable waitlist
router.get('/budgable/:restaurant_id', rejectUnauthenticated, (req, res) => {
    console.log('in budgable wl', req.params.restaurant_id);
    pool.query(`SELECT "party_size" FROM "waitlist"
        WHERE "user_id" = $1
        AND "restaurant_id" = $2;`, [req.user.id, req.params.restaurant_id])
        .then(
            result => {
                pool.query(`SELECT "waitlist"."id" AS "waitlist_id", "waitlist"."status_code" AS "waitlist_status_code", "waitlist"."quote_time", "waitlist"."party_size", "waitlist"."user_id", 
                ARRAY_AGG("rejected_offer"."offer_price" ORDER BY "rejected_offer"."status_time" DESC ) AS "rejected_price", 
                ROUND("quote_time" - EXTRACT(EPOCH FROM (NOW() - "waitlist"."join_waitlist_time"))/60)
                AS "latest_wait_time"
                FROM  "waitlist"
                LEFT JOIN (SELECT * FROM "offer" WHERE "offer"."status_code" = 2) AS "rejected_offer" 
                ON "rejected_offer"."waitlist_id" = "waitlist"."id"
                WHERE "waitlist"."status_code" <> 2
                AND ROUND("quote_time" - EXTRACT(EPOCH FROM (NOW() - "waitlist"."join_waitlist_time"))/60) >-60
                AND "waitlist"."restaurant_id" = $1
                AND "waitlist"."party_size" = $2
                GROUP BY "waitlist"."id"
                ORDER BY "latest_wait_time";`, [req.params.restaurant_id,result.rows[0].party_size ])
                    .then(result => res.send(result.rows)) 
            }
        )
        .catch( error => {
            console.log('error with getting one restaurant', error);
            res.sendStatus(500);
        })
})


//get request to get waitlist information for the restaurant that the user selected
//this route is open to unauthenticated users
router.get('/waitlist/:restaurant_id', (req, res) => {
    pool.query(`SELECT "waitlist"."id" AS "waitlist_id", "waitlist"."status_code" AS "waitlist_status_code", "waitlist"."quote_time", "waitlist"."party_size", "waitlist"."user_id", ARRAY_AGG("rejected_offer"."offer_price" ORDER BY "rejected_offer"."status_time" DESC ) AS "rejected_price", ROUND("quote_time" - EXTRACT(EPOCH FROM (NOW() - "waitlist"."join_waitlist_time"))/60)
    AS "latest_wait_time"
    FROM  "waitlist"
    LEFT JOIN (SELECT * FROM "offer" WHERE "offer"."status_code" = 2) AS "rejected_offer" 
    ON "rejected_offer"."waitlist_id" = "waitlist"."id"
    WHERE "waitlist"."status_code" <> 2
    AND ROUND("quote_time" - EXTRACT(EPOCH FROM (NOW() - "waitlist"."join_waitlist_time"))/60) >-60
    AND "waitlist"."restaurant_id" = $1
    GROUP BY "waitlist"."id"
    ORDER BY "latest_wait_time";`, [req.params.restaurant_id])
        .then(result => {
            res.send(result.rows);
        })
        .catch( error => {
            console.log('error with getting one restaurant', error);
            res.sendStatus(500);
        })
})

//get request to get the user's waitlist for one restaurant
router.get(`/user_waitlist/:restaurant_id`, rejectUnauthenticated, (req, res) => {
    if(req.user) {
        pool.query(`SELECT * FROM "waitlist"
        WHERE "restaurant_id" = $1
        AND "user_id"=$2 AND ("status_code" = 1 OR "status_code" = 3);`, [req.params.restaurant_id, req.user.id])
    .then(
        result => {
            res.send(result.rows[0]);
        }
    )
    .catch(error => {
        console.log('error with get user waitlist', error);
        res.sendStatus(500);
    })
    } else {
        res.send({});
    }

})

module.exports = router;