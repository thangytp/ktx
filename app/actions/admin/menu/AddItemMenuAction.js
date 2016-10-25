import alt from '../../../alt';

class AddItemMenuAction {
  constructor() {
    this.generateActions(
       'showContentRight',
       'hideContentRight'
    
    );
  }

}

export default alt.createActions(AddItemMenuAction);
