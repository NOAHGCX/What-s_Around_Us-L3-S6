module.exports = (sequelize, Sequelize) => {
    const Cities = sequelize.define("cities", {
        name: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        grade: {
            type: Sequelize.FLOAT
        },
        longitude: {
            type: Sequelize.DOUBLE
        },
        latitude: {
            type: Sequelize.DOUBLE
        },
    }, { timestamps: false});

    return Cities;
};