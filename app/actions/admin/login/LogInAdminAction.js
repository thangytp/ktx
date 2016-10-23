import alt from '../../../alt';

class LogInAdminAction {
  constructor() {
    this.generateActions(
       'loginSuccess',
       'loginFail',
       'logout'
    );
  }
  handleLogin(payload) {
    $.ajax({
      url: '/login/' + payload.email + '/' + payload.password,
      type: 'GET'
    })
    .done((data) => {
      this.actions.loginSuccess(data);
    })
    .fail((jqXhr) =>{
    this.actions.loginFail('Tên truy cập hoặc mật khẩu không đúng');
    });
  }
}

export default alt.createActions(LogInAdminAction);
