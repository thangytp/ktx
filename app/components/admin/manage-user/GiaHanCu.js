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
        ManageUserAction.updateHocVuGiaHan(fd);
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
    getInitialState() {
    return { 'activeUploadDrl' : true };
    },
    uploadFile: function (e) {
        var fd = new FormData();
        fd.append('file', this.refs.file.getDOMNode().files[0]);
        ManageUserAction.updateDiemRenLuyenGiaHan({'file' : fd, 'drl' : parseInt(this.refs.diemrl.value)});
        e.preventDefault()
    },
    activeInput: function() {
      if(this.refs.diemrl.value !== '') {
        this.setState({'activeUploadDrl' : false});
      } else {
        this.setState({'activeUploadDrl' : true});
      }
    },
    render: function() {
        return (
            <div>
               <form ref="uploadForm" className="uploader" encType="multipart/form-data" >
                   <input ref='diemrl' type="number" name="number" onChange={this.activeInput.bind(this)} />
                   <input ref="file" type="file" name="file" className="upload-file"/>
                   <input type="button" ref="button" value="Upload" disabled={this.state.activeUploadDrl} onClick={this.uploadFile.bind(this)} />
               </form>
            </div>
        );
    }
});

var DiemRenLuyenKtx = React.createClass({
    getInitialState() {
      return { 'activeUploadDrlKtx' : true, 'activeUploadDvs' : true};
    },
    uploadFile: function (e) {
        var fd = new FormData();
        fd.append('file', this.refs.file.getDOMNode().files[0]);
        ManageUserAction.updateDiemRenLuyenKtx({'file' : fd, 'drlktx' : parseInt(this.refs.diemrlktx.value), 'dvs' : parseInt(this.refs.diemvs.value)});
        e.preventDefault()
    },
    activeInput1: function() {
      if(this.refs.diemrlktx.value !== '') {
        this.setState({'activeUploadDrlKtx' : false});
      } else {
        this.setState({'activeUploadDrlKtx' : true});
      }
    },
    activeInput2: function() {
      if(this.refs.diemvs.value !== '') {
        this.setState({'activeUploadDvs' : false});
      } else {
        this.setState({'activeUploadDvs' : true});
      }
    },
    render: function() {
        return (
            <div>
               <form ref="uploadForm" className="uploader" encType="multipart/form-data" >
                   <input ref='diemrlktx' type="number" name="number1" onChange={this.activeInput1.bind(this)} />
                   <input ref='diemvs' type="number" name="number2" onChange={this.activeInput2.bind(this)} />
                   <input ref="file" type="file" name="file" className="upload-file"/>
                   <input type="button" ref="button" value="Upload" disabled={this.state.activeUploadDrlKtx || this.state.activeUploadDvs} onClick={this.uploadFile.bind(this)} />
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

  handleXetDuyet(phongid, soluong, phai, diemcb, nam) {
    const data = {
        phongid : phongid._id,
        soluong : soluong,
        phai: phai,
        diemcb : diemcb,
        nam : nam,
        drl : this.state.state1.inputdrl,
        drlktx : this.state.state1.inputdrlktx,
        dvs : this.state.state1.inputdvs
    };
    ManageUserAction.updateXetDuyetGiaHan(data);
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

    let listUsersEHocvu = this.state.state1.usersehvgh.map(function(user, index){
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

    let listUsersHocvu = this.state.state1.usershvgh.map(function(user, index){
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

    let listUsersEDiemrenluyen = this.state.state1.usersedrlgh.map(function(user, index){
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
    let listUsersDiemrenluyen = this.state.state1.usersdrlgh.map(function(user, index){
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

    let listUsersEDiemrenluyenKtx = this.state.state1.usersedrlktx.map(function(user, index){
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

    let listUsersDiemrenluyenKtx = this.state.state1.usersdrlktx.map(function(user, index){
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

    let listUsersDiemxetduyet = this.state.state1.usersdxdgh.map(function(user, index){
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

    let listUsersHvLoai = this.state.state1.usershvloaigh.map(function(user, index){
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
    let listUsersDrlLoai = this.state.state1.usersdrlloaigh.map(function(user, index){
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

    let listUsersDrlKtxLoai = this.state.state1.usersdrlktxloai.map(function(user, index){
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
        <Tabs defaultActiveKey={1} id="tienhanhgiahan">
          {this.state.state2.chitieu[0].chitiet.map(function(chitiet, index){
            return (
              <Tab eventKey={index + 1} title={'Phòng ' + chitiet._phong_id.loai}>
                <ul className="listBtn-xd">
                  <li>
                    <button className="btn btn-large btn-success">Năm 1</button>
                    <ul className="listBtn-nn">
                      <li>
                        <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam1.giahan.male,'M', chitiet.nam1.giahan.diemcoban, 1)}>Nam</button>
                      </li>
                      <li>
                        <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam1.giahan.female,'F', chitiet.nam1.giahan.diemcoban, 1)}>Nữ</button>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <button className="btn btn-large btn-success">Năm 2</button>
                    <ul className="listBtn-nn">
                      <li>
                        <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam2.giahan.male,'M', chitiet.nam2.giahan.diemcoban, 2)}>Nam</button>
                      </li>
                      <li>
                        <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam2.giahan.female,'F', chitiet.nam2.giahan.diemcoban, 2)}>Nữ</button>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <button className="btn btn-large btn-success">Năm 3</button>
                    <ul className="listBtn-nn">
                      <li>
                        <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam3.giahan.male,'M', chitiet.nam3.giahan.diemcoban, 3)}>Nam</button>
                      </li>
                      <li>
                        <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam3.giahan.female,'F', chitiet.nam3.giahan.diemcoban, 3)}>Nữ</button>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <button className="btn btn-large btn-success">Năm 4</button>
                    <ul className="listBtn-nn">
                      <li>
                        <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam4.giahan.male,'M', chitiet.nam4.giahan.diemcoban, 4)}>Nam</button>
                      </li>
                      <li>
                        <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam4.giahan.female,'F', chitiet.nam4.giahan.diemcoban, 4)}>Nữ</button>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <button className="btn btn-large btn-success">Năm 5</button>
                    <ul className="listBtn-nn">
                      <li>
                        <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam5.giahan.male,'M', chitiet.nam5.giahan.diemcoban, 5)}>Nam</button>
                      </li>
                      <li>
                        <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam5.giahan.female,'F', chitiet.nam5.giahan.diemcoban, 5)}>Nữ</button>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <button className="btn btn-large btn-success">Năm 6</button>
                    <ul className="listBtn-nn">
                      <li>
                        <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam6.giahan.male,'M', chitiet.nam6.giahan.diemcoban, 6)}>Nam</button>
                      </li>
                      <li>
                        <button className="btn btn-large btn-success" onClick={this.handleXetDuyet.bind(this, chitiet._phong_id, chitiet.nam6.giahan.female,'F', chitiet.nam6.giahan.diemcoban, 6)}>Nữ</button>
                      </li>
                    </ul>
                  </li>
                </ul>
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
          <h1>Vui lòng import file tạm dừng học vụ của phòng đào tạo</h1>
          <HocVu/>
        </div>
      );
    } else {
      contentHocvu = (
        <Tabs defaultActiveKey={1} id="xulyhocvu">
          <Tab eventKey={1} title="Danh sách sinh viên">
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
          <Tab eventKey={2} title="Danh sách sinh viên tạm dừng học vụ">
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
                {listUsersEHocvu}
               </tbody>
            </table>
          </div>
          </Tab>
          <Tab eventKey={3} title="Danh sách sinh viên đạt tiêu chuẩn">
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
                {listUsersHocvu}
               </tbody>
            </table>
          </div>
          </Tab>
          <Tab eventKey={4} title="Danh sách sinh viên bị loại">
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
          <h1>Vui lòng import file điểm rèn luyện của phòng đào tạo</h1>
          <DiemRenLuyen/>
        </div>
      );
    } else {
      contentDiemrenluyen = (
        <Tabs defaultActiveKey={1} id="xulydiemrenluyen">
          <Tab eventKey={1} title="Danh sách sinh viên">
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
                  {listUsersHocvu}
                 </tbody>
              </table>
            </div>
          </Tab>
          <Tab eventKey={2} title="Danh sách sinh viên không đủ điểm rèn luyện">
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
                {listUsersEDiemrenluyen}
               </tbody>
            </table>
          </div>
          </Tab>
          <Tab eventKey={3} title="Danh sách sinh viên đạt tiêu chuẩn">
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
                {listUsersDiemrenluyen}
               </tbody>
            </table>
          </div>
          </Tab>
          <Tab eventKey={4} title="Danh sách sinh viên bị loại">
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
                {listUsersDrlLoai}
               </tbody>
            </table>
          </div>
          </Tab>
        </Tabs>
      )
    }


    let contentDiemrenluyenKtx;
    if(this.state.state1.activeDiemrenluyenKtx === false) {
      contentDiemrenluyenKtx = (
        <div className="uploadLuutru">
          <h1>Vui lòng import file điểm rèn luyện ký túc xá</h1>
          <DiemRenLuyenKtx/>
        </div>
      );
    } else {
      contentDiemrenluyenKtx = (
        <Tabs defaultActiveKey={1} id="xulydiemrenluyenktx">
          <Tab eventKey={1} title="Danh sách sinh viên">
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
                  {listUsersDiemrenluyen}
                 </tbody>
              </table>
            </div>
          </Tab>
          <Tab eventKey={2} title="Danh sách sinh viên không đủ điểm rèn luyện">
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
                {listUsersEDiemrenluyenKtx}
               </tbody>
            </table>
          </div>
          </Tab>
          <Tab eventKey={3} title="Danh sách sinh viên đạt tiêu chuẩn">
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
                {listUsersDiemrenluyenKtx}
               </tbody>
            </table>
          </div>
          </Tab>
          <Tab eventKey={4} title="Danh sách sinh viên bị loại">
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
                {listUsersDrlKtxLoai}
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
      <Tabs defaultActiveKey={1} id="luutrumoi">
        <Tab eventKey={1} title="Bước 1">
          {contentHocvu}
        </Tab>
        <Tab eventKey={2} title="Bước 2">
          {contentDiemrenluyen}
        </Tab>
        <Tab eventKey={3} title="Bước 3">
          {contentDiemrenluyenKtx}
        </Tab>
        <Tab eventKey={4} title="Bước 4">
          {contentTab3}
          {contentDiemxetduyet}
        </Tab>
      </Tabs>
    );
  }
}
export default XetDuyetMoi;
