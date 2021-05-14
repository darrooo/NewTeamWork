'use strict';

const express = require('express');
const {MongoClient} = require('mongodb');
const app = express();
var http = require('http').Server(app);
var path = require('path');
const io = require('socket.io')(http);
const port = 3000;
var bodyParser = require("body-parser");
var email ;
var password ;
var dbPassword ;
var dbEmail ;
var dbID;
var access = false;

////HÄR SKA CONST URI LIGGA! SKICKAR INTE MED DEN NU PGA SEKRETESS PÅ GITHUB
const uri = "mongodb+srv://daniellatestar:JhaliiAfdSjiG13@teamwork.zuv9p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//const uri = 'mongodb+srv://hannetestar:BaDrisk32@teamwork.zuv9p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
//

//connects to database
//Got it from this link: https://developer.mongodb.com/quickstart/node-crud-tutorial/
//var uri = 'mongodb+srv://hannetestar:BaDrisk32@teamwork.zuv9p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
//var uri = 'mongodb+srv://agnestestar:42Xrj55eAvMsWWX@teamwork.zuv9p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

var client = new MongoClient(uri, { useUnifiedTopology: true});
client.connect();

//------------------------------------------------

//allt som delas mellan komponenter vill man inte ha i en async. Bra för om man vill hämta namn etc.
// main behövs egentligen inte, går att skriva om.
async function main() {
  //Körs först av allt
  try {
  //  await client.connect();
  //  await listDatabases(client); //listar Databaser
    await listAllUsers(client); //listar Användare
    //----------------
    //funktionen behövs för att kolla om en user har access. Bör egetligen göras när man
    //klickar på knappen, och inte på on page load som den gör nu.
    //För att fixa:
    // Kolla om usern existerar i samband med sendinformation längre ner i app.js. en
    //funktion som returnar true eller false, inte två funktioner som kollar det ena
    // eller det andra.
    //----------------
    await findUserByEmail(client, email); //kollar om email finns i DB

  } catch (e) {
    console.error(e);
  }
  // finally {
  //   await client.close();
  // } //removed - not needed
}

//async function listDatabases(client){ //listar Databaser
  //Kör denna funktion för att visa databasen
//  const databasesList = await client.db().admin().listDatabases();
//  console.log("Databases:");
//  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
//};
async function listAllUsers(client){ //listar Databaser
  //Kör denna funktion för att visa databasen
  const allUsers = await client.db("teamwork").collection("teamworkcollection").find();
  allUsers.forEach(users => {
    //console.log(users)
    //console.log(users.name)
    data.addUserInData(users);

  });

};

//hela denna funktion bör kollas över. variabler, mm.
async function findUserByEmail(client, email) {
  //kör denna funktion för att hitta user med visst username och password
  const user = await client.db("teamwork").collection("teamworkcollection").findOne({ username: email }); //om vi vill hämta information om en user, använd detta!! För att få tillgång till dens email = får all information. lägga till akelnder till denna.

  if (user) {
    console.log(`Found a listing in the collection with the username '${email}':`);
    console.log(user);
    dbPassword = user.password;
    //TO DO: borde byta username till email
    dbEmail = user.username;
    dbID = user._id;
    if (dbPassword == password && dbEmail == email) {
      console.log("DET STÄMMER");
      var allUsers = data.getAllUsers();
      console.log("Följande är alla användare tillgängliga i data => allUsers");
      console.log(allUsers);
      userLogin();
      //window.location.assign("localhost:3000/homepage");  //window is not defined
    }
    else{
      console.log("DET STÄMMER INTE PROVA NYTT LÖSENORD")
    }
  } else {
    console.log(`No listings found with the username '${email}'`);
    console.log("DET STÄMMER INTE PROVA NYTT INLOGG")
  }
}

// ska redirectas till /homepage
//detta är den andra funktionen som sätter access till true. kan vara bra att skriva ihop med false.
function userLogin(){
  access = true
  console.log("är i userLogin" + access);


  //SKA ÄNDRAS T DETTA: DATAHANDLER + vue_script
  io.emit('sendLogin', {
    userID:dbID,
    userAccess: access
  }); //laddar om sendLogin
}

const teamworkData = require("./dataHandler.js");

let data = new teamworkData();


// tar emot information från vue_script skickar info till vue_script
io.on('connection', (socket) => {
  // When a connected client emits an "addOrder" message
  socket.on('sendInformation', function (userInformation) {
    console.log(" user input information uname psw:  " + Object.values(userInformation)); // email , password
    //data.addUser(userInformation); //skickas till datahandler.js
    var loginArray = data.addUser(userInformation); //skickas till datahandler.js
    email = loginArray[0]; //tilldelas globalt
    password = loginArray[1]; //tilldelas globalt
    //console.log("returnd array : " + loginArray); //fungerar
    main(); //laddar om main med nytt email och psw
  });

  socket.on('sendLogout', function (userInformation){
    if(access){
      access= false;
    }
    socket.emit('sendLogin', {
     userID:dbID,
     userAccess: access
     });
      console.log(" access i io app.js" + access + " psw: " + dbPassword + " email: " +  dbEmail + " id: " + dbID ); //fungerar
    });
  });




//subdomäner
app.use(express.static(path.join(__dirname, 'public/')));

// Serve vue from node_modules as vue/
app.use('/vue', express.static(path.join(__dirname, '/node_modules/vue/dist/')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
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

app.get('/calendar', (req, res) => {
  res.sendFile(__dirname + '/public/views/calendar.html');
});

app.get('/signup', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/signup.html'))
});

app.get('/signup_success', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/signup_success.html'))
});



//To create a (signup)user and upload it to database
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/signup', function(req, res){
  console.log("signup kommer jag hit?");
  var username = req.body.username;
  var name = req.body.name;
  var pass = req.body.password;

  var data = {
    "username": username,
    "name": name,
    "password": pass,
  }

  client.db('teamwork').collection('teamworkcollection').insertOne(data, function(err, collection){ //db is not defined, hämtar inte databasen

    if(err) throw err;
    console.log("Record inserted Successfully");

  });

  return res.redirect('/homepage')
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
