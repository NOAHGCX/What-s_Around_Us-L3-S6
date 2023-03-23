/* BEGIN db initialization */
const { Op } = require("sequelize");
const Sequelize = require("../db.connection");
const User = require("../models/user.model")(Sequelize.connection, Sequelize.library);
/* END db initialization */

// Create
exports.create = (req, res) => {

    // Validate request
    if (!req.body.username || !req.body.password || !req.body.mail || !req.body.first_name || !req.body.last_name || !req.body.adress) {
        console.log(req.body)
        res.status(400).send({
            message: "User must have username, password, mail, first_name, last_name and an adress !" 
        });
        return;
    }

    // An object representing your data in the db
    const obj = {
        username: req.body.username,
        password: req.body.password,
        mail: req.body.mail,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        adress: req.body.adress
    };

    // Save in the database
    User.create(obj)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(res)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the record."
            });
        });

};

// Get all records with a certain name (sent from the front-end)
exports.findAll = (req, res) => {
    User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving records."
            });
        });
};

// Get a record with a certain id (sent from the front-end)
exports.findByPk = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving record with id=" + id
            });
        });
}

//Get a record with a certain mail (sent from the front-end)
exports.findByMail = async (req, res) => {
    const mail = req.body.mail;
    var condition = mail ? { mail: { [Op.eq]: mail } } : null;
    var result = {};
    await User.findOne({ where: condition })
    .then(data => {
        res.send(data);
        result = data
    })
    .catch(e => {
        console.log("Error", e)
        res.status(500).send({
            message: "Error retrieving record with id=" + id
        });
    })
    return result
}

//update a record with a certain id (sent from the front-end)
exports.update = (req, res) => {
    console.log(req.body)
    const id = req.body.id;
    
    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Record was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update record with id=${id}. Maybe record was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating record with id=" + id
            });
        });
};


exports.login = async (req, res) => {
    let user = await users.findByEmail(req, res)
    // if the user exists and password matches
    console.log(user.id,user.password,req.password)
    if (user && user.id && user.password == req.body.password) {

        // search for a session for this user
        let session = await sessions.findByUserId(user.id)

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
            session = await sessions.create(user.id)
            if (session) {
                token = session.token
            }
        }
        res.send(JSON.stringify({ token: token }))
    } else {
        res.status(403).send("Access denied")
    }
}