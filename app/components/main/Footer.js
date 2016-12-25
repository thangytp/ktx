import React from 'react';
import {Link} from 'react-router';
import {animateScroll}  from  'react-scroll';


class Footer extends React.Component {
   constructor(props) {
    super(props);

  }
  componentDidMount() {


  }
   componentWillUnmount() {

  }

  onChange(state) {
   this.setState(state);
  }
  render() {


    return (
      <footer id="footer" className="mt-10">
        <div className="cs-copyright">
            <div className="container">
                <div className="row">

                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                      <div className="col-footer " id="">
                          <h4 className="footer-title">Ký túc xá Bách Khoa</h4>
                          <p className="text-intro">Trường Đại học Bách khoa đã vay được 60 tỷ đồng vốn kích cầu của Tp HCM để xây dựng KTX hiện đại ở Quận 10,
                           có sức chứa hơn 2.500 Sinh viên, với trang thiết bị hoàn chỉnh, quản lý theo phương thức hiện đại và có thể
                           so sánh với các KTX của các trường đại học quốc tế.</p>
                          <p>(trích báo cáo hội nghị thường niên năm 2010 của Đại học Quốc gia Tp.HCM)</p>

                      </div>
                    </div>


                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div className="col-footer " id="footer-tien-ich">
                            <h4 className="footer-title">Tiện ích sinh viên</h4>
                            <ul className="nPL">
                                <li><Link to="/"><i className="fa fa-hand-o-right" aria-hidden="true"></i> Xem điểm rèn luyện</Link></li>
                                <li><Link to="/"><i className="fa fa-hand-o-right" aria-hidden="true"></i> Xem điểm vệ sinh</Link></li>
                                <li><Link to="/"><i className="fa fa-hand-o-right" aria-hidden="true"></i> Xem chỉ số điện nước</Link></li>
                                <li><Link to="/tra-cuu-luu-tru"><i className="fa fa-hand-o-right" aria-hidden="true"></i> Tra cứu sinh viên đang lưu trú</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div className="col-footer " id="footer-contact">
                            <h4 className="footer-title">Liên hệ</h4>
                            <p><i className="fa fa-map-marker" aria-hidden="true"></i> 497 Hòa Hảo, Phường 7, Quận 10, TPHCM</p>
                            <p><a href="mailto:ktx@hcmut.edu.vn"><i className="fa fa-envelope-o" aria-hidden="true"></i>  ktx@hcmut.edu.vn</a></p>
                            <p><i className="fa fa-phone" aria-hidden="true"></i> 08.39573946</p>

                            <h4 className="footer-title mT20">Mạng xã hội</h4>
                            <ul className="list-social-icon">
                                <li className="social-icon"><a href="https://www.facebook.com/ktxbk.vn" target="_blank"><i className="fa fa-facebook-square" aria-hidden="true"></i></a></li>
                                <li className="social-icon"><a href="https://www.facebook.com/ktxbk.vn" target="_blank"><i className="fa fa-google-plus-square" aria-hidden="true"></i></a></li>
                                <li className="social-icon"><a href="https://www.facebook.com/ktxbk.vn" target="_blank"><i className="fa fa-twitter-square" aria-hidden="true"></i></a></li>
                                <li className="social-icon"><a href="https://www.facebook.com/ktxbk.vn" target="_blank"><i className="fa fa-tumblr-square" aria-hidden="true"></i></a></li>
                                <li className="social-icon"><a href="https://www.facebook.com/ktxbk.vn" target="_blank"><i className="fa fa-youtube-square" aria-hidden="true"></i></a></li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="footer-bottom text-center">
            <h4 className="text-copy"><i className="fa fa-copyright" aria-hidden="true"></i> Copyright 2016. Ký túc xá Bách Khoa</h4>
        </div>
      </footer>
    );
  }
}

export default Footer;
