var mongoose = require('mongoose');
var Admin = require('../../models/admin');
var Student = require('../../models/student');
var Chitieu = require('../../models/chitieu');
var Khuvuc = require('../../models/khuvuc');
var Tinh = require('../../models/tinh');
var Doituong = require('../../models/doituong');
var Hocluc = require('../../models/hocluc');
var Hoancanh = require('../../models/hoancanh');
var Tang = require('../../models/tang');
var Phong = require('../../models/phong');
var Phongchitiet = require('../../models/phongchitiet');
var Dichvu = require('../../models/dichvu');
var Hedaotao = require('../../models/hedaotao');
var Admin = require('../../models/admin');




var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var bcrypt   = require('bcrypt-nodejs');


module.exports = function(app, importStudent) {

  app.post('/addadmin', function(req, res){
    var nAdmin = new Admin();
    console.log(req.body);
    nAdmin.ten = req.body.ten;
    nAdmin.email = req.body.email;
    nAdmin.password = nAdmin.generateHash(req.body.password);
    nAdmin.type = req.body.type;
    nAdmin.save(function(err){
      if(err) throw err;
      res.send(true);
    });
  })

  // Delete Admin

  app.delete('/deleteadmin/:adminId', function(req, res){
    Admin.remove({_id: req.params.adminId}, function(err) {
      if (err) throw err;
      res.send(true);
    });
  })

  app.get('/getadmin', function(req, res){
    Admin.find(function(err, admin){
      if(err) throw err;
      res.json(admin);
    });
  })


  // Check Login Admin

  app.get('/login/:email/:password', function(req, res){
    Admin.findOne({email : req.params.email}, function(err, admin){
      if (err) res.send(err);
      if(admin.valiPassword(req.params.password)) {
        res.json(admin);
      }
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
                        ten_doan_the:result[i].ten_doan_the,
                        dang_o_ktx: true
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

  app.get('/getstudent/test', function(req, res){
    Student.findOne({ma_sinh_vien: '51203104'}, function(err, student){
      if(err) throw err;
      res.json(student);
    });
  })

  // Get Students By Hoc Vu

  app.get('/xetduyet/getstudenthocvu', function(req, res){
    Student.find({tamdung_hocvu : false, dang_o_ktx : false}, function(err, students){
      if(err) throw err;
      res.json(students);
    });
  })

  app.get('/giahan/getstudenthocvu', function(req, res){
    Student
    .find({tamdung_hocvu : false, gia_han_luu_tru : true})
    .exec(function(err, students){
      if(err) throw err;
      res.json(students);
    });
  })

  app.get('/xetduyet/getstudentluutru', function(req, res){
    Student
    .find({xet_duyet_thanh_cong: true})
    .populate('_phongchitiet_id')
    .populate('_tang_id')
    .populate('_phong_id')
    .exec(function(err, students){
      if(err) throw err;
      res.json(students);
    });
  })

  app.get('/giahan/getstudentluutru', function(req, res){
    Student
    .find({gia_han_thanh_cong: true})
    .populate('_phongchitiet_id')
    .populate('_tang_id')
    .populate('_phong_id')
    .exec(function(err, students){
      if(err) throw err;
      res.json(students);
    });
  })

  //Get Students By Diem Ren Luyen

  app.get('/xetduyet/getstudent/diem/:stuDiem', function(req, res){
    Student.find({tamdung_hocvu : false, diem_ren_luyen : {$gt: req.params.stuDiem}, dang_o_ktx : false}, function(err, students){
      if(err) throw err;
      res.json(students);
    });
  })

  app.get('/giahan/getstudent/diem/:stuDiem', function(req, res){
    Student.find({tamdung_hocvu : false, diem_ren_luyen : {$gt: req.params.stuDiem}, gia_han_luu_tru : true}, function(err, students){
      if(err) throw err;
      res.json(students);
    });
  })

  app.get('/getstudent/diemktx/:stuDrl/:stuVs/:drl', function(req, res){
    Student.find({tamdung_hocvu : false, diem_ren_luyen : {$gt: req.params.drl}, 'diem_ren_luyen_ktx.tong' : {$gt : req.params.stuDrl}, 'diem_ren_luyen_ktx.ve_sinh' : {$gt : req.params.stuVs} }, function(err, students){
      if(err) throw err;
      res.json(students);
    });
  })

  app.get('/xetduyet/getstudent/diemxetduyet/:phongid/:soluong/:phai/:nam/:drl', function(req, res){
    var cYear = new Date().getFullYear(),
        cMonth = new Date().getMonth() + 1,
        fYear;
    if(cMonth > 10) {
      fYear = cYear - req.params.nam + 1;
    } else {
      fYear = cYear - req.params.nam;
    }
    Student
    .find({_phong_id: req.params.phongid, tamdung_hocvu : false, dang_o_ktx: false, diem_ren_luyen : {$gt: req.params.drl}, diem_xet_duyet : { $ne:null },phai : req.params.phai, nam_vao_truong : fYear})
    .populate('dich_vu._dichvu_id')
    .populate('_phong_id')
    .sort('-diem_ren_luyen')
    .limit(parseInt(req.params.soluong))
    .exec(function(err, students){
      if(err) {
        throw err;
      }
      else {
        students.forEach(function(student){
          var tienphong = student._phong_id.gia,
              tienKTX = 0;
          student.dich_vu.forEach(function(dichvu){
            tienKTX += dichvu._dichvu_id.gia;
          });
          student.update({$set : {xet_duyet_thanh_cong: true, 'tien_ktx.tien' : tienKTX + tienphong}}, {new: true}, function(err){
            if(err) throw err;
          });
        });
      }
      res.json(students);
    });

  })

  app.get('/giahan/getstudent/diemxetduyet/:phongid/:soluong/:phai/:nam/:drl/:drlktx/:dvs', function(req, res){
    var cYear = new Date().getFullYear(),
        cMonth = new Date().getMonth() + 1,
        fYear;
    if(cMonth > 10) {
      fYear = cYear - req.params.nam + 1;
    } else {
      fYear = cYear - req.params.nam;
    }
    Student
    .find({_phong_id: req.params.phongid, tamdung_hocvu : false, dang_o_ktx: true, diem_ren_luyen : {$gt: req.params.drl}, 'diem_ren_luyen_ktx.tong' : {$gt : req.params.drlktx}, 'diem_ren_luyen_ktx.ve_sinh' : {$gt : req.params.dvs}, diem_xet_duyet : { $ne:null }, phai : req.params.phai, nam_vao_truong : fYear})
    .populate('dich_vu._dichvu_id')
    .populate('_phong_id')
    .sort('-diem_ren_luyen')
    .limit(parseInt(req.params.soluong))
    .exec(function(err, students){
      if(err) {
        throw err;
      }
      else {
        students.forEach(function(student){
          var tienphong = student._phong_id.gia,
              tienKTX = 0;
          student.dich_vu.forEach(function(dichvu){
            tienKTX += dichvu._dichvu_id.gia;
          });
          student.update({$set : {gia_han_thanh_cong: true, 'tien_ktx.tien' : tienKTX + tienphong}}, {new: true}, function(err){
            if(err) throw err;
          });
        });
      }
      res.json(students);
    });

  })

  // Get Student

  app.get('/getstudent/:stuId', function(req, res){
    Student
    .findOne({_id: req.params.stuId})
    .populate('_phong_id')
    .exec(function(err, student){
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
    console.log(req.body);
    Student.findByIdAndUpdate(req.params.stuId, {email: req.body.email, _khu_vuc_id : req.body.khuvuc, _tinh_id : req.body.tinh, _doi_tuong_id : req.body.doituong, _hoc_luc_id : req.body.hocluc, _hoan_canh_id : req.body.hoancanh} , { new: true }, function (err, student) {
      if (err) throw err;
      res.send(student);
    });
  })

  app.put('/updatethongtinktx/:stuId', function(req, res){
    Student.findByIdAndUpdate(req.params.stuId, {_tang_id: req.body.tang, ma_ktx : req.body.maktx, ma_giuong: req.body.giuong, _phongchitiet_id : req.body.phongchitiet} , { new: true }, function (err, student) {
      if (err) throw err;
      res.send(student);
    });
  })

  // Update Xy Ky Hoc Vu

  app.post('/upload/xetduyet/xulyhocvu', function(req, res) {
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
                    Student.findOneAndUpdate({ma_sinh_vien : result[i].ma_sinh_vien, dang_o_ktx : false}, {tamdung_hocvu : true} , { new: true }, function (err, student) {
                      if (err) throw err;
                    });
                  }
                  res.send(result);
              });
          } catch (e){
              res.json({error_code:1,err_desc:"Corupted excel file"});
          }
      })

  });

  app.post('/upload/giahan/xulyhocvu', function(req, res) {
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
                    Student.findOneAndUpdate({ma_sinh_vien : result[i].ma_sinh_vien, gia_han_luu_tru : true}, {tamdung_hocvu : true} , { new: true }, function (err, student) {
                      if (err) throw err;
                    });
                  }
                  res.send(result);
              });
          } catch (e){
              res.json({error_code:1,err_desc:"Corupted excel file"});
          }
      })

  });

  //Update Diem Ren Luyen
  app.post('/upload/xetduyet/diemrenluyen', function(req, res) {
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
                    Student.findOneAndUpdate({ma_sinh_vien : result[i].ma_sinh_vien, dang_o_ktx : false}, {diem_ren_luyen : result[i].diem_ren_luyen} , { new: true }, function (err, student) {
                      if (err) throw err;
                    });
                  }
                  res.send(result);
              });
          } catch (e){
              res.json({error_code:1,err_desc:"Corupted excel file"});
          }
      })

  });

  app.post('/upload/giahan/diemrenluyen', function(req, res) {
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
                    Student.findOneAndUpdate({ma_sinh_vien : result[i].ma_sinh_vien, gia_han_luu_tru : true}, {diem_ren_luyen : result[i].diem_ren_luyen} , { new: true }, function (err, student) {
                      if (err) throw err;
                    });
                  }
                  res.send(result);
              });
          } catch (e){
              res.json({error_code:1,err_desc:"Corupted excel file"});
          }
      })

  });


  //Update Diem Ren Luyen Ky Tuc Xa

  //Update Diem Ren Luyen
  app.post('/upload/giahan/diemrenluyenktx', function(req, res) {
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
                    Student.findOneAndUpdate({ma_sinh_vien : result[i].ma_sinh_vien, gia_han_luu_tru : true}, {$push : { diem_ren_luyen_ktx : { tong : result[i].diem_ren_luyen_ktx, ve_sinh: result[i].diem_ve_sinh_ktx}}} , { new: true }, function (err, student) {
                      if (err) throw err;
                    });
                  }
                  res.send(result);
              });
          } catch (e){
              res.json({error_code:1,err_desc:"Corupted excel file"});
          }
      })

  });

  app.put('/xetduyet/diemxetduyet', function(req, res) {
    var cYear = new Date().getFullYear(),
        cMonth = new Date().getMonth() + 1,
        fYear;
    if(cMonth > 10) {
      fYear = cYear - req.body.nam + 1;
    } else {
      fYear = cYear - req.body.nam;
    }
    Student.find({_phong_id: req.body.phongid, tamdung_hocvu : false, dang_o_ktx: false,  diem_ren_luyen : {$gt: req.body.drl}, phai : req.body.phai,  nam_vao_truong : fYear})
    .populate('_khu_vuc_id')
    .populate('_tinh_id')
    .populate('_doi_tuong_id')
    .populate('_hoc_luc_id')
    .populate('_hoan_canh_id')
    .exec(function(err, students){
      if(err) throw err;
      students.forEach(function(student){
        if(student._khu_vuc_id !== undefined && student._tinh_id !== undefined && student._doi_tuong_id !== undefined && student._hoc_luc_id !== undefined && student._hoan_canh_id !== undefined ) {
          student.update({$set : {diem_xet_duyet : student._khu_vuc_id.diem + student._tinh_id.diem + student._doi_tuong_id.diem + student._hoc_luc_id.diem + student._hoan_canh_id.diem + parseInt(req.body.diemcb)}}, function(err, res){
            if (err) throw err;
          });
        }
      });
      res.send(true);
    });
  });

  app.put('/giahan/diemxetduyet', function(req, res) {
    var cYear = new Date().getFullYear(),
        cMonth = new Date().getMonth() + 1,
        fYear;
    if(cMonth > 10) {
      fYear = cYear - req.body.nam + 1;
    } else {
      fYear = cYear - req.body.nam;
    }
    Student.find({_phong_id: req.body.phongid, tamdung_hocvu : false, dang_o_ktx: true, diem_ren_luyen : {$gt: req.body.drl}, 'diem_ren_luyen_ktx.tong' : {$gt: req.body.drlktx}, 'diem_ren_luyen_ktx.ve_sinh' : {$gt: req.body.dvs}, phai : req.body.phai,  nam_vao_truong : fYear})
    .populate('_khu_vuc_id')
    .populate('_tinh_id')
    .populate('_doi_tuong_id')
    .populate('_hoc_luc_id')
    .populate('_hoan_canh_id')
    .exec(function(err, students){
      if(err) throw err;
      students.forEach(function(student){
        if(student._khu_vuc_id !== undefined && student._tinh_id !== undefined && student._doi_tuong_id !== undefined && student._hoc_luc_id !== undefined && student._hoan_canh_id !== undefined ) {
          student.update({$set : {diem_xet_duyet : student._khu_vuc_id.diem + student._tinh_id.diem + student._doi_tuong_id.diem + student._hoc_luc_id.diem + student._hoan_canh_id.diem + parseInt(req.body.diemcb)}}, function(err, res){
            if (err) throw err;
          });
        }
      });
      res.send(true);
    });
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
    Chitieu.find()
    .populate('chitiet._phong_id')
    .exec(function(err, chitieu){
      if(err) throw err;
      res.json(chitieu);
    });
  })

  // Add Chi Tieu

    app.post('/addchitieu', function(req, res){
      var chitiet = {
        "_phong_id" : req.body.phong,
        "nam1" : {
          "xetduyet" : {
            "male" : req.body.namnam1xd,
            "female" : req.body.nunam1xd,
            "diemcoban" : req.body.diemcb1xd
          },
          "giahan" : {
            "male" : req.body.namnam1gh,
            "female": req.body.nunam1gh,
            "diemcoban": req.body.diemcb1gh
          }
        },
        "nam2" : {
          "xetduyet" : {
            "male" : req.body.namnam2xd,
            "female" : req.body.nunam2xd,
            "diemcoban" : req.body.diemcb2xd
          },
          "giahan" : {
            "male" : req.body.namnam2gh,
            "female": req.body.nunam2gh,
            "diemcoban": req.body.diemcb2gh
          }
        },
        "nam3" : {
          "xetduyet" : {
            "male" : req.body.namnam3xd,
            "female" : req.body.nunam3xd,
            "diemcoban" : req.body.diemcb3xd
          },
          "giahan" : {
            "male" : req.body.namnam3gh,
            "female": req.body.nunam3gh,
            "diemcoban": req.body.diemcb3gh
          }
        },
        "nam4" : {
          "xetduyet" : {
            "male" : req.body.namnam4xd,
            "female" : req.body.nunam4xd,
            "diemcoban" : req.body.diemcb4xd
          },
          "giahan" : {
            "male" : req.body.namnam4gh,
            "female": req.body.nunam4gh,
            "diemcoban": req.body.diemcb4gh
          }
        },
        "nam5" : {
          "xetduyet" : {
            "male" : req.body.namnam5xd,
            "female" : req.body.nunam5xd,
            "diemcoban" : req.body.diemcb5xd
          },
          "giahan" : {
            "male" : req.body.namnam5gh,
            "female": req.body.nunam5gh,
            "diemcoban": req.body.diemcb5gh
          }
        },
        "nam6" : {
          "xetduyet" : {
            "male" : req.body.namnam6xd,
            "female" : req.body.nunam6xd,
            "diemcoban" : req.body.diemcb6xd
          },
          "giahan" : {
            "male" : req.body.namnam6gh,
            "female": req.body.nunam6gh,
            "diemcoban": req.body.diemcb6gh
          }
        }
      };
      var nChitieu = new Chitieu();
      nChitieu.nam = req.body.nam;
      nChitieu.chitiet.push(chitiet);
      nChitieu.save(function(err) {
        if(err) throw err;
        res.send(true);
      });
    })

    app.put('/updatechitieu/:nam', function(req, res){
      var chitiet = {
        "_phong_id" : req.body.phong,
        "nam1" : {
          "xetduyet" : {
            "male" : req.body.namnam1xd,
            "female" : req.body.nunam1xd,
            "diemcoban" : req.body.diemcb1xd
          },
          "giahan" : {
            "male" : req.body.namnam1gh,
            "female": req.body.nunam1gh,
            "diemcoban": req.body.diemcb1gh
          }
        },
        "nam2" : {
          "xetduyet" : {
            "male" : req.body.namnam2xd,
            "female" : req.body.nunam2xd,
            "diemcoban" : req.body.diemcb2xd
          },
          "giahan" : {
            "male" : req.body.namnam2gh,
            "female": req.body.nunam2gh,
            "diemcoban": req.body.diemcb2gh
          }
        },
        "nam3" : {
          "xetduyet" : {
            "male" : req.body.namnam3xd,
            "female" : req.body.nunam3xd,
            "diemcoban" : req.body.diemcb3xd
          },
          "giahan" : {
            "male" : req.body.namnam3gh,
            "female": req.body.nunam3gh,
            "diemcoban": req.body.diemcb3gh
          }
        },
        "nam4" : {
          "xetduyet" : {
            "male" : req.body.namnam4xd,
            "female" : req.body.nunam4xd,
            "diemcoban" : req.body.diemcb4xd
          },
          "giahan" : {
            "male" : req.body.namnam4gh,
            "female": req.body.nunam4gh,
            "diemcoban": req.body.diemcb4gh
          }
        },
        "nam5" : {
          "xetduyet" : {
            "male" : req.body.namnam5xd,
            "female" : req.body.nunam5xd,
            "diemcoban" : req.body.diemcb5xd
          },
          "giahan" : {
            "male" : req.body.namnam5gh,
            "female": req.body.nunam5gh,
            "diemcoban": req.body.diemcb5gh
          }
        },
        "nam6" : {
          "xetduyet" : {
            "male" : req.body.namnam6xd,
            "female" : req.body.nunam6xd,
            "diemcoban" : req.body.diemcb6xd
          },
          "giahan" : {
            "male" : req.body.namnam6gh,
            "female": req.body.nunam6gh,
            "diemcoban": req.body.diemcb6gh
          }
        }
      };
      Chitieu.findOneAndUpdate({nam: req.params.nam}, {$push : {"chitiet" : chitiet}}, {new : true}, function(err){
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
      Khuvuc.find(function(err, khuvuc){
        if(err) throw err;
        res.json(khuvuc);
      });
    })

    app.get('/getkhuvuc/:id', function(req, res){
      Khuvuc.findOne({_id : req.params.id}, function(err, khuvuc){
        if(err) throw err;
        res.json(khuvuc);
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

    app.put('/editkhuvuc/:id', function(req, res){
      Khuvuc.findByIdAndUpdate(req.params.id, {ten: req.body.ten, diem: req.body.diem, ma: req.body.ma} , { new: true }, function (err, khuvuc) {
        if (err) throw err;
        res.send(khuvuc);
      });
    })

    // Delete Khuvuc

    app.delete('/deletekhuvuc/:khuvucId', function(req, res){
      Khuvuc.remove({_id: req.params.khuvucId}, function(err) {
        if (err) throw err;
        res.send(true);
      });
    })

    // Get Tinh

    app.get('/gettinh', function(req, res){
      Tinh.find(function(err, tinh){
        if(err) throw err;
        res.json(tinh);
      });
    })

    app.get('/gettinh/:id', function(req, res){
      Tinh.findOne({_id : req.params.id}, function(err, tinh){
        if(err) throw err;
        res.json(tinh);
      });
    })

    // Add Tinh

    app.post('/addtinh', function(req, res){
      var nTinh = new Tinh();
      nTinh.ten =  req.body.tinh;
      nTinh.diem =  req.body.diemtinh;
      nTinh.ma =  req.body.matinh;
      nTinh.save(function(err){
        if(err) throw err;
        res.send(true);
      });
    })

    app.put('/edittinh/:id', function(req, res){
      Tinh.findByIdAndUpdate(req.params.id, {ten: req.body.ten, diem: req.body.diem, ma: req.body.ma} , { new: true }, function (err, tinh) {
        if (err) throw err;
        res.send(tinh);
      });
    })

    // Delete Tinh

    app.delete('/deletetinh/:tinhId', function(req, res){
      Tinh.remove({_id: req.params.tinhId}, function(err) {
        if (err) throw err;
        res.send(true);
      });
    })

    // Get Doi Tuong

    app.get('/getdoituong', function(req, res){
      Doituong.find(function(err, doituong){
        if(err) throw err;
        res.json(doituong);
      });
    })

    app.get('/getdoituong/:id', function(req, res){
      Doituong.findOne({_id : req.params.id}, function(err, doituong){
        if(err) throw err;
        res.json(doituong);
      });
    })

    // Add Doi Tuong

    app.post('/adddoituong', function(req, res){
      var nDoituong = new Doituong();
      nDoituong.ten =  req.body.doituong;
      nDoituong.diem =  req.body.diemdoituong;
      nDoituong.ma =  req.body.madoituong;
      nDoituong.save(function(err){
        if(err) throw err;
        res.send(true);
      });
    })

    app.put('/editdoituong/:id', function(req, res){
      Doituong.findByIdAndUpdate(req.params.id, {ten: req.body.ten, diem: req.body.diem, ma: req.body.ma} , { new: true }, function (err, doituong) {
        if (err) throw err;
        res.send(doituong);
      });
    })

    // Delete Doi Tuong

    app.delete('/deletedoituong/:doituongId', function(req, res){
      Doituong.remove({_id: req.params.doituongId}, function(err) {
        if (err) throw err;
        res.send(true);
      });
    })

    // Get Hoc Luc

    app.get('/gethocluc', function(req, res){
      Hocluc.find(function(err, hocluc){
        if(err) throw err;
        res.json(hocluc);
      });
    })

    app.get('/gethocluc/:id', function(req, res){
      Hocluc.findOne({_id : req.params.id}, function(err, hocluc){
        if(err) throw err;
        res.json(hocluc);
      });
    })

    // Add Hoc Luc

    app.post('/addhocluc', function(req, res){
      var nHocluc = new Hocluc();
      nHocluc.ten =  req.body.hocluc;
      nHocluc.diem =  req.body.diemhocluc;
      nHocluc.ma =  req.body.mahocluc;
      nHocluc.save(function(err){
        if(err) throw err;
        res.send(true);
      });
    })

    app.put('/edithocluc/:id', function(req, res){
      Hocluc.findByIdAndUpdate(req.params.id, {ten: req.body.ten, diem: req.body.diem, ma: req.body.ma} , { new: true }, function (err, hocluc) {
        if (err) throw err;
        res.send(hocluc);
      });
    })

    // Delete Hoc Luc

    app.delete('/deletehocluc/:hoclucId', function(req, res){
      Hocluc.remove({_id: req.params.hoclucId}, function(err) {
        if (err) throw err;
        res.send(true);
      });
    })

    // Get Hoan Canh

    app.get('/gethoancanh', function(req, res){
      Hoancanh.find(function(err, hoancanh){
        if(err) throw err;
        res.json(hoancanh);
      });
    })

    app.get('/gethoancanh/:id', function(req, res){
      Hoancanh.findOne({_id : req.params.id}, function(err, hoancanh){
        if(err) throw err;
        res.json(hoancanh);
      });
    })

    // Add Hoan Canh

    app.post('/addhoancanh', function(req, res){
      var nHoancanh = new Hoancanh();
      nHoancanh.ten =  req.body.hoancanh;
      nHoancanh.diem =  req.body.diemhoancanh;
      nHoancanh.ma =  req.body.mahoancanh;
      nHoancanh.save(function(err){
        if(err) throw err;
        res.send(true);
      });
    })

    app.put('/edithoancanh/:id', function(req, res){
      Hoancanh.findByIdAndUpdate(req.params.id, {ten: req.body.ten, diem: req.body.diem, ma: req.body.ma} , { new: true }, function (err, hoancanh) {
        if (err) throw err;
        res.send(hoancanh);
      });
    })

    // Delete Hoan Canh

    app.delete('/deletehoancanh/:hoancanhId', function(req, res){
      Hoancanh.remove({_id: req.params.hoancanhId}, function(err) {
        if (err) throw err;
        res.send(true);
      });
    })

    app.get('/getphong', function(req, res){
      Phong.find(function(err, phong){
        if(err) throw err;
        res.json(phong);
      });
    })

    // Add Chi Tieu

      app.post('/addphong', function(req, res){
        var nPhong = new Phong();
        nPhong.ten = req.body.ten;
        nPhong.loai = req.body.loai;
        nPhong.gia = req.body.gia;
        nPhong.kichco = req.body.kichco;
        nPhong.soluong = req.body.soluong;
        nPhong.save(function(err){
          if(err) throw err;
          res.send(true);
        });
      })

      // Delete Student

      app.delete('/deletephong/:phongId', function(req, res){
        Phong.remove({_id: req.params.phongId}, function(err) {
          if (err) throw err;
          res.send(true);
        });
      })

      app.get('/getphongchitiet', function(req, res){
        Phongchitiet
        .find()
        .populate('_loai')
        .populate('_tang')
        .exec(function(err, phong){
          if(err) throw err;
          res.json(phong);
        });
      })

      // Add Chi Tieu
      app.put('/updategiuongdachon', function(req, res){
        Phongchitiet.update({'giuong.ten' : req.body.tengiuongcu}, {'$set':  {'giuong.$.da_dang_ky': false}}, function(err){
          if(err) res.send(err);
        });
        Phongchitiet.update({'giuong.ten' : req.body.tengiuongmoi}, {'$set':  {'giuong.$.da_dang_ky': true}}, function(err){
          if(err) res.send(err);
        });
        res.send(true);
      })

        app.post('/addphongchitiet', function(req, res){
          var nPhongchitiet = new Phongchitiet();
          nPhongchitiet._loai = req.body.loai;
          nPhongchitiet.ma = req.body.ma;
          nPhongchitiet._tang = req.body.tang;
          nPhongchitiet.save(function(err){
            if(err) throw err;
            res.send(true);
          });
        })

        app.put('/addphongchitiet/giuong', function(req, res){
          Phongchitiet.findOne({_id : req.body.tenphong}, function(err, phongchitiet) {
            if(err) throw err;
            if(phongchitiet.giuong) {
              for(var i = 0; i < phongchitiet.giuong.length; i++) {
                if(phongchitiet.giuong[i].ten === req.body.tengiuong) {
                  return false;
                }
              };
            }
            phongchitiet.update({$push: {'giuong' : {'ten' : req.body.tengiuong}}}, function(err){
              if(err) throw err;
              res.send(true);
            });
          })
        })

        // Delete Student

        app.delete('/deletephongchitiet/:phongchitietId', function(req, res){
          Phongchitiet.remove({_id: req.params.phongchitietId}, function(err) {
            if (err) throw err;
            res.send(true);
          });
        })

        app.get('/gettang', function(req, res){
          Tang.find(function(err, tang){
            if(err) throw err;
            res.json(tang);
          });
        })

        // Add Chi Tieu

          app.post('/addtang', function(req, res){
            var nTang = new Tang();
            nTang.ten = req.body.ten;
            nTang.save(function(err){
              if(err) throw err;
              res.send(true);
            });
          })

          // Delete Student

          app.delete('/deletetang/:tangId', function(req, res){
            Tang.remove({_id: req.params.tangId}, function(err) {
              if (err) throw err;
              res.send(true);
            });
          })

          app.get('/getdichvu', function(req, res){
            Dichvu.find(function(err, dichvu){
              if(err) throw err;
              res.json(dichvu);
            });
          })

          // Add Chi Tieu

            app.post('/adddichvu', function(req, res){
              var nDichvu = new Dichvu();
              nDichvu.ten = req.body.ten;
              nDichvu.gia = req.body.gia;
              nDichvu.save(function(err){
                if(err) throw err;
                res.send(true);
              });
            })

            // Delete Student

            app.delete('/deletedichvu/:dichvuId', function(req, res){
              Dichvu.remove({_id: req.params.dichvuId}, function(err) {
                if (err) throw err;
                res.send(true);
              });
            })

            app.get('/gethedaotao', function(req, res){
              Hedaotao.find(function(err, hedaotao){
                if(err) throw err;
                res.json(hedaotao);
              });
            })

            // Add Chi Tieu

              app.post('/addhedaotao', function(req, res){
                var nHedaotao = new Hedaotao();
                nHedaotao.ten = req.body.ten;
                nHedaotao.save(function(err){
                  if(err) throw err;
                  res.send(true);
                });
              })

              // Delete Student

              app.delete('/deletehedaotao/:hedaotaoId', function(req, res){
                Hedaotao.remove({_id: req.params.hedaotaoId}, function(err) {
                  if (err) throw err;
                  res.send(true);
                });
              })

}
