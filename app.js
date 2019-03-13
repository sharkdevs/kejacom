'use strict'
// imports
let apiRoutes = require('./routes');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
const express = require('express');


// initialisation
const host = "127.0.0.1";
const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// connect to the database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/kejacomdb');
var db = mongoose.connection;


// set the application to listen to port 3000 or the default heroku port
app.set('port', (process.env.PORT || port));

//  Create a route that gets a sample property
 app.get('/rentals', (req, res) => {
     res.json({
         "property": "Lisa Apartment",
         "Price": "24500",
         "location":"Kathemboni"
     });
 });

//  main route
app.use('/', apiRoutes);

 app.listen(app.get('port'), () => {
     console.log(`App listening to http://${host}:${app.get('port')}`);
 });