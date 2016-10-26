import alt from '../../../alt';
import localStorage from 'localStorage';
import LogInAdminAction from '../../../actions/admin/login/LogInAdminAction';

class LogInAdminStore {
  constructor() {
    this.bindActions(LogInAdminAction);
    this.loginSuccessMess = '';
    this.loginFailMess = '';
    this.isLogin = false;
  }

  onLogout()
  {
  	localStorage.removeItem('adminEmail');
    this.isLogin = false;
  }

  onLoginSuccess(response)
  {
    localStorage.setItem('adminEmail', response.email);
    this.isLogin = true;
    this.loginSuccessMess = 'Dang Nhap Thanh Cong';
  }
  
  onLoginFail(message)
   {
   		this.loginFailMess=message;
      window.location.reload();
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

export default alt.createStore(LogInAdminStore);
