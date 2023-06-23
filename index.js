
const express = require('express');
const process = require('process');
const newConnectionRoutes = require('./routes/mylevels_routes.js')
const { Sequelize, Op, Model, DataTypes, ValidationError, ValidationErrorItem, json } = require("sequelize");


const dotenv = require('dotenv');
const cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


dotenv.config()


// import authroute from './routes/auth.js'
// import Sequelize from 'sequelize'


const app = express()
app.use(express.json())

app.use(cors(corsOptions))

app.use('/api/myLevelsAPI', newConnectionRoutes)

//ERROR HANDLING TEST
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})



process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('Custom_unhandledRejection', error.message);
});



app.listen(process.env.Node_PORT, () => {
  console.log('running on port', +process.env.Node_PORT)
})

