const { Sequelize, Op, Model, DataTypes, ValidationError, ValidationErrorItem } = require("sequelize");
const dotenv = require('dotenv');

dotenv.config()
var connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})




// ESP_Aggregate_tbl model
const ESP_Aggregate_tbl = connection.define('ESP_Aggregate_tbl', {
    readings: Sequelize.FLOAT,
    EspTime: Sequelize.DATE,
    EspKey: {
        type: Sequelize.STRING,
        // primaryKey: true,
    },
});



module.exports = ESP_Aggregate_tbl