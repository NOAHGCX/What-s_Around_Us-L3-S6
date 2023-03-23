/* BEGIN db initialization */
const { Op } = require("sequelize");
const Sequelize = require("../db.connection");
const User = require("../models/user.model")(Sequelize.connection, Sequelize.library);
/* END db initialization */

// Create
exports.create = (req, res) => {
    var result = {};
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
            result = data
        })
        .catch(err => {
            console.log(res)
            result =  err.message || "Some error occurred while creating the record."
        });
    return result
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
        result = data
    })
    .catch(e => {
        console.log("Error", e)
        result = data 
    })
    return result
}


//update a record with a certain id (sent from the front-end)
exports.update = (req, res) => {
    console.log(req.body)
    const id = req.params.id;
    
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

// Delete a record with a certain id (sent from the front-end)
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
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