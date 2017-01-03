var Ticket = require('../../models/ticket');

function TicketServer(app){

  app.get('/getticket', function(req, res){
    Ticket.find(function(err, ticket){
      if(err) throw err;
      res.json(ticket);
    });
  })

  app.get('/getticket/:email', function(req, res){
    Ticket.find({nguoitao: req.params.email}, function(err, ticket){
      if(err) throw err;
      res.json(ticket);
    });
  })

  app.get('/getticket/:id', function(req, res){
    Ticket.findOne({_id : req.params.id}, function(err, ticket){
      if(err) throw err;
      res.json(ticket);
    });
  })

  app.post('/addticket', function(req, res){
    var nTicket = new Ticket();
    nTicket.nguoitao = req.body.nguoitao;
    nTicket.phong = req.body.phong;
    nTicket.tinnhan.push({"noidung" : req.body.noidung, "nguoipost" : req.body.nguoitao});
    nTicket.tieude = req.body.tieude;
    nTicket.save(function(err){
      if(err) throw err;
      res.send(true);
    });
  })

  app.put('/answerticket/:id', function(req, res){
    Ticket.findOneAndUpdate({_id : req.params.id}, {$push : {"tinnhan" : {"noidung" : req.body.noidung, "nguoipost" : req.body.nguoipost}}}, {new: true}, function(err){
      if(err) throw err;
      res.send(true);
    })
  })

  app.put('/changestatus/:id', function(req, res){
    if(req.body.trangthai === 'Đóng') {
      Ticket.findOneAndUpdate({_id : req.params.id}, {trangthai : req.body.trangthai, thoigiandong: Date.now()}, {new: true}, function(err){
        if(err) throw err;
        res.send(true);
      })
    } else {
      Ticket.findOneAndUpdate({_id : req.params.id}, {trangthai : req.body.trangthai}, {new: true}, function(err){
        if(err) throw err;
        res.send(true);
      })
    }
  })

  app.delete('/deleteticket/:ticketId', function(req, res){
    Ticket.remove({_id: req.params.ticketId}, function(err) {
      if (err) throw err;
      res.send(true);
    });
  })

}
module.exports = TicketServer;
