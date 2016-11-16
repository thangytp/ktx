import React from 'react';
import ReactDom from 'react-dom';
import {Modal} from 'react-bootstrap';
import {Link} from 'react-router';

import HomeMenuAction from '../../../actions/admin/menu/HomeMenuAction';
import HomeMenuStore from '../../../stores/admin/menu/HomeMenuStore';

import ListItemMenu from './ListItemMenu';

import LastItemAdmin from './LastItemAdmin';

class SubItemAdmin extends React.Component {

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

	openMoDEditLinkToPage(id, type, pageId){
		if(id){
			HomeMenuAction.openMoDEditLinkToPage({id: id, type: type, pageId: pageId});
		}
	}
	// =================== end new add ===================//

	render(){
		let menuCon = this.props.listCon.map((con, index) =>{
			var pageTitle = con._postId? con._postId.title : '';
			var idPage = con._postId? con._postId._id : 0;

			if(con.subChild.length != 0){
				if(con.order <= 1){
					return(
							<li key = {index} className=''>
								<span className='cha-item'>{con.title}
									{' '}
									{/*pageTitle*/}
									{' '}
					          		<span className='list-button'>
						          		<i className="fa fa-pencil-square-o font20 colorEdit" aria-hidden="true" onClick={this.openMoDEditLinkToPage.bind(this, con._id, this.state.con, idPage)}></i>
						          		{' '}
						          		<i className="fa fa-plus-square font20 colorAdd" aria-hidden="true" onClick ={this.openMoD.bind(this, con._id)}></i>
						          		{' '}
							          	<i className="fa fa-arrow-circle-o-down font20 colorDown" aria-hidden="true" onClick={this.moveDownOrder.bind(this, con._id, this.state.con)}></i>
							          	{' '}
							          	<i className="fa fa-trash font20 colorDel" aria-hidden="true" onClick ={this.openMoDDeleteCha.bind(this, con._id)}></i>
									</span>
								</span>
								<div className='expander'></div>
								<LastItemAdmin listChau = {con.subChild} num={index}/>
							</li>
						);
				}
				else{
					return(
							<li key = {index} className=''>
								<span className='cha-item'>{con.title}
								{' '}
								{' '}
									<span className='list-button'>
						          		<i className="fa fa-pencil-square-o font20 colorEdit" aria-hidden="true" onClick={this.openMoDEditLinkToPage.bind(this, con._id, this.state.con, idPage)}></i>
						          		{' '}
						          		<i className="fa fa-plus-square font20 colorAdd" aria-hidden="true" onClick ={this.openMoD.bind(this, con._id)}></i>
						          		{' '}
						          		<i className="fa fa-arrow-circle-o-up font20 colorUp" aria-hidden="true"  onClick={this.moveUpOrder.bind(this, con._id, this.state.con)}></i>
						          		{' '}
							          	<i className="fa fa-arrow-circle-o-down font20 colorDown" aria-hidden="true" onClick={this.moveDownOrder.bind(this, con._id, this.state.con)}></i>
							          	{' '}
							          	<i className="fa fa-trash font20 colorDel" aria-hidden="true" onClick ={this.openMoDDeleteCha.bind(this, con._id)}></i>
									</span>
								</span>
								<div className='expander'></div>
								<LastItemAdmin listChau = {con.subChild} num={index}/>
							</li>
						);
				}
			}
			else{
				if(con.order <= 1){
					return(
							<li key = {index} className=''>
								<span className='cha-item'>{con.title}
								{' '}
								{' '}
									<span className='list-button'>
						          		<i className="fa fa-pencil-square-o font20 colorEdit" aria-hidden="true" onClick={this.openMoDEditLinkToPage.bind(this, con._id, this.state.con, idPage)}></i>
						          		{' '}
						          		<i className="fa fa-plus-square font20 colorAdd" aria-hidden="true" onClick ={this.openMoD.bind(this, con._id)}></i>
						          		{' '}
							          	<i className="fa fa-arrow-circle-o-down font20 colorDown" aria-hidden="true" onClick={this.moveDownOrder.bind(this, con._id, this.state.con)}></i>
							          	{' '}
							          	<i className="fa fa-trash font20 colorDel" aria-hidden="true" onClick ={this.openMoDDeleteCha.bind(this, con._id)}></i>
					          		</span>
					          	</span>
							</li>
						);
				}
				else{
					return(
							<li key = {index} className=''>
								<span className='cha-item'>{con.title}
								{' '}
								{' '}
									<span className='list-button'>
						          		<i className="fa fa-pencil-square-o font20 colorEdit" aria-hidden="true" onClick={this.openMoDEditLinkToPage.bind(this, con._id, this.state.con, idPage)}></i>
						          		{' '}
						          		<i className="fa fa-plus-square font20 colorAdd" aria-hidden="true" onClick ={this.openMoD.bind(this, con._id)}></i>
						          		{' '}
						          		<i className="fa fa-arrow-circle-o-up font20 colorUp" aria-hidden="true" onClick={this.moveUpOrder.bind(this, con._id, this.state.con)}></i>
						          		{' '}
							          	<i className="fa fa-arrow-circle-o-down font20 colorDown" aria-hidden="true" onClick={this.moveDownOrder.bind(this, con._id, this.state.con)}></i>
							          	{' '}
							          	<i className="fa fa-trash font20 colorDel" aria-hidden="true" onClick ={this.openMoDDeleteCha.bind(this, con._id)}></i>
									</span>
								</span>
							</li>
						);
				}
			}
		});

		return(
				<ul>
					{menuCon}
				</ul>
			);
	}

}

export default SubItemAdmin;