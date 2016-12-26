import React, { Component } from 'react';
import {Tabs, Tab, Modal, Button} from 'react-bootstrap';
import {Link} from 'react-router';

import ManageUserAction from '../../../actions/admin/manage-user/ManageUserAction';
import ManageUserStore from '../../../stores/admin/manage-user/ManageUserStore';


class TraCuu extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = ManageUserStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ManageUserStore.listen(this.onChange);;
  }
  componentWillUnmount() {
    ManageUserStore.unlisten(this.onChange);
  }

  handleSubmit(e) {
    e.preventDefault();
    const mssv = this.refs.mssv.value;
    ManageUserAction.getUserByMssv(mssv);
  }

  onChange(state) {
    this.setState(state);
  }

  render(){
    let user;
    let showinfo;
    user = this.state.user;
    if(Object.keys(user).length !== 0) {
      showinfo = (
        <div>
          <h3>Thông Tin Lưu Trú</h3>
          <div className="col-md-6">
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
      );
    } else {
      showinfo = '';
    }


		return(
			<div className="container info-page">
				<ol className="breadcrumb">
						<li><Link to="/">Trang chủ</Link></li>
						<li className="active">Tra Cứu Sinh Viên Đang Lưu Trú</li>
				</ol>
				<div className="row nM white-bg answer-admin">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group col-md-4">
              <label>Mã số sinh viên: </label>
              <input type="Number" ref="mssv" className="form-control"></input>
            </div>
            <div className="form-group">
              <button type='submit' className="btn btn-large btn-primary">Tra Cứu</button>
            </div>
          </form>
          {showinfo}
				</div>
			</div>
			);
		}
}
export default TraCuu;
