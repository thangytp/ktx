import alt from '../../alt';

class GetChildAction {
  constructor() {
    this.generateActions(
       	
        'getListConSuccess',
        'getListConFail'
    
    );
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


}

export default alt.createActions(GetChildAction);
