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
                    <a className="navbar-brand" href="#">WebSiteName</a>
                  </div>
                  <div className="collapse navbar-collapse" id="myNavbar">
                    <ul className="nav navbar-nav">
                      <li><a href="#">Page 1</a></li>
                      <li><a href="#">Page 2</a></li> 
                      <li><a href="#">Page 3</a></li> 
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                      <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
                      <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
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