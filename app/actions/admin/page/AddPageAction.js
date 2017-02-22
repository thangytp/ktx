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
        'updateLinkToPage',
        'updateVideoText',
        'updateVideoLink',

        'openModalDelete',
        'closeModalDelete',
        'deleteItemOfRight',

        'cotphaiHome',

        'addPageSuccess',
        'addPageFail',
        'updatePageSuccess',
        'updatePageFail',

        'invalidTitle',
        'invalidContent',
        'invalidContentRight',
        'invalidImgLink',
        'invalidVideoLink',
        'closeModal',

        'getListPageSuccess',
        'getListPageFail',

        'getPageSuccess',
        'getPageFail',

        'openMoDDeletePage',
        'closeModalDeletePage',
        'deletePageSucess',
        'deletePageFail'

    );
  }

  updateImgText(payload){
    this.actions.updateImgText({text : payload.text, id: payload.id});
  }
  updateImgLink(payload){
    this.actions.updateImgLink({link: payload.link, id: payload.id});
  }
  updateLinkToPage(payload){
    this.actions.updateLinkToPage({linkToPage: payload.linkToPage, id: payload.id});
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
    // console.log(payload);
      $.ajax({
        url: '/api/addpage',
        type: 'POST',
        data: {title: payload.title, layoutType: payload.layoutType, content: payload.contentLeft,
          cotphaiHome: payload.cotphaiHome, imgRight: payload.imgRight, videoRight: payload.videoRight,
          numberOfImageItem: payload.numberOfImageItem, numberOfVideoItem: payload.numberOfVideoItem},
      })
      .done((data) =>{
        this.actions.addPageSuccess(data);
        console.log("success");
      })
      .fail((jqXhr) =>{
        this.actions.addPageFail(jqXhr.responseJSON.message);
        console.log("error");
      });

  }

  // update page
  updatePage(payload){
      $.ajax({
        url: '/api/updatepage',
        type: 'PUT',
        data: {id: payload.id, title: payload.title, layoutType: payload.layoutType, content: payload.contentLeft,
          cotphaiHome: payload.cotphaiHome, imgRight: payload.imgRight, videoRight: payload.videoRight,
          numberOfImageItem: payload.numberOfImageItem, numberOfVideoItem: payload.numberOfVideoItem},
      })
      .done((data) =>{
        this.actions.updatePageSuccess(data);
        console.log("success");
      })
      .fail((jqXhr) =>{
        this.actions.updatePageFail(jqXhr.responseJSON.message);
        console.log("error");
      });

  }

  //get list page
  getListPage(){
    $.ajax({
      type: 'GET',
      url: '/api/getListPage'})
      .done((data) => {
        this.actions.getListPageSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getListPageFail(jqXhr.responseJSON);
      });
  }

  //get page by id
  getPage(id){
    $.ajax({
    url: '/api/getpage/'+id})
    .done((data) => {
      this.actions.getPageSuccess(data.data);
    })
    .fail((jqXhr) => {
      this.actions.getPageFail(jqXhr.responseJSON.message);
    });
  }

  // delete page
  openMoDDeletePage(id){
    this.actions.openMoDDeletePage(id);
  }
  deletePage(id){
    $.ajax({
      type: 'DELETE',
      url: '/api/deletepage',
      data: {id: id}
    })
    .done((data) => {
        this.actions.deletePageSucess(data);
      })
      .fail((jqXhr) => {
        this.actions.deletePageFail(jqXhr.responseJSON.message);
      });
  }

}

export default alt.createActions(AddPageAction);
