var express = require('express');
var router = express.Router();
const stores= require("../controllers/stores.controller.js");

// Create a new stores
router.post('/create', (req, res) => {
 stores.create(req, res)
})

// Retrieve all stores
router.get("/", stores.findAll);

// Retrieve a single stores with id
router.get("/:id", stores.findByPk);

// Update a stores with id
router.put('/update/:id', (req, res) => {
    stores.update(req, res)
})

// Delete a stores with id
router.delete('/delete/:id', (req, res) => {
    stores.delete(req, res)
  })

// Retrieve stores with address and name
router.post("/search", stores.search);

module.exports = router;