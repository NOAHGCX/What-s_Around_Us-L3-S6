var express = require('express');
var router = express.Router();
const sessions = require("../controllers/session.controller");

// Create a new Session
router.post('/create/:id', (req, res) => {
    sessions.create(req, res)
})

module.exports = router;
