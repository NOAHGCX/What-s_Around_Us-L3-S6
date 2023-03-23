module.exports = (sequelize, Sequelize) => {
    const cityComments = sequelize.define("cityComments", {
       idUser: {
            type: Sequelize.STRING
        },
        idCity: {
            type: Sequelize.INTEGER
        },
        comment: {
            type: Sequelize.STRING
        },
        grade: {
            type: Sequelize.FLOAT
        }
    }, { timestamps: true });

    return cityComments;
};