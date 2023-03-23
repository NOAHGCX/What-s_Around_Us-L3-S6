var express = require('express');
var router = express.Router();
const users = require("../controllers/user.controller.js");

/* GET users listing. */
// Retrieve all Users
router.get("/", users.findAll);

// Create a new User
router.post('/create', (req, res) => {
 users.create(req, res)
})

// Retrieve a single User with id
router.get("/:id", users.findByPk);


// Update a User with id
router.put('/update', (req, res) => {
  users.update(req, res)
 })

module.exports = router;
