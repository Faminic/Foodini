"use strict";
var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

var fs = require("fs");


/*var people = [{"username":"doctorwhocomposer", "forename":"Delia", "surname":"Derbyshire"}];
//people contains list of users
var peopleJ = JSON.stringify(people);

fs.writeFile("allUsers.txt", peopleJ, function(err){
  if (err) {
    console.log(err)
  }
}) */
//Make sure to reset your allUsers file to only contain this: [{"username":"doctorwhocomposer", "forename":"Delia", "surname":"Derbyshire"}]

var people = JSON.parse(fs.readFileSync('allUsers.txt', 'utf8'))
var peopleJ = JSON.stringify(people)

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
  var ans = req.body
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

  people.push({username: ans.username, forename: ans.forename, surname: ans.surname})
  peopleJ = JSON.stringify(people)
  fs.writeFile("allUsers.txt", peopleJ, function(err){
    if (err) {
      console.log(err)
    }
  })
  //the above adds the user to the text file "allUsers"
  res.send("The request was successful")
})




module.exports = app;
