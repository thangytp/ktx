import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import SidebarLeft from './SidebarLeft';
import localStorage from 'localStorage';
class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
   componentDidMount() {
   	 //  if (!localStorage.getItem('adminusername'))
    	// {
     //  	this.context.router.push('/admin/login');
     //  }
  }
  componentWillUnmount() {
  }
  onChange(state) {
    this.setState(state);
  }
  render() {

    return (
      <div className="">
          
              <Navbar />
  	      	  <SidebarLeft />
              <section id="page-content" className="no-overflow">
                
  				          {this.props.children}
                <Footer />
              </section>
              <div id="back-top" className="circle" style={{"display": "none"}}>
                  <i className="fa fa-angle-up"></i>
              </div>
      </div>

    );
  }
}
App.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default App;
