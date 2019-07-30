const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/singleSpot/:id', (req, res) => {
    // console.log('getting the data for waitList spot', req.params.id);
    pool.query(``)
    res.send({id: req.params.id});
})

module.exports = router;