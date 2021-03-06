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

var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");

var async = require('async');
var request = require('request');
var xml2js = require('xml2js');

var mongoose = require('mongoose');

var image = require('./models/Image');

var config = require('./config');

mongoose.connect(config.database);

console.log(config.database);

mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

//=================SRC-SERVER===================
var ImageServer = require('./src-server/image/ImageServer');
var HomeMenuServer = require('./src-server/menu/HomeMenuServer');
var PageServer = require('./src-server/page/PageServer');
var LuuTruServer = require('./src-server/luutru/LuuTruServer');
var LienKetSiteServer = require('./src-server/lienketsite/LienKetSiteServer');
var CotPhaiHomeServer = require('./src-server/cotphaihome/CotPhaiHomeServer');
var QuanLyTinTucServer = require('./src-server/quanlytintuc/QuanLyTinTucServer');
var TinTucHomeServer = require('./src-server/tintuchome/TinTucHomeServer');
var KhoaServer = require('./src-server/khoa/KhoaServer');
var CaiDatLuuTruServer = require('./src-server/caidatluutru/CaiDatLuuTruServer');
var TicketServer = require('./src-server/ticket/TicketServer');
//==============================================

var Adminserver = require('./src-server/admin/Adminserver');

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
/**UPLOAD**/

// var storage = multer.diskStorage({
//   destination: __dirname + '/public/uploads/',
//   filename: function (req, file, cb) {
//     cb(null, path.basename(file.originalname, path.extname(file.originalname)) + Date.now() + path.extname(file.originalname));
//   }
// });
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

var importStudent = multer({ //multer settings
    storage: storage,
    fileFilter : function(req, file, callback) { //file filter
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('file');

// var upload = multer(options);
var upload = multer({ storage: storage });
app.post('/api/imageupload', upload.single('file'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  // c
  res.send({link:"/uploads/"+req.file.filename});
  if(req.file.filename){
    var link = "/uploads/"+req.file.filename;
    var imgRes = new image({link:link});
    imgRes.save(function(err){
      if(err) return next(err);
    });
  }
});
app.post('/api/uploadanhtintuc', upload.single('file'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  // c
  console.log(req.file);
  res.send({link:"/uploads/"+req.file.filename});


});

var server = require('http').createServer(app);
var io = require('socket.io')(server);

ImageServer(app);
HomeMenuServer(app);
PageServer(app);
LuuTruServer(app);
LienKetSiteServer(app);
CotPhaiHomeServer(app);
QuanLyTinTucServer(app);
TinTucHomeServer(app);
KhoaServer(app);
CaiDatLuuTruServer(app);
TicketServer(app);
Adminserver(app, importStudent);

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
