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


module.exports = router;