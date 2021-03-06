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
var Hoadon = require('../../models/hoadon');


var Tienktx = require('../../models/tienktx');
var Daluutru = require('../../models/daluutru');



var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var bcrypt   = require('bcrypt-nodejs');


module.exports = function(app, importStudent) {

  function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  }

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
        var access_token = randomString(128, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        admin.update({ $set: {access_token: access_token } }, function(err, re){
            if(err) throw err;
            else{
              Admin.findOne({access_token: access_token}, function(err, adminRes){
                res.json(adminRes);
              });

            }

        });

      }
    });
  });

  // Import students

  app.post('/upload', function(req, res) {
      var exceltojson;
      console.log(req.file);

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
                      if(result[i].ma_sinh_vien === '' ) {
                        break;
                      }
                      var StudentN = new Student({
                        ma_sinh_vien:result[i].ma_sinh_vien,
                        ho_lot:result[i].ho_lot,
                        ten:result[i].ten,
                        so_cmnd:result[i].so_cmnd,
                        nam_vao_truong:result[i].nam_vao_truong,
                        phai:result[i].phai,
                        ngay_sinh:result[i].ngay_sinh,
                        dia_chi_gia_dinh:result[i].dia_chi_gia_dinh,
                        email:result[i].email,
                        email_khac:result[i].email_khac,
                        ten_doan_the:result[i].ten_doan_the,
                        ton_giao:result[i].ton_giao,
                        sdt_giadinh:result[i].sdt_giadinh,
                        sdt_sinhvien:result[i].sdt_sinhvien,
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
          student.update({$set : {xet_duyet_thanh_cong: true, 'tien_ktx' : tienKTX + tienphong}}, {new: true}, function(err){
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
    console.log(req.params.phongid);
    Student
    .find({_phong_id: req.params.phongid, tamdung_hocvu : false, dang_o_ktx: true, diem_ren_luyen : {$gt: req.params.drl}, 'diem_ren_luyen_ktx.tong' : {$gt : req.params.drlktx}, 'diem_ren_luyen_ktx.ve_sinh' : {$gt : req.params.dvs}, diem_xet_duyet : { $ne:null },phai : req.params.phai, nam_vao_truong : fYear})
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
          student.update({$set : {gia_han_thanh_cong: true, 'tien_ktx' : tienKTX + tienphong}}, {new: true}, function(err){
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

  app.get('/getluutru/:stuId', function(req, res){
    Daluutru
    .findOne({_sinhvien_id: req.params.stuId})
    .populate('luutru._loaiphong')
    .populate('luutru._phong')
    .populate('luutru._tang')
    .exec(function(err, luutru){
      console.log(luutru);
      if(err) throw err;
      res.json(luutru);
    });
  })

  app.get('/getstudentbyemail/:email', function(req, res){
    Student
    .findOne({email: req.params.email})
    .populate('_phongchitiet_id')
    .populate('_phong_id')
    .populate('_tang_id')
    .exec(function(err, student){
      if(err) throw err;
      res.json(student);
    });
  })

  app.get('/getstudentbymssv/:mssv', function(req, res){
    Student
    .findOne({ma_sinh_vien: req.params.mssv})
    .populate('_phongchitiet_id')
    .populate('_phong_id')
    .populate('_tang_id')
    .exec(function(err, student){
      if(err) throw err;
      res.json(student);
    });
  })

  app.get('/api/getstudentbyphong/:tenphong', function(req, res){
    Phongchitiet
    .findOne({ma: req.params.tenphong})
    .exec(function(err, phong){
      if(err) throw err;
      Student
      .find({_phongchitiet_id: phong._id})
      .populate('_khoa_id')
      .exec(function(err, students){
        if(err) throw err;
        res.json(students);
      });
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
    var access_token = req.body.access_token;
    Admin.findOne({access_token: access_token}, function(err, admin){
      if(err) return next(err);
      if(admin){
        Student.findByIdAndUpdate(req.params.stuId, { ho_lot: req.body.holot, ten: req.body.ten, ngay_sinh: req.body.ngaySinh,
          phai: req.body.gioitinh, _khoa_id: req.body.svkhoa, _he_dao_tao_id: req.body.svhedaotao, nam_vao_truong: req.body.namvaotruong,
          _khu_vuc_id: req.body.svkhuvuc, _tinh_id: req.body.svtinh, _doi_tuong_id: req.body.svdoituong, tongiao: req.body.svtongiao, ten_doan_the: req.body.svdoanthe,
          so_cmnd: req.body.socmnd, dia_chi_gia_dinh: req.body.hokhau, sdt_sinhvien: req.body.svdienthoai, sdt_giadinh: req.body.giadinhdienthoai,
          email_khac: req.body.emailThuongDung, _hoc_luc_id: req.body.svhocluc, _hoan_canh_id: req.body.svhoancanh, _phong_id: req.body.svloaiphong,
          avatar: req.body.avatar} , { new: true }, function (err, student) {
          if (err) throw err;
          res.send(student);
        });
      }
    });
  })

  app.put('/updatethongtinktx/:stuId', function(req, res){
    var cYear = new Date().getFullYear(),
        cMonth = new Date().getMonth() + 1,
        cSemester = 1;
    if(cMonth >= 8 && cMonth <= 10) {
      cSemester = 1;
    }
    else if(cMonth === 12 && cMonth === 1) {
      cSemester = 2;
    }
    else if(cMonth >= 5 && cMonth <= 7) {
      cSemester = 3;
    }
    Student.findOne({_id : req.params.stuId}, function(err, student){
      Phongchitiet.findOne({_id : student._phongchitiet_id}, function(err, phong){
        if(err) throw err;
        if(phong != null) {
          if(phong.truong_phong != null) {
            if(phong.truong_phong == req.params.stuId) {
              phong.update({$set: {truong_phong : null}}, function(err){
                if(err) throw err;
              })
            }
          }
        }
      });
      Student.findByIdAndUpdate(req.params.stuId, {_tang_id: req.body.tang, ma_ktx : req.body.maktx, ma_giuong: req.body.giuong, _phongchitiet_id : req.body.phongchitiet, role: parseInt(req.body.vaitro), dang_o_ktx: true, da_dong_tien: true, gia_han_luu_tru: false} , { new: true }, function (err, student) {
        if (err) throw err;
        Tienktx.findOneAndUpdate({_sinhvien_id : req.params.stuId, nam: cYear, ki: cSemester}, {da_dong_tien: true}, {new : true}, function(err){
          if(err) throw err;
        });
        if(parseInt(req.body.vaitro) === 1) {
          Phongchitiet.findOneAndUpdate({_id : req.body.phongchitiet}, {truong_phong: req.params.stuId}, {new : true}, function(err){
            if(err) throw err;
          });
        }
        res.send(student);
      });
    });
  })

  app.post('/addluutru/:stuId', function(req, res){
    var cYear = new Date().getFullYear(),
        cMonth = new Date().getMonth() + 1,
        cSemester = 1;
    if(cMonth >= 8 && cMonth <= 10) {
      cSemester = 1;
    }
    else if(cMonth === 12 && cMonth === 1) {
      cSemester = 2;
    }
    else if(cMonth >= 5 && cMonth <= 7) {
      cSemester = 3;
    }
    var nDaluutru = new Daluutru();
    nDaluutru._sinhvien_id = req.params.stuId;
    nDaluutru.luutru.push({ki : cSemester, nam: cYear, _tang: req.body.tang,  _loaiphong: req.body.loaiphong, _phong: req.body.phongchitiet, giuong: req.body.giuong});
    nDaluutru.save(function(err){
      if( err) throw err;
    });
    // daluutru.update({_sinhvien_id : req.params.stuId}, {$push: {luutru : {ki : cSemester, _tang : req.body.tang, _loaiphong : req.body.loaiphong, _phong : req.body.phongchitiet, giuong : req.body.giuong}}}, {new : true}, function(err){
    //   if( err) throw err;
    //   console.log('b');
    // });
  })

  app.put('/updateluutru/:stuId', function(req, res){
    var cYear = new Date().getFullYear(),
        cMonth = new Date().getMonth() + 1,
        cSemester = 1;
    if(cMonth >= 8 && cMonth <= 10) {
      cSemester = 1;
    }
    else if(cMonth === 12 && cMonth === 1) {
      cSemester = 2;
    }
    else if(cMonth >= 5 && cMonth <= 7) {
      cSemester = 3;
    }
    Daluutru.findOneAndUpdate({_sinhvien_id : req.params.stuId}, {$push: {luutru : {ki : cSemester, nam: cYear, _tang : req.body.tang, _loaiphong : req.body.loaiphong, _phong : req.body.phongchitiet, giuong : req.body.giuong}}}, {new : true}, function(err){
      if( err) throw err;
      res.send(true);
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
      var cYear = new Date().getFullYear(),
          cMonth = new Date().getMonth() + 1,
          cSemester = 1;
      if(cMonth >= 8 && cMonth <= 10) {
        cSemester = 1;
      }
      else if(cMonth === 12 && cMonth === 1) {
        cSemester = 2;
      }
      else if(cMonth >= 5 && cMonth <= 7) {
        cSemester = 3;
      }

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
                    Student.findOneAndUpdate({ma_sinh_vien : result[i].ma_sinh_vien, gia_han_luu_tru : true}, {$push : { diem_ren_luyen_ktx : { tong : result[i].diem_ren_luyen_ktx, ve_sinh: result[i].diem_ve_sinh_ktx, nam: cYear, ki: cSemester}}} , { new: true }, function (err, student) {
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

    // Add loai phong

      app.post('/addphong', function(req, res){
        var access_token = req.body.access_token;
        Admin.findOne({access_token: access_token}, function(err, admin){
          if(err) return next(err);
          if(admin){
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
          }
        });
      })

      //update loai phong
      app.put('/api/updatephong', function(req, res, next){
        var access_token = req.body.access_token;
        Admin.findOne({access_token: access_token}, function(err, admin){
          if(err) return next(err);
          if(admin){
              var id = req.body.idEdit;
              var ten = req.body.tenEdit;
              var loai = req.body.loaiEdit;
              var gia = req.body.giaEdit;
              var kichco = req.body.kichcoEdit;
              var soluong = req.body.soluongEdit;
              Phong.findOne({_id: id}, function(err, phongRes){
                  if(err) return next(err);
                  if(phongRes){
                    phongRes.update({$set: {ten: ten, loai: loai, gia: gia, kichco: kichco, soluong: soluong} }, function(err1, re){
                        if(err1) return next(err1);
                        res.send({message: 'Cập nhật loại phòng thành công!'});
                    });
                  }
              });
          }
        });
      })

      // Delete Student

      app.delete('/deletephong', function(req, res){
        var access_token = req.body.access_token;
        Admin.findOne({access_token: access_token}, function(err, admin){
          if(err) return next(err);
          if(admin){
            Phong.remove({_id: req.body.id}, function(err) {
              if (err) throw err;
              res.send(true);
            });
          }
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

      //get phong chi tiet by id
      app.get('/api/getphongchitietbyid/:id', function(req, res){
        Phongchitiet
        .findOne({_id: req.params.id})

        .exec(function(err, phong){
          if(err) throw err;
          res.json(phong);
        });
      })

      // Add Chi Tieu
      app.put('/updategiuongdachon', function(req, res){
        Phongchitiet.update({'giuong.ten' : req.body.tengiuongcu}, {'$set':  {'giuong.$.da_dang_ky': false, 'giuong.$._sinhvien_id': null}}, function(err){
          if(err) throw err;
        });
        Phongchitiet.update({'giuong.ten' : req.body.tengiuongmoi}, {'$set':  {'giuong.$.da_dang_ky': true, 'giuong.$._sinhvien_id': req.body.userId}}, function(err){
          if(err) throw err;
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

        app.get('/viewdiennuoc/:phong/:nam', function(req, res){
          Hoadon.find({_ma_phong: req.params.phong, nam: req.params.nam}, function(err, phong){
            if(err) throw err;
            res.json(phong);
          });
        })

        app.get('/viewdiennuoc1/:phong', function(req, res){
          Hoadon.find({_ma_phong: req.params.phong}, function(err, phong){
            if(err) throw err;
            res.json(phong);
          });
        })

        app.post('/adddiennuoc', function(req, res){
          var nHoadon = new Hoadon();
          nHoadon._ma_phong = req.body.phong;
          nHoadon.nam = req.body.nam;
          nHoadon.thang = req.body.thang;
          nHoadon.dien.so = req.body.dien;
          nHoadon.dien.tongtien = req.body.tiendien;
          nHoadon.nuoc.so = req.body.nuoc;
          nHoadon.nuoc.tongtien = req.body.tiennuoc;
          nHoadon.save(function(err){
            if(err) throw err;
            res.send(true);
          });
        })

        app.put('/api/updatephongchitiet', function(req, res, next){
          var access_token = req.body.access_token;
          Admin.findOne({access_token: access_token}, function(err, admin){
              if(err) return next(err);
              if(admin){
                  Phongchitiet.findOne({_id: req.body.id}, function(err, phong){
                      if(err) return next(err);
                      if(phong){
                          phong.update({$set: {_loai: req.body._loai, ma: req.body.ma, _tang: req.body._tang} }, function(err1, re){
                              if(err) return next(err1);
                              res.send({message: 'Cập nhật thành công!'});
                          });
                      }
                  });
              }
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

        app.delete('/deletephongchitiet', function(req, res){
          var access_token = req.body.access_token;
          Admin.findOne({access_token: access_token}, function(err, admin){
              if(err) return next(err);
              if(admin){
                Phongchitiet.remove({_id: req.body.id}, function(err) {
                  if (err) throw err;
                  res.send(true);
                });
              }
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

        // Add dich vu

        app.post('/adddichvu', function(req, res){
          var nDichvu = new Dichvu();
          nDichvu.ten = req.body.ten;
          nDichvu.gia = req.body.gia;
          nDichvu.save(function(err){
            if(err) throw err;
            res.send(true);
          });
        })

        //update dich vu
        app.put('/api/updatedichvu', function(req, res, next){
          var access_token = req.body.access_token;
          Admin.findOne({access_token: access_token}, function(err, admin){
            if(err) return next(err);
            if(admin){
                var id = req.body.idEdit;
                var tendv = req.body.tendv;
                var giadv = req.body.giadv;
                Dichvu.findOne({_id: id}, function(err, dichvu){
                  if(err) return next(err);
                  if(dichvu){
                    dichvu.update({$set: {ten: tendv, gia: giadv} }, function(err1, re){
                      if(err1) return next(err1);
                      res.send({message: 'Cập nhật dịch vụ thành công!'});
                    });
                  }
                });
            }
          });
        })

        // Delete dich vu

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

      // Add hedaotao

        app.post('/addhedaotao', function(req, res){
          var nHedaotao = new Hedaotao();
          nHedaotao.ten = req.body.ten;
          nHedaotao.save(function(err){
            if(err) throw err;
            res.send(true);
          });
        })

        // Delete hedaotao

        app.delete('/deletehedaotao/:hedaotaoId', function(req, res){
          Hedaotao.remove({_id: req.params.hedaotaoId}, function(err) {
            if (err) throw err;
            res.send(true);
          });
        })

              app.post('/addtien', function(req, res){
                var cYear = new Date().getFullYear(),
                    cMonth = new Date().getMonth() + 1,
                    cSemester = 1;
                if(cMonth >= 8 && cMonth <= 10) {
                  cSemester = 1;
                }
                else if(cMonth === 12 && cMonth === 1) {
                  cSemester = 2;
                }
                else if(cMonth >= 5 && cMonth <= 7) {
                  cSemester = 3;
                }
                req.body.students.forEach(function(student){
                  var nTienktx = new Tienktx();
                  nTienktx._sinhvien_id = student._id;
                  nTienktx.sotien = student.tien_ktx;
                  nTienktx.ki = cSemester;
                  nTienktx.nam = cYear;
                  nTienktx.save(function(err){
                    if(err) throw err;
                  });
                });
                res.send(true);
              })
}
