

const express = require('express');
const app = express();
var http = require('http').Server(app);
var path = require('path');
const io = require('socket.io')(http);
const port = 3000;
//var io = require('socket.io')(server);

//var io = require('socket.io')(http, {cookie: false});


//Agnes testar sockets här
//const express = require('express');
//const app = express();
//const http = require('http');
//const server = http.createServer(app);
//const port = 3000;
// till hit


//app.get('/', (req, res) => {
//  res.send('Hello World!')
//});
//app.use(express.static(path.join(__dirname, 'public/')));
app.use(express.static(path.join(__dirname, 'public/')));

//app.get('/team', function (req, res) {
//  res.sendFile(path.join(__dirname, 'views/teamworkpage.html'));
//});


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
