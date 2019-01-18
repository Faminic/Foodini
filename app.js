"use strict";
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var people = {"username":"doctorwhocomposer", "forename":"Delia", "surname":"Derbyshire"};
//var peopleJ = JSON.stringify(people);

app.get("/", function(req, res){
  res.send(people["username"])
})

module.exports = app;
