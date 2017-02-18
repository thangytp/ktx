import alt from '../../../alt';

class TinTucHomeAction {
  constructor() {
    this.generateActions(


        'updateTitleTinTucHome',
        'updateLinkChitiet',
        'updateHienThi',

        'addTinTucHomeSuccess',
        'addTinTucHomeFail',
        'updateTinTucHomeSuccess',
        'updateTinTucHomeFail',

        'invalidTitle',
        'invalidContent',
        'invalidLinkChitiet',

        'getListTinTucHomeSuccess',
        'getListTinTucHomeFail',

        'getTinTucHomeSuccess',
        'getTinTucHomeFail',

        'openMoDDeleteTinTuc',
        'closeModalDeleteTinTuc',
        'deleteTinTucSucess',
        'deleteTinTucFail',
        'closeModal',
        'searchTinTucSuccess',

        'updateTinTucSelect',

        'getListTinTucToDisplayHomeSuccess',
        'getListTinTucToDisplayHomeFail'

    );
  }

  // add page
  addTinTucHome(payload){
    // console.log(payload);
      $.ajax({
        url: '/api/addtintuchome',
        type: 'POST',
        data: { title: payload.title, content: payload.contentLeft, linkChitiet: payload.linkChitiet, hienthi: payload.hienthi },
      })
      .done((data) =>{
        this.actions.addTinTucHomeSuccess(data);
        console.log("success");
      })
      .fail((jqXhr) =>{
        this.actions.addTinTucHomeFail(jqXhr.responseJSON.message);
        console.log("error");
      });

  }

  // update page
  updateTinTucHome(payload){
      $.ajax({
        url: '/api/updatetintuchome',
        type: 'PUT',
        data: { id: payload.id, title: payload.title, content: payload.contentLeft, linkChitiet: payload.linkChitiet, hienthi: payload.hienthi},
      })
      .done((data) =>{
        this.actions.updateTinTucHomeSuccess(data);
        console.log("success");
      })
      .fail((jqXhr) =>{
        this.actions.updateTinTucHomeFail(jqXhr.responseJSON.message);
        console.log("error");
      });

  }

  //get list page
  getListTinTuc(){
    $.ajax({
      type: 'GET',
      url: '/api/getListTinTucHome'})
      .done((data) => {
        this.actions.getListTinTucHomeSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getListTinTucHomeFail(jqXhr.responseJSON);
      });
  }

  // get list tin tuc co hienthi=1
  getListTinTucToDisplayHome(){
    $.ajax({
      type: 'GET',
      url: '/api/getListTinTucToDisplayHome'})
      .done((data) => {
        this.actions.getListTinTucToDisplayHomeSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getListTinTucToDisplayHomeFail(jqXhr.responseJSON);
      });
  }

  //get page by id
  getTinTuc(id){
    $.ajax({
    url: '/api/gettintuchome/'+id})
    .done((data) => {
      this.actions.getTinTucHomeSuccess(data.data);
    })
    .fail((jqXhr) => {
      this.actions.getTinTucHomeFail(jqXhr.responseJSON.message);
    });
  }

  // delete page
  openMoDDeleteTinTuc(id){
    this.actions.openMoDDeleteTinTuc(id);
  }
  deleteTinTuc(id){
    $.ajax({
      type: 'DELETE',
      url: '/api/deletetintuchome',
      data: {id: id}
    })
    .done((data) => {
        this.actions.deleteTinTucSucess(data);
      })
      .fail((jqXhr) => {
        this.actions.deleteTinTucFail(jqXhr.responseJSON.message);
      });
  }

  searchTinTuc(name){
    $.ajax({
      type:'GET',
      url:'/api/searchtintuchome/' + name,

    })
    .done((data) => {
      this.actions.searchTinTucSuccess(data);
    })
    .fail((jqXhr) =>{
     console.log(jqXhr.responseText.message);
      // this.actions.noneExistTitle();
    });
  }

  updateTinTucSelect(payload){
    this.actions.updateTinTucSelect({slug: payload.slug});
  }

}

export default alt.createActions(TinTucHomeAction);
