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
        created_at: {
            type: Sequelize.DATE
        },
    }, { timestamps: true });

    return Store;
};