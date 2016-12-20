import React from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';
import InlineEdit from 'react-edit-inline';
import moment from 'moment';

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
				let check = tintuc.dateModify? moment(tintuc.dateModify) : moment(tintuc.dateCreate);

				let time = check._d.getHours() + ':' + ( check._d.getMinutes()>10 ? check._d.getMinutes() : '0'+check._d.getMinutes() );
				let date = (check._d.getDate() > 10) ? check._d.getDate()  : '0' + check._d.getDate();
				let fullDate = date + '/' + (check._d.getMonth()+1) + '/' + check._d.getFullYear();
				return(
						<div className="item-tin-tuc col-sm-4" key={index}>
							
								<div className="panel panel-item-tintuc panel-success shadow" key={index}>
									
									<div className="panel-body nP">
										<Link to={'/tin-tuc/'+tintuc.slug} data-toggle="tooltip" data-placement="bottom" title={tintuc.title}>
											<img className="img-responsive" src={tintuc.img}/>
										</Link>	
									</div>
									<div className="panel-footer">
										<div className="title-item-tintuc">
											<Link to={'/tin-tuc/'+tintuc.slug} data-toggle="tooltip" data-placement="bottom" title={tintuc.title}>
												<span className="">{tintuc.title}</span>
											</Link>	
										</div>

										<div className="date-item-tintuc">
											{time + ' | ' + fullDate}
										</div>
									</div>
								</div>
							
							
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