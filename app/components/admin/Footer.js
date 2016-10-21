import React from 'react';
import {animateScroll}  from  'react-scroll'; 

class Footer extends React.Component {

  render() {  
    return (
              
        <footer>
          <div className="pull-right">
            Ký túc xá Bách Khoa
          </div>
          <div className="clearfix"></div>
          <button className="admintoTopbutton" id ="admintoTopbutton"
          onClick={animateScroll.scrollToTop}><i className="fa fa-arrow-up" aria-hidden="true"></i></button>
        </footer>
    );
  }
}

export default Footer;