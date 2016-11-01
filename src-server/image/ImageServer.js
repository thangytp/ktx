var image = require('../../models/Image');

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

}
module.exports = ImageServer;