import React from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';
import InlineEdit from 'react-edit-inline';

import QuanLyTinTucAction from '../../../actions/admin/quanlytintuc/QuanLyTinTucAction';
import QuanLyTinTucStore from '../../../stores/admin/quanlytintuc/QuanLyTinTucStore';

class ListTinTucMain extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = QuanLyTinTucStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		QuanLyTinTucStore.listen(this.onChange);
		QuanLyTinTucAction.getListTinTucBottom();
	}

	componentWillUnmount() {
		QuanLyTinTucStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);  
	}

	render() {  

		let listTinTucBottom;
		if(this.state.listTinTucBottom.length>0){
			listTinTucBottom = this.state.listTinTucBottom.map((tintuc, index) => {

				return(
						<div className="item-tin-tuc" key={index}>
							<Link to={'/tin-tuc/'+tintuc.slug}><span><i className="fa fa-angle-double-right" aria-hidden="true"></i> {tintuc.title}</span></Link>
							
						</div>
					);
			});
		}
		else {
			listTinTucBottom = (
						<div></div>
					);
			
		}

		return(
			
				<div >
					{listTinTucBottom}
				</div>    
			
		);
	}
}

export default ListTinTucMain;