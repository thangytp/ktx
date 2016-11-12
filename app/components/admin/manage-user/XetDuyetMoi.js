import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import ManageUserAction from '../../../actions/admin/manage-user/ManageUserAction';
import ManageUserStore from '../../../stores/admin/manage-user/ManageUserStore';

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
		this.state = ManageUserStore.getState();
		this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ManageUserStore.listen(this.onChange);
  }

  componentWillUnmount() {
    ManageUserStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {

    let listUsers = this.state.users.map(function(user, index){
        return (
          <tr>
           <th scope="row">{index + 1}</th>
           <td>{user.ho_lot}' '{user.ten}</td>
           <td>{user.email}</td>
           <td>{user.ma_sinh_vien}</td>
           <td>{user.ma_ktx}</td>
           <td>{user.ma_giuong}</td>
           <td>{user.ten_giuong}</td>
           <td>{user.ten_phong}</td>
           <td>{user.so_cmnd}</td>
           <td>{user.dien_thoai}</td>
          </tr>
        )
    });

    return (
      <Tabs defaultActiveKey={1} id="luutrumoi">
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
                 <th>Mã KTX</th>
                 <th>Mã Giường</th>
                 <th>Tên Giường</th>
                 <th>Tên Phòng</th>
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
        <Tab eventKey={2} disabled={this.state.deactiveStep2} title="Bước 2">
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
               <th>Mã KTX</th>
               <th>Mã Giường</th>
               <th>Tên Giường</th>
               <th>Tên Phòng</th>
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
        <Tab eventKey={3} disabled={this.state.deactiveStep3} title="Buoc 3">Tab 3 content</Tab>
      </Tabs>
    );
  }
}
export default XetDuyetMoi;
