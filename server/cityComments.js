const cityComments = require("./controllers/cityComments.controller.js");
const sessions = require("./controllers/session.controller");
const auth = require("./auth.js");

// Create a new cityComments
exports.newComments = async (req, res) => {
    var token = req.get("Authorization")
    console.log(token)
    if(token){
        let session = await sessions.findByToken(token)
        if (session) {
            let idUser = session.userId
            let isTokenExpired = (new Date(session.validUntil) - new Date()) <= 0
            if (session && !isTokenExpired) {
                cityComments.create(req, res, idUser)
                return true
            }
            else{
                res.status(401).send(JSON.stringify({ error: "Token expired" }))
                return false
            }
        }
        console.log("no session!")
        return false
    }
};



