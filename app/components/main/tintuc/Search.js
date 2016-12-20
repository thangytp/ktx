import React from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';
import InlineEdit from 'react-edit-inline';
import moment from 'moment';

import QuanLyTinTucAction from '../../../actions/admin/quanlytintuc/QuanLyTinTucAction';
import QuanLyTinTucStore from '../../../stores/admin/quanlytintuc/QuanLyTinTucStore';

import CotPhaiHome from '../CotPhaiHome';

class Search extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = QuanLyTinTucStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	componentWillReceiveProps(nextProps){
	    document.title = "Tìm kiếm " + this.props.params.text + ' | Ký túc xá Bách Khoa';
	    var text = nextProps.params.text;
	    QuanLyTinTucAction.getTinTucByTitle(text); 

	}
	componentDidMount() {
	    document.title = "Tìm kiếm " + this.props.params.text + ' | Ký túc xá Bách Khoa';
		QuanLyTinTucStore.listen(this.onChange);
		QuanLyTinTucAction.getTinTucByTitle(this.props.params.text);
	}

	componentWillUnmount() {
		QuanLyTinTucStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);  
	}

	render() {  

		let listTinTucSearch;
		if(this.state.tinSearch.length>0){
			listTinTucSearch = this.state.tinSearch.map((tintuc, index) => {
				let check = tintuc.dateModify? moment(tintuc.dateModify) : moment(tintuc.dateCreate);
				console.log(check);
				let time = check._d.getHours() + ':' + check._d.getMinutes();
				let date = (check._d.getDate() > 10) ? check._d.getDate()  : '0' + check._d.getDate();
				let fullDate = date + '/' + (check._d.getMonth()+1) + '/' + check._d.getFullYear();
				return(
						<div className="item-search-tin-tuc col-sm-12 nP mB20" key={index}>
								
									<div className="col-sm-3">
										<Link to={'/tin-tuc/'+tintuc.slug} data-toggle="tooltip" data-placement="bottom" title={tintuc.title}>
											<img className="img-responsive" src={tintuc.img}/>
										</Link>	
									</div>
									<div className="col-sm-9">
										<div className="title-item-tintuc col-sm-12">
											<Link to={'/tin-tuc/'+tintuc.slug} data-toggle="tooltip" data-placement="bottom" title={tintuc.title}>
												<span className="">{tintuc.title}</span>
											</Link>	
										</div>

										<div className="date-item-tintuc col-sm-12">
											{time + ' | ' + fullDate}
										</div>
									</div>
							
						</div>
					);
			});
		}
		else {
			listTinTucSearch = (
						<div></div>
					);
			
		}

		return(
				<div className="container">   
          
		            <div className="col-sm-9">
		            	<ol className="breadcrumb no-overflow">
			                <li><Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Trang chủ</Link></li>
			                <li><Link to="/tat-ca-tin-tuc">Tìm kiếm tin tức</Link></li>
			            </ol>
			            <div className = "panel panel-default panel-blog rounded shadow nP">
                    		<div className="panel-body">
		                		{listTinTucSearch}
		                	</div>
              			</div>
		            </div>
		            <div className="col-md-3 col-sm-12">
		              <CotPhaiHome />
		            </div>
		          
		        </div>   
			
		);
	}
}

export default Search;