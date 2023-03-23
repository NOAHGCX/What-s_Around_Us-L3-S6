var express = require('express');
var router = express.Router();
const sessions = require("../controllers/session.controller");

// Create a new Session
router.post('/create/:id', (req, res) => {
    sessions.create(req, res)
})

// Retrieve a single Session with id
router.get('/:id', (req, res) => {
    sessions.findByUserId(req, res)
})

// Retrieve a single Session with token
router.get('/token/:id', (req, res) => {
    sessions.findByToken(req, res)
})

module.exports = router;
