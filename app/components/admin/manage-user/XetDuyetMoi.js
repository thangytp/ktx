import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import ManageUserAction from '../../../actions/admin/manage-user/ManageUserAction';
import ManageUserStore from '../../../stores/admin/manage-user/ManageUserStore';
import ManageChiTieuAction from '../../../actions/admin/manage-chitieu/ManageChiTieuAction';
import ManageChiTieuStore from '../../../stores/admin/manage-chitieu/ManageChiTieuStore';

var HocVu = React.createClass({
    uploadFile: function (e) {
        var fd = new FormData();
        fd.append('file', this.refs.file.getDOMNode().files[0]);
        ManageUserAction.updateHocVu(fd);
        e.preventDefault()
    },
    render: function() {
        return (
            <div>
               <form ref="uploadForm" className="uploader" encType="multipart/form-data" >
                   <input ref="file" type="file" name="file" className="upload-file"/>
                   <input type="button" ref="button" value="Upload" onClick={this.uploadFile.bind(this)} />
               </form>
            </div>
        );
    }
});

var DiemRenLuyen = React.createClass({
    uploadFile: function (e) {
        var fd = new FormData();
        fd.append('file', this.refs.file.getDOMNode().files[0]);
        ManageUserAction.updateDiemRenLuyen(fd);
        e.preventDefault()
    },
    render: function() {
        return (
            <div>
               <form ref="uploadForm" className="uploader" encType="multipart/form-data" >
                   <input ref="file" type="file" name="file" className="upload-file"/>
                   <input type="button" ref="button" value="Upload" onClick={this.uploadFile.bind(this)} />
               </form>
            </div>
        );
    }
});

class XetDuyetMoi extends Component {
  constructor(props)
	{
		super(props);
		this.state = {state1 : ManageUserStore.getState(), state2 : ManageChiTieuStore.getState()};
		this.onChange = this.onChange.bind(this);
    this.state.state1.tabActive = 1;
  }

  componentDidMount() {
    ManageUserStore.listen(this.onChange);
    ManageChiTieuStore.listen(this.onChange);
    ManageChiTieuAction.getChitieu();
  }

  componentWillUnmount() {
    ManageUserStore.unlisten(this.onChange);
    ManageChiTieuStore.unlisten(this.onChange);
  }

  handleXetDuyet(soluong, diemcb, nam) {
    const data = {
        soluong : soluong,
        diemcb : diemcb,
        nam : nam
    };
    ManageUserAction.updateXetDuyet(data);
  }

  onChange(state) {
    this.setState({state1 : ManageUserStore.getState(), state2 : ManageChiTieuStore.getState()});
  }

  render() {
    let listUsers = this.state.state1.users.map(function(user, index){
        return (
          <tr>
           <th scope="row">{index + 1}</th>
           <td>{user.ho_lot}' '{user.ten}</td>
           <td>{user.email}</td>
           <td>{user.ma_sinh_vien}</td>
           <td>{user.so_cmnd}</td>
           <td>{user.dien_thoai}</td>
          </tr>
        )
    });
    let contentTab3;

    if(this.state.state2.chitieu[0] === undefined) {
        contentTab3 = null
    } else {
      contentTab3 = (
        <ul>
          <li>
            <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, this.state.state2.chitieu[0].nam1.soluong, this.state.state2.chitieu[0].nam1.diemcoban, 1)}>Năm 1</button>
          </li>
          <li>
            <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, this.state.state2.chitieu[0].nam2.soluong, this.state.state2.chitieu[0].nam2.diemcoban, 2)}>Năm 2</button>
          </li>
          <li>
            <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, this.state.state2.chitieu[0].nam3.soluong, this.state.state2.chitieu[0].nam3.diemcoban, 3)}>Năm 3</button>
          </li>
          <li>
            <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, this.state.state2.chitieu[0].nam4.soluong, this.state.state2.chitieu[0].nam4.diemcoban, 4)}>Năm 4</button>
          </li>
          <li>
            <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, this.state.state2.chitieu[0].nam5.soluong, this.state.state2.chitieu[0].nam5.diemcoban, 5)}>Năm 5</button>
          </li>
          <li>
            <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, this.state.state2.chitieu[0].nam6.soluong, this.state.state2.chitieu[0].nam6.diemcoban, 6)}>Năm 6</button>
          </li>
        </ul>
      )
    }

    return (
      <Tabs defaultActiveKey={this.state.state1.tabActive} id="luutrumoi">
        <Tab eventKey={1} title="Bước 1">
          <h1>Vui lòng import file tạm dừng học vụ của phòng đào tạo</h1>
          <HocVu/>
          <div className="table-responsive">
            <table className="table">
              <thead>
               <tr>
                 <th>#</th>
                 <th>Họ Tên</th>
                 <th>Email</th>
                 <th>MSSV</th>
                 <th>CMND</th>
                 <th>SDT</th>
                 </tr>
               </thead>
               <tbody>
                {listUsers}
               </tbody>
            </table>
          </div>
        </Tab>
        <Tab eventKey={2} disabled={this.state.state1.deactiveStep2} title="Bước 2">
        <h1>Vui lòng import file điểm rèn luyện của phòng đào tạo</h1>
        <DiemRenLuyen/>
        <div className="table-responsive">
          <table className="table">
            <thead>
             <tr>
               <th>#</th>
               <th>Họ Tên</th>
               <th>Email</th>
               <th>MSSV</th>
               <th>CMND</th>
               <th>SDT</th>
               </tr>
             </thead>
             <tbody>
              {listUsers}
             </tbody>
          </table>
        </div>
        </Tab>
        <Tab eventKey={3} disabled={this.state.state1.deactiveStep3} title="Buoc 3">

        <h1>Tiến Hành Xét Duyệt</h1>
        {contentTab3}
        <div className="table-responsive">
          <table className="table">
            <thead>
             <tr>
               <th>#</th>
               <th>Họ Tên</th>
               <th>Email</th>
               <th>MSSV</th>
               <th>CMND</th>
               <th>SDT</th>
               </tr>
             </thead>
             <tbody>
              {listUsers}
             </tbody>
          </table>
        </div>
        </Tab>
      </Tabs>
    );
  }
}
export default XetDuyetMoi;
