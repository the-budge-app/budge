const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('getting all contact.')
    pool.query(`SELECT * FROM "admin" JOIN "user" ON "user"."admin"
    WHERE "admin" = 'true';`)
        .then( response => {
            res.send(response.rows);
        }) 
        .catch( error => {
            console.log('Error in SELECT query from admin', error)
        })   
})
module.exports = router;