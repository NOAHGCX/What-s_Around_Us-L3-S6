const users = require("./controllers/user.controller.js");
const cityComments = require("./controllers/cityComments.controller.js");
const storeComments = require("./controllers/storeComments.controller.js");
const sessions = require("./controllers/session.controller.js");
const auth = require("./auth.js");

// Get all data from a user
exports.getProfil = async (req, res) => {
    let cityCommentsData = [];
    let storeCommentsData = [];
    let userData = {};
    var token = req.get("Authorization")
    if(token){
        let session = await sessions.findByToken(token)
        if (session) {
            let idUser = session.userId
            let isTokenExpired = (new Date(session.validUntil) - new Date()) <= 0
            if (session && !isTokenExpired) {
                try {
                cityCommentsData = await cityComments.findByUserId(idUser)
                storeCommentsData = await storeComments.findByUserId(idUser)
                userData = await users.findById(idUser)
                if( cityCommentsData && userData && storeCommentsData){
                    res.status(200).send(JSON.stringify({user: userData, cityComments: cityCommentsData, storeComments: storeCommentsData}))
                    return true
                }
                else{
                    res.status(401).send(JSON.stringify({ error: "Error" }))
                    return false
                }
            }
         catch (error) {
            res.status(500).send(JSON.stringify({ error: "Error getting profil" }))
        }
            }
            else{
                res.status(401).send(JSON.stringify({ error: "Token expired" }))
                return false
            }
    }
    else{
        res.status(401).send(JSON.stringify({ error: "No session" }))
        return false
    }
}}

