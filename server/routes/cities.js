var express = require('express');
var router = express.Router();
const cities = require("../controllers/cities.controller.js");
const cityCreation = require("../cities.js");

// Create a new cities
router.post('/create', (req, res) => {
 cities.create(req, res)
})

// Create a new cities
router.post('/createCity', (req, res) => {
    cityCreation.create(req, res)
})

// Retrieve all cities
router.get("/", cities.findAll);

// Retrieve a single cities with id
router.get("/:id", cities.findByPk);

// Retrieve a single cities with longitude and latitude
router.get("/longitude/:longitude/latitude/:latitude", cities.findByLongitudeLatitude);

// Update a cities with id
router.put('/update/:id', (req, res) => {
    cities.update(req, res)
})

// Delete a cities with id
router.delete('/delete/:id', (req, res) => {
    cities.delete(req, res)
  })

module.exports = router;