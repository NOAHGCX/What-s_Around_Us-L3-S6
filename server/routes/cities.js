var express = require('express');
var router = express.Router();
const cities = require("../controllers/cities.controller.js");

// Create a new cities
router.post('/create', (req, res) => {
 cities.create(req, res)
})

// Retrieve all cities
router.get("/", cities.findAll);

// Retrieve a single cities with id
router.get("/:id", cities.findByPk);

// Update a cities with id
router.put('/update/:id', (req, res) => {
    cities.update(req, res)
})

module.exports = router;