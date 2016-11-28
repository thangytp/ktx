import React from 'react';
import {Link} from 'react-router'
import {Modal, Button} from 'react-bootstrap';
import ManageUserAction from '../../../actions/admin/manage-user/ManageUserAction';
import ManageUserStore from '../../../stores/admin/manage-user/ManageUserStore';

class XetDuyetStudent extends React.Component {

  constructor(props)
	{
		super(props);
    this.state = ManageUserStore.getState();
    // this.state = {};
		this.onChange = this.onChange.bind(this);

  }

  componentWillMount() {

  }

  componentDidMount() {
    ManageUserStore.listen(this.onChange);
    ManageUserAction.getUsersByXetDuyetThanhCong();
  }

  componentWillUnmount() {
    ManageUserStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(ManageUserStore.getState());
  }

  render() {

    let listUsers = this.state.usersxd.map(function(user, index){
        return (
          <tr>
           <th scope="row">{index + 1}</th>
           <td>{user.ho_lot + ' ' + user.ten}</td>
           <td>{user.email}</td>
           <td>{user.ma_sinh_vien}</td>
           <td>{user.ma_ktx}</td>
           {/*// <td>{user.ma_giuong}</td>
           // <td>{user.ten_giuong}</td>
           // <td>{user.ten_phong}</td>*/}
           <td>{user.so_cmnd}</td>
           <td>{user.dien_thoai}</td>
          </tr>
        )
    }, this);

    return (
      <div>
        <div className="table-responsive">
          <table className="table">
            <thead>
             <tr>
               <th>#</th>
               <th>Họ Tên</th>
               <th>Email</th>
               <th>MSSV</th>
               <th>Mã KTX</th>
               {/*<th>Mã Giường</th>
               <th>Tên Giường</th>
               <th>Tên Phòng</th>*/}
               <th>CMND</th>
               <th>SDT</th>

               </tr>
             </thead>
             <tbody>
              {listUsers}
             </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default XetDuyetStudent;
