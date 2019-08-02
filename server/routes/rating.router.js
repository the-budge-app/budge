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
module.exports = router;