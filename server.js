require('babel-register');

var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router').Router;
var match = require('react-router').match;
var RouterContext = require('react-router').RouterContext;
var routes = require('./app/routes');
var express = require('express');
var path = require('path');
var logger = require('morgan'); //HTTP request logger.
var bodyParser = require('body-parser');  //For parsing POST request data.
var multiparty = require('multiparty');
var fs = require('fs');

var multer = require('multer');

var async = require('async');
var request = require('request');
var xml2js = require('xml2js');

var mongoose = require('mongoose');

// var Transition = require('./models/Transition');
// var User = require('./models/User');

var config = require('./config');

mongoose.connect(config.database);

console.log(config.database);

mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

//=================SRC-SERVER===================
// var Postserver = require('./src-server/admin/post/Postserver');
// var CategoryServer = require('./src-server/admin/category/CategoryServer');
// var DocumenttypeServer = require('./src-server/admin/documenttype/DocumenttypeServer');
// var Userserver = require('./src-server/admin/user/Userserver');
// var BookServer = require('./src-server/admin/book/BookServer');
// var TransitionServer = require('./src-server/admin/transition/TransitionServer');
//==============================================

var Adminserver = require('./src-server/admin/Adminserver');

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
/**UPLOAD**/

var storage = multer.diskStorage({
  destination: __dirname + '/public/uploads/',
  filename: function (req, file, cb) {
    cb(null, path.basename(file.originalname, path.extname(file.originalname)) + Date.now() + path.extname(file.originalname));
  }
});

// var upload = multer(options);
var upload = multer({ storage: storage });
app.post('/api/imageupload', upload.single('file'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  // c
  res.send({link:"/uploads/"+req.file.filename});


});

var server = require('http').createServer(app);
var io = require('socket.io')(server);

// Postserver(app);
// Userserver(app);
Adminserver(app);

/*
Category
*/
// CategoryServer(app);

/*
Documenttype Server
*/
// DocumenttypeServer(app);

/*
Book Server
*/
// BookServer(app);
/*
TransitionServer
*/
// TransitionServer(app,io);


app.use(function(req, res) {
  match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(RouterContext, renderProps));
      var page = swig.renderFile('views/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found');
    }
  });
});

var onlineUsers = 0;

io.sockets.on('connection', function(socket) {
  onlineUsers++;
  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('disconnect', function() {
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });
});

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
