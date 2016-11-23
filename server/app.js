var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var employees = require('./routes/employees')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Our routes
app.use('/employees', employees);

// serve static files
app.use(express.static(path.resolve('./server/public')));

// server index file
// app.get('/home', function(req, res) {
//     res.send("hello from the server");
// });

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

app.listen(3000, function() {
  console.log("server running, check localhost:3000");
});
