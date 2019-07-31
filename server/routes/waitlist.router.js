const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/singleSpot/:id', (req, res) => {
    // console.log('getting the data for waitList spot', req.params.id);
    pool.query(`SELECT * FROM "waitlist" WHERE "id" = $1;`, [req.params.id])
        .then(result => {
            res.send(result.rows[0])
        })
        .catch(error => {
            console.log('Error in SELECT query for waitlist', error);
            res.sendStatus(500);
        });

    
})

module.exports = router;