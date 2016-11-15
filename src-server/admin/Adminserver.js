var mongoose = require('mongoose');
var Admin = require('../../models/admin');
var Student = require('../../models/student');
var Chitieu = require('../../models/chitieu');
var Khuvuc = require('../../models/khuvuc');
var Tinh = require('../../models/tinh');
var Doituong = require('../../models/doituong');
var Hocluc = require('../../models/hocluc');
var Hoancanh = require('../../models/hoancanh');




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
    Student.find({tamdung_hocvu : false}, function(err, students){
      if(err) throw err;
      res.json(students);
    });
  })

  //Get Students By Diem Ren Luyen

  app.get('/getstudent/diem/:stuDiem', function(req, res){
    Student.find({tamdung_hocvu : false, diem_ren_luyen : {$gt: req.params.stuDiem}}, function(err, students){
      if(err) throw err;
      res.json(students);
    });
  })

  app.get('/getstudent/diemxetduyet/:soluong/:nam', function(req, res){
    var cYear = new Date().getFullYear(),
        cMonth = new Date().getMonth() + 1,
        fYear;
    if(cMonth > 10) {
      fYear = cYear - req.params.nam + 1;
    } else {
      fYear = cYear - req.params.nam;
    }
    console.log(fYear);
    Student
    .find({tamdung_hocvu : false, diem_ren_luyen : {$gt: 75}, diem_xet_duyet : { $ne:null }, nam_vao_truong : fYear})
    .sort('-diem_ren_luyen')
    .limit(req.params.soluong)
    .exec(function(err, students){
      console.log(students);
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
    console.log(req.body);
    Student.findByIdAndUpdate(req.params.stuId, {email: req.body.email, _khu_vuc_id : req.body.khuvuc, _tinh_id : req.body.tinh, _doi_tuong_id : req.body.doituong, _hoc_luc_id : req.body.hocluc, _hoan_canh_id : req.body.hoancanh} , { new: true }, function (err, student) {
      if (err) throw err;
      res.send(student);
      console.log(student);
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

  //Update Diem Ren Luyen

  app.put('/diemxetduyet', function(req, res) {
    var cYear = new Date().getFullYear(),
        cMonth = new Date().getMonth() + 1,
        fYear;
    if(cMonth > 10) {
      fYear = cYear - req.body.nam + 1;
    } else {
      fYear = cYear - req.body.nam;
    }
    Student.find({tamdung_hocvu : false, diem_ren_luyen : {$gt: 75}, nam_vao_truong : fYear})
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
      Khuvuc.find(function(err, khuvuc){
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

    // Delete Hoan Canh

    app.delete('/deletehoancanh/:hoancanhId', function(req, res){
      Hoancanh.remove({_id: req.params.hoancanhId}, function(err) {
        if (err) throw err;
        res.send(true);
      });
    })

}
