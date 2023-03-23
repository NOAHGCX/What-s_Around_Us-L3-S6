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
            type: Sequelize.FLOAT
        },
        latitude: {
            type: Sequelize.FLOAT
        },
    }, { timestamps: false});

    return Cities;
};