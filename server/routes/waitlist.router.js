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

router.post('/', (req, res) => {
    const user_id = req.body.user_id
    const id = req.body.id
    const reservation_name = req.body.reservation_name
    const party_size = req.body.party_size
    const quoted_time = req.body.quoted_time
    
    const queryText = `INSERT INTO "waitlist" ("user_id", "reservation_name", "party_size", "quoted_time", "restaurant_id)
    VALUES ($1, $2, $3, $4, $5)`;
    pool.query(queryText, [user_id, reservation_name, party_size, quoted_time, id])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
    });

module.exports = router;