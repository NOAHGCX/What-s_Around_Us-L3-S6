var express = require('express');
var router = express.Router();
const users = require("../controllers/user.controller.js");

/* GET users listing. */
// Retrieve all Users
router.get("/", users.findAll);

router.post('/create', (req, res) => {
 users.create(req, res)
})


module.exports = router;
