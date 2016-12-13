import React from 'react';
import ReactDom from 'react-dom';
import {Modal} from 'react-bootstrap';
import {Link} from 'react-router';

import HomeMenuAction from '../../../actions/admin/menu/HomeMenuAction';
import HomeMenuStore from '../../../stores/admin/menu/HomeMenuStore';


class LastItemAdmin extends React.Component {

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
	// =================== new add here ================= //
	openMoD(idParent){
		HomeMenuAction.openMD(idParent);
	}

	openMoDDeleteCha(id){
		HomeMenuAction.openMoDDeleteCha(id);
	}

	moveUpOrder(id, type){
		if(id){
			HomeMenuAction.moveUpOrder(id, type);
		}
	}
	moveDownOrder(id, type){

		if(id){
			HomeMenuAction.moveDownOrder(id, type);
		}
	}

	openMoDEditLinkToPage(id, type, pageId, pageTitle){
		if(id){
			HomeMenuAction.openMoDEditLinkToPage({id: id, type: type, pageId: pageId, pageTitle: pageTitle});
		}
	}
	// =================== end new add ===================//

	render(){
		let menuChau = this.props.listChau.map((chau, index) =>{
			var pageTitle = chau._postId? chau._postId.title : '';
			var idPage = chau._postId? chau._postId._id : 0;
			var classAddedPage = chau._postId? 'colorTitle' : '';
			
			if(chau.order <= 1){
				return(
						<li key = {index}>
							<span className={'cha-item '+ classAddedPage} data-toggle="tooltip" data-placement="bottom" title={'Bài viết được liên kết: '+pageTitle}>{chau.title}
							{' '}
							{' '}
								<span className='list-button'>
									<i className="fa fa-pencil-square-o font20" aria-hidden="true"></i>
									{' '}
						          	<i className="fa fa-link font20 colorEdit" aria-hidden="true" onClick={this.openMoDEditLinkToPage.bind(this, chau._id, this.state.chau, idPage, pageTitle)}></i>
						          	{' '}
						          	<i className="fa fa-arrow-circle-o-down font20 colorDown" aria-hidden="true" onClick={this.moveDownOrder.bind(this, chau._id, this.state.chau)}></i>
						          	{' '}
						          	<i className="fa fa-trash font20 colorDel" aria-hidden="true" onClick ={this.openMoDDeleteCha.bind(this, chau._id)}></i>
								</span>
							</span>
						</li>
					);
			}
			else{
				return(
						<li key = {index}>
							<span className={'cha-item '+ classAddedPage} data-toggle="tooltip" data-placement="bottom" title={'Bài viết được liên kết: '+pageTitle}>{chau.title}
							{' '}
				          	{' '}
				          		<span className='list-button'>
				          			<i className="fa fa-pencil-square-o font20" aria-hidden="true"></i>
				          			{' '}
						          	<i className="fa fa-link font20 colorEdit" aria-hidden="true" onClick={this.openMoDEditLinkToPage.bind(this, chau._id, this.state.chau, idPage, pageTitle)}></i>
						          	{' '}
						          	<i className="fa fa-arrow-circle-o-up font20 colorUp" aria-hidden="true" onClick={this.moveUpOrder.bind(this, chau._id, this.state.chau)}></i>
						          	{' '}
						          	<i className="fa fa-arrow-circle-o-down font20 colorDown" aria-hidden="true" onClick={this.moveDownOrder.bind(this, chau._id, this.state.chau)}></i>
						          	{' '}
						          	<i className="fa fa-trash font20 colorDel" aria-hidden="true" onClick ={this.openMoDDeleteCha.bind(this, chau._id)}></i>
								</span>
					        </span>
						</li>
					);
			}
		});

		return(
				<ul>
					{menuChau}
				</ul>
			);
	}

}

export default LastItemAdmin;