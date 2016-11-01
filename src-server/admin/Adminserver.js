var mongoose = require('mongoose');
var Admin = require('../../models/admin');
var Student = require('../../models/student');


module.exports = function(app) {

  // Check Login Admin

  app.get('/login/:email/:password', function(req, res){
    Admin.findOne({email : req.params.email, password : req.params.password}, function(err, admin){
      if (err) res.send(err);
      res.json(admin);
    });
  });

  // Get Students

  app.get('/getstudent', function(req, res){
    Student.find(function(err, students){
      if(err) throw err;
      res.json(students);
    });
  })

  // Get Student

  app.get('/getstudent/:stuId', function(req, res){
    Student.findOne({_id: req.params.stuId},function(err, student){
      if(err) throw err;
      res.json(student);
    });
  })

  // Add Student

  app.post('/addstudent', function(req, res){
    var student = new Student();
    student.email = req.body.email;
    student.password = req.body.password;
    student.code = req.body.code;
    student.save(function(err){
      if(err) throw err;
      res.send(true);
    });
  })

  // Update Student

  app.put('/editstudent/:stuId', function(req, res){
    Student.findByIdAndUpdate(req.params.stuId, req.body , { new: true }, function (err, student) {
      if (err) throw err;
      res.send(student);
    });
  })

  // Delete Student

  app.delete('/deletestudent/:stuId', function(req, res){
    Student.remove({_id: req.params.stuId}, function(err) {
      if (err) throw err;
      res.send(true);
    });
  })

}
