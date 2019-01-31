"use strict";
var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

var path = require("path");

var fs = require("fs"); //only need this when permanently storing users

var session = require("express-session");
app.use(session({secret: "foodini"}));

/*var people = [{"username":"doctorwhocomposer", "forename":"Delia", "surname":"Derbyshire", "password":"iamsteven", "access_token":"concertina"}];
var peopleJ = JSON.stringify(people);*/


var people = JSON.parse(fs.readFileSync('allUsers.txt', 'utf8'))
var peopleJ = JSON.stringify(people)

var userItems = JSON.parse(fs.readFileSync('userItems.txt', 'utf8'))
var userItemsJ = JSON.stringify(userItems)

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

  people.push({username: ans.username, forename: ans.forename, surname: ans.surname, password: ans.password, access_token: ans.access_token})

  peopleJ = JSON.stringify(people)
  fs.writeFile("allUsers.txt", peopleJ, function(err){
    if (err) {
      console.log(err)
    }
  })

  var items = []
  userItems.push({username: ans.username, items: items})
  var userItemsJ = JSON.stringify(userItems)

  fs.writeFile("userItems.txt", userItemsJ, function(err){
    if (err) {
      console.log(err)
    }
  })

  res.send("The request was successful")
})

//own functions start here

app.get("/", function(req, res){
  if (req.session.username) {
    res.redirect("/home")
  }
  else {
    res.redirect("/signup")
  }
})

app.get("/signup", function(req,res){
  if (req.session.username) {
    res.redirect("/home")
  }
  else{
    res.sendFile(path.join(__dirname + "/public/login.html"))
  }
})

app.get("/home", function(req,res){
  if (req.session.username) {
    res.sendFile(path.join(__dirname + "/public/home.html"))
  }
  else {
    res.redirect("/signup")
  }
})

app.get("/login/people", function(req,res){
  var info = []
  for(var i in people){
    info.push({username: people[i].username, password: people[i].password})
  }
  res.send(info)
})

app.post("/login", function(req,res){
  req.session.username = req.body.username
  req.session.password = req.body.password
  res.end("success")
})

app.get("/logout", function(req,res){
  req.session.destroy(function(err){
    if (err) {
      console.log(err)
    }
    else {
      res.redirect("/signup")
    }
  })
})

app.get("/currentUser", function(req,res){
  var user = req.session.username
  var index = 0
  for(var i in people){
    if(user == people[i].username){
      index = i
    }
  }
  var info = {username: people[i].username, password: people[i].password, fname: people[i].forename, sname: people[i].surname}
  res.send(info)
})

app.post("/updateUser", function(req,res){
  if(req.body.username != req.session.username){
    for(var i in people){
      if(req.body.username == people[i].username){
        res.end("no")
        return
      }
    }
  }
  var oldUsername = req.session.username
  req.session.username = req.body.username
  for(var i in people){
    if(oldUsername == people[i].username){
      var index = i
    }
  }
  people[i].username = req.body.username
  people[i].forename = req.body.fname
  people[i].surname = req.body.sname
  people[i].password = req.body.password
  userItems[i].username = req.body.username

  peopleJ = JSON.stringify(people)
  fs.writeFile("allUsers.txt", peopleJ, function(err){
    if (err) {
      console.log(err)
    }
  })

  userItemsJ = JSON.stringify(userItems)
  fs.writeFile("userItems.txt", userItemsJ, function(err){
    if (err) {
      console.log(err)
    }
  })

  res.end("success")

})

app.post("/addItem", function(req,res){
  for(var i in userItems){
    if(req.session.username == userItems[i].username){
      var index = i
    }
  }

  var itemName = req.body.name.toLowerCase()
  var tempItems = userItems[index].items
  for(var i in tempItems) {
    if(itemName == tempItems[i].name.toLowerCase()){
      res.end("no")
      return
    }
  }

  userItems[index].items.push(req.body)
  userItemsJ = JSON.stringify(userItems)
  fs.writeFile("userItems.txt", userItemsJ, function(err){
    if (err) {
      console.log(err)
    }
  })
  res.end("success")
})

app.post("/updateItem", function(req,res){
  for(var i in userItems){
    if(req.session.username == userItems[i].username){
      var index = i
    }
  }

  var itemName = req.body.name.toLowerCase()
  var tempItems = userItems[index].items
  for(var i in tempItems) {
    if(itemName == tempItems[i].name.toLowerCase()){
      res.end("no")
      return
    }
  }

  var itemIndex = req.body.itemNumber - 1

  userItems[index].items[itemIndex].name = req.body.name
  userItems[index].items[itemIndex].quantity = req.body.quantity
  userItems[index].items[itemIndex].storage = req.body.storage
  userItems[index].items[itemIndex].buy = req.body.buy
  userItems[index].items[itemIndex].expiry = req.body.expiry
  userItems[index].items[itemIndex].note = req.body.note

  userItemsJ = JSON.stringify(userItems)
  fs.writeFile("userItems.txt", userItemsJ, function(err){
    if (err) {
      console.log(err)
    }
  })
  res.end("success")

})

app.post("/deleteItem", function(req,res){
  for(var i in userItems){
    if(req.session.username == userItems[i].username){
      var index = i
    }
  }

  var itemIndex = req.body.itemNumber - 1
  var deletion = userItems[index].items.splice(itemIndex,1)

  userItemsJ = JSON.stringify(userItems)
  fs.writeFile("userItems.txt", userItemsJ, function(err){
    if (err) {
      console.log(err)
    }
  })

  res.send("success")


})


app.get("/userItems", function(req,res){
  for(var i in userItems){
    if(req.session.username == userItems[i].username){
      var index = i
    }
  }
  var items = userItems[index].items
  res.send(items)
})

app.post("/chosenItem", function(req,res){
  for(var i in userItems){
    if(req.session.username == userItems[i].username){
      var index = i
    }
  }
  var wantedItem = userItems[index].items[req.body.itemNumber - 1]
  res.send(wantedItem)
})

app.get("/test", function(req,res){
  var test = JSON.parse(fs.readFileSync('userItems.txt', 'utf8'))

  res.send(test)
})


module.exports = app;
