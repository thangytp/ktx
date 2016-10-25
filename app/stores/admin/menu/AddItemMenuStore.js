import alt from '../../../alt';
import AddItemMenuAction from '../../../actions/admin/menu/AddItemMenuAction';

class AddItemMenuStore {
  constructor() {
    this.bindActions(AddItemMenuAction);
    this.styleContentRight = 'none';
    
  }
  onShowContentRight(){
    this.styleContentRight = 'block';
  }
  onHideContentRight(){
    this.styleContentRight = 'none';
  }
  
}

export default alt.createStore(AddItemMenuStore);
