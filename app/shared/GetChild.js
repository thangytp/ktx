import React from 'react';
import ReactDom from 'react-dom';
import GetChildAction from '../actions/shared/GetChildAction';
import GetChildStore from '../stores/shared/GetChildStore';

class GetChild extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = GetChildStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	componentWillMount() {
		
	}
	componentDidMount() {
		GetChildStore.listen(this.onChange);
		GetChildAction.getListCon(this.props.item._id);
		console.log(this.state.listCon);
	}

	componentWillUnmount() {
		GetChildStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);  
		console.log(state);
	}

  render() {  
  	console.log(this.state.listCon);
  	let count = 0;
  			var indents = [];
			for (var i = 0; i < this.state.listCon.length; i++) {
			  indents.push(<li key={i+1}>{this.state.listCon[i][i].title}</li>);
			}
  			// let listCon1 = for(var i=0; i<this.state.listCon.length; i++){
  			// 	return(
			  // 				<li key={i+1}>{listCon[i].title}</li>
			  // 			);
  			// }

		  	// let listCon1 = this.props.listCon.map((con, index) => {
		  		
			  // 		return(
			  // 				<li key={index+1}>{con.title}</li>
			  // 			);
			  
			  	
		  	// });
	  
	  	
	  	return (
	    	<ul key={count+1}>
	    		{indents}
	    	</ul>
	    );
	}
    
}

export default GetChild;