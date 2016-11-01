import alt from '../../../alt';

class AddItemMenuAction {
  constructor() {
    this.generateActions(
       	'showContentRight',
       	'hideContentRight',
       	'handleUpload',
       	'uploadSuccess',
      	'uploadFail',
    	'updateImagepreview',
		'updateImagefile',
		'addImg'
    
    );
  }

  uploadImage(imgfile)
  {
    var fd = new FormData();
    fd.append( 'file', imgfile);
    $.ajax({
        url: '/api/imageupload',
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST'
    })
    .done((data) => {
      this.actions.uploadSuccess(data.link);

    })
    .fail((jqXhr) =>{
      this.actions.uploadFail(jqXhr.responseJSON.message);
    });
  }

}

export default alt.createActions(AddItemMenuAction);
