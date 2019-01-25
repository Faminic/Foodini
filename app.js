"use strict";
var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

var path = require("path");

//var fs = require("fs"); //only need this when permanently storing users


var people = [{"username":"doctorwhocomposer", "forename":"Delia", "surname":"Derbyshire", "password":"iamsteven", "access_token":"concertina"}];

/*var peopleJ = JSON.stringify(people);
var people = JSON.parse(fs.readFileSync('allUsers.txt', 'utf8'))
var peopleJ = JSON.stringify(people)*/ //only need this when permanently storing users

app.get("/", function(req, res){
  res.status(200).json(people)
})

app.get("/people", function(req,res){
  res.status(200).json(people)
})

app.get("/people/:username", function(req,res){
  for(var i in people){
    if(req.params.username == people[i].username){
      res.status(200).json(people[i])
      break
    }
  }
})

app.post("/people", function(req,res){
  var ans = req.body //change to .header if needed
  if(ans.access_token!= "concertina"){
    res.status(403).send("You do not have permission for this request.")
    return
  }
  //the above checks if the client is an admin or not

  for(var i in people){
    if(ans.username == people[i].username){
      res.status(400).send("This username has already been taken.")
      return
    }
  }
  //the above checks if the username already exists

  people.push({username: ans.username, forename: ans.forename, surname: ans.surname, password: ans.password, access_token: undefined})

  /*peopleJ = JSON.stringify(people)
  fs.writeFile("allUsers.txt", peopleJ, function(err){
    if (err) {
      console.log(err)
    }
  }) */ //only need this when permanently storing users

  res.send("The request was successful")
})

app.get("/login/people", function(req,res){
  var info = []
  for(var i in people){
    info.push({username: people[i].username, password: people[i].password})
  }
  res.send(info)
})



module.exports = app;
