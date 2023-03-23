var express = require('express');
var router = express.Router();
const city = require("../controllers/city.controller.js");

// Create a new city
router.post('/create', (req, res) => {
 city.create(req, res)
})

module.exports = router;