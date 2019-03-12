'use strict'

const host = "127.0.0.1";
const port = 3000;
const express = require('express');
const app = express();

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

//  main roite
 app.get('/', (req, res) => {
     res.send("Welcome to Kejacom APIs by Sharkdevs");
 });

 app.listen(app.get('port'), () => {
     console.log(`App listening to http://${host}:${app.get('port')}`);
 });