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
      <div className="container-fluid">
          <div className="row">
  	      	  
  	      	  <SidebarLeft />
              <div className="col-md-10">
                <Navbar />
  	      	    <div className="right_col" role="main">
  				          {this.props.children}
                </div>
                <Footer />
              </div>
          </div>
      </div>

    );
  }
}
App.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default App;
