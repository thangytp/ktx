import alt from '../../../alt';
import ManageHedaotaoAction from '../../../actions/admin/khoa/ManageHedaotaoAction';
import localStorage from 'localStorage';


class ManageHedaotaoStore {
  constructor() {
    this.bindActions(ManageHedaotaoAction);
    this.hedaotao = [];
  }

  onGetHedaotaoSuccess(response) {
    this.hedaotao = response;
  }

  onAddHedaotaoSuccess() {
    ManageHedaotaoAction.getHedaotao();
  }

  onDelHedaotaoSuccess() {
    ManageHedaotaoAction.getHedaotao();
  }
  // onUpdateuser(event)
  // {
  // 	this.user = event.target.value;
  //    this.helpBlock='';
  // }
  // onUpdatepassword(event)
  // {
  // 	this.password = event.target.value;
  //   this.helpBlock='';
  // }
  // onSetOpenModal(boolean)
  // {
  //     this.LoginModalisOpen = boolean;
  //     this.user ='';
  //     this.password ='';
  // }
}

export default alt.createStore(ManageHedaotaoStore);
