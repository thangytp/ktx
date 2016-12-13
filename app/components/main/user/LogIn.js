import React from 'react';
import {Link} from 'react-router';
import GoogleLogin from 'react-google-login';
import LogInAction from '../../../actions/main/user/LogInAction';
import LogInStore from '../../../stores/main/user/LogInstore';

export default class LogIn extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = LogInStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		document.title = "Đăng nhập | Ký túc xá Bách Khoa"; 
		console.log(this.state);
	}
	componentWillUnmount() {

	}
	onChange(state) {
		this.setState(state);
	}
	success(response){
		LogInAction.loginSuccess(response);
		console.log(response);
	};

	error(response){
		LogInAction.loginFail();
		console.error(response);
	};
  	render(){
	  	return(
	  		<div className="container login-page">
	  			<div className="panel panel-fb rounded shadow no-overflow" style={{"width":"600px", "margin":"0 auto"}}>
	  				<div className="panel-heading">
	                	<h3 className="text-center text-white">Đăng nhập</h3>
	              	</div>
	  				<div className="panel-body no-padding mB20">
			  			<div className="button-gg pB10">
					  		<GoogleLogin
					  			hostedDomain={'hcmut.edu.vn'}
							    clientId={'208638865760-mhh7enejh65sunj1dgg3945kbspg27sm.apps.googleusercontent.com'}
							    onSuccess={this.success.bind(this)}
							    onFailure={this.error.bind(this)}
							    offline={false}
							  >
							    <span> Đăng nhập bằng mail sinh viên</span>
							  </GoogleLogin>
						</div>
						<span className="succ-login">{this.state.loginSuccessMess}</span>
						<span className="err-login">{this.state.loginFailMess}</span>
					</div>
				</div>
			</div>
	  		);
  }
}
