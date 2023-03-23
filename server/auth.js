const users = require("./controllers/user.controller.js");
const sessions = require("./controllers/session.controller");

exports.login = async (req, res) => {
    let user = await users.findByMail(req, res)
    // if the user exists and password matches
    console.log(user.id,user.password,req.body.password)
    if (user && user.id && user.password == req.body.password) {

        // search for a session for this user
        let session = await sessions.findByUserIdParam(user.id)

        // if there is a session, check if it's expired
        let isTokenExpired = session ? (new Date(session.validUntil) - new Date() <= 0) : true
        var token = ""

        // if the session exists and is not expired, continue
        // else, create a session
        if (session && !isTokenExpired) {
            console.log("use existing")
            token = session.token 
        } else {
            console.log("create new")
            session = await sessions.createId(user.id)
            if (session) {
                token = session.token
            }
        }
        res.status(200).send(JSON.stringify({ token: token }))
    } else {
        res.status(401).send(JSON.stringify({ error: "Invalid credentials" }))
    }
}

exports.isLoggedIn = async (req, res) => {
    var token = req.get("Authorization")
    console.log(token)
    if (token) {
        let session = await sessions.findByToken(token)
        if (session) {
            let isTokenExpired = (new Date(session.validUntil) - new Date()) <= 0
            console.log(session.validUntil, isTokenExpired)
            if (session && !isTokenExpired) {
                console.log("all good!")
                return true
            }
            console.log("token expired!")
            return false
        }
        console.log("no session!")
        return false
    }
    console.log("no token!")
    return false
}