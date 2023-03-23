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
        },
        created_at: {
            type: Sequelize.DATE
        },
        updated_at: {  
            type: Sequelize.DATE
        },
    }, { timestamps: true });

    return cityComment;
};