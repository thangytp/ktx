import React, { Component } from 'react';
import {Tabs, Tab, Modal, Button} from 'react-bootstrap';
import {Link} from 'react-router';

import ManagePhongChitietAction from '../../../actions/admin/manage-phong/ManagePhongChitietAction';
import ManagePhongChitietStore from '../../../stores/admin/manage-phong/ManagePhongChitietStore';


class TraCuuDienNuoc extends React.Component {
  constructor(props)
	{
		super(props);
		this.state = ManagePhongChitietStore.getState();
		this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ManagePhongChitietStore.listen(this.onChange);
  }

  componentWillUnmount() {
    ManagePhongChitietStore.unlisten(this.onChange);
  }

  handleViewDiennuoc(e) {
    e.preventDefault();
    const data = {
      phong: this.refs.phong.value,
      nam: this.refs.nam.value
    }
    ManagePhongChitietAction.viewDiennuoc(data);
  }

  onChange(state) {
    this.setState(state);
  }

  render(){

    let listdiennuoc;
    if(this.state.diennuoc !== undefined) {
      listdiennuoc = this.state.diennuoc.map(function(diennuoc, index){
          return (
            <tr>
             <th scope="row">{index + 1}</th>
             <td>{diennuoc.nam}</td>
             <td>{diennuoc.thang}</td>
             <td>{diennuoc._ma_phong}</td>
             <td>{diennuoc.dien.so}</td>
             <td>{diennuoc.dien.tongtien}</td>
             <td>{diennuoc.nuoc.so}</td>
             <td>{diennuoc.dien.tongtien}</td>
            </tr>
          )
      });
    }

		return(
			<div className="container info-page">
				<ol className="breadcrumb">
						<li><Link to="/">Trang chủ</Link></li>
						<li className="active">Tra Cứu Điện Nước</li>
				</ol>
				<div className="row nM white-bg answer-admin">
        <form onSubmit={this.handleViewDiennuoc.bind(this)}>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Năm</label>
              <input type="number" className="form-control" ref="nam"/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Mã Phòng</label>
              <input type="text" className="form-control" ref="phong"/>
            </div>
          </div>
          <button className="btn btn-fb btn-large" type="submit">Thêm chỉ số điện nước</button>
        </form>
        <div className="table">
          <table className="table">
            <thead>
             <tr>
               <th>#</th>
               <th>Năm</th>
               <th>Tháng</th>
               <th>Mã Phòng</th>
               <th>Chỉ số điện</th>
               <th>Tiền điện</th>
               <th>Chỉ số nước</th>
               <th>Tiền nước</th>
               </tr>
             </thead>
             <tbody>
              {listdiennuoc}
             </tbody>
          </table>
        </div>
				</div>
			</div>
			);
		}
}
export default TraCuuDienNuoc;
