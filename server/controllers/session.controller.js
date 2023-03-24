/* BEGIN db initialization */
const { Op } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const Sequelize = require("../db.connection");
const Session = require("../models/session.model")(Sequelize.connection, Sequelize.library);

/* END db initialization */

// Create session for user
exports.create = async (req, res) => {
    const id = req.params.id;

    let validity = moment().add(60,"minutes").format("YYYY-MM-DD HH:mm:ss")
    const obj = {
        token: uuidv4(),
        validUntil: validity,
        userId: id
    };
    console.log(validity)

    // Save in the database
    var result = {};
    await Session.create(obj)
        .then(data => {
            result = data
            res.send(data);
        })
        .catch(e => {
            console.log("error", e)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the record."
            });
        });
    return result;
};

// Create session for user with id in params
exports.createId = async (id) => {

    let validity = moment().add(60,"minutes").format("YYYY-MM-DD HH:mm:ss")
    const obj = {
        token: uuidv4(),
        validUntil: validity,
        userId: id
    };

    // Save in the database
    var result = {};
    await Session.create(obj)
        .then(data => {
            result = data
        })
        .catch(err => {
            result =  err.message || "Some error occurred while creating the record."
        });
    return result;
};

// Get session by user id
exports.findByUserId = async (req, res) => {
    const id = req.params.id;
    var condition = id ? { userId: { [Op.eq]: id } } : null;
    var result = {};
    await Session.findOne({ where: condition })
    .then(data => {
        result = data
    })
    .catch(e => {
        console.log("Error", e)
        result = data
    })
    return result
};

// Get session by user id with id in params
exports.findByUserIdParam = async (id) => {
    var condition = id ? { userId: { [Op.eq]: id } } : null;
    var result = {};
    await Session.findOne({ where: condition })
    .then(data => {
        result = data
    })
    .catch(e => {
        console.log("Error", e)
    })
    return result
};

// Get session by token 
exports.findByToken = async (token) => {
    var condition = token ? { token: { [Op.eq]: token } } : null;
    var result = {};
    await Session.findOne({ where: condition })
    .then(data => {
        result = data
    })
    .catch(e => {
        console.log("Error", e)
        result = e
    })
    return result
};

// Delete a record with a certain id
exports.delete = async (req, res)  => {
    const id = req.params.id;
    Session.destroy({
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
};