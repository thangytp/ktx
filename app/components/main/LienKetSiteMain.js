import React from 'react';
import ReactDom from 'react-dom';
import {Modal} from 'react-bootstrap';
import Slider from 'react-slick';

import LienKetSiteAction from '../../actions/admin/lienketsite/LienKetSiteAction';
import LienKetSiteStore from '../../stores/admin/lienketsite/LienKetSiteStore';

import ItemLienKetSite from './ItemLienKetSite';

class LienKetSiteMain extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = LienKetSiteStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	
	componentDidMount() {
		LienKetSiteStore.listen(this.onChange);
		LienKetSiteAction.getListSite();
	}

	componentWillUnmount() {
		LienKetSiteStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);  
	}

	render() {  
		let settings = {
			autoplay: true,
			arrows: false,
	      dots: false,
	      infinite: true,
	      pauseOnHover: true,
	      speed: 500,
	      slidesToShow: 1,
	      slidesToScroll: 1,
	      responsive: [ { breakpoint: 768, settings: { slidesToShow: 1 } }, 
	      	{ breakpoint: 1024, settings: { slidesToShow: 3 } }, 
	      	 ]
	    };

	    let listSiteShow = [];
	    if(this.state.listSite.length>0){
			for(var i = 0; i<this.state.listSite.length; i++){
				listSiteShow.push(<div className="col-sm-12 img-site-lien-ket" key={i}><a href={this.state.listSite[i].link} target="_blank"><span className="name-site-lien-ket">{this.state.listSite[i].name} <i className="fa fa-external-link" aria-hidden="true"></i></span></a></div>);
			}
		}
		else listSiteShow.push(<div key={0}></div>);

		return(
			
					<div className="col-sm-12 col-xs-12 nP white-bg link-site">
						
								<div className="title-item-right">
	                      			<h3 className="text-left text-upper">Liên kết Site</h3>
	                      		</div>
	                      		<div className="">
									<Slider {...settings}>
										
										{	listSiteShow
										}
										
					                </Slider>
					            </div>
						
					</div>
				
		);
	}
}

export default LienKetSiteMain;