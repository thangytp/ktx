import alt from '../../../alt';
import localStorage from 'localStorage';
import LogInAdminAction from '../../../actions/admin/login/LogInAdminAction';

class LogInAdminStore {
  constructor() {
    this.bindActions(LogInAdminAction);
    this.loginSuccessMess = '';
    this.loginFailMess = '';
  }

  onLogout()
  {
  //   localStorage.removeItem('userid');
  	localStorage.removeItem('adminEmail');
    this.loginSuccessMess = '';
    this.loginFailMess = '';
  // 	this.user ='';
  //   this.password ='';
  //   this.helpBlock='';
    setTimeout(function() {
      window.location.reload();
    }, 500);
  }
  onLoginSuccess(response)
  {
  	console.log(response);
    localStorage.setItem('adminEmail', response.email);
    this.loginSuccessMess = 'Dang Nhap Thanh Cong';
    window.location.reload();
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
