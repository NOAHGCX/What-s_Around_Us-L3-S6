/* BEGIN db initialization */
const { Op } = require("sequelize");
const Sequelize = require("../db.connection");
const cityComments = require("../models/cityComments.model")(Sequelize.connection, Sequelize.library);
/* END db initialization */

// Create
exports.create = (req, res, idUser) => {
    // Validate request
    if (!req.body.idCity || !idUser || !req.body.comment ) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // An object representing your data in the db
    const obj = {
        idCity: req.body.idCity,
        idUser: idUser,
        comment: req.body.comment,
        grade: req.body.grade
    };

    result = {}
    // Save in the database
    cityComments.create(obj)
        .then(data => {
            result = data
        })
        .catch(err => {
           result = err.message || "Some error occurred while creating the record."
        });
        return result
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

// Get a record with a certain cityId
exports.findByCityId = (req, res) => {
    const id = req.params.id;
    cityComments.findAll({
        where: {
            idCity: id
        }
    })
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

// Get records with a certain userID
exports.findByUserId = async (userId) => {
    return new Promise((resolve, reject) => {
        const id = userId
        cityComments.findAll({
            where: {
                idUser: id
            }
        })
            .then(data => {
                if (data.length == 0) {
                    resolve(["No data"])
                }
                else{
                    resolve(data)
                }
            })
            .catch(err => {
                reject(err.message)
            });
    }
    )
}

// Get a record with a certain cityID and userID
exports.findByCityIdAndUserId = (req, res) => {
    const idCity = req.params.cityId;
    const idUser = req.params.userId;
    cityComments.findAll({
        where: {
            idCity: idCity,
            idUser: idUser
        }
    })
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

// Update a record with a certain id
exports.update = (req, res) => {
    const id = req.params.id;

    cityComments.update(req.body, {
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
}

// Delete a record with a certain id
exports.delete = (req, res) => {
    const id = req.params.id;

    cityComments.destroy({
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

