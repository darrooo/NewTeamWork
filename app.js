const express = require('express');
const app = express();
var http = require('http').Server(app);
var path = require('path');
const port = 3000;

//app.get('/', (req, res) => {
//  res.send('Hello World!')
//});
//app.use(express.static(path.join(__dirname, 'public/')));
app.use(express.static(path.join(__dirname, 'public/')));

//app.get('/team', function (req, res) {
//  res.sendFile(path.join(__dirname, 'views/teamworkpage.html'));
//});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/homepage', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/homepage.html'));
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
