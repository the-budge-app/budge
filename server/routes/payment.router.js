const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//deduct the offer price from account balance after seller accepts the offer
router.put('/offer-accepted', rejectUnauthenticated, (req, res) => {
  console.log('inside update account credit route');
  console.log('buyer id', req.body.buyerId, 'price', req.body.offerPrice, 'seller', req.user.id);
  //update seller's account
  pool.query(`SELECT "account_balance" FROM "user" WHERE "id"=$1;`, [req.user.id])
    .then(result => {
      // console.log(result.rows[0]);
      pool.query(`UPDATE "user" SET "account_balance" = $1 WHERE "id" = $2;`, [result.rows[0].account_balance + req.body.offerPrice, req.user.id])
        .then(
        result => res.sendStatus(201)
      ).catch( error  => {
        console.log('error with updating seller account balance', error);
        res.sendStatus(500);
      })
    })
    

  //update buyer's account
  pool.query(`SELECT "account_balance" FROM "user" WHERE "id"=$1;`, [req.body.buyerId])
  .then(result => {
    // console.log(result.rows[0]);
    pool.query(`UPDATE "user" SET "account_balance" = $1 WHERE "id" = $2;`, [result.rows[0].account_balance - req.body.offerPrice, req.body.buyerId])
      .then(
        result => res.sendStatus(201)
      ).catch( error  => {
      console.log('error with updating buyer account balance', error);
      res.sendStatus(500);
    })
  })
  
})

//post route to add funds
router.put('/:id', rejectUnauthenticated, (req, res) => {
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