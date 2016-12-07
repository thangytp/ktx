import alt from '../../../alt';

class QuanLyTinTucAction {
  constructor() {
    this.generateActions(
       	

        'updateTitleTinTuc',
        'updateDescription',
        
        'addTinTucSuccess',
        'addTinTucFail',
        'updateTinTucSuccess',
        'updateTinTucFail',

        'invalidTitle',
        'invalidContent',
        'invalidDes',

        'getListTinTucSuccess',
        'getListTinTucFail',

        'getTinTucSuccess',
        'getTinTucFail',

        'openMoDDeleteTinTuc',
        'closeModalDeleteTinTuc',
        'deleteTinTucSucess',
        'deleteTinTucFail',

        'getListTinTucBottomSuccess',
        'getListTinTucBottomFail',

        'getTinTucByLinkSuccess',
        'getTinTucByLinkFail',

        'updateImagepreview',
        'updateImagefile',
        'uploadSuccess',
        'uploadFail',
        'handleUpload'
    
    );
  }

  uploadImage(imgfile)
  {

    var fd = new FormData();
    fd.append( 'file', imgfile);
    console.log(fd);
    $.ajax({
        url: '/api/uploadanhtintuc',
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

  // add page
  addTinTuc(payload){
    // console.log(payload);
      $.ajax({
        url: '/api/addtintuc',
        type: 'POST',
        data: { title: payload.title, content: payload.contentLeft, description: payload.description, img: payload.img, dateCreate: payload.dateCreate, slug: payload.slug },
      })
      .done((data) =>{
        this.actions.addTinTucSuccess(data);
        console.log("success");
      })
      .fail((jqXhr) =>{
        this.actions.addTinTucFail(jqXhr.responseJSON.message);
        console.log("error");
      });
      
  }

  // update page
  updateTinTuc(payload){
      $.ajax({
        url: '/api/updatetintuc',
        type: 'PUT',
        data: { id: payload.id, title: payload.title, content: payload.contentLeft, description: payload.description, img: payload.img, dateModify: payload.dateModify, slug: payload.slug },
      })
      .done((data) =>{
        this.actions.updateTinTucSuccess(data);
        console.log("success");
      })
      .fail((jqXhr) =>{
        this.actions.updateTinTucFail(jqXhr.responseJSON.message);
        console.log("error");
      });
      
  }

  //get list page
  getListTinTuc(){
    $.ajax({
      type: 'GET', 
      url: '/api/getListTinTuc'})
      .done((data) => {
        this.actions.getListTinTucSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getListTinTucFail(jqXhr.responseJSON);
      });
  }

  //get page by id
  getTinTuc(id){
    $.ajax({
    url: '/api/gettintuc/'+id})
    .done((data) => {
      this.actions.getTinTucSuccess(data.data);
    })
    .fail((jqXhr) => {
      this.actions.getTinTucFail(jqXhr.responseJSON.message);
    });
  }

  // delete page
  openMoDDeleteTinTuc(id){
    this.actions.openMoDDeleteTinTuc(id);
  }
  deleteTinTuc(id){
    $.ajax({
      type: 'DELETE',
      url: '/api/deletetintuc',
      data: {id: id}
    })
    .done((data) => {
        this.actions.deleteTinTucSucess(data);
      })
      .fail((jqXhr) => {
        this.actions.deleteTinTucFail(jqXhr.responseJSON.message);
      });
  }

  // get list tin tuc to display bottom home
  //get list page
  getListTinTucBottom(){
    $.ajax({
      type: 'GET', 
      url: '/api/getListTinTucBottom'})
      .done((data) => {
        this.actions.getListTinTucBottomSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getListTinTucBottomFail(jqXhr.responseJSON);
      });
  }

  // get tin tuc by slug
  getTinTucByLink(link){
    $.ajax({
    url: '/api/gettintucbylink/'+link})
    .done((data) => {
      this.actions.getTinTucByLinkSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getTinTucByLinkFail(jqXhr.responseJSON.message);
    });
  }

}

export default alt.createActions(QuanLyTinTucAction);
