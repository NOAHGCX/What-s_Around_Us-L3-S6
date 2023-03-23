var express = require('express');
var router = express.Router();
const storeComments = require("../controllers/storeComments.controller.js");

// Create a new storeComments
router.post('/create', (req, res) => {
 storeComments.create(req, res)
})

// Retrieve all storeComments
router.get("/", storeComments.findAll);

// Retrieve  storeComments with cityId
router.get("/:id", storeComments.findByStoreId);

// Retrieve storeComments with cityId and userId
router.get("/:storeId/:userId", storeComments.findByStoreIdAndUserId );

// Update a storeComments with id
router.put('/update/:id', (req, res) => {
    storeComments.update(req, res)
})

// Delete a storeComments with id
router.delete('/delete/:id', (req, res) => {
    storeComments.delete(req, res)
    })


module.exports = router;