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
                    <div className="navbar-brand" >Chào admin</div>
                  </div>
                  <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                      <li className="active">
                        <Link to="/quanly@ktx">Quản lý menu</Link>
                      </li>
                      <li>
                        <Link to="/quanly@ktx/them-page">Thêm trang</Link>
                      </li>
                      <li className="">
                        <Link to="/quanly@ktx/quan-ly-hinh-anh">Quản lý hình ảnh</Link>
                      </li>
                      <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#"><Link to="/quanly@ktx/quan-ly-sinh-vien">Quản lý sinh viên</Link>
                      <b className="caret"></b></a><ul className="dropdown-menu">
                      <li>
                        <Link to="/quanly@ktx/xet-duyet-luu-tru-moi">Xét Duyệt Lưu Trú Mới</Link>
                      </li>
                      <li>
                        <Link to="/quanly@ktx/gia-han-luu-tru-cu">Gia Hạn Lưu Trú Cũ</Link>
                      </li>
                      {/*<li><a href="#">Sub-page 2</a></li>*/}
                      </ul></li>
                      <li className="">
                        <Link to="/quanly@ktx/chi-tieu">Chỉ Tiêu</Link>
                      </li>
                      <li className="">
                        <Link to="/quanly@ktx/uu-tien">Uư Tiên</Link>
                      </li>
                      {/*<li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#">Dropdown <b className="caret"></b></a>
                        <ul className="dropdown-menu"><li><a href="#">Sub-page 1</a></li>
                        <li><a href="#">Sub-page 2</a></li>
                        <li className="divider"></li>
                        <li className="dropdown-header">Dropdown Header</li>
                        <li><a href="#">Sub-page 3</a></li>
                        </ul>
                      </li>*/}
                    </ul>
                    {/*
                    <form className="navbar-form navbar-left">
                      <div className="form-group">
                        <input className="form-control" placeholder="Search"/>
                      </div>
                      <button className="btn btn-default">Search</button>
                    </form>*/}


                  </div>
                </div>
              </nav>
            </div>
          );
}
}
export default SideBarLeft;
