import React from 'react';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';
import SignUpAction from '../../../actions/main/user/SignUpAction';
import SignUpStore from '../../../stores/main/user/SignUpStore';

export default class SignUp extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = SignUpStore.getState();
    this.onChange = this.onChange.bind(this);
  }
   componentDidMount() {  
    SignUpStore.listen(this.onChange);
  }
  componentWillUnmount() {
    SignUpStore.unlisten(this.onChange);
  }
  onChange(state) {
    this.setState(state);
  } 
  handleSubmitUser(event)
  {   
    var username = this.state.username.trim();
    var password = this.state.password;
    var repassword = this.state.repassword;
    var firstname = this.state.fname;
    var lastname = this.state.lname;
    var barcode = '';
    var type = this.state.type;

    if (!lastname) {
      SignUpAction.invalidlastName();
      this.refs.lastNameTextField.focus();
    }
    if (!firstname) {
      SignUpAction.invalidfirstName();
      this.refs.firstNameTextField.focus();
    }
    if (!repassword) {
      SignUpAction.invalidrepassword();
      this.refs.repasswordTextField.focus();
    }
    if (!password) {
      SignUpAction.invalidpassword();
      this.refs.passwordTextField.focus();
    }
    if (!username) {
      SignUpAction.invaliduserName();
      this.refs.userNameTextField.focus();
    }
    if(repassword != password)
    {
      SignUpAction.passwordNotSame();
      this.refs.repasswordTextField.focus();
    }
    if (username && repassword && password &&firstname &&lastname &&type) {
          SignUpAction.addUser({
            id:'',
            userName:username,
            pass:password,
            firstName:firstname,
            lastName:lastname ,
            barcode:barcode,
            type: Number(type),
            avatar:'/uploads/avatar.jpg'
          });
    }
     event.preventDefault();
  }

  render() {
    let style ={'backgroundColor':'#1a75ff',  'borderRadius': '15px 15px 0px 0px', 'color': '#fff','padding':'10px'};
    return (     
            <div className="container signup">
              <h2>Đăng ký tài khoản mới</h2>
              <form className="form-horizontal" role="form">
                <div className="form-body">
                  <div className={'form-group has-feedback ' + this.state.usernameValidationState}>
                    <label htmlFor="uname" className="col-md-3 control-label">Email sinh viên</label>
                    <div className="col-md-9">
                        <input type="text" ref='userNameTextField' className="form-control" value = {this.state.username} 
                        onChange={SignUpAction.updateusername} id="uname" placeholder="Nhập mail sinh viên" required />
                        <i className="form-control-feedback fa fa-user" />
                    </div>
                  </div> 
                  <div className={'form-group has-feedback ' + this.state.passwordValidationState}>
                    <label htmlFor="pass" className="col-md-3 control-label">Mật khẩu</label>
                    <div className="col-md-9">
                        <input type="password" ref='passwordTextField' className="form-control" value ={this.state.password}
                        onChange ={SignUpAction.updatepassword} id="pass" placeholder="Mật khẩu" required />
                        <i className="form-control-feedback fa fa-lock" />
                    </div>
                  </div> 
                  <div className={'form-group has-feedback ' + this.state.repasswordValidationState}>
                    <label htmlFor="repass" className="col-md-3 control-label">Nhập lại mật khẩu</label>
                    <div className="col-md-9">
                        <input type="password" ref='repasswordTextField' className="form-control" value ={this.state.repassword}
                        onChange ={SignUpAction.updaterepassword} id="repass" placeholder="Nhập lại mật khẩu" required />
                        <i className="form-control-feedback fa fa-lock" />
                    </div>
                  </div>                     
                </div> 
           
                 {/* <div className="form-group">
                    <label className="col-md-3 control-label" />
                    <div className="col-md-9">
                      <input type="checkbox" name="remember" defaultValue={1} /> Nhớ đến tôi?
                    </div>
                  </div>  */} 
                <div className="form-group"> 
                  <div className="col-sm-offset-3 col-sm-9">
                    <button type="submit" className="btn btn-default btn-signup" onClick ={this.handleSubmitUser.bind(this)}>Đăng ký</button>
                  </div>
                </div>    
              </form> 
            </div>
    );
  }
}
