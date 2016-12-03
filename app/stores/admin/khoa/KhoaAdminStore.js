import alt from '../../../alt';
import KhoaAdminAction from '../../../actions/admin/khoa/KhoaAdminAction';

class KhoaAdminStore {
  	constructor() {
    	this.bindActions(KhoaAdminAction);

    	this.id = '';
    	this.ten = '';
    	this.classValidate = '';
    	this.validateTitle = '';
	}
}

export default alt.createStore(KhoaAdminStore);