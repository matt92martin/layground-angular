const Sequelize = require('sequelize');

const User = {
    id:{
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    user: {
        unique: {
            args: true,
            msg: "Looks like you already have an account with this email address.",
            fields: [Sequelize.fn('lower', Sequelize.col('user'))]
        },
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, 128],
                msg: "Email address must be between 6 and 128 characters in length"
            },
            isEmail: {
                msg: "Email address must be valid"
            }
        },
    },
    pw: {
        type: Sequelize.STRING,
        allowNull: false
    }
};

module.exports = User;