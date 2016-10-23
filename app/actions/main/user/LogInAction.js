import alt from '../../../alt';

class LogInAction {
  constructor() {
    this.generateActions(
       'loginSuccess',
       'loginFail',
       'logout'
    );
  }
}

export default alt.createActions(LogInAction);
