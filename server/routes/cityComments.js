var express = require('express');
var router = express.Router();
const cityComments = require("../controllers/cityComments.controller.js");

// Create a new cityComments
router.post('/create', (req, res) => {
 cityComments.create(req, res)
})

// Retrieve all cityComments
router.get("/", cityComments.findAll);

module.exports = router;