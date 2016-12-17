import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import {Link} from 'react-router';

import ManageUserAction from '../../../actions/admin/manage-user/ManageUserAction';
import ManageUserStore from '../../../stores/admin/manage-user/ManageUserStore';
import ManageChiTieuAction from '../../../actions/admin/manage-chitieu/ManageChiTieuAction';
import ManageChiTieuStore from '../../../stores/admin/manage-chitieu/ManageChiTieuStore';

var HocVu = React.createClass({
    uploadFile: function (e) {
        var fd = new FormData();
        fd.append('file', this.refs.file.files[0]);
        ManageUserAction.updateHocVuXetDuyet(fd);
        e.preventDefault()
    },
    render: function() {
        return (
            <div>
               <form ref="uploadForm" className="uploader" encType="multipart/form-data" >
                   <input ref="file" type="file" name="file" className="upload-file"/>
                   <input type="button" ref="button" className="btn btn-success" value="Upload" onClick={this.uploadFile.bind(this)} />
               </form>
            </div>
        );
    }
});

var DiemRenLuyen = React.createClass({
    getInitialState() {
    return { 'activeUploadDrl' : true };
    },
    uploadFile: function (e) {
        var fd = new FormData();
        fd.append('file', this.refs.file.files[0]);
        ManageUserAction.updateDiemRenLuyenXetDuyet({'file' : fd, 'drl' : parseInt(this.refs.diemrl.value)});
        e.preventDefault()
    },
    activeInput: function() {
      if(this.refs.diemrl.value !== '') {
        this.setState({'activeUploadDrl' : false});
        this.setState({'state1.diemrl' : parseInt(this.refs.diemrl.value)});
      } else {
        this.setState({'activeUploadDrl' : true});
      }
    },
    render: function() {
        return (
            <div>
               <form ref="uploadForm" className="uploader form-horizontal pT20" encType="multipart/form-data" >
                  <div className="col-sm-12 mt-10">
                    <label className="control-label col-sm-3" htmlFor="diemrl">Mức điểm rèn luyện</label>
                    <div className="col-sm-7">
                      <input id="diemrl" ref='diemrl' type="number" name="number" onChange={this.activeInput.bind(this)} />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="col-sm-offset-3 ">
                      <input ref="file" type="file" name="file" className="upload-file mL10"/>
                      <input type="button" ref="button" className="btn btn-success mL10" value="Upload" disabled={this.state.activeUploadDrl} onClick={this.uploadFile.bind(this)} />
                    </div>
                  </div>
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
    ManageUserAction.getUsers();
    ManageChiTieuStore.listen(this.onChange);
    ManageChiTieuAction.getChitieu();
  }

  componentWillUnmount() {
    ManageUserStore.unlisten(this.onChange);
    ManageChiTieuStore.unlisten(this.onChange);
  }

  handleXetDuyet(phong, soluong, phai, diemcb, nam) {
    const data = {
        phongid: phong._id,
        soluong : soluong,
        phai: phai,
        diemcb : diemcb,
        nam : nam,
        drl : this.state.state1.inputdrl
    };
    ManageUserAction.updateXetDuyetXetDuyet(data);
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

    let listUsersEHocvu = this.state.state1.usersehv.map(function(user, index){
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

    let listUsersHocvu = this.state.state1.usershv.map(function(user, index){
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

    let listUsersEDiemrenluyen = this.state.state1.usersedrl.map(function(user, index){
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
    let listUsersDiemrenluyen = this.state.state1.usersdrl.map(function(user, index){
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

    let listUsersDiemxetduyet = this.state.state1.usersdxd.map(function(user, index){
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

    let listUsersHvLoai = this.state.state1.usershvloai.map(function(user, index){
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
    let listUsersDrlLoai = this.state.state1.usersdrlloai.map(function(user, index){
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
    console.log(this.state.state2.chitieu[0]);
    if(this.state.state2.chitieu[0] === undefined) {
        contentTab3 = null
    } else {
      contentTab3 = (
        <Tabs defaultActiveKey={1} id="tienhanhxetduyet">
          {this.state.state2.chitieu[0].chitiet.map(function(chitiet, index){
            return (
              <Tab eventKey={index + 1} title='Phòng'>
                <div className="dropdown col-md-2 mt-10">
                  <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Năm 1
                  <span className="caret"></span></button>
                  <ul className="dropdown-menu">
                    <li>
                        <a className="" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam1.xetduyet.male,'m', chitiet.nam1.xetduyet.diemcoban, 1)}>Nam</a>
                      </li>
                      <li>
                        <a className="" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam1.xetduyet.female,'f', chitiet.nam1.xetduyet.diemcoban, 1)}>Nữ</a>
                      </li>
                  </ul>
                </div>
                <div className="dropdown col-md-2 mt-10">
                  <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Năm 2
                  <span className="caret"></span></button>
                  <ul className="dropdown-menu">
                    <li>
                        <a className="" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam2.xetduyet.male,'m', chitiet.nam2.xetduyet.diemcoban, 2)}>Nam</a>
                      </li>
                      <li>
                        <a className="" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam2.xetduyet.female,'f', chitiet.nam2.xetduyet.diemcoban, 2)}>Nữ</a>
                      </li>
                  </ul>
                </div>
                <div className="dropdown col-md-2 mt-10">
                  <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Năm 3
                  <span className="caret"></span></button>
                  <ul className="dropdown-menu">
                    <li>
                        <a className="" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam3.xetduyet.male,'m', chitiet.nam3.xetduyet.diemcoban, 3)}>Nam</a>
                      </li>
                      <li>
                        <a className="" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam3.xetduyet.female,'f', chitiet.nam3.xetduyet.diemcoban, 3)}>Nữ</a>
                      </li>
                  </ul>
                </div>
                <div className="dropdown col-md-2 mt-10">
                  <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Năm 4
                  <span className="caret"></span></button>
                  <ul className="dropdown-menu">
                    <li>
                        <a className="" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam4.xetduyet.male,'m', chitiet.nam4.xetduyet.diemcoban, 4)}>Nam</a>
                      </li>
                      <li>
                        <a className="" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam4.xetduyet.female,'f', chitiet.nam4.xetduyet.diemcoban, 4)}>Nữ</a>
                      </li>
                  </ul>
                </div>
                <div className="dropdown col-md-2 mt-10">
                  <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Năm 5
                  <span className="caret"></span></button>
                  <ul className="dropdown-menu">
                    <li>
                        <a className="" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam5.xetduyet.male,'m', chitiet.nam5.xetduyet.diemcoban, 5)}>Nam</a>
                      </li>
                      <li>
                        <a className="" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam5.xetduyet.female,'f', chitiet.nam5.xetduyet.diemcoban, 5)}>Nữ</a>
                      </li>
                  </ul>
                </div>
                <div className="dropdown col-md-2 mt-10">
                  <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Năm 6
                  <span className="caret"></span></button>
                  <ul className="dropdown-menu">
                    <li>
                        <a className="" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam6.xetduyet.male,'m', chitiet.nam6.xetduyet.diemcoban, 6)}>Nam</a>
                      </li>
                      <li>
                        <a className="" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam6.xetduyet.female,'f', chitiet.nam6.xetduyet.diemcoban, 6)}>Nữ</a>
                      </li>
                  </ul>
                </div>
                {/*<ul className="listBtn-xd">
                  <li>
                    <button className="btn btn-large btn-success">Năm 1</button>
                    <ul className="listBtn-nn">
                      <li>
                        <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam1.xetduyet.male,'m', chitiet.nam1.xetduyet.diemcoban, 1)}>Nam</button>
                      </li>
                      <li>
                        <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam1.xetduyet.female,'f', chitiet.nam1.xetduyet.diemcoban, 1)}>Nữ</button>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <button className="btn btn-large btn-success">Năm 2</button>
                    <ul className="listBtn-nn">
                      <li>
                        <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam2.xetduyet.male,'m', chitiet.nam2.xetduyet.diemcoban, 2)}>Nam</button>
                      </li>
                      <li>
                        <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam2.xetduyet.female,'f', chitiet.nam2.xetduyet.diemcoban, 2)}>Nữ</button>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <button className="btn btn-large btn-success">Năm 3</button>
                    <ul className="listBtn-nn">
                      <li>
                        <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam3.xetduyet.male,'m', chitiet.nam3.xetduyet.diemcoban, 3)}>Nam</button>
                      </li>
                      <li>
                        <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam3.xetduyet.female,'f', chitiet.nam3.xetduyet.diemcoban, 3)}>Nữ</button>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <button className="btn btn-large btn-success">Năm 4</button>
                    <ul className="listBtn-nn">
                      <li>
                        <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam4.xetduyet.male,'m', chitiet.nam4.xetduyet.diemcoban, 4)}>Nam</button>
                      </li>
                      <li>
                        <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam4.xetduyet.female,'f', chitiet.nam4.xetduyet.diemcoban, 4)}>Nữ</button>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <button className="btn btn-large btn-success">Năm 5</button>
                    <ul className="listBtn-nn">
                      <li>
                        <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam5.xetduyet.male,'m', chitiet.nam5.xetduyet.diemcoban, 5)}>Nam</button>
                      </li>
                      <li>
                        <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam5.xetduyet.female,'f', chitiet.nam5.xetduyet.diemcoban, 5)}>Nữ</button>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <button className="btn btn-large btn-success">Năm 6</button>
                    <ul className="listBtn-nn">
                      <li>
                        <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam6.xetduyet.male,'m', chitiet.nam6.xetduyet.diemcoban, 6)}>Nam</button>
                      </li>
                      <li>
                        <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam6.xetduyet.female,'f', chitiet.nam6.xetduyet.diemcoban, 6)}>Nữ</button>
                      </li>
                    </ul>
                  </li>
                </ul>*/}
              </Tab>
            )
          }, this)}
        </Tabs>
      )
    }

    let contentHocvu;
    if(this.state.state1.activeHocvu === false) {
      contentHocvu = (
        <div className="uploadLuutru">
          <h3>Vui lòng import file tạm dừng học vụ của phòng đào tạo</h3>
          <HocVu/>
        </div>
      );
    } else {
      contentHocvu = (
        <Tabs defaultActiveKey={1} id="xulyhocvu">
          <Tab eventKey={1} title="Danh sách sinh viên">
            <div className="table">
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
          <Tab eventKey={2} title="Danh sách sinh viên tạm dừng học vụ">
          <div className="table">
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
                {listUsersEHocvu}
               </tbody>
            </table>
          </div>
          </Tab>
          <Tab eventKey={3} title="Danh sách sinh viên đạt tiêu chuẩn">
          <div className="table">
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
                {listUsersHocvu}
               </tbody>
            </table>
          </div>
          </Tab>
          <Tab eventKey={4} title="Danh sách sinh viên bị loại">
          <div className="table">
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
                {listUsersHvLoai}
               </tbody>
            </table>
          </div>
          </Tab>
        </Tabs>
      )
    }

    let contentDiemrenluyen;
    if(this.state.state1.activeDiemrenluyen === false) {
      contentDiemrenluyen = (
        <div className="uploadLuutru">
          <h3>Vui lòng import file điểm rèn luyện của phòng đào tạo</h3>
          <DiemRenLuyen/>
        </div>
      );
    } else {
      contentDiemrenluyen = (
        <Tabs defaultActiveKey={1} id="xulydiemrenluyen">
          <Tab eventKey={1} title="Danh sách sinh viên">
            <div className="table">
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
                  {listUsersHocvu}
                 </tbody>
              </table>
            </div>
          </Tab>
          <Tab eventKey={2} title="Danh sách sinh viên trong file excel">
          <div className="table">
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
                {listUsersEDiemrenluyen}
               </tbody>
            </table>
          </div>
          </Tab>
          <Tab eventKey={3} title="Danh sách sinh viên đạt tiêu chuẩn">
          <div className="table">
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
                {listUsersDiemrenluyen}
               </tbody>
            </table>
          </div>
          </Tab>
          <Tab eventKey={4} title="Danh sách sinh viên bị loại">
          <div className="table">
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
                {listUsersDrlLoai}
               </tbody>
            </table>
          </div>
          </Tab>
        </Tabs>
      )
    }

    let contentDiemxetduyet;
    if(this.state.state1.activeDiemxetduyet === false) {
      contentDiemxetduyet = null;
    } else {
      contentDiemxetduyet = (
        <div className="table">
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
              {listUsersDiemxetduyet}
             </tbody>
          </table>
        </div>
      )
    }

    return (
      // <Tabs defaultActiveKey={this.state.state1.tabActive} id="luutrumoi">
      //   <Tab eventKey={1} title="Bước 1">
      //     {contentHocvu}
      //   </Tab>
      //   <Tab eventKey={2} disabled={this.state.state1.deactiveStep2} title="Bước 2">
      //     {contentDiemrenluyen}
      //   </Tab>
      //   <Tab eventKey={3} disabled={this.state.state1.deactiveStep3} title="Buoc 3">
      //   <h1>Tiến Hành Xét Duyệt</h1>
      //     {contentTab3}
      //     {contentDiemxetduyet}
      //   </Tab>
      // </Tabs>
      <div className="body-content animated fadeIn">
          <div className="row">
            <div className="col-md-12">
              <ol className="breadcrumb">
                <li><Link to="/quanly@ktx"><i className="fa fa-home" aria-hidden="true"></i> Trang quản trị</Link></li>
                <li>Xét duyệt lưu trú mới</li>
              </ol>

              <Tabs defaultActiveKey={1} id="luutrumoi">
                <Tab eventKey={1} title="Bước 1">
                  {contentHocvu}
                </Tab>
                <Tab eventKey={2} title="Bước 2">
                  {contentDiemrenluyen}
                </Tab>
                <Tab eventKey={3} title="Bước 3">
                  {contentTab3}
                  {contentDiemxetduyet}
                </Tab>
              </Tabs>

            </div>
          </div>
      </div>
    );
  }
}
export default XetDuyetMoi;
