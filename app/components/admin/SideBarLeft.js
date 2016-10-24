import React from 'react';
import {Link} from 'react-router';
import localStorage from 'localStorage';
// import AddUserActions from '../../actions/admin/usermanage/AddUserActions';
// import AddPostActions from '../../actions/admin/post/AddPostActions';

class SideBarLeft extends React.Component {
  constructor(props) {
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
  
  render(){
    let adminname = localStorage.getItem('adminusername');
    if (adminname)
    {
      adminname = adminname.toString();
    }
    let avatar = localStorage.getItem('adminavatar');  
    let style= {"border": "0"} 
    return(
            <div className="col-sm-3 col-md-2">
              <nav className="navbar navbar-default navbar-fixed-side">
                <div className="container">
                  <div className="navbar-header">
                    <button className="navbar-toggle" data-target=".navbar-collapse" data-toggle="collapse">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="./">Chào admin</a>
                  </div>
                  <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                      <li className="active">
                        <a href="./">Quản lý menu</a>
                      </li>
                      <li>
                        <Link to="/quanly@ktx/them-menu-item">Thêm menu item</Link>
                      </li>
                      <li className="">
                        <a href="inverse.html">Right (Inverse Theme)</a>
                      </li>
                      <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#">Dropdown <b className="caret"></b></a><ul className="dropdown-menu"><li><a href="#">Sub-page 1</a></li>
                      <li><a href="#">Sub-page 2</a></li>
                      <li className="divider"></li>
                      <li className="dropdown-header">Dropdown Header</li>
                      <li><a href="#">Sub-page 3</a></li>
                      </ul></li>
                    </ul>
                    <form className="navbar-form navbar-left">
                      <div className="form-group">
                        <input className="form-control" placeholder="Search"/>
                      </div>
                      <button className="btn btn-default">Search</button>
                    </form>
                    <ul className="nav navbar-nav navbar-right">
                      <li><a href="#">Page 4</a></li>
                    </ul>
                    <button className="btn btn-default navbar-btn">Button</button>
                  </div>
                </div>
              </nav>
            </div>
          );
}
}
export default SideBarLeft;
