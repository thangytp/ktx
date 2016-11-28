import alt from '../../../alt';
import ViewDetailPageAction from '../../../actions/main/page/ViewDetailPageAction';

class ViewDetailPageStore {
  constructor() {
    this.bindActions(ViewDetailPageAction);
    	this.page = {};
	}
	onGetPageByLinkSuccess(data){
		this.page = data;
		console.log(data);
	}
	onGetPageByLinkFail(data){
		console.log('Khong the get duoc trang');
	}
}

export default alt.createStore(ViewDetailPageStore);