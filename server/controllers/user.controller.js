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

