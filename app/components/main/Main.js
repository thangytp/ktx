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

        <section id="gg-maps" className="hidden-xs">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6773286000303!2d106.66229871594932!3d10.759332357202917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752eefca0e6fb9%3A0xec3f3a1620c01884!2zS8O9IHTDumMgeMOhIMSQ4bqhaSBo4buNYyBCw6FjaCBLaG9h!5e0!3m2!1sen!2s!4v1481119477834" width="100%" height="300" frameborder="0" style={{"border":"0"}} allowfullscreen></iframe>
        </section>
        <Footer/>
      </div>
    );
  }
}

export default Main;
