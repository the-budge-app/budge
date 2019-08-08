const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('getting all contact.')
    pool.query(`SELECT "admin" FROM "user" WHERE "id" = $1;`, [req.user.id])
        .then(result => {
            if(result.rows[0].admin) {
                pool.query(`SELECT * FROM "admin"`)
                    .then( result => {
                        console.log('admin table',result.rows);
                        res.send(result.rows);
                    }) 
            } else {
                res.send([]);
            }
        } )
        .catch( error => {
            console.log('Error in SELECT query from admin', error)
        })   
})
module.exports = router;