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
        created_at: {
            type: Sequelize.DATE
        },
        updated_at: {  
            type: Sequelize.DATE
        },
    }, { timestamps: true });

    return storeComment;
};