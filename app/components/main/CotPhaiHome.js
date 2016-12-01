import React from 'react';
import {Link} from 'react-router';
import YouTube from 'react-youtube';

import CotPhaiHomeAction from '../../actions/admin/cotphaihome/CotPhaiHomeAction';
import CotPhaiHomeStore from '../../stores/admin/cotphaihome/CotPhaiHomeStore';

import LienKetSiteMain from './LienKetSiteMain';
import DivideComponent from './DivideComponent';

class CotPhaiHome extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = CotPhaiHomeStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		CotPhaiHomeStore.listen(this.onChange);
		CotPhaiHomeAction.getListItem();
	}

	componentWillUnmount() {
		CotPhaiHomeStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);  
	}
  	render() {

  		const opts = {
	      height: '210',
	      width: '100%',
	      playerVars: { // https://developers.google.com/youtube/player_parameters
	        autoplay: 0
	      }
	    };

  		let listItem = this.state.listItem.map((item, index) =>{
  			if(item.type==='image'){
				return (
						<div className="col-sm-12" key={index}>
							<div className="panel panel-success rounded shadow no-overflow cotphaihome">
	                      		<div className="panel-heading">
	                      			<h3 className="panel-title text-center text-upper">{item.name}</h3>
	                      		</div>
	                      		<div className="panel-body panel-border-success no-padding">
	                      			<Link to={'/'+item.linkToPage}><img className="responsive" src={item.image}/></Link>
	                      		</div>
	                      	</div>
						</div>
					);
			}
			else {
				return (
						<div className="col-sm-12" key={index}>
							<div className="panel panel-success rounded shadow no-overflow">
	                      		<div className="panel-heading">
	                      			<h3 className="panel-title text-center text-upper">{item.name}</h3>
	                      		</div>
	                      		<div className="panel-body panel-border-success no-padding">
	                      			<YouTube
								        videoId="IXfVciwlnoU"
								       	opts={opts}
								      />
	                      		</div>
	                      	</div>
						</div>
					)
			}
		});

	    return (  
		    	<div>
			    	{listItem}
			    	<DivideComponent/>
        			<LienKetSiteMain />
			    </div>
		    	  
	    );
  	}
}

export default CotPhaiHome;