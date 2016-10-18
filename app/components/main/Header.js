import React from 'react';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';
import localStorage from 'localStorage';
import LogInAction from '../../actions/main/user/LogInAction';
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
    let userEmail = localStorage.getItem('email');
    let NavbarUser = <ul></ul>;
    if(!userEmail){
      NavbarUser = (
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/signup"><span className="glyphicon glyphicon-user"></span> Đăng ký</Link></li>
          <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Đăng nhập</Link></li>
        </ul>
      )
    }
    else{
      NavbarUser = (
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/info-stu"><img className='img-responsive img-user' src={localStorage.getItem('avatar')}></img><span className="user-email">{userEmail}</span></Link></li>
            <li><a href="#" type="button" name="button" onClick ={LogInAction.logout}> <i className="fa fa-sign-out" /> Thoát</a></li>
          </ul>
        )
    }
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
                        <li className="dropdown">
                            
                            <a className="dropdown-toggle" data-toggle="dropdown">Giới thiệu 
                            <span className="caret"></span></a>
                            <ul className="dropdown-menu">
                                <li className="dropdown-2">
                                    <a className="dropdown-toggle" data-toggle="dropdown-2">Giới thiệu chung</a>
                                    <ul className=" dropdown-menu-2 dropdown-menu-2-open">
                                        <li><a href="#">Lời giới thiệu</a></li>
                                        <li><a href="#">Chức năng nhiệm vụ KTX</a></li>
                                        <li><a href="#">Thư từ giám đốc KTX</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown-3">
                                    <a className="dropdown-toggle" data-toggle="dropdown-3">Tổ chức nhân sự cán bộ</a>
                                    <ul className=" dropdown-menu-3 dropdown-menu-2-open">
                                        <li><Link to="/gioi-thieu-chung">Sơ đồ tổ chức KTX</Link></li>
                                        <li><Link to="/gioi-thieu-chung">Ban giám đốc</Link></li>
                                        <li><Link to="/gioi-thieu-chung">Tổ quản lý sinh viên</Link></li>
                                        <li><Link to="/gioi-thieu-chung">Tổ Kế toán - Tổng hợp</Link></li>
                                        <li><Link to="/gioi-thieu-chung">Tổ Kỹ thuật - Sửa chữa</Link></li>
                                    </ul>
                                </li>
                                
                            </ul>
                            
                        </li>
                      
                        <li><Link to="/dang-ky-luu-tru">Đăng ký lưu trú</Link></li>
                        <li><Link to="/xem-ket-qua-luu-tru">Xem kết quả đăng ký lưu trú</Link></li>
                    </ul>
                    {NavbarUser}
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