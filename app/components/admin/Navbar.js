import React from 'react';
import {Link} from 'react-router';
// import NavbarStore from '../../stores/NavbarStore';
// import NavbarActions from '../../actions/NavbarActions';
import LogInAdminAction from '../../actions/admin/login/LogInAdminAction';
import {Modal} from 'react-bootstrap';
import localStorage from 'localStorage';
import {
  ToastContainer,
  ToastMessage,
} from 'react-toastr';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    // this.state = NavbarStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    // NavbarStore.listen(this.onChange);

    // let socket = io.connect();

    // socket.on('onlineUsers', (data) => {
    //   NavbarActions.updateOnlineUsers(data);
    // });

    // socket.on('addtransition', ({username,bookname}) => {
    //   this.refs.toast.success(username+ ' đăng ký '+bookname, 'Đăng ký mượn sách', {
    //       closeButton: true,
    //   });
    // });


    // $(document).ajaxStart(() => {
    //   NavbarActions.updateAjaxAnimation('fadeIn');
    // });

    // $(document).ajaxComplete(() => {
    //   setTimeout(() => {
    //     NavbarActions.updateAjaxAnimation('fadeOut');
    //   }, 750);
    // });
  }
   componentWillUnmount() {
    // NavbarStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  // handleSubmit(event) {
  //   event.preventDefault();

  //   let searchQuery = this.state.searchQuery.trim();

  //   if (searchQuery) {
  //     NavbarActions.findCharacter({
  //       searchQuery: searchQuery,
  //       searchForm: this.refs.searchForm,
  //       history: this.props.history
  //     });
  //   }
  // }
  test(e) {
    console.log("abcde");
  }
  render() {
    // let style={'text-align':'center'};
    let adminname =localStorage.getItem('adminEmail');
    if (adminname)
    {
      adminname = adminname.toString();
    }
    let avatar = localStorage.getItem('adminavatar');
    return (
          <div className="row">
            <div className="col-md-12">
              <p>admin</p>
              <a href="#" type="button" name="button" onClick ={LogInAdminAction.logout}> <i className="fa fa-sign-out" /> Thoát</a>
            </div>
          </div>

      );
  }
}

export default Navbar;
