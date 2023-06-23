const { Sequelize, Op, Model, DataTypes, ValidationError, ValidationErrorItem } = require("sequelize");
const dotenv = require('dotenv');

dotenv.config()
var connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})


// Customer_ID_table model
const Customer_ID_table = connection.define('Customer_ID_table', {
    UserID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    F_name: Sequelize.STRING,
    S_name: Sequelize.STRING,
    Mobile_contact: Sequelize.STRING,
});



module.exports = Customer_ID_table


//call
// "F_name":"firstName",
//     "S_name":"secondName",
//     "Mobile_contact":"0705315854"