/* BEGIN db initialization */
const { Op } = require("sequelize");
const Sequelize = require("../db.connection");
const cityComments = require("../models/cityComments.model")(Sequelize.connection, Sequelize.library);
/* END db initialization */

// Create
exports.create = (req, res) => {
    // Validate request
    if (!req.body.idCity || !req.body.idUser || !req.body.comment) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // An object representing your data in the db
    const obj = {
        idCity: req.body.idCity,
        idUser: req.body.idUser,
        comment: req.body.comment,
        grade: req.body.grade
    };

    // Save in the database
    cityComments.create(obj)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the record."
            });
        });

}

// Get all records
exports.findAll = (req, res) => {
    cityComments.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving records."
            });
        });
}
