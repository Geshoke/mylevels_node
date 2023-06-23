const { Sequelize, Op, Model, DataTypes, ValidationError, ValidationErrorItem } = require("sequelize");
const dotenv = require('dotenv');

dotenv.config()
var connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})


// ESP_Device_Registry model
const ESP_Device_Registry = connection.define('ESP_Device_Registry', {
    EspKey: {
      type: Sequelize.STRING,
      primaryKey: true,
    //   autoIncrement: true,
    },
    UserID: {
      type: Sequelize.INTEGER,
      references: {
        // model: 'Customer_ID_table',
        key: 'UserID',
      },
    },
  });



module.exports = ESP_Device_Registry

