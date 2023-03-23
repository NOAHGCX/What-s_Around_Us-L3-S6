module.exports = (sequelize, Sequelize) => {
    const cityComment = sequelize.define("cityComment", {
       idUSer: {
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

    return cityComment;
};