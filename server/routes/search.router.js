const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//fetch restaurant with user input
router.get('/venue', (req,res) => {
    console.log('search venue', req.query.name);
    pool.query(`SELECT * FROM "restaurant" WHERE "restaurant_name" iLIKE $1;`, [`%${req.query.name}%`] )
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error with search', error);
            res.sendStatus(500);
        })
})

module.exports = router;