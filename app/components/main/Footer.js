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
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div className="copyright-text">
                            <p>© Ký túc xá Bách Khoa.</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
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