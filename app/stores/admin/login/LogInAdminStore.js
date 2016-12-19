import alt from '../../../alt';
import localStorage from 'localStorage';
import LogInAdminAction from '../../../actions/admin/login/LogInAdminAction';

class LogInAdminStore {
  constructor() {
    this.bindActions(LogInAdminAction);
    this.loginSuccessMess = '';
    this.loginFailMess = '';
    this.logout = false;

    this.access_token = '';
  }

  onLogout()
  {
    localStorage.clear();
    this.logout = true;
  }

  onLoginSuccess(response)
  {
    localStorage.setItem("adminTen", response.ten);
    localStorage.setItem('adminEmail', response.email);
    localStorage.setItem('adminType', response.type);
    localStorage.setItem('access_token', response.access_token);
    
    this.access_token = response.access_token;
    this.loginSuccessMess = 'Dang Nhap Thanh Cong';
    //window.location.reload();
    setTimeout(function() {
      history.go(-1);
    }, 500);
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
