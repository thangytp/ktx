import React from 'react';
import {Link} from 'react-router';
import localStorage from 'localStorage';

class LienKetSite extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {

  }
  componentWillUnmount() {

  }

  onChange(state) {
    this.setState(state);
  }

  render(){
  		return(
  			<p>Liên Kết Site</p>
  			);
  	}
}
export default LienKetSite;