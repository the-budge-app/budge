const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


//get request to calculate the rating for one given user
router.get('/getrating/:id', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT AVG("rating") AS "rating" FROM "customer_rating" WHERE "user_id" = $1;`, [req.params.id])
        .then(
            result => {
                res.send(result.rows[0]);
            }
        )
        .catch(error => {
            res.sendStatus(500)
            console.log('error with getting rating', error);
        })
  });

router.get('/getusername/:id', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT "username" FROM "user"
    WHERE "user"."id" = $1;`, [req.params.id])
        .then(
            result => {
                res.send(result.rows[0]);
            }
        )
        .catch(error => {
            console.log('error with getting username', error);
        })
})

router.post('/', rejectUnauthenticated, (req, res) => {
    const user_id = req.body.user_id
    const given_by = req.user.id
    const rating = req.body.rating
    pool.query(`INSERT INTO "customer_rating" ("user_id", "given_by", "rating")
    VALUES ($1, $2, $3);`, [user_id, given_by, rating])
    .then(() => res.sendStatus(201))
        .catch(error => {
            console.log('Error in adding rating', error);
            res.sendStatus(500);
        });
})
module.exports = router;