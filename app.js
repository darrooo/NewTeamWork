'use strict';
//app.js creates the localhost and all subpages to the localhost. It also connects to the database and imports all events and users.
//it loads all users and events to the datahandler to save for future use.
// it contains a collection of sockets to send and recieve information from the other pages.
var express = require('express');
const {MongoClient} = require('mongodb');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
const port = 3000;
var bodyParser = require("body-parser");
var email;
var password;
var currentUsers;
var currentEvents;
var access = false;
var firstrun = true;
var passwordChange;
var avatarChange;
var nameChange;
var userInDB =false;

//the uri used for the connection to the database

//var uri = "mongodb+srv://daniellatestar:JhaliiAfdSjiG13@teamwork.zuv9p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//var uri = 'mongodb+srv://hannetestar:BaDrisk32@teamwork.zuv9p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
var uri = 'mongodb+srv://agnestestar:42Xrj55eAvMsWWX@teamwork.zuv9p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

//connects to the database mongoDB
//Got it from this link: https://developer.mongodb.com/quickstart/node-crud-tutorial/
var client = new MongoClient(uri, { useUnifiedTopology: true});
client.connect();
//------------------------------------------------

// allt som delas mellan komponenter vill man inte ha i en async. Bra för om man vill hämta namn etc.
// main behövs egentligen inte, går att skriva om.
//main function, the first function to load when entering the web application.
async function main() {

  try {
    //----------------
    //funktionen behövs för att kolla om en user har access. Bör egetligen göras när man
    //klickar på knappen, och inte på on page load som den gör nu.
    //För att fixa:
    // Kolla om usern existerar i samband med sendinformation längre ner i app.js. en
    //funktion som returnar true eller false, inte två funktioner som kollar det ena
    // eller det andra.
    //----------------

    if (firstrun) {
      console.log("first run runs");
      //lists all users
      await listAllUsers(client);
      firstrun= false;
    }
    //lists all events
    await listAllEvents(client);
  } catch (e) {
    console.error(e);
  }
}

//Function that laods all users downloaded from the database to the datahandler
async function listAllUsers(client){
  //Fetch from mongodb
  var allUsers = await client.db("teamwork").collection("teamworkcollection").find();
  allUsers.forEach(users => {
    data.addUserInData(users);
  });
};
//Function that laods all events downloaded from the database to the datahandler
async function listAllEvents(client){
  //Fetch from mongodb
  var allEvents = await client.db("teamwork").collection("eventcollection").find();
  allEvents.forEach(events => {
    data.addEventInData(events);
  });
};
// this function checks the authentification in the datahandler. Redirects to userLogin if successfull
function findUser(email, password) {
  var valid =  data.checkIfUserInDB(email, password);
  if (valid == 1) {
    console.log("try another password");
  }
  if (valid == 2) {
    console.log("login successfull!");
    userLogin();
  }
  if (valid == 0) {
    console.log("wrong password and username ");
  }
}

//confirms the access and gets all events and users from datahandler. Sends login to vue_script
function userLogin(){
  access = true
  currentUsers = data.getAllUsers();
  currentEvents = data.getAllEvents();
  io.emit('sendLogin', {
    userAccess: access,
    allCurrentUsers: currentUsers

  });
}
//connects to the datahandler. One accesses the dataHandler by typing data.function
const teamworkData = require("./dataHandler.js");
let data = new teamworkData();


// Gets information about the user from vue_script and stores it locally and sends it to find user for confirmation
io.on('connection', (socket) => {
  socket.on('sendInformation', function (userInformation) {
    var loginArray = data.addUser(userInformation); //sends to datahandler.js
    email = loginArray[0];
    password = loginArray[1];
    findUser(email, password);
  });
//logs out the current user
  socket.on('sendLogout', function (userInformation){
    if(access){
      access= false;
    }
    socket.emit('sendLogin', {
      //userID:dbID,
      userAccess: access
    });
  });
});




//A collection of subdomains
app.use(express.static(path.join(__dirname, 'public/')));

// Serve vue from node_modules as vue/
app.use('/vue', express.static(path.join(__dirname, '/node_modules/vue/dist/')));

app.get('/', function (req, res) {
  main();
  res.sendFile(path.join(__dirname, 'public/views/index.html'));

});
app.get('/myProfile', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/myProfile.html'));
});

app.get('/homepage', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/homepage.html'));
});

app.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/about.html'));
});

app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/public/views/chat.html');
});
app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/public/views/contact.html');
});
app.get('/myProfile', (req, res) => {
  res.sendFile(__dirname + '/public/views/myProfile.html');
});
app.get('/settings', (req, res) => {
  res.sendFile(__dirname + '/public/views/settings.html');
});
app.get('/calendar', (req, res) => {
  res.sendFile(__dirname + '/public/views/calendar.html');
});


//To create a (signup)user and upload it to database
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

//The one that uploads the updated information about a new user
app.post('/signup', function(req, res){
  var username = req.body.username;
  var name = req.body.name;
  var pass = req.body.password;
  var project = req.body.project;
  var admin = req.body.admin;
  var avatar =req.body.avatars;
  if (admin == "on") {
    admin = true;
  }
  else {
    admin = false;
  }
  console.log("admin som genereras är FÖLJANDe "+ admin);

  var data = {
    "username": username,
    "name": name,
    "password": pass,
    "project": project,
    "admin": admin,
    "image": avatar,
  }
  //adding a colleague in the collection "teamworkcollection" on mongodb
  client.db('teamwork').collection('teamworkcollection').insertOne(data, function(err, collection){

    if(err) throw err;
    console.log("Record inserted Successfully");

  });

  return res.redirect('/settings')
});
// changes the admin access on the chosen user.
app.post('/change-access', function(req, res){
  var username = req.body.username;
  var admin = req.body.admin;
  if (admin == "on") {
    admin = true;
  }
  else {
    admin = false;
  }
  userInDB = false;
  //checks if the user is in the database.
  currentUsers.forEach((item) => {
    if (item.username == username) {
      userInDB = true;
    }

  });
  if (userInDB) {
    var data ={
      "username": username,
    }
    var query = {
      "admin": admin,
    }
    //changes access in database
    client.db('teamwork').collection('teamworkcollection').updateOne(data,{$set:query}, function(err, collection){
      if(err) throw err;
      console.log("access changed Successfully");
    });
  }
    //sends information about the change of access to setting.html
    io.on('connection', (socket) => {
        console.log("userInDB:" + userInDB);
        io.emit('changedAccess', { thisUserInDB: userInDB });
    });
  return res.redirect('/settings')
});




//To create an event and upload to mongodb
app.post('/homepage-add', function(req, res){
  //creates each variable and returns an object
  var currentEmail = email;
  var eventname = req.body.eventname;
  var starttime = req.body.starttime;
  var endtime = req.body.endtime;
  var date = req.body.date;
  var month = req.body.month;
  var year = req.body.year;

  var data = {
    "username": currentEmail,
    "eventname": eventname,
    "starttime": starttime,
    "endtime": endtime,
    "date": date,
    "month": month,
    "year": year,
  }
  //Adding an event to the collection "eventcollection" on mongodb
  client.db('teamwork').collection('eventcollection').insertOne(data, function(err, collection){
    if(err) throw err;
    console.log("event record inserted Successfully");
    main();
  });
  return res.redirect('/homepage')
});
//To delete an event and upload to mongodb
app.post('/homepage-delete', function(req, res){
  var currentEmail = email;
  var eventname = req.body.eventname;

  var query = {
    "eventname": eventname
  }
  //deleting an event to the collection "eventcollection" on mongodb
  client.db('teamwork').collection('eventcollection').deleteOne(query, function(err, collection){
    if(err) throw err;
    console.log("event record inserted Successfully");

    main();

  });
  return res.redirect('/homepage')
});
// changes the avatar of the user in mongoDB
app.post('/change-avatar', function(req, res){
  var currentEmail = email;
  var avatar =req.body.avatars;
  var data ={
    "username": currentEmail,
  }
  var query = {
    "image": avatar,
  }
  //changes the avatar
  client.db('teamwork').collection('teamworkcollection').updateOne(data,{$set:query}, function(err, collection){
    if(err) throw err;
    console.log("avatar changed Successfully");
  });
  //sends information about the change to settings.html
  io.on('connection', (socket) => {
      avatarChange = avatar
      io.emit('changedAvatar', { thisAvatarChange: avatarChange });
  });
  return res.redirect('/myProfile')
});
// changes the name
app.post('/change-name', function(req, res){
  var currentEmail = email;
  var name = req.body.name;
  var data ={
    "username": currentEmail,
  }
  var query = {
    "name": name,
  }
  //change name on current user in database
  client.db('teamwork').collection('teamworkcollection').updateOne(data,{$set:query}, function(err, collection){
    if(err) throw err;
    console.log("name changed Successfully");
  });
  //sends information about the change to settings.html
  io.on('connection', (socket) => {
      nameChange = name
      io.emit('changedName', { thisNameChange: nameChange });
  });
  return res.redirect('/myProfile')
});
  //change password on current user in database
app.post('/change-password', function(req, res){
  var currentEmail = email;
  var pass = req.body.password;
  var oldpass = req.body.oldpassword;
  //checks if the old password and the entered password matches
  if (oldpass == password) {
    passwordChange = true;
    var data ={
      "username": currentEmail,
    }
    var query = {
      "password": pass,
    }
    //changes the password
    client.db('teamwork').collection('teamworkcollection').updateOne(data,{$set:query}, function(err, collection){
      if(err) throw err;
      console.log("password changed Successfully");
    });
    //sends information about the change if it has changed to settings.html
    io.on('connection', (socket) => {
        io.emit('changedPassword', { thisPasswordChange: passwordChange });
    });
  }
  //sends information that the change has not been done
  else {
    passwordChange = false;
    io.on('connection', (socket) => {
        io.emit('changedPassword', { thisPasswordChange: passwordChange });
    });
  }
  return res.redirect('/myProfile')
});


//sends all the users to homepage.html
io.on('connection', (socket) => {
  socket.on('getAllMyUsers', (getAllTheUsers) => {
    io.emit('getAllMyUsers', { allCurrentUsers: currentUsers, thisUser: email });

  });
});
//sends all the events to homepage.html
io.on('connection', (socket) => {
  socket.on('getAllMyEvents', (getAllTheEvents) => {
    io.emit('getAllMyEvents', { allCurrentEvents: currentEvents});
  });
});
//Sends and recieves information from the chat 
io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
});
//starts the localhost
http.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
