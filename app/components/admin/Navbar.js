import React from 'react';
import {Link} from 'react-router';
// import NavbarStore from '../../stores/NavbarStore';
// import NavbarActions from '../../actions/NavbarActions';
// import AdminloginActions from '../../actions/admin/login/AdminloginActions';
import LogInAdminAction from '../../actions/admin/login/LogInAdminAction';
import LogInAdminStore from '../../stores/admin/login/LogInAdminStore';

import {Modal} from 'react-bootstrap';
import localStorage from 'localStorage';
import {
  ToastContainer,
  ToastMessage,
} from 'react-toastr';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
class Navbar extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = LogInAdminStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    LogInAdminStore.listen(this.onChange);
    console.log(localStorage.getItem('adminEmail'));
  }

  componentDidUpdate() {
    if(this.state.logout) {
      this.context.router.push('/');
    }
  }

  componentWillUnmount() {
    LogInAdminStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    // let style={'text-align':'center'};
    let adminname =localStorage.getItem('adminusername');
    if (adminname)
    {
      adminname = adminname.toString();
    }
    let avatar = localStorage.getItem('adminavatar');
    return (
        <header id="header">
          <div className="header-left">
              <div className="navbar-minimize-mobile left">
                  <i className="fa fa-bars"></i>
              </div>
              <div className="navbar-header">

                  <Link className="navbar-brand text-center" to="/quanly@ktx">
                      <span className="text-white"><i className="fa fa-home" aria-hidden="true"></i>Trang quản trị</span>
                  </Link>
                  
              </div>
              <div className="navbar-minimize-mobile right">
                  <i className="fa fa-cog"></i>
              </div>
              <div className="clearfix"></div>
          </div>
          <div className="header-right">
            
              <div className="navbar navbar-toolbar navbar-light">
                  <ul className="nav navbar-nav navbar-left">

                      
                      <li className="navbar-minimize">
                          <a href="javascript:void(0);" title="Minimize sidebar">
                              <i className="fa fa-bars"></i>
                          </a>
                      </li>
                      
                      
                  </ul>

                  <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown navbar-message">
                      <a href="javascript:;" className="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                        <img src="/img/user.png" alt=""/>John Doe
                        <span className=" fa fa-angle-down"></span>
                      </a>
                      <ul className="dropdown-menu dropdown-usermenu pull-right">
                        <li><a href="javascript:;"> Profile</a></li>
                        <li>
                          <a href="javascript:;">
                            <span>Settings</span>
                          </a>
                        </li>
                        <li><a href="javascript:;">Help</a></li>
                        <li><a href="#" onClick={LogInAdminAction.logout}><i className="fa fa-sign-out pull-right"></i> Log Out</a></li>
                      </ul>
                    </li>

                    <li role="presentation" className="message-wrap">
                      <a href="javascript:;" className="info-number">
                        <i className="fa fa-envelope-o"></i>
                        <span className="badge bg-green"> 6</span>
                      </a>
                      <ul id="menu1" className="dropdown-menu list-unstyled msg_list" role="menu">
                        <li>
                          <a>
                            <span className="image"><img src="/img/user.png" alt="Profile Image"/></span>
                            <span>
                              <span>John Smith</span>
                              <span className="time">3 mins ago</span>
                            </span>
                            <span className="message">
                              Film festivals used to be do-or-die moments for movie makers. They were where...
                            </span>
                          </a>
                        </li>
                        <li>
                          <a>
                            <span className="image"><img src="/img/user.png" alt="Profile Image"/></span>
                            <span>
                              <span>John Smith</span>
                              <span className="time">3 mins ago</span>
                            </span>
                            <span className="message">
                              Film festivals used to be do-or-die moments for movie makers. They were where...
                            </span>
                          </a>
                        </li>
                        <li>
                          <a>
                            <span className="image"><img src="/img/user.png" alt="Profile Image"/></span>
                            <span>
                              <span>John Smith</span>
                              <span className="time">3 mins ago</span>
                            </span>
                            <span className="message">
                              Film festivals used to be do-or-die moments for movie makers. They were where...
                            </span>
                          </a>
                        </li>
                        <li>
                          <a>
                            <span className="image"><img src="/img/user.png" alt="Profile Image"/></span>
                            <span>
                              <span>John Smith</span>
                              <span className="time">3 mins ago</span>
                            </span>
                            <span className="message">
                              Film festivals used to be do-or-die moments for movie makers. They were where...
                            </span>
                          </a>
                        </li>
                        <li>
                          <div className="text-center">
                            <a>
                              <strong>See All Alerts</strong>
                              <i className="fa fa-angle-right"></i>
                            </a>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                
              </div>
            
          </div>
        </header>

      );
  }
}
Navbar.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default Navbar;
