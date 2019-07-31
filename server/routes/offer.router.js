
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/user/:id', (req, res) => {
    console.log('Getting offers for user', req.params.id)
    res.sendStatus(200);
})

router.put('/reject/:id', (req, res) => {
    console.log('Retracting offer', req.params.id)
    res.sendStatus(200);
})

module.exports = router;