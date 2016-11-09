import alt from '../../alt';

class AddImgItemAction {
  constructor() {
    this.generateActions(
      
      'openModal',
      'closeModal'

    );
  }

  openModalSel(id){
  	this.actions.openModal(id);
  }

}

export default alt.createActions(AddImgItemAction);