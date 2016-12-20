import React from 'react';
import {Link} from 'react-router';
import YouTube from 'react-youtube';
import HtmlToReact from 'html-to-react';
import moment from 'moment';

//import CotPhaiHomeAction from '../../actions/admin/cotphaihome/CotPhaiHomeAction';
//import CotPhaiHomeStore from '../../stores/admin/cotphaihome/CotPhaiHomeStore';

import TinTucHomeAction from '../../actions/admin/tintuchome/TinTucHomeAction';
import TinTucHomeStore from '../../stores/admin/tintuchome/TinTucHomeStore';

import CotPhaiHome from './CotPhaiHome';

import ListTinTucMain from './tintuc/ListTinTucMain';

class Home extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = TinTucHomeStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		document.title = "Trang chủ | Ký túc xá Bách Khoa"; 
		TinTucHomeStore.listen(this.onChange);
		TinTucHomeAction.getListTinTucToDisplayHome();
	}

	componentWillUnmount() {
		TinTucHomeStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);  
		console.log(state);
	}
  	render() {

  		 

  		let listTinTucToDisplayHome;
		// console.log(this.state.state2.listTinTucToDisplayHome);
		if(this.state.a){
			listTinTucToDisplayHome = this.state.a.map((tin, index) =>{
				var content ='<div>' + tin.description +'</div>';
		     	var htmlToReactParser = new HtmlToReact.Parser(React);
		     	var reactcontent = htmlToReactParser.parse(content);

		     	let check = tin.dateModify? moment(tin.dateModify) : moment(tin.dateCreate);
				let time = check._d.getHours() + ':' + (check._d.getMinutes()<10 ? '0'+check._d.getMinutes() : check._d.getMinutes() );
				let date = (check._d.getDate() > 10) ? check._d.getDate()  : '0' + check._d.getDate();
				let fullDate = date + '/' + (check._d.getMonth()+1) + '/' + check._d.getFullYear();

				return(
						<div className="row nM mT20 item-thongbao clearboth pB10">
	    					<div className="col-sm-6">
	    						<Link to={'/tin-tuc/'+ tin.slug}>
	    							<img className="img-responsive" src={tin.img}/>
	    						</Link>
	    					</div>
	    					<div className="col-sm-6">
	    						<div className="title-thongbao">
	    							<Link to={'/tin-tuc/'+ tin.slug}>{tin.title}</Link>
	    						</div>
	    						<div className="date-thongbao">
	    							<span>{time + ' | ' + fullDate}</span>
	    						</div>
	    						<div className="content-thongbao">
	    							{reactcontent}
	    						</div>
	    					</div>
	    				</div>
						

					);
			});
		}
		else{
			listTinTucToDisplayHome = (
					<h3></h3>
				);
		}

  // 		const opts = {
	 //      height: '210',
	 //      width: '100%',
	 //      playerVars: { // https://developers.google.com/youtube/player_parameters
	 //        autoplay: 1
	 //      }
	 //    };

  // 		let listItem = this.state.state1.listItem.map((item, index) =>{
  // 			if(item.type==='image'){
		// 		return (
		// 				<div className="col-sm-12" key={index}>
		// 					<div className="panel panel-primary rounded shadow no-overflow cotphaihome">
	 //                      		<div className="panel-heading">
	 //                      			<h3 className="panel-title text-center text-upper">{item.name}</h3>
	 //                      		</div>
	 //                      		<div className="panel-body panel-border-primary no-padding">
	 //                      			<Link to={'/'+item.linkToPage}><img className="responsive" src={item.image}/></Link>
	 //                      		</div>
	 //                      	</div>
		// 				</div>
		// 			);
		// 	}
		// 	else {
		// 		return (
		// 				<div className="col-sm-12" key={index}>
		// 					<div className="panel panel-primary rounded shadow no-overflow">
	 //                      		<div className="panel-heading">
	 //                      			<h3 className="panel-title text-center text-upper">{item.name}</h3>
	 //                      		</div>
	 //                      		<div className="panel-body panel-border-primary no-padding">
	 //                      			<YouTube
		// 						        videoId="IXfVciwlnoU"
		// 						       	opts={opts}
		// 						      />
	 //                      		</div>
	 //                      	</div>
		// 				</div>
		// 			)
		// 	}
		// });
		
		

	    return (  
	    	<div>
			    <div className="container">   
			    	<section id="tin-tuc-moi">
			    		<div className="col-md-9 col-sm-12">
			    			<div className="thongbaomoi white-bg">
			    				<div className="col-sm-12 mT20 mB20 mobilePT10">
			    					<h3 className="page-title">Thông báo mới</h3>
			    				</div>
			    				{listTinTucToDisplayHome}

			    				<div className="col-sm-12 mT20 mB20">
			    					<h3 className="page-title">Các tin đã đưa</h3>
			    				</div>
					            <div className="row nM mt-10">
					                <ListTinTucMain />
					            </div>
			    			</div>
			    			
				    		
				    	</div>
				    	<div className="col-md-3 col-sm-12 cotphaihome">
				    		<CotPhaiHome />
				    	</div>
			    	</section>
			    	
			    </div>  
			    <section id="gg-maps" className="mT20 hidden-xs">
		            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6773286000303!2d106.66229871594932!3d10.759332357202917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752eefca0e6fb9%3A0xec3f3a1620c01884!2zS8O9IHTDumMgeMOhIMSQ4bqhaSBo4buNYyBCw6FjaCBLaG9h!5e0!3m2!1sen!2s!4v1481119477834" width="100%" height="300" frameborder="0" style={{"border":"0"}} allowfullscreen></iframe>
		        </section> 
		    </div>
	    );
  	}
}

export default Home;