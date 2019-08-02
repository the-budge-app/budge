const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// // get request for all participating venues in db
// router.get('/', (req, res) => {
//     pool.query(`SELECT * FROM "restaurant"`)
//         .then( response => {
//             res.send(response.rows);
//         }) 
//         .catch( error => {
//             console.log('Error in SELECT query from restaurant:', error)
//         })   
// })

//get request to get the single restaurant + waitlist information that the user selected
router.post('/', (req, res) => {
    const newEntry = req.body;
    console.log(req.body);
    
    const queryText = `INSERT INTO "admin"("first_name","last_name","email_address","phone_number","comments")
    VALUES
    ($1, $2, $3, $4, $5);`
  
    const queryValues = [
        newEntry.first_name,
        newEntry.last_name,
        newEntry.email_address,
        newEntry.phone_number,
        newEntry.comments,
    ];
  
    pool.query(queryText, queryValues)
      .then(() => { res.sendStatus(200); })
      .catch((err) => {
        console.log('Error completing POST', err);
        res.sendStatus(500);
      });
  });
module.exports = router;