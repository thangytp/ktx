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
        <div className="container">
          <hr/>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12 col-xs-12">
                  <p>© Ký túc xá Bách Khoa</p>
                  <p><i className="fa fa-map-marker" aria-hidden="true"></i> <span>497 Hoà Hảo, phường 7, Quận 10, Tp.HCM</span></p>
                  <p><i className="fa fa-phone-square" aria-hidden="true"></i> <span>08 39573946</span></p>
                </div>
            </div>
        </div>
      </footer>
    );
  }
}

export default Footer;