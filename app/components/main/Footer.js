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
                        <div className="col-footer " id="footer-tien-ich">
                            <h4 className="footer-title">Tiện ích sinh viên</h4>
                            <ul className="nPL">
                                <li><Link to="/tra-cuu-diemktx"><i className="fa fa-hand-o-right" aria-hidden="true"></i> Xem điểm rèn luyện ký túc xá</Link></li>
                                <li><Link to="/tra-cuu-dien-nuoc"><i className="fa fa-hand-o-right" aria-hidden="true"></i> Xem chỉ số điện nước</Link></li>
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
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                      <div className="col-footer " id="">
                        <section id="gg-maps" className="mT20 hidden-xs">
                          <a href="https://www.google.com/maps?ll=10.760102,106.662106&z=16&t=m&hl=en-US&gl=US&mapclient=embed&cid=17023388983196915844" target="_blank"><img src="/img/bachkhoa-map.png"></img></a>
                        </section>
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
