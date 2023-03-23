/* BEGIN db initialization */
const { Op } = require("sequelize");
const Sequelize = require("../db.connection");
const city = require("../models/city.model")(Sequelize.connection, Sequelize.library);
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
        city.create(obj)
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