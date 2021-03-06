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
    let adminType = localStorage.getItem('adminType');
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
    let style= {"border": "0"};

    let adminType = localStorage.getItem('adminType');
    if(adminType == "Admin"){
      return(

            <aside id="sidebar-left" className="sidebar-circle sidebar-dark">
                <ul className="sidebar-menu">
                      <li className="submenu">
                          <a href="javascript:void(0);">
                              <span className="icon"><i className="fa fa-cog"></i></span>
                              <span className="text">Trang chủ</span>
                              <span className="arrow fa-angle-double-right"></span>
                          </a>
                          <ul style={{"display":"none"}}>
                              <li>
                                <Link to="/quanly@ktx/hien-thi-tin-tuc">Tin tức hiển thị</Link>
                              </li>
                              <li>
                                <Link to="/quanly@ktx/cotphai-home">Cột phải trang Home</Link>
                              </li>
                          </ul>
                      </li>
                      <li className="">
                        <Link to="/quanly@ktx/quan-ly-admin">
                            <span className="icon"><i className="fa fa-file-image-o"></i></span>
                            <span className="text">Quản lý admin</span>
                        </Link>
                      </li>
                      <li className="submenu">
                          <a href="javascript:void(0);">
                              <span className="icon"><i className="fa fa-graduation-cap"></i></span>
                              <span className="text">Quản lý hệ thống</span>
                              <span className="arrow fa-angle-double-right"></span>
                          </a>
                          <ul style={{"display":"none"}}>
                              <li className="active">
                                <Link to="/quanly@ktx">
                                    <span className="icon"><i className="fa fa-bars"></i></span>
                                    <span className="text">Quản lý menu</span>
                                </Link>
                              </li>
                              <li>
                                <Link to="/quanly@ktx/them-page">
                                    <span className="icon"><i className="fa fa-file-o"></i></span>
                                    <span className="text">Quản lý trang</span>
                                </Link>
                              </li>
                              <li className="">
                                <Link to="/quanly@ktx/quan-ly-hinh-anh">
                                    <span className="icon"><i className="fa fa-file-image-o"></i></span>
                                    <span className="text">Quản lý hình ảnh</span>
                                 </Link>
                              </li>
                              <li className="">
                                <Link to="/quanly@ktx/lienket-site">
                                    <span className="icon"><i className="fa fa-link"></i></span>
                                    <span className="text">Liên kết site</span>
                                </Link>
                              </li>
                              <li className="">
                                <Link to="/quanly@ktx/quan-ly-tin-tuc">
                                    <span className="icon"><i className="fa fa-newspaper-o"></i></span>
                                    <span className="text">Quản lý tin tức</span>
                                </Link>
                              </li>
                          </ul>
                      </li>
                      <li className="submenu">
                          <a href="javascript:void(0);">
                              <span className="icon"><i className="fa fa-graduation-cap"></i></span>
                              <span className="text">Quản lý sinh viên</span>
                              <span className="arrow fa-angle-double-right"></span>
                          </a>
                          <ul style={{"display":"none"}}>
                              <li>
                                <Link to="/quanly@ktx/quan-ly-sinh-vien">
                                    <span className="text">Danh sách sinh viên</span>
                                </Link>
                              </li>
                              <li>
                                <Link to="/quanly@ktx/sinh-vien-xet-duyet">Danh sách sinh viên xét duyệt thành công</Link>
                              </li>
                              <li>
                                <Link to="/quanly@ktx/sinh-vien-gia-han">Danh sách sinh viên gia hạn thành công</Link>
                              </li>
                          </ul>
                      </li>
                      <li className="submenu">
                          <a href="javascript:void(0);">
                              <span className="icon"><i className="fa fa-check-circle-o"></i></span>
                              <span className="text">Xét duyệt lưu trú</span>
                              <span className="arrow fa-angle-double-right"></span>
                          </a>
                          <ul style={{"display":"none"}}>
                              <li>
                                <Link to="/quanly@ktx/xet-duyet-luu-tru-moi">Xét Duyệt Lưu Trú Mới</Link>
                              </li>
                              <li>
                                <Link to="/quanly@ktx/gia-han-luu-tru-cu">Gia Hạn Lưu Trú Cũ</Link>
                              </li>
                          </ul>
                      </li>
                      <li className="submenu">
                          <a href="javascript:void(0);">
                              <span className="icon"><i className="fa fa-check-circle-o"></i></span>
                              <span className="text">Quản lý lưu trú</span>
                              <span className="arrow fa-angle-double-right"></span>
                          </a>
                          <ul style={{"display":"none"}}>
                            <li className="">
                              <Link to="/quanly@ktx/chi-tieu">
                                  <span className="icon"><i className="fa fa-list-alt"></i></span>
                                  <span className="text">Chỉ Tiêu</span>
                              </Link>
                            </li>
                            <li className="">
                              <Link to="/quanly@ktx/uu-tien">
                                  <span className="icon"><i className="fa fa-dropbox"></i></span>
                                  <span className="text">Ưu Tiên</span>
                              </Link>
                            </li>
                            <li className="">
                              <Link to="/quanly@ktx/dich-vu">
                                  <span className="icon"><i className="fa fa-dropbox"></i></span>
                                  <span className="text">Dịch Vụ</span>
                              </Link>
                            </li>
                            <li>
                              <Link to="/quanly@ktx/quan-ly-khoa">Quản lý khoa</Link>
                            </li>
                            <li>
                              <Link to="/quanly@ktx/quan-ly-he-dao-tao">Hệ Đào Tạo</Link>
                            </li>
                            <li>
                              <Link to="/quanly@ktx/cai-dat-dang-ky-luu-tru">Cài đặt lưu trú</Link>
                            </li>
                            <li>
                              <Link to="/quanly@ktx/dien-nuoc">Quản lý điện nước</Link>
                            </li>
                          </ul>
                      </li>
                      <li className="submenu">
                          <a href="javascript:void(0);">
                              <span className="icon"><i className="fa fa-dropbox"></i></span>
                              <span className="text">Quản Lý Phòng</span>
                              <span className="arrow fa-angle-double-right"></span>
                          </a>
                          <ul style={{"display":"none"}}>
                              <li>
                                <Link to="/quanly@ktx/tang">Tầng</Link>
                              </li>
                              <li>
                                <Link to="/quanly@ktx/loaiphong">Loại Phòng</Link>
                              </li>
                              <li>
                                <Link to="/quanly@ktx/phong">Phòng</Link>
                              </li>
                              <li>
                                <Link to="/quanly@ktx/giuong">Giường</Link>
                              </li>
                          </ul>
                      </li>
                      <li className="">
                        <Link to="/quanly@ktx/quan-ly-cau-hoi">
                            <span className="icon"><i className="fa fa-file-image-o"></i></span>
                            <span className="text">Quản lý câu hỏi</span>
                        </Link>
                      </li>
                      {/* <li className="submenu">
                          <a href="javascript:void(0);">
                              <span className="icon"><i className="fa fa-cog"></i></span>
                              <span className="text">Cài đặt lưu trú</span>
                              <span className="arrow fa-angle-double-right"></span>
                          </a>
                          <ul style={{"display":"none"}}>
                              <li>
                                <Link to="/quanly@ktx/cai-dat-dang-ky-luu-tru">Đăng ký lưu trú</Link>
                              </li>
                              <li>
                                <Link to="/quanly@ktx/cai-dat-xem-xet-duyet-luu-tru">Xét duyệt lưu trú</Link>
                              </li>
                          </ul>
                      </li> */}

                </ul>
            </aside>
          );
    }
    else if(adminType==="Super Mod"){
      return(

            <aside id="sidebar-left" className="sidebar-circle sidebar-dark">
                <ul className="sidebar-menu">
                      <li className="submenu">
                          <a href="javascript:void(0);">
                              <span className="icon"><i className="fa fa-cog"></i></span>
                              <span className="text">Trang chủ</span>
                              <span className="arrow fa-angle-double-right"></span>
                          </a>
                          <ul style={{"display":"none"}}>
                              <li>
                                <Link to="/quanly@ktx/hien-thi-tin-tuc">Tin tức hiển thị</Link>
                              </li>
                              <li>
                                <Link to="/quanly@ktx/cotphai-home">Cột phải trang Home</Link>
                              </li>
                          </ul>
                      </li>
                      <li className="submenu">
                          <a href="javascript:void(0);">
                              <span className="icon"><i className="fa fa-graduation-cap"></i></span>
                              <span className="text">Quản lý hệ thống</span>
                              <span className="arrow fa-angle-double-right"></span>
                          </a>
                          <ul style={{"display":"none"}}>
                              <li className="active">
                                <Link to="/quanly@ktx">
                                    <span className="icon"><i className="fa fa-bars"></i></span>
                                    <span className="text">Quản lý menu</span>
                                </Link>
                              </li>
                              <li>
                                <Link to="/quanly@ktx/them-page">
                                    <span className="icon"><i className="fa fa-file-o"></i></span>
                                    <span className="text">Quản lý trang</span>
                                </Link>
                              </li>
                              <li className="">
                                <Link to="/quanly@ktx/quan-ly-hinh-anh">
                                    <span className="icon"><i className="fa fa-file-image-o"></i></span>
                                    <span className="text">Quản lý hình ảnh</span>
                                 </Link>
                              </li>
                              <li className="">
                                <Link to="/quanly@ktx/lienket-site">
                                    <span className="icon"><i className="fa fa-link"></i></span>
                                    <span className="text">Liên kết site</span>
                                </Link>
                              </li>
                              <li className="">
                                <Link to="/quanly@ktx/quan-ly-tin-tuc">
                                    <span className="icon"><i className="fa fa-newspaper-o"></i></span>
                                    <span className="text">Quản lý tin tức</span>
                                </Link>
                              </li>
                          </ul>
                      </li>

                      {/* <li className="submenu">
                          <a href="javascript:void(0);">
                              <span className="icon"><i className="fa fa-cog"></i></span>
                              <span className="text">Cài đặt lưu trú</span>
                              <span className="arrow fa-angle-double-right"></span>
                          </a>
                          <ul style={{"display":"none"}}>
                              <li>
                                <Link to="/quanly@ktx/cai-dat-dang-ky-luu-tru">Đăng ký lưu trú</Link>
                              </li>
                              <li>
                                <Link to="/quanly@ktx/cai-dat-xem-xet-duyet-luu-tru">Xét duyệt lưu trú</Link>
                              </li>
                          </ul>
                      </li> */}

                </ul>
            </aside>
          );
    }
    else if(adminType==="Manager"){
      return(

            <aside id="sidebar-left" className="sidebar-circle sidebar-dark">
                <ul className="sidebar-menu">
                      <li className="submenu">
                          <a href="javascript:void(0);">
                              <span className="icon"><i className="fa fa-graduation-cap"></i></span>
                              <span className="text">Quản lý sinh viên</span>
                              <span className="arrow fa-angle-double-right"></span>
                          </a>
                          <ul style={{"display":"none"}}>
                              <li>
                                <Link to="/quanly@ktx/quan-ly-sinh-vien">
                                    <span className="text">Danh sách sinh viên</span>
                                </Link>
                              </li>
                              <li>
                                <Link to="/quanly@ktx/sinh-vien-xet-duyet">Danh sách sinh viên xét duyệt thành công</Link>
                              </li>
                              <li>
                                <Link to="/quanly@ktx/sinh-vien-gia-han">Danh sách sinh viên gia hạn thành công</Link>
                              </li>
                          </ul>
                      </li>
                      <li className="submenu">
                          <a href="javascript:void(0);">
                              <span className="icon"><i className="fa fa-check-circle-o"></i></span>
                              <span className="text">Xét duyệt lưu trú</span>
                              <span className="arrow fa-angle-double-right"></span>
                          </a>
                          <ul style={{"display":"none"}}>
                              <li>
                                <Link to="/quanly@ktx/xet-duyet-luu-tru-moi">Xét Duyệt Lưu Trú Mới</Link>
                              </li>
                              <li>
                                <Link to="/quanly@ktx/gia-han-luu-tru-cu">Gia Hạn Lưu Trú Cũ</Link>
                              </li>
                          </ul>
                      </li>
                      <li className="submenu">
                          <a href="javascript:void(0);">
                              <span className="icon"><i className="fa fa-check-circle-o"></i></span>
                              <span className="text">Quản lý lưu trú</span>
                              <span className="arrow fa-angle-double-right"></span>
                          </a>
                          <ul style={{"display":"none"}}>
                            <li className="">
                              <Link to="/quanly@ktx/chi-tieu">
                                  <span className="icon"><i className="fa fa-list-alt"></i></span>
                                  <span className="text">Chỉ Tiêu</span>
                              </Link>
                            </li>
                            <li className="">
                              <Link to="/quanly@ktx/uu-tien">
                                  <span className="icon"><i className="fa fa-dropbox"></i></span>
                                  <span className="text">Ưu Tiên</span>
                              </Link>
                            </li>
                            <li className="">
                              <Link to="/quanly@ktx/dich-vu">
                                  <span className="icon"><i className="fa fa-dropbox"></i></span>
                                  <span className="text">Dịch Vụ</span>
                              </Link>
                            </li>
                            <li>
                              <Link to="/quanly@ktx/quan-ly-khoa">Quản lý khoa</Link>
                            </li>
                            <li>
                              <Link to="/quanly@ktx/quan-ly-he-dao-tao">Hệ Đào Tạo</Link>
                            </li>
                            <li>
                              <Link to="/quanly@ktx/cai-dat-dang-ky-luu-tru">Cài đặt lưu trú</Link>
                            </li>
                            <li>
                              <Link to="/quanly@ktx/dien-nuoc">Quản lý điện nước</Link>
                            </li>
                          </ul>
                      </li>
                      <li className="submenu">
                          <a href="javascript:void(0);">
                              <span className="icon"><i className="fa fa-dropbox"></i></span>
                              <span className="text">Quản Lý Phòng</span>
                              <span className="arrow fa-angle-double-right"></span>
                          </a>
                          <ul style={{"display":"none"}}>
                              <li>
                                <Link to="/quanly@ktx/tang">Tầng</Link>
                              </li>
                              <li>
                                <Link to="/quanly@ktx/loaiphong">Loại Phòng</Link>
                              </li>
                              <li>
                                <Link to="/quanly@ktx/phong">Phòng</Link>
                              </li>
                              <li>
                                <Link to="/quanly@ktx/giuong">Giường</Link>
                              </li>
                          </ul>
                      </li>
                      <li className="">
                        <Link to="/quanly@ktx/quan-ly-cau-hoi">
                            <span className="icon"><i className="fa fa-file-image-o"></i></span>
                            <span className="text">Quản lý câu hỏi</span>
                        </Link>
                      </li>
                      {/* <li className="submenu">
                          <a href="javascript:void(0);">
                              <span className="icon"><i className="fa fa-cog"></i></span>
                              <span className="text">Cài đặt lưu trú</span>
                              <span className="arrow fa-angle-double-right"></span>
                          </a>
                          <ul style={{"display":"none"}}>
                              <li>
                                <Link to="/quanly@ktx/cai-dat-dang-ky-luu-tru">Đăng ký lưu trú</Link>
                              </li>
                              <li>
                                <Link to="/quanly@ktx/cai-dat-xem-xet-duyet-luu-tru">Xét duyệt lưu trú</Link>
                              </li>
                          </ul>
                      </li> */}

                </ul>
            </aside>
          );
    }
  }
}
export default SideBarLeft;
