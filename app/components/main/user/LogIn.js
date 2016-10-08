import React from 'react';
import {Link} from 'react-router';
import GoogleLogin from 'react-google-login';

export default class LogIn extends React.Component {
	constructor(props)
	{
		super(props);
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {  

	}
	componentWillUnmount() {

	}
	onChange(state) {
		this.setState(state);
	} 
	success(response){
		console.log(response);
	};

	error(response){
		console.error(response);
	};
  	render(){
	  	return(
	  		<div className="container login-page">
	  			<h2>Đăng nhập vào hệ thống</h2>
	  			<div className="button-gg">
			  		<GoogleLogin
					    clientId={'208638865760-mhh7enejh65sunj1dgg3945kbspg27sm.apps.googleusercontent.com'}
					    onSuccess={this.success.bind(this)}
					    onFailure={this.error.bind(this)}
					    offline={false}
					  >
					    <span> Đăng nhập với Google</span>
					  </GoogleLogin>
				</div>
			</div>
	  		);
  }
}