import alt from '../../../alt';

class AddPageAction {
  constructor() {
    this.generateActions(
       	'showContentRight',
       	'hideContentRight',
       	'handleUpload',
       	'uploadSuccess',
      	'uploadFail',
    	  'updateImagepreview',
		    'updateImagefile',
		    'addImg',
		    'addVideo',

        'updateTitlePage',
        'updateImgText',
        'updateImgLink',
        'updateVideoText',
        'updateVideoLink',

        'openModalDelete',
        'closeModalDelete',
        'deleteItemOfRight',

        'cotphaiHome',

        'addPageSuccess',
        'addPageFail'
    
    );
  }

  updateImgText(payload){
    this.actions.updateImgText({text : payload.text, id: payload.id});
  }
  updateImgLink(payload){
    this.actions.updateImgLink({link: payload.link, id: payload.id});
  }

  updateVideoText(payload){
    this.actions.updateVideoText({text: payload.text, id: payload.id});
  }
  updateVideoLink(payload){
    this.actions.updateVideoLink({link: payload.link, id: payload.id});
  }

  openModDelete(payload){
    this.actions.openModalDelete({id: payload.id, type: payload.type});
  }

  // add page
  addPage(payload){
      $.ajax({
        url: '/api/addpage',
        type: 'POST',
        data: {id: payload.id, title: payload.title, layoutType: payload.layoutType, content: payload.content},
      })
      .done((data) =>{
        this.actions.addPageSuccess(data.message);
        console.log("success");
      })
      .fail((jqXhr) =>{
        this.actions.addPageFail(jqXhr.responseJSON.message);
        console.log("error");
      });
      
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

export default alt.createActions(AddPageAction);
