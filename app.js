const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
var io = require('socket.io')(server);

//var io = require('socket.io')(http, {cookie: false});

var path = require('path');
var port = 3000;

// app.get('/', (req, res) => {
// //res.send('Hello World!')
// });
//app.use(express.static(path.join(__dirname, 'public/')));
app.use(express.static(path.join(__dirname, 'public/')));

//app.get('/team', function (req, res) {
//  res.sendFile(path.join(__dirname, 'views/teamworkpage.html'));
//});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/chatti.html'));
});

io.on('connection', function (socket) {
  console.log('connected');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

app.get('/homepage', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/homepage.html'));
});

app.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/about.html'));
});
//hit har du suddat till


//const Script = require("./script.js");
//var io = require('socket.io')(server);

//let homepage = new Homepage();
//homepage.initializeData();

//var io = require('socket.io')(http, {cookie: false});

//io.on('connection', function (socket) {
  //Script(this, socket, script);
//   console.log('connected');
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
