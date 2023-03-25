/* BEGIN db initialization */
const { Op } = require("sequelize");
const Sequelize = require("../db.connection");
const storeComments = require("../models/storeComments.model")(Sequelize.connection, Sequelize.library);
/* END db initialization */

// Create
exports.create = (req, res) => {
    // Validate request
    if (!req.body.idStore || !req.body.idUser || !req.body.comment || !req.body.grade || !req.body.idCity) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // An object representing your data in the db
    const obj = {
        idStore: req.body.idStore,
        idUser: req.body.idUser,
        comment: req.body.comment,
        grade: req.body.grade,
        idCity: req.body.idCity
    };

    // Save in the database
    storeComments.create(obj)
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
    storeComments.findAll()
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
exports.findByStoreId = (req, res) => {
    const id = req.params.id;
    storeComments.findAll({
        where: {
            idStore: id
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
        storeComments.findAll({
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
    )}

// Get a record with a certain cityID and userID
exports.findByStoreIdAndUserId = (req, res) => {
    const idStore = req.params.storeId;
    const idUser = req.params.userId;
    storeComments.findAll({
        where: {
            idStore: idStore,
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

    storeComments.update(req.body, {
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

    storeComments.destroy({
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

