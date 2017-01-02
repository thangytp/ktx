import alt from '../../../alt';

class ListImageAction {
  constructor() {
    this.generateActions(
      'getListImageSuccess',
      'getListImageFail',
      'deleteSucess',
      'deleteFail',
      'updateMesCopy',
      'delImageSuccess',

      'updateArrayId',
      'removeArrayId',

      'openModal',
      'closeModal'

    );
  }
  delImage(payload){
    $.ajax({
      type: 'DELETE',
      url: '/deleteimage/' + payload,
    })
      .done((data) => {
        this.actions.delImageSuccess();
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
