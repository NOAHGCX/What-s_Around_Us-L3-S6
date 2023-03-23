module.exports = (sequelize, Sequelize) => {
    const storeComment = sequelize.define("storeComment", {
       idUSer: {
            type: Sequelize.STRING
        },
        idCity: {
            type: Sequelize.INTEGER
        },
        idUser: {
            type: Sequelize.INTEGER
        },
        idStore: {
            type: Sequelize.INTEGER
        },
        comment: {
            type: Sequelize.STRING
        },
        grade: {
            type: Sequelize.FLOAT
        },
    }, { timestamps: true });

    return storeComment;
};