var mongoose = require('mongoose');
var Admin = require('../../models/admin');

module.exports = function(app) {
  app.get('/login/:email/:password', function(req, res){
    Admin.findOne({email : req.params.email, password : req.params.password}, function(err, admin){
      if (err) res.send(err);
      res.json(admin);
    });
  });
}
