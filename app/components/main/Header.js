import React from 'react';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';
class Header extends React.Component {
  constructor(props) {
    super(props);    
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {  
  }

  onChange(state) {
    this.setState(state);
  }
  
  render() {   
    return (
        <header>
          <div className="container-fluid">
            <div className="row">
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span> 
                    </button>
                    <Link className="navbar-brand" to="/">KTX Bách Khoa</Link>
                  </div>
                  <div className="collapse navbar-collapse" id="myNavbar">
                    <ul className="nav navbar-nav">
                      <li><Link to="/dang-ky-luu-tru">Đăng ký lưu trú</Link></li>
                      <li><Link to="/">Page 2</Link></li> 
                      <li><Link to="/">Page 3</Link></li> 
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                      <li><Link to="/signup"><span className="glyphicon glyphicon-user"></span> Đăng ký</Link></li>
                      <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Đăng nhập</Link></li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </header>    
    );
  }
}

export default Header;