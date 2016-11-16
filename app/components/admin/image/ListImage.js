import React from 'react';
import ReactDom from 'react-dom';
import CopyToClipboard from 'react-copy-to-clipboard';
import ListImageAction from '../../../actions/admin/image/ListImageAction';
import ListImageStore from '../../../stores/admin/image/ListImageStore';

import {
  ToastContainer,
  ToastMessage,
} from 'react-toastr';

const ToastMessageFactory = React.createFactory(ToastMessage.animation);
class ListImage extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = ListImageStore.getState();
		this.onChange = this.onChange.bind(this);
		this.copied = false;
	}
	componentDidMount() {
		ListImageStore.listen(this.onChange);
		ListImageAction.get();
	}

	componentWillUnmount() {
		ListImageStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);  
	}
    addAlert () {  
        this.refs.container.success(
          "",
          "Sao chép liên kết thành công!", {
          timeOut: 5000,
          extendedTimeOut: 800,
          closeButton: true
        });
      }

	render(){
		let listimage = this.state.images.map((image, index) => {
            let bool = false;
            return(
                    <div className="col-md-4 col-sm-12" key={index}>
                        <div className="panel panel-default">
                            <div className="panel-body"><img src={image.link} className="img-responsive img-manage"/></div>
                            <div className="panel-footer">
                                {/*<input value={image.link} className="form-control"/>*/}
                                <CopyToClipboard text={image.link}
                                  onCopy={() => this.setState({copied: true})}>
                                  <button className="btn btn-success" onClick={this.addAlert.bind(this)}><i className="fa fa-clipboard" aria-hidden="true"></i></button>
                                </CopyToClipboard>&nbsp;
                                <button className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button>
                                
                            </div>
                        </div>
                        
                    </div>
                );
        });
		return(
				<div className="mT20 mB20">
                    <ToastContainer ref="container"
                        toastMessageFactory={ToastMessageFactory}
                        className="toast-top-right" />
                    {listimage}
                </div>
			);
	}
}
export default ListImage;