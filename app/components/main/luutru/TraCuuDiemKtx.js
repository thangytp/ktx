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
    console.log(this.state.user);
    let listdiemktx;
    if(Object.keys(this.state.user).length !== 0) {
      listdiemktx = this.state.user.diem_ren_luyen_ktx.map(function(drl, index){
          return (
            <tr>
             <th scope="row">{index + 1}</th>
             <td>{drl.nam}</td>
             <td>{drl.ki}</td>
             <td>{drl.ve_sinh}</td>
             <td>{drl.tong}</td>
            </tr>
          )
      });
    }


		return(
			<div className="container info-page">
				<ol className="breadcrumb">
						<li><Link to="/">Trang chủ</Link></li>
						<li className="active">Tra Cứu Sinh Viên Đang Lưu Trú</li>
				</ol>
				<div className="row nM white-bg answer-admin">
          <div className="col-sm-12">
            <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                <label className="col-md-3 control-label">Mã số sinh viên: </label>
                <div className="col-md-3">
                  <input type="Number" ref="mssv" className="form-control"></input>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-3">
                  <button type='submit' className="btn btn-large btn-fb mL10">Tra Cứu</button>
                </div>
              </div>
            </form>
          </div>
          <div className="table">
            <table className="table">
              <thead>
               <tr>
                 <th>#</th>
                 <th>Năm</th>
                 <th>Kì</th>
                 <th>Tổng Điểm Rèn Luyệng</th>
                 <th>Điểm Vệ Sinh</th>
                 </tr>
               </thead>
               <tbody>
                {listdiemktx}
               </tbody>
            </table>
          </div>
				</div>
			</div>
			);
		}
}
export default TraCuu;
