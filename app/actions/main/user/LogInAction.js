import alt from '../../../alt';

class LogInAction {
  constructor() {
    this.generateActions(
       'handleLogin',
       'loginSuccess',
       'loginFail',
       'logout'
    );
  }
}

export default alt.createActions(LogInAction);
