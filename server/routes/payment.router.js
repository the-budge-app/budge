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
router.put('/:id', (req, res) => {
    const updateBalance = req.body;
    console.log(req.body);
    
    const queryText = `UPDATE "user"
    SET "account_balance" = $1
    WHERE id=$2;`;
  
    const queryValues = [
      updateBalance.account_balance,
      updateBalance.id,
    ];
  
    pool.query(queryText, queryValues)
      .then(() => { res.sendStatus(200); })
      .catch((err) => {
        console.log('Error completing UPDATE payment query', err);
        res.sendStatus(500);
      });
  });
module.exports = router;