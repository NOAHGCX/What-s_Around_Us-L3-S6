var express = require('express');
var router = express.Router();
const profil= require("../profil.js");


//get all info for a user
router.get("/", profil.getProfil);

module.exports = router;