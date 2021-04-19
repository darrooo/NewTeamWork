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

//Agnes testar sockets här
//const express = require('express');
//const app = express();
//const http = require('http');
//const server = http.createServer(app);
//const port = 3000;
// till hit




//koppling till mongodb
async function main() {
  const uri = "mongodb+srv://daniellatestar:JhaliiAfdSjiG13@cluster0.voh9h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
	const client = new MongoClient(uri, { useUnifiedTopology: true });;

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
    const result = await client.db("teamwork").collection("teamwork").findOne({ username: email });
    if (result) {
        console.log(`Found a listing in the collection with the username '${email}':`);
        console.log(result);
        dbPassword = result.password; //
        dbEmail = result.username;
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
  console.log("är i userLogin");
  //window.location.assign("localhost:3000/homepage");  //window is not defined
}

//sparar users
function Data(){
  this.users={};
}
Data.prototype.addUser= function (user){
    //Store the order in an "associative array" with orderinformation as key
  this.users[user.userInformation] = user;
//  console.log( Object.values(this.users)); // [{userInfo: ['email','psw']}]
//  console.log(Object.values(this.users)[0].userInfo); // ["email", "psw"]
//  console.log(Object.values(this.users)[0].userInfo[0]); //Email
//  console.log(Object.values(this.users)[0].userInfo[1]); //psw
  email= Object.values(this.users)[0].userInfo[0];
  password = Object.values(this.users)[0].userInfo[1];
  main(); //kör om main för att uppdatera email och password globalt
}
// om vi av någon anledning ska se alla användare, vet ej om den kommer behövas
Data.prototype.getAllUsers = function () {
  return this.users;
};


var data = new Data();


// tar emot information från vue_script
io.on('connection', function (socket) {
  // When a connected client emits an "addOrder" message
  socket.on('sendInformation', function (orderInformation) {
    console.log("socket on " + Object.values(orderInformation)); // socket on email , password

    data.addUser(orderInformation);

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
