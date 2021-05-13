'use strict';

const express = require('express');
const {MongoClient} = require('mongodb');
const app = express();
var http = require('http').Server(app);
var path = require('path');
const io = require('socket.io')(http);
const port = 3000;
var email ; //dani e rätt
var password ; //danicompass e rätt
var dbPassword ; //
var dbEmail ;
var dbID;
var access = false;

//Agnes testar sockets här
//const express = require('express');
//const app = express();
//const http = require('http');
//const server = http.createServer(app);
//const port = 3000;
// till hit


//koppling till mongodb
async function main() {
  //HÄR SKA CONST URI LIGGA! SKICKAR INTE MED DEN NU PGA SEKRETESS PÅ GITHUB
  const uri = "mongodb+srv://daniellatestar:JhaliiAfdSjiG13@teamwork.zuv9p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  //const uri = 'mongodb+srv://hannetestar:BaDrisk32@teamwork.zuv9p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
	const client = new MongoClient(uri, { useUnifiedTopology: true});

  try {
    await client.connect();
    await listDatabases(client); //listar Databaser
    await findUserByEmail(client, email); //kollar om email finns i DB

  } catch (e) {
      console.error(e);
  }
  finally {
    await client.close();
  }
}
main().catch(console.error);

async function listDatabases(client){ //listar Databaser
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function findUserByEmail(client, email) {  //kollar om email finns i DB
    const result = await client.db("teamwork").collection("teamworkcollection").findOne({ username: email });
    if (result) {
        console.log(`Found a listing in the collection with the username '${email}':`);
        console.log(result);
        dbPassword = result.password; //
        dbEmail = result.username;
        dbID = result._id;
        console.log("användar Id för inloggad användare: " + dbID);
  //      console.log(dbPassword );
  //      console.log(dbEmail);
        if (dbPassword == password && dbEmail == email) {
          console.log("DET STÄMMER"); // TODO: Göra så den redirectas till /homepage
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
function userLogin(){
  access = true
  console.log("är i userLogin" + access);
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
    io.emit('sendLogin', {
      userID:dbID,
      userAccess: access
    });
  });
  socket.emit('sendLogin', {
    userID:dbID,
    userAccess: access
  });
  console.log(" access i io app.js" + access + " psw: " + dbPassword + " email: " +  dbEmail + " id: " + dbID ); //fungerar
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
