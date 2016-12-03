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
      <footer id="footer">
        <div className="cs-copyright">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div className="map">
                            <a href="https://www.google.com/maps/place/Ký+túc+xá+Đại+học+Bách+Khoa/@10.7599437,106.6603031,17z" target="_blank">
                                <img src="/img/mapktx.png" className="img-responsive"/>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div className="copyright-text">
                            <p>© Ký túc xá Bách Khoa.</p>
                            <p><i className="fa fa-map-marker" aria-hidden="true"></i> 497 Hòa Hảo, P7, Q10, TPHCM</p>
                            <p><i className="fa fa-envelope-o" aria-hidden="true"></i>  ktx@hcmut.edu.vn</p>
                            <p><i className="fa fa-phone" aria-hidden="true"></i> 08.39573946</p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div className="cs-social-media">
                          <ul>
                              <li><a href="https://www.facebook.com/ktxbk.vn" target='_blank'><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </footer>
    );
  }
}

export default Footer;