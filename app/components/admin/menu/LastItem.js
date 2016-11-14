import React from 'react';
import ReactDom from 'react-dom';
import {Modal} from 'react-bootstrap';
import {Link} from 'react-router';

import HomeMenuAction from '../../../actions/admin/menu/HomeMenuAction';
import HomeMenuStore from '../../../stores/admin/menu/HomeMenuStore';


class LastItem extends React.Component {

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
		let menuChau = this.props.listChau.map((chau, index) =>{
			return(
					<li key = {index}>
						<Link to={'/' + chau.slug}><span>{chau.title}</span></Link>
					</li>
				);
		});

		return(
				<ul>
					{menuChau}
				</ul>
			);
	}

}

export default LastItem;