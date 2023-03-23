module.exports = (sequelize, Sequelize) => {
    const City = sequelize.define("city", {
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
    }, { timestamps: true });

    return City;
};