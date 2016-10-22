import alt from '../../../alt';
import localStorage from 'localStorage';
import LogInAction from '../../../actions/main/user/LogInAction';

class LogInStore {
  constructor() {
    this.bindActions(LogInAction);
    this.loginSuccessMess = '';
    this.loginFailMess = '';
  }

  onHandleLogin(data) {
    $.ajax({
      url: '/login/' + data.email + '/' + data.password,
      type: 'GET',
      success: function(res){
        if(res) {
          localStorage.setItem('email', data.email);
          this.loginSuccessMess='Đăng nhập thành công';
        	setTimeout(function() {
            history.go(-1);
        	}, 500);
        }
      }
    });
  }

  onLogout()
  {
  //   localStorage.removeItem('userid');
  	localStorage.removeItem('email');
    localStorage.removeItem('avatar');
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
 //  	console.log(data);
    // localStorage.setItem('userid', data._id);
    localStorage.setItem('email', response.profileObj.email);
    localStorage.setItem('avatar', response.profileObj.imageUrl);
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
