var express = require('express');
var router = express.Router();
const users = require("../controllers/user.controller.js");
const profil= require("../profil.js");

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
router.put('/update/:id', (req, res) => {
  users.update(req, res)
 })

 // Delete a User with id
  router.delete('/delete/:id', (req, res) => {
    users.delete(req, res)
  })

  //get all info for a user
  router.get("/profil", profil.getProfil);
module.exports = router;
