var image = require('../../models/Image');
var fs = require('fs');

function ImageServer(app){

app.get('/api/listimage', function(req, res, next){
	try{
	    image
	    .find()
	    .sort({_id:-1})
	    .exec(function(err, images){
	      if(err) next(err);
	      res.send(images);
	    })
	} catch(e){
		res.status(e).send({ message: 'Error when get list images'});
	}
});

app.delete('/deleteimage/:id', function(req,res){
	image.findById({ _id: req.params.id},function(err,data){
		if (err) throw err;
		fs.unlink('public/'+data.link);
		data.remove();
		res.send(true);
	})
});

}
module.exports = ImageServer;
