import React from 'react';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';

export default class SignUp extends React.Component {
  constructor(props)
  {
    super(props);
    // this.state = SignUpStore.getState();
    this.onChange = this.onChange.bind(this);
  }
   componentDidMount() {  
    // SignUpStore.listen(this.onChange);
  }
  componentWillUnmount() {
    // SignUpStore.unlisten(this.onChange);
  }
  onChange(state) {
    this.setState(state);
  } 
  handleSubmitUser(event)
  {   
    var username = this.state.username.trim();
    var password = this.state.password;
    var repassword = this.state.repassword;
    var firstname = this.state.fname;
    var lastname = this.state.lname;
    var barcode = '';
    var type = this.state.type;

    if (!lastname) {
      SignUpAction.invalidlastName();
      this.refs.lastNameTextField.focus();
    }
    if (!firstname) {
      SignUpAction.invalidfirstName();
      this.refs.firstNameTextField.focus();
    }
    if (!repassword) {
      SignUpAction.invalidrepassword();
      this.refs.repasswordTextField.focus();
    }
    if (!password) {
      SignUpAction.invalidpassword();
      this.refs.passwordTextField.focus();
    }
    if (!username) {
      SignUpAction.invaliduserName();
      this.refs.userNameTextField.focus();
    }
    if(repassword != password)
    {
      SignUpAction.passwordNotSame();
      this.refs.repasswordTextField.focus();
    }
    if (username && repassword && password &&firstname &&lastname &&type) {
          SignUpAction.addUser({
            id:'',
            userName:username,
            pass:password,
            firstName:firstname,
            lastName:lastname ,
            barcode:barcode,
            type: Number(type),
            avatar:'/uploads/avatar.jpg'
          });
    }
     event.preventDefault();
  }

  render() {
    return (     
            <div className="container luu-tru">
              
              <div className="row">
                <div className="col-md-10 col-md-offset-1">
                  <h2>Đăng ký lưu trú ký túc xá</h2>
                  <form className="form-horizontal" role="form">
                    <div className="form-body">
                      <div className={'form-group has-feedback ' }>
                        <label htmlFor="khu-vuc-uu-tien" className="col-md-3 control-label">Khu vực ưu tiên</label>
                        <div className="col-md-9">
                            <select className="form-control" id="khu-vuc-uu-tien">
            					        <option>-Khu vực ưu tiên-</option>
            					        <option>Khu vực 1</option>
            					        <option>Khu vực 2</option>
            					        <option>Khu vực 2 NT</option>
                            </select>
                        </div>
                      </div> 
                      <div className={'form-group has-feedback ' }>
                        <label htmlFor="tinh" className="col-md-3 control-label">Tỉnh</label>
                        <div className="col-md-9">
                            <select className="form-control" id="tinh">
                              <option value="0">-Tỉnh-</option>
                            
                              <option value="1">Hồ Chí Minh</option>
                          
                              <option value="2">Hà Nội</option>
                          
                              <option value="3">Đà Nẵng</option>
                          
                              <option value="4">Cần Thơ</option>
                          
                              <option value="5">Hải Phòng</option>
                          
                              <option value="6">An Giang</option>
                          
                              <option value="7">Bà Rịa Vũng Tàu</option>
                          
                              <option value="8">Bắc Giang</option>
                          
                              <option value="9">Bắc Kạn</option>
                          
                              <option value="10">Bạc Liêu</option>
                          
                              <option value="11">Bắc Ninh</option>
                          
                              <option value="12">Bến Tre</option>
                          
                              <option value="13">Bình Định</option>
                          
                              <option value="14">Bình Dương</option>
                          
                              <option value="15">Bình Phước</option>
                          
                              <option value="16">Bình Thuận</option>
                          
                              <option value="17">Cà Mau</option>
                          
                              <option value="18">Cao Bằng</option>
                          
                              <option value="19">Đăk Lăk</option>
                          
                              <option value="20">Đăk Nông</option>
                          
                              <option value="21">Điện Biên</option>
                          
                              <option value="22">Đồng Nai</option>
                          
                              <option value="23">Đồng Tháp</option>
                          
                              <option value="24">Gia Lai</option>
                          
                              <option value="25">Hà Giang</option>
                          
                              <option value="26">Hà Nam</option>
                          
                              <option value="27">Hà Tĩnh</option>
                          
                              <option value="28">Hải Dương</option>
                          
                              <option value="29">Hậu Giang</option>
                          
                              <option value="30">Hòa Bình</option>
                          
                              <option value="31">Hưng Yên</option>
                          
                              <option value="32">Khánh Hòa</option>
                          
                              <option value="33">Kiên Giang</option>
                          
                              <option value="34">Kon Tum</option>
                          
                              <option value="35">Lai Châu</option>
                          
                              <option value="36">Lâm Đồng</option>
                          
                              <option value="37">Lạng Sơn</option>
                          
                              <option value="38">Lào Cai</option>
                          
                              <option value="39">Long An</option>
                          
                              <option value="40">Nam Định</option>
                          
                              <option value="41">Nghệ An</option>
                          
                              <option value="42">Ninh Bình</option>
                          
                              <option value="43">Ninh Thuận</option>
                          
                              <option value="44">Phú Thọ</option>
                          
                              <option value="45">Phú Yên</option>
                          
                              <option value="46">Quảng Bình</option>
                          
                              <option value="47">Quảng Nam</option>
                          
                              <option value="48">Quảng Ngãi</option>
                          
                              <option value="49">Quảng Ninh</option>
                          
                              <option value="50">Quảng Trị</option>
                          
                              <option value="51">Sóc Trăng</option>
                          
                              <option value="52">Sơn La</option>
                          
                              <option value="53">Tây Ninh</option>
                          
                              <option value="54">Thái Bình</option>
                          
                              <option value="55">Thái Nguyên</option>
                          
                              <option value="56">Thanh Hóa</option>
                          
                              <option value="57">Thừa Thiên Huế</option>
                          
                              <option value="58">Tiền Giang</option>
                          
                              <option value="59">Trà Vinh</option>
                          
                              <option value="60">Tuyên Quang</option>
                          
                              <option value="61">Vĩnh Long</option>
                          
                              <option value="62">Vĩnh Phúc</option>
                          
                              <option value="63">Yên Bái</option>
                            
                            </select>
                        </div>
                      </div> 
                      <div className={'form-group has-feedback ' }>
                        <label htmlFor="doi-tuong-uu-tien" className="col-md-3 control-label">Đối tượng ưu tiên</label>
                        <div className="col-md-9">
                            <select className="form-control" id="doi-tuong-uu-tien">
                              <option>-Đối tượng ưu tiên-</option>
                              <option>Sinh viên dân tộc</option>
                              <option>Sinh viên</option>
                            </select>
                        </div>
                      </div> 
                      <div className={'form-group has-feedback ' }>
                        <label htmlFor="sinh-vien" className="col-md-3 control-label">Là sinh viên</label>
                        <div className="col-md-9">
                            <select className="form-control" id="sinh-vien">
                              <option>---</option>
                              <option>Sinh viên khá</option>
                              <option>Sinh viên giỏi</option>
                              <option>Sinh viên KSTN</option>
                              <option>Sinh viên PFIEV</option>
                            </select>
                        </div>
                      </div> 
                      <div className={'form-group has-feedback ' }>
                        <label htmlFor="hoan-canh" className="col-md-3 control-label">Hoàn cảnh gia đình</label>
                        <div className="col-md-9">
                            <select className="form-control" id="hoan-canh">
                              <option>---</option>
                              <option>Mồ côi cha me</option>
                              <option>Mất cha hoặc mẹ</option>
                              <option>Hộ nghèo</option>
                              <option>Cận nghèo</option>
                            </select>
                        </div>
                      </div> 
                      <div className={'form-group has-feedback ' }>
                        <label htmlFor="phong-luu-tru" className="col-md-3 control-label">Nguyện vọng lưu trú</label>
                        <div className="col-md-9">
                            <select className="form-control" id="phong-luu-tru">
                              <option>---</option>
                              <option>Phòng thông thường</option>
                              <option>Phòng dịch vụ</option>
                            </select>
                        </div>
                      </div> 
                                    
                    </div> 
               
                     {/* <div className="form-group">
                        <label className="col-md-3 control-label" />
                        <div className="col-md-9">
                          <input type="checkbox" name="remember" defaultValue={1} /> Nhớ đến tôi?
                        </div>
                      </div>  */} 
                    <div className="form-group"> 
                      <div className="col-sm-offset-3 col-sm-9">
                        <button type="submit" className="btn btn-default btn-signup" onClick ={this.handleSubmitUser.bind(this)}>Đăng ký lưu trú</button>
                      </div>
                    </div>    
                  </form> 
                </div>
              </div>
            </div>
    );
  }
}