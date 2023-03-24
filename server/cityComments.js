const cityComments = require("./controllers/cityComments.controller.js");
const sessions = require("./controllers/session.controller");
const auth = require("./auth.js");

// Create a new cityComments
exports.newComments = (req, res) => {
    let isLoggedIn = auth.isLoggedIn(req, res);
    console.log(isLoggedIn)
    if (isLoggedIn) {
        cityComments.create(req, res)
    } else {
        res.send(JSON.stringify({ isLoggedIn: false }))
    }
};



