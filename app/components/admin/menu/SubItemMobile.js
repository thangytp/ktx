import React from 'react';
import ReactDom from 'react-dom';
import {Modal} from 'react-bootstrap';
import {Link} from 'react-router';

import HomeMenuAction from '../../../actions/admin/menu/HomeMenuAction';
import HomeMenuStore from '../../../stores/admin/menu/HomeMenuStore';

import LastItemMobile from './LastItemMobile';

class SubItemMobile extends React.Component {

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
						<li key = {index} className='dropdown-submenu'>
							<Link to='' className="test" tabIndex="-1"><span>{con.title}</span> <span className="caret"></span></Link>
							<LastItemMobile listChau = {con.subChild} num={index}/>
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
				<ul className="dropdown-menu">
					{menuCon}
				</ul>
			);
	}

}

export default SubItemMobile;