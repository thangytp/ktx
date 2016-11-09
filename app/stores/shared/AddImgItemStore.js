import alt from '../../alt';
import AddImgItemAction from '../../actions/shared/AddImgItemAction';

class AddImgItemStore {
  constructor() {
    this.bindActions(AddImgItemAction);
    
    this.modalIsOpen=false;
    this.idSelItemImg = '';
  }
 
 onOpenModal(id)
  {
      this.idSelItemImg = id;
      this.modalIsOpen=true;
  }
  onCloseModal()
  {
      this.modalIsOpen=false;
  }

 
  
}
export default alt.createStore(AddImgItemStore);