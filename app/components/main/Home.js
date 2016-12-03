import React from 'react';
import {Link} from 'react-router';
import YouTube from 'react-youtube';
import HtmlToReact from 'html-to-react';

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
				var content ='<div>' + tin.content +'</div>';
		     	var htmlToReactParser = new HtmlToReact.Parser(React);
		     	var reactcontent = htmlToReactParser.parse(content);
				return(
						<div className="panel panel-success shadow" key={index}>
							<div className="panel-heading">
								{tin.title} <span><img className="img-responsive" src="/img/news.gif"/></span>
							</div>
							<div className="panel-body">
								<div className="content-news-home">
									{reactcontent}
								</div>
								<div className="link-detail-news">
									<Link to={'/tin-tuc/'+ tin.linkChitiet}>Chi tiết >></Link>
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
		    <div className="container">   
		    	<section id="tin-tuc-moi">
		    		<div className="col-sm-9">
			    		<div className = "panel panel-default panel-blog rounded shadow">
				          	<div className="panel-body">
				            
					            <h3 className="page-title"><i className="fa fa-bullhorn" aria-hidden="true"></i> Thông báo mới</h3>
					            <div className="content-page">
					                {listTinTucToDisplayHome}
					            </div>
					            <h3 className="page-title"><i className="fa fa-newspaper-o" aria-hidden="true"></i> Các tin đã đưa</h3>
					            <div className="content-page">
					                <ListTinTucMain />
					            </div>
				          	</div>
				        </div>
			    	</div>
			    	<div className="col-md-3 col-sm-12">
			    		<CotPhaiHome />
			    	</div>
		    	</section>
		    </div>     
	    );
  	}
}

export default Home;