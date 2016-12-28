import React from 'react';
import {Link} from 'react-router';
import LogInAdminAction from '../../actions/admin/login/LogInAdminAction';
import LogInAdminStore from '../../stores/admin/login/LogInAdminStore';

class LogInAdmin extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = LogInAdminStore.getState();
		this.onChange = this.onChange.bind(this);
	}
  componentDidMount() {
    LogInAdminStore.listen(this.onChange);
		if (localStorage.getItem('adminEmail'))
    {
      this.context.router.push('/quanly@ktx');
    }
  }

	// componentDidUpdate() {
	// 	if(this.state.isLogin) {
	// 		this.context.router.push('/quanly@ktx');
	// 	}
	// }

  componentWillUnmount() {
    LogInAdminStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

	handleSubmit(event) {
		event.preventDefault();

		const email = this.refs.email.value;
		const password = this.refs.password.value;
		const data = {
			email: email,
			password: password
		};

		LogInAdminAction.handleLogin(data);
	}

	render(){
  	return(
  		<div className="container login-page">
  			<div className="col-md-6 col-md-offset-3 sol-sm-12">
	  			<div className="panel panel-primary rounded shadow no-overflow" >
	  				<div className="panel-heading">
	                	<h3 className="text-center text-white">Đăng nhập vào hệ thống</h3>
	              	</div>
	  				<div className="panel-body no-padding">
						<form onSubmit={this.handleSubmit.bind(this)} className="mt-10 pB10">
				          <label><input ref="email" type="text" placeholder="Email" className="form-control" /></label><br />
				          <label><input ref="password" type="password" placeholder="Password" className="form-control" /></label><br />
				          <button type="submit" className="btn btn-large btn-primary">Login</button>
				        </form>
				    </div>
					<span className="succ-login">{this.state.loginSuccessMess}</span>
					<span className="err-login">{this.state.loginFailMess}</span>
				</div>
			</div>
		</div>
  		);
  }
};

LogInAdmin.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default LogInAdmin;
