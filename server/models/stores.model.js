module.exports = (sequelize, Sequelize) => {
    const Stores = sequelize.define("stores", {
        name: {
            type: Sequelize.STRING
        },
        idCity: {
            type: Sequelize.INTEGER
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
        address: {
            type: Sequelize.STRING
        },
    }, { timestamps: true });

    return Stores;
};