/* BEGIN db initialization */
const { Op } = require("sequelize");
const Sequelize = require("../db.connection");
const stores = require("../models/stores.model")(Sequelize.connection, Sequelize.library);
/* END db initialization */

// Create 
exports.create = (req, res) => {
    
        // Validate request
        if (!req.body.name || !req.body.grade || !req.body.longitude || !req.body.latitude || !req.body.idCity || !req.body.address) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
    
        // An object representing your data in the db
        const obj = {
            name: req.body.name,
            idCity: req.body.idCity,
            grade: req.body.grade,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            address: req.body.address
        };
    
        // Save in the database
        stores.create(obj)
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
        stores.findAll()
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
        stores.findByPk(id)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving record with id=" + id
                });
            });
    }

    // Get a record with a certain address and name
    exports.search = (req, res) => {
        stores.findAll({ where: { [Op.and]: [{ name: req.body.name }, { address: req.body.address }] } })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving record with name=" + req.body.name + " and address=" + req.body.address
                });
            });
    }

    // Update a record with a certain id
    exports.update = (req, res) => {
        const id = req.params.id;
        
        stores.update(req.body, {
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

    // Delete a record with a certain id
    exports.delete = (req, res) => {
        const id = req.params.id;
    
        stores.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Record was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete record with id=${id}. Maybe record was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete record with id=" + id
                });
            });
    }