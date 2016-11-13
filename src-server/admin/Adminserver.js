var mongoose = require('mongoose');
var Admin = require('../../models/admin');
var Student = require('../../models/student');
var Chitieu = require('../../models/chitieu');
var Khuvuc = require('../../models/khuvuc');


var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");



module.exports = function(app, importStudent) {

  // Check Login Admin

  app.get('/login/:email/:password', function(req, res){
    Admin.findOne({email : req.params.email, password : req.params.password}, function(err, admin){
      if (err) res.send(err);
      res.json(admin);
    });
  });

  // Import students

  app.post('/upload', function(req, res) {
      var exceltojson;

      importStudent(req,res,function(err){
          if(err){
               res.json({error_code:1,err_desc:err});
               return;
          }
          /** Multer gives us file info in req.file object */
          if(!req.file){
              res.json({error_code:1,err_desc:"No file passed"});
              return;
          }
          /** Check the extension of the incoming file and
           *  use the appropriate module
           */
          if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
              exceltojson = xlsxtojson;
          } else {
              exceltojson = xlstojson;
          }
          // console.log(req.file.path);
          try {
              exceltojson({
                  input: req.file.path,
                  output: null, //since we don't need output.json
                  // sheet: "Sheet1",
                  lowerCaseHeaders:true
              }, function(err,result){
                  if(err) {
                      return res.json({error_code:1,err_desc:err, data: null});
                  }
                  for(var i=0; i<result.length; i++){
                      var StudentN = new Student({
                        fk_doan_the:result[i].fk_doan_the,
                        ma_ktx:result[i].ma_ktx,
                        hoc_ky_nop_hs:result[i].hoc_ky_nop_hs,
                        nam_hoc_nop_hs:result[i].nam_hoc_nop_hs,
                        nam_hoc:result[i].nam_hoc,
                        hoc_ky:result[i].hoc_ky,
                        ma_sinh_vien:result[i].ma_sinh_vien,
                        ho_lot:result[i].ho_lot,
                        ten:result[i].ten,
                        ten_dan_toc:result[i].ten_dan_toc,
                        fk_dien_uu_tien:result[i].fk_dien_uu_tien,
                        uu_tien_khac:result[i].uu_tien_khac,
                        so_cmnd:result[i].so_cmnd,
                        ma_giuong:result[i].ma_giuong,
                        ten_phong:result[i].ten_phong,
                        ten_giuong:result[i].ten_giuong,
                        nam_vao_truong:result[i].nam_vao_truong,
                        phai:result[i].phai,
                        ngay_vao_ktx:result[i].ngay_vao_ktx,
                        ngay_ra_ktx:result[i].ngay_ra_ktx,
                        ghi_chu:result[i].ghi_chu,
                        ngay_lam_thu_tuc:result[i].ngay_lam_thu_tuc,
                        dk_hoc_ky_moi:result[i].dk_hoc_ky_moi,
                        dk_hoc_ky_he:result[i].dk_hoc_ky_he,
                        tang:result[i].tang,
                        ngay:result[i].ngay,
                        thang:result[i].thang,
                        ly_do_ra:result[i].ly_do_ra,
                        ngay_sinh:result[i].ngay_sinh,
                        dia_chi_gia_dinh:result[i].dia_chi_gia_dinh,
                        ten_tinh_tp:result[i].ten_tinh_tp,
                        dtqt:result[i].dtqt,
                        bk:result[i].bk,
                        dien_thoai:result[i].dien_thoai,
                        email:result[i].email,
                        ten_doan_the:result[i].ten_doan_the
                      });
                      StudentN.save(function (err){if(err)console.log("can't save to db");});
                  }
                  res.send(true);
              });
          } catch (e){
              res.json({error_code:1,err_desc:"Corupted excel file"});
          }
      })

  });

  // Get Students

  app.get('/getstudent', function(req, res){
    Student.find(function(err, students){
      if(err) throw err;
      res.json(students);
    });
  })

  // Get Students By Hoc Vu

  app.get('/getstudenthocvu', function(req, res){
    Student.find({tamdung_hocvu : true}, function(err, students){
      if(err) throw err;
      res.json(students);
    });
  })

  //Get Students By Diem Ren Luyen

  app.get('/getstudent/diem/:stuDiem', function(req, res){
    console.log(req.params.stuDiem);
    Student.find({diem_ren_luyen : {$gt: req.params.stuDiem}}, function(err, students){
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
    student.mssv = req.body.mssv;
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

  // Update Xy Ky Hoc Vu

  app.post('/upload/xulyhocvu', function(req, res) {
      var exceltojson;

      importStudent(req,res,function(err){
          if(err){
               res.json({error_code:1,err_desc:err});
               return;
          }
          /** Multer gives us file info in req.file object */
          if(!req.file){
              res.json({error_code:1,err_desc:"No file passed"});
              return;
          }
          /** Check the extension of the incoming file and
           *  use the appropriate module
           */
          if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
              exceltojson = xlsxtojson;
          } else {
              exceltojson = xlstojson;
          }
          // console.log(req.file.path);
          try {
              exceltojson({
                  input: req.file.path,
                  output: null, //since we don't need output.json
                  // sheet: "Sheet1",
                  lowerCaseHeaders:true
              }, function(err,result){
                  if(err) {
                      return res.json({error_code:1,err_desc:err, data: null});
                  }
                  for(var i=0; i<result.length; i++){
                    Student.findOneAndUpdate({ma_sinh_vien : result[i].ma_sinh_vien}, {tamdung_hocvu : true} , { new: true }, function (err, student) {
                      if (err) throw err;
                    });
                  }
                  res.send(true);
              });
          } catch (e){
              res.json({error_code:1,err_desc:"Corupted excel file"});
          }
      })

  });

  //Update Diem Ren Luyen

  app.post('/upload/diemrenluyen', function(req, res) {
      var exceltojson;

      importStudent(req,res,function(err){
          if(err){
               res.json({error_code:1,err_desc:err});
               return;
          }
          /** Multer gives us file info in req.file object */
          if(!req.file){
              res.json({error_code:1,err_desc:"No file passed"});
              return;
          }
          /** Check the extension of the incoming file and
           *  use the appropriate module
           */
          if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
              exceltojson = xlsxtojson;
          } else {
              exceltojson = xlstojson;
          }
          // console.log(req.file.path);
          try {
              exceltojson({
                  input: req.file.path,
                  output: null, //since we don't need output.json
                  // sheet: "Sheet1",
                  lowerCaseHeaders:true
              }, function(err,result){
                  if(err) {
                      return res.json({error_code:1,err_desc:err, data: null});
                  }
                  for(var i=0; i<result.length; i++){
                    Student.findOneAndUpdate({ma_sinh_vien : result[i].ma_sinh_vien}, {diem_ren_luyen : result[i].diem_ren_luyen} , { new: true }, function (err, student) {
                      if (err) throw err;
                    });
                  }
                  res.send(true);
              });
          } catch (e){
              res.json({error_code:1,err_desc:"Corupted excel file"});
          }
      })

  });

  // Delete Student

  app.delete('/deletestudent/:stuId', function(req, res){
    Student.remove({_id: req.params.stuId}, function(err) {
      if (err) throw err;
      res.send(true);
    });
  })

  // Get Chi Tieu

  app.get('/getchitieu', function(req, res){
    Chitieu.find(function(err, chitieu){
      if(err) throw err;
      res.json(chitieu);
    });
  })

  // Add Chi Tieu

    app.post('/addchitieu', function(req, res){
      var nChitieu = new Chitieu();
      nChitieu.nam = req.body.nam;
      nChitieu.nam1 = {
        soluong: req.body.nam1,
        diemcoban: req.body.diemcb1
      }
      nChitieu.nam2 = {
        soluong: req.body.nam1,
        diemcoban: req.body.diemcb2
      }
      nChitieu.nam3 = {
        soluong: req.body.nam1,
        diemcoban: req.body.diemcb3
      }
      nChitieu.nam4 = {
        soluong: req.body.nam1,
        diemcoban: req.body.diemcb4
      }
      nChitieu.nam5 = {
        soluong: req.body.nam1,
        diemcoban: req.body.diemcb5
      }
      nChitieu.nam6 = {
        soluong: req.body.nam1,
        diemcoban: req.body.diemcb6
      }
      nChitieu.save(function(err){
        if(err) throw err;
        res.send(true);
      });
    })

    // Delete Student

    app.delete('/deletechitieu/:chitieuId', function(req, res){
      Chitieu.remove({_id: req.params.chitieuId}, function(err) {
        if (err) throw err;
        res.send(true);
      });
    })

    // Get Khu Vuc

    app.get('/getkhuvuc', function(req, res){
      Uutien.find(function(err, uutien){
        if(err) throw err;
        res.json(uutien.khuvuc);
      });
    })

    // Add Khu Vuc

      app.post('/addkhuvuc', function(req, res){
        console.log(req.body);
        var nKhuvuc = new Khuvuc();
        nKhuvuc.ten =  req.body.khuvuc;
        nKhuvuc.diem =  req.body.diemkhuvuc;
        nKhuvuc.ma =  req.body.makhuvuc;
        nKhuvuc.save(function(err){
          if(err) throw err;
          res.send(true);
        });
      })

      // Delete Student

      app.delete('/deletechitieu/:chitieuId', function(req, res){
        Chitieu.remove({_id: req.params.chitieuId}, function(err) {
          if (err) throw err;
          res.send(true);
        });
      })

}
