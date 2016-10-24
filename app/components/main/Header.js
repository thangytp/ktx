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
          <li><Link to="/login"><i className="fa fa-sign-in" aria-hidden="true"></i> Đăng nhập</Link></li>
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

                                <li><Link to="/gioi-thieu-chung">Thành tích đạt được</Link></li>
                                <li><Link to="/gioi-thieu-chung">KTXBK Media Online</Link></li>
                                <li><Link to="/gioi-thieu-chung">Quà tặng âm nhạc KTX</Link></li>
                                
                            </ul>
                            
                        </li>

                        <li className="dropdown">
                            
                            <a className="dropdown-toggle" data-toggle="dropdown">Sinh viên 
                            <span className="caret"></span></a>
                            <ul className="dropdown-menu">
                                <li className="dropdown-2">
                                    <a className="dropdown-toggle" data-toggle="dropdown-2">Hướng dẫn</a>
                                    <ul className=" dropdown-menu-2 dropdown-menu-2-open">
                                        <li><a href="#">Hướng dẫn đăng ký lưu trú online</a></li>
                                        <li><a href="#">Hướng dẫn nộp tiền qua ngân hàng</a></li>
                                        <li><a href="#">Hướng dẫn về hồ sơ lưu trú</a></li>
                                        <li><a href="#">Hướng dẫn sử dụng mạng điện thoại nội bộ</a></li>
                                        <li><a href="#">Tư vấn sử dụng truy cập Internet</a></li>
                                    </ul>
                                </li>
                                <li><Link to="/gioi-thieu-chung">Mức thu lưu trú phí</Link></li>
                                <li><Link to="/gioi-thieu-chung">Danh mục diện ưu tiên</Link></li>
                                <li><Link to="/gioi-thieu-chung">Thông tin Phòng - Giường</Link></li>
                                <li><Link to="/gioi-thieu-chung">Đăng ký lưu trú online</Link></li>
                                <li><Link to="/gioi-thieu-chung">Xem DSSV đã đăng ký</Link></li>
                                <li><Link to="/gioi-thieu-chung">Thay đổi đăng ký DV tiện ích</Link></li>
                                <li><Link to="/gioi-thieu-chung">Xem DSSV xét duyệt</Link></li>
                                <li><Link to="/gioi-thieu-chung">Xem KQ đóng tiền lưu trú</Link></li>
                                <li><Link to="/gioi-thieu-chung">Tìm kiếm SV đang lưu trú</Link></li>
                                <li className="dropdown-3">
                                    <a className="dropdown-toggle" data-toggle="dropdown-3">Xem điểm Thi đua</a>
                                    <ul className=" dropdown-menu-3 dropdown-menu-2-open">
                                        <li><Link to="/gioi-thieu-chung">Điểm rèn luyện</Link></li>
                                        <li><Link to="/gioi-thieu-chung">Điểm vệ sinh</Link></li>
                                    </ul>
                                </li>
                                <li><Link to="/gioi-thieu-chung">Xem chỉ số Điện - Nước</Link></li>
                                <li><Link to="/gioi-thieu-chung">Facebook</Link></li>
                                
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