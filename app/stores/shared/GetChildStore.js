import alt from '../../alt';
import GetChildAction from '../../actions/shared/GetChildAction';

class GetChildStore {
  constructor() {
    this.bindActions(GetChildAction);
    
    this.listCon = [];

  }


  onGetListConSuccess(data){
    this.listCon.push(data);
    console.log(this.listCon);
  }
  onGetListConFail(jqXhr){
    console.log("khong get dc danh sach con");
  }

  
}

export default alt.createStore(GetChildStore);
