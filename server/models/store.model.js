module.exports = (sequelize, Sequelize) => {
    const Store = sequelize.define("store", {
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
    }, { timestamps: true });

    return Store;
};