import alt from '../../../alt';
import localStorage from 'localStorage';
import LogInAction from '../../../actions/main/user/LogInAction';

class LogInStore {
  constructor() {
    this.bindActions(LogInAction);
    this.loginSuccessMess = '';
    this.loginFailMess = '';
  }

  onLogout()
  {
  //   localStorage.removeItem('userid');
  	localStorage.removeItem('email');
    localStorage.removeItem('avatar');
    this.loginSuccessMess = '';
    this.loginFailMess = '';
  
    setTimeout(function() {
      window.location.reload();
    }, 500);
  }
  onLoginSuccess(response)
  {
    localStorage.setItem('email', response.profileObj.email);
    localStorage.setItem('avatar', response.profileObj.imageUrl);
    localStorage.setItem('name', response.profileObj.name);
    localStorage.setItem('accessToken', response.accessToken);
    
    this.loginSuccessMess='Đăng nhập thành công';
  	setTimeout(function() {
      history.go(-1);
  	}, 500);

  }
  onLoginFail()
   {
   		this.loginFailMess=message;
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

export default alt.createStore(LogInStore);
