var express = require('express');
var router = express.Router();
const cities = require("../controllers/cities.controller.js");

// Create a new cities
router.post('/create', (req, res) => {
 cities.create(req, res)
})

// Retrieve all cities
router.get("/", cities.findAll);

module.exports = router;