import alt from '../../../alt';

class KhoaAdminAction {
  	constructor() {
	    this.generateActions(
	    		'closeModalDelete',
	    		'updateItemMenuName'
	    	);
	}
}

export default alt.createActions(KhoaAdminAction);
