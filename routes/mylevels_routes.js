const express = require('express')
// const bycrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
const { Sequelize, Op, Model, DataTypes, ValidationError, ValidationErrorItem, json } = require("sequelize");
const dotenv = require('dotenv');
dotenv.config()


// Import Sequelize and define the database connection
// const Sequelize = require('sequelize');

var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})




const Customer_ID_tableModel = require('../models/customerTable_model')
const esp_aggregateTableModel = require('../models/esp_Aggregate_model')
const esp_deviceRegistryModel = require('../models/esp_deviceRegistry_model')

// / Define the associations between the models
Customer_ID_tableModel.hasMany(esp_deviceRegistryModel, { foreignKey: 'UserID' })
esp_deviceRegistryModel.belongsTo(Customer_ID_tableModel, { foreignKey: 'UserID' });

esp_deviceRegistryModel.hasMany(esp_aggregateTableModel, { foreignKey: 'EspKey' })
esp_aggregateTableModel.belongsTo(esp_deviceRegistryModel, { foreignKey: 'EspKey' });


var router = express.Router()
// var connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//     port: process.env.DATABASE_PORT,
// })


// Synchronize the models with the database
Customer_ID_tableModel.sync({ force: false }) // This will recreate the tables every time; use { force: false } in production
    .then(() => {
        esp_deviceRegistryModel.sync({ force: false })
            .then(() => {
                esp_aggregateTableModel.sync({ force: false })

            })




        console.log('Tables created successfully.');
    })
    .catch((error) => {
        console.error('Error creating tables:', error);
    });


//API FOR ESP  SENDING DATA
router.post('/aggregateESP_Readings',
    // ValidateToken, 
    (req, res) => {
        // console.log(req.body);//development
        let epochtime = req.body.esp_time //unix time

        //converting to ISO 8601 time stamp
       let time = new Date(epochtime).toISOString()
        esp_aggregateTableModel.create({
            readings: req.body.reading,
            EspTime: time,
            EspKey: req.body.espid
        }).then((jibu) => {

            res.json({ response: jibu })

        })
            .catch((error) => {
                res.status(500).json({ response: "an error occured" })
                console.log(error);

            })
    })

// 

router.post('/register_mac', //register esp device
    // ValidateToken, 
    (req, res) => {
        console.log(req.body);

        esp_deviceRegistryModel.create({
            EspKey: req.body.espid, //esp MAC address
            UserID: req.body.userID,

        }).then((jibu) => {
            res.json({ response: jibu })
        })
            .catch((error) => {
                res.status(500).json({ response: "an error occured" })
                console.log(error);

            })
    })

router.post('/register_user',
    // ValidateToken, 
    (req, res) => {
        console.log(req.body);

        Customer_ID_tableModel.create({
            F_name: req.body.F_name, //user first name
            S_name: req.body.S_name,
            Mobile_contact: req.body.Mobile_contact
        })
            .then((jibu) => {
                res.json({ response: jibu })
            })
            .catch((error) => {
                res.status(500).json({ response: "an error occured" })
                console.log(error);

            })

    })

////export default router
module.exports = router