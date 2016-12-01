import React from 'react';
import Header from './Header';
import Footer from './Footer';
import LienKetSiteMain from './LienKetSiteMain';
import DivideComponent from './DivideComponent';

class Main extends React.Component {
  render() {
    return (
      <div className="main-body">	
        <Header/>
        <div className="">
          {this.props.children}
        </div>		

        
        <Footer/>
      </div>
    );
  }
}

export default Main;
