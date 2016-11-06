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

        'deleteChaSuccess',
        'deleteChaFail',

        'moveUpOrderSuccess',
        'moveUpOrderFail',

        'moveDownOrderSuccess',
        'moveDownOrderFail',

       	'updateItemMenuName',
        'updateParent',

        'openModal',
        'closeModal',

        'openModalDelete',
        'closeModalDelete',

        'existTitle',
        'noneExistTitle',

        'invalidName'
    
    );
  }

  openMD(id){
    this.actions.openModal(id);
  }
  openMoDDeleteCha(id){
    this.actions.openModalDelete(id);
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

  deleteCha(id)
  {
    $.ajax({
      type: 'POST',
      url: '/api/deletemenuitemcha',
      data: { id: id}
    })
      .done((data) => {
        this.actions.deleteChaSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.deleteChaFail(jqXhr.responseJSON.message);
      });
  }

  moveUpOrder(id, type){
    $.ajax({
      type: 'PUT',
      url: '/api/moveuporder',
      data: { id: id, type: type}
    })
      .done((data) => {
        this.actions.moveUpOrderSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.moveUpOrderFail(jqXhr.responseJSON.message);
      });
  }
  moveDownOrder(id, type){
    $.ajax({
      type: 'PUT',
      url: '/api/movedownorder',
      data: { id: id, type: type}
    })
      .done((data) => {
        this.actions.moveDownOrderSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.moveDownOrderFail(jqXhr.responseJSON.message);
      });
  }

  checkNameMenu(name, parent)
  {
     $.ajax({
      type:'POST',
      url:'/api/checknamemenu',
      data:{
        title: name, _parentId: parent
          }
    })
    .done((data) => {
      this.actions.existTitle(data.message);
    })
    .fail((jqXhr) =>{      
     // console.log(jqXhr.responseText.message);
      this.actions.noneExistTitle();
    });
  }

}

export default alt.createActions(HomeMenuAction);
