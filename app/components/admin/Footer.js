import React from 'react';
import {animateScroll}  from  'react-scroll'; 

class Footer extends React.Component {

  render() {  
    return (
              
        <footer className="footer-content">
          
            Ký túc xá Bách Khoa
            {/*<span className="pull-right">
              <button className="admintoTopbutton btn" id ="admintoTopbutton"
            onClick={animateScroll.scrollToTop}><i className="fa fa-arrow-up" aria-hidden="true"></i></button>
          </span>*/}
          
        </footer>
    );
  }
}

export default Footer;