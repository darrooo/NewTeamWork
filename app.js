'use strict';

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
var dbPassword;
var dbEmail;
var currentUsers;
var currentEvents;
var access = false;
var firstrun = true;
var passwordChange;
var avatarChange;
var nameChange;

////HÄR SKA CONST URI LIGGA!
//var uri = "mongodb+srv://daniellatestar:JhaliiAfdSjiG13@teamwork.zuv9p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//var uri = 'mongodb+srv://hannetestar:BaDrisk32@teamwork.zuv9p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
var uri = 'mongodb+srv://agnestestar:42Xrj55eAvMsWWX@teamwork.zuv9p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

//Got it from this link: https://developer.mongodb.com/quickstart/node-crud-tutorial/
//connects to database
var client = new MongoClient(uri, { useUnifiedTopology: true});
client.connect();
//------------------------------------------------

// allt som delas mellan komponenter vill man inte ha i en async. Bra för om man vill hämta namn etc.
// main behövs egentligen inte, går att skriva om.
async function main() {

  //When running localhost (node app), the code starts from here
  try {
    console.log("när körs jag?");
    //----------------
    //funktionen behövs för att kolla om en user har access. Bör egetligen göras när man
    //klickar på knappen, och inte på on page load som den gör nu.
    //För att fixa:
    // Kolla om usern existerar i samband med sendinformation längre ner i app.js. en
    //funktion som returnar true eller false, inte två funktioner som kollar det ena
    // eller det andra.
    //----------------
    //** SKA BÖRJA TESTA NUU
    //data.clearAllEvents();

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

//Function for all users in the database
async function listAllUsers(client){
  //This fetch information from mongodb
  var allUsers = await client.db("teamwork").collection("teamworkcollection").find();
  allUsers.forEach(users => {
    data.addUserInData(users);
  });
};
//Function for all events in database
async function listAllEvents(client){
  //Fetch from mongodb
  //
  var allEvents = await client.db("teamwork").collection("eventcollection").find();
  //data.clearAllEvents();
//  console.log(allEvents + "all events i app.js");
  allEvents.forEach(events => {
    data.addEventInData(events);
  });
};

function findUser(email, password) {
  var valid =  data.checkIfUserInDB(email, password);
  if (valid == 1) {
    console.log("testa ett annat lösenord");
  }
  if (valid == 2) {
    console.log("login lyckades!");
    userLogin();
  }
  if (valid == 0) {
    console.log("fel lösenord och användarnamn " + valid);
  }
}

// ska redirectas till /homepage
//detta är den andra funktionen som sätter access till true. kan vara bra att skriva ihop med false.
function userLogin(){
  access = true
  //console.log("är i userLogin" + access);
  currentUsers = data.getAllUsers();
  currentEvents = data.getAllEvents();
  //console.log("Följande är alla användare tillgängliga i data => allMyUsers");
  //console.log(currentUsers);

  io.emit('sendLogin', {
    userAccess: access,
    allCurrentUsers: currentUsers

  });
}

const teamworkData = require("./dataHandler.js");
let data = new teamworkData();



// tar emot information från vue_script skickar info till vue_script
io.on('connection', (socket) => {
  // When a connected client emits an "addOrder" message
  socket.on('sendInformation', function (userInformation) {
    //console.log(" user input information uname psw:  " + Object.values(userInformation)); // email , password
    //data.addUser(userInformation); //skickas till datahandler.js
    var loginArray = data.addUser(userInformation); //skickas till datahandler.js
    email = loginArray[0]; //tilldelas globalt
    password = loginArray[1]; //tilldelas globalt
    findUser(email, password);
    //console.log("returnd array : " + loginArray); //fungerar
    //main(); //laddar om main med nytt email och psw
  });

  socket.on('sendLogout', function (userInformation){
    if(access){
      access= false;
    }
    socket.emit('sendLogin', {
      //userID:dbID,
      userAccess: access
    });
    //console.log(" access i io app.js" + access + " psw: " + dbPassword + " email: " +  dbEmail  ); //fungerar
  });
});




//subdomäner
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
app.get('/settings', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/settings.html'));
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
app.get('/signup', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/signup.html'))
});

//anävnder inte denna i nuläget
app.get('/signup_success', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/signup_success.html'))
});




//To create a (signup)user and upload it to database
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

//The one that uploads the updated information about a new user
app.post('/signup', function(req, res){
  console.log("signup kommer jag hit?");
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

//To create an event and upload to mongodb
app.post('/homepage-add', function(req, res){
  console.log("adding event test");
  //creates each variable and returns an object
  var currentEmail = email;
  var eventname = req.body.eventname;
  var starttime = req.body.starttime;
  var endtime = req.body.endtime;
  var date = req.body.date;
  var month = req.body.month;
  var year = req.body.year;

console.log("post ADD EVENT " + currentEmail + " " + eventname + " " + starttime + " " + endtime + " " +  date +" " + month +" "  + year);
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
//To delete  an event and upload to mongodb
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

app.post('/change-avatar', function(req, res){
  var currentEmail = email;
  var avatar =req.body.avatars;
console.log("avatar i change avatar "+ avatar);
  var data ={
    "username": currentEmail,
  }
  var query = {
    "image": avatar,
  }
  //change avatar
  client.db('teamwork').collection('teamworkcollection').updateOne(data,{$set:query}, function(err, collection){
    if(err) throw err;
    console.log("avatar changed Successfully");
  });
  io.on('connection', (socket) => {
      avatarChange = avatar
      io.emit('changedAvatar', { thisAvatarChange: avatarChange });
  });
  return res.redirect('/myProfile')
});
app.post('/change-name', function(req, res){
  var currentEmail = email;
  var name = req.body.name;
  var data ={
    "username": currentEmail,
  }
  var query = {
    "name": name,
  }
  //change name on current user
  client.db('teamwork').collection('teamworkcollection').updateOne(data,{$set:query}, function(err, collection){
    if(err) throw err;
    console.log("name changed Successfully");


  });
  io.on('connection', (socket) => {
      nameChange = name
      io.emit('changedName', { thisNameChange: nameChange });
  });
  return res.redirect('/myProfile')
});

app.post('/change-password', function(req, res){
  var currentEmail = email;
  var pass = req.body.password;
  var oldpass = req.body.oldpassword;
  //console.log("GAMLA OCH Gamla LÖSEN jämförelse om: " + oldpass + " e samma som:" + password);

  if (oldpass == password) {
    passwordChange = true;
    var data ={
      "username": currentEmail,
    }
    var query = {
      "password": pass,
    }
    //change password
    client.db('teamwork').collection('teamworkcollection').updateOne(data,{$set:query}, function(err, collection){
      if(err) throw err;
      console.log("password changed Successfully");
    //  main();
    });
    io.on('connection', (socket) => {
        io.emit('changedPassword', { thisPasswordChange: passwordChange });
    });
  }
  else {
    passwordChange = false;
    io.on('connection', (socket) => {
        io.emit('changedPassword', { thisPasswordChange: passwordChange });
    });

  }

  return res.redirect('/myProfile')
});



io.on('connection', (socket) => {
  socket.on('getAllMyUsers', (getAllTheUsers) => {
    //    io.emit('getAllMyUsers', currentUsers);   //Här vill vi lägga in typ "[userName]: + msg"
    io.emit('getAllMyUsers', { allCurrentUsers: currentUsers, thisUser: email });

  });
});

io.on('connection', (socket) => {
  socket.on('getAllMyEvents', (getAllTheEvents) => {
    io.emit('getAllMyEvents', { allCurrentEvents: currentEvents});
  });
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

io.on('connection', (socket) => {
  //console.log('a user connected');
  //socket.on('disconnect', () => {
  //console.log('user disconnected');
  //  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);   //Här vill vi lägga in typ "[userName]: + msg"
    console.log('message: ' + msg);
  });
});

http.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
