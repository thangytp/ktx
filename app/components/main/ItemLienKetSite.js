import React from 'react';
import ReactDom from 'react-dom';
import {Modal} from 'react-bootstrap';
import Slider from 'react-slick';

class ItemLienKetSite extends React.Component {
	constructor(props)
	{
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

	render() {  

		return(
			
				<div key={this.props.num}>{this.props.site.name}</div>
			
		);
	}
}

export default ItemLienKetSite;