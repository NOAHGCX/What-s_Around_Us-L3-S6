var express = require('express');
var router = express.Router();
const cityComments = require("../controllers/cityComments.controller.js");
const cityComment = require("../cityComments.js");


// Create a new cityComments
router.post('/create', (req, res) => {
 cityComments.create(req, res)
})

// Retrieve all cityComments
router.get("/", cityComments.findAll);

// Retrieve  cityComments with cityId
router.get("/:id", cityComments.findByCityId);

// Retrieve cityComments with cityId and userId
router.get("/:cityId/:userId", cityComments.findByCityIdAndUserId );

// Update a cityComments with id
router.put('/update/:id', (req, res) => {
    cityComments.update(req, res)
})

// Delete a cityComments with id
router.delete('/delete/:id', (req, res) => {
    cityComments.delete(req, res)
    })

// Create a new cityComment
router.post('/createComment', (req, res) => {
    cityComment.newComments(req, res)
    })

module.exports = router;