const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get request to calculate the rating for one given user
router.get('/:id', (req, res) => {
    pool.query(`SELECT AVG("rating") AS "rating" FROM "customer_rating" WHERE "user_id" = $1;`, [req.params.id])
        .then(
            result => {
                // console.log(result.rows);
                res.send(result.rows[0]);
            }
        )
        .catch(error => {
            console.log('error with getting rating', error);
        })
  });

router.post('/', (req, res) => {
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