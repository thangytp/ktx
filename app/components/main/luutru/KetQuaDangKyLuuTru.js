import React from 'react';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';
import localStorage from 'localStorage';

import CotPhaiHome from '../CotPhaiHome';

import ManageUserAction from '../../../actions/admin/manage-user/ManageUserAction';
import ManageUserStore from '../../../stores/admin/manage-user/ManageUserStore';

export default class KetQuaDangKyLuuTru extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = ManageUserStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ManageUserStore.listen(this.onChange);
    ManageUserAction.getUserByEmail(localStorage.getItem('email'));
    document.title = "Kết quả đăng ký lưu trú | Ký túc xá Bách Khoa";
  }
  componentWillUnmount() {
    ManageUserStore.unlisten(this.onChange);

  }
  onChange(state) {
    this.setState(state);
  }


  render() {
    let showinfo = 'Chưa có kết quả. Vui lòng truy cập sau !';
    console.log(this.state.user);
    if(this.state.user) {
      var user = this.state.user;
      if(user.dang_o_ktx === false) {
        showinfo = 'Bạn đã đăng ký lưu trú thành công. Vui lòng nộp ' + user.tien_ktx + ' VNĐ để làm thủ tục lưu trú.'
      } else {
        if(user.xet_duyet_thanh_cong && user.da_dong_tien) {
          showinfo = (
            <div>
              <h3>Thông Tin Lưu Trú Của Bạn</h3>
              <div className="col-md-6 ">
                <label>Họ Tên:</label>
                {user.ho_lot + ' ' + user.ten}
              </div>
              <div className="col-md-6 ">
                <label>Mã số sinh viên</label>
                {user.ma_sinh_vien}
              </div>
              <div className="col-md-4 ">
                <label>Mã ký túc xá:</label>
                {user.ma_ktx}
              </div>
              <div className="col-md-4 ">
                <label>Mã sinh viên:</label>
                {user.ma_sinh_vien}
              </div>
              <div className="col-md-4 ">
                <label>Tầng:</label>
                {user._tang_id.ten}
              </div>
              <div className="col-md-4 ">
                <label>Loại phòng:</label>
                {user._phong_id.ten}
              </div>
              <div className="col-md-4 ">
                <label>Phòng:</label>
                {user._phongchitiet_id.ma}
              </div>
              <div className="col-md-4 ">
                <label>Giường:</label>
                {user.ma_giuong}
              </div>
            </div>
          )
        }
        if(user.gia_han_thanh_cong) {
          showinfo = 'Bạn đã gia hạn lưu trú thành công. Vui lòng nộp ' + user.tien_ktx + ' VNĐ để làm thủ tục lưu trú.'
        }
        if(user.gia_han_thanh_cong && user.da_dong_tien) {
          showinfo = (
            <div>
              <h3>Thông Tin Lưu Trú Của Bạn</h3>
              <div className="col-md-6 ">
                <label>Họ Tên:</label>
                {user.ho_lot + ' ' + user.ten}
              </div>
              <div className="col-md-6 ">
                <label>Mã số sinh viên</label>
                {user.ma_sinh_vien}
              </div>
              <div className="col-md-4 ">
                <label>Mã ký túc xá:</label>
                {user.ma_ktx}
              </div>
              <div className="col-md-4 ">
                <label>Mã sinh viên:</label>
                {user.ma_sinh_vien}
              </div>
              <div className="col-md-4 ">
                <label>Tầng:</label>
                {user._tang_id.ten}
              </div>
              <div className="col-md-4 ">
                <label>Loại phòng:</label>
                {user._phong_id.ten}
              </div>
              <div className="col-md-4 ">
                <label>Phòng:</label>
                {user._phongchitiet_id.ma}
              </div>
              <div className="col-md-4 ">
                <label>Giường:</label>
                {user.ma_giuong}
              </div>
            </div>
          )
        }
      }
    }
    return (
            <div className="container ket-qua-kluu-tru">
              <div className="row">
                <div className="col-md-9 ">
                  <ol className="breadcrumb no-overflow">
                      <li><Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Trang chủ</Link></li>
                      <li>Kết quả đăng ký lưu trú</li>
                  </ol>

                  <div className="panel rounded shadow no-overflow">
                    <div className="panel-heading">
                        <div className="pull-left"><h3 className="panel-title">Kết quả đăng ký lưu trú ký túc xá</h3></div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="panel-body no-padding">
                      {showinfo}
                    </div>
                  </div>
                </div>

                <div className="col-md-3 col-sm-12">
                    <CotPhaiHome />
                </div>

              </div>

            </div>
    );
  }
}
