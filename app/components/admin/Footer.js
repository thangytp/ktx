import React from 'react';
import {animateScroll}  from  'react-scroll'; 

class Footer extends React.Component {

  render() {  
    return (
              
        <footer className="row admin-footer">
          <div className="pull-right">
            Ký túc xá Bách Khoa
            <button className="admintoTopbutton btn" id ="admintoTopbutton"
          onClick={animateScroll.scrollToTop}><i className="fa fa-arrow-up" aria-hidden="true"></i></button>
          </div>
          
        </footer>
    );
  }
}

export default Footer;