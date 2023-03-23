/* BEGIN db initialization */
const { Op } = require("sequelize");
const Sequelize = require("../db.connection");
const cities = require("../models/cities.model")(Sequelize.connection, Sequelize.library);
/* END db initialization */

// Create 
exports.create = (req, res) => {
    
        // Validate request
        if (!req.body.name || !req.body.country || !req.body.grade || !req.body.longitude || !req.body.latitude) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
    
        // An object representing your data in the db
        const obj = {
            name: req.body.name,
            country: req.body.country,
            grade: req.body.grade,
            longitude: req.body.longitude,
            latitude: req.body.latitude
        };
    
        // Save in the database
        cities.create(obj)
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
        cities.findAll()
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

    // Get a record with a certain id
    exports.findByPk = (req, res) => {
        const id = req.params.id;
        cities.findByPk(id)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving record with id=" + id
                });
            });
    }

    // Update a record with a certain id
    exports.update = (req, res) => {
        console.log(req.body)
        const id = req.params.id;
        
        cities.update(req.body, {
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