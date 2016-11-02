import alt from '../../../alt';

class ListImageAction {
  constructor() {
    this.generateActions(
      'getListImageSuccess',
      'getListImageFail', 
      'deleteSucess',
      'deleteFail',
      'updateMesCopy',

      'updateArrayId',
      'removeArrayId',

      'openModal',
      'closeModal'

    );
  }
  delete(id){  
    $.ajax({
      type: 'POST',
      url: '/api/deletebook',
      data: { id: id}
    })
      .done((data) => {
        this.actions.deleteSucess(data.message);
        // listTransActions.deleteTranByBookId(temp);
        // listTransActions.get();
      })
      .fail((jqXhr) => {
        this.actions.deleteFail(jqXhr.responseJSON.message);
      });
  }
  get() {
    $.ajax({    
      url: '/api/listimage'      
    })
      .done((data) => {
        this.actions.getListImageSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getListImageFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(ListImageAction);