import React from 'react';
import ReactDom from 'react-dom';
import {Modal} from 'react-bootstrap';
import {Link} from 'react-router';

import HomeMenuAction from '../../../actions/admin/menu/HomeMenuAction';
import HomeMenuStore from '../../../stores/admin/menu/HomeMenuStore';

import ListItemMenu from './ListItemMenu';

import LastItem from './LastItem';

class SubItem extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = HomeMenuStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		HomeMenuStore.listen(this.onChange);
		// HomeMenuAction.testGetListCha();
		// HomeMenuAction.getAllMenu();
	}

	componentWillUnmount() {
		HomeMenuStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);  
	}

	render(){
		let menuCon = this.props.listCon.map((con, index) =>{
			if(con.subChild.length != 0){
				return(
						<li key = {index} className='menu-item-has-children'>
							<Link to='#'><span>{con.title} <i className="fa fa-plus pull-right" aria-hidden="true"></i></span></Link>
							<LastItem listChau = {con.subChild} num={index}/>
						</li>
					);
			}
			else{
				return(
						<li key = {index}>
							<Link to={'/'+ con.slug}><span>{con.title}</span></Link>
						</li>
					);
			}
		});

		return(
				<ul>
					{menuCon}
				</ul>
			);
	}

}

export default SubItem;