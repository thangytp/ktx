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
	  		<GoogleLogin
			    clientId={'208638865760-mhh7enejh65sunj1dgg3945kbspg27sm.apps.googleusercontent.com'}
			    onSuccess={this.success.bind(this)}
			    onFailure={this.error.bind(this)}
			    offline={false}
			  >
			    <span> Login with Google</span>
			  </GoogleLogin>
	  		);
  }
}