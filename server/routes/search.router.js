const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//fetch restaurant with user input
//this route is not checking user authentication -> not logged in user can also view the info
router.get('/venue', (req,res) => {
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