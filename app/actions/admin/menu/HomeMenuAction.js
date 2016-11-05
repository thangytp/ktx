import alt from '../../../alt';

class HomeMenuAction {
  constructor() {
    this.generateActions(
       	'getListChaSuccess',
        'getListChaFail',

        'getListConSuccess',
        'getListConFail',

        'getListChildSuccess',
        'getListChildFail',

        'getListSubChildSuccess',
        'getListSubChildFail',

        'addItemMenuSuccess',
        'addItemMenuFail',

       	'updateItemMenuName',
        'updateParent',

        'openModal',
        'closeModal',

        'invalidName'
    
    );
  }

  openMD(id){
    this.actions.openModal(id);
  }

  getListCha(){
    $.ajax({
      type: 'GET', 
      url: '/api/getcha'})
      .done((data) => {
        this.actions.getListChaSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getListChaFail(jqXhr.responseJSON);
      });
  }
  getListChild(){
    $.ajax({
      type: 'GET', 
      url: '/api/getchild'})
      .done((data) => {
        this.actions.getListChildSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getListChildFail(jqXhr.responseJSON);
      });
  }
  getListSubChild(){
    $.ajax({
      type: 'GET', 
      url: '/api/getsubchild'})
      .done((data) => {
        this.actions.getListSubChildSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getListSubChildFail(jqXhr.responseJSON);
      });
  }

  //get danh sach con (table con)
  getListCon(idCha){
    $.ajax({
      type: 'GET', 
      url: '/api/getcon/'+ idCha})
      .done((data) => {
        this.actions.getListConSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getListConFail(jqXhr.responseJSON);
      });
  }

  addItemMenu(payload) {
    $.ajax({
      type: 'POST',
      url: '/api/additemmenu',
      data: {title: payload.title, slug: payload.slug, _parentId: payload._parentId}
    })
    .done((data) => {
        this.actions.addItemMenuSuccess(data.message);
    })
    .fail((jqXhr) => {
        this.actions.addItemMenuFail(jqXhr.responseJSON);
    });
  }

}

export default alt.createActions(HomeMenuAction);
