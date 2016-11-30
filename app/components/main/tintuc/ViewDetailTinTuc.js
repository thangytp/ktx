import React from 'react';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';

import QuanLyTinTucAction from '../../../actions/admin/quanlytintuc/QuanLyTinTucAction';
import QuanLyTinTucStore from '../../../stores/admin/quanlytintuc/QuanLyTinTucStore';

import moment from 'moment';
import HtmlToReact from 'html-to-react';

import CotPhaiHome from '../CotPhaiHome';

class ViewDetailTinTuc extends React.Component {
  constructor(props) {
    super(props);       
    this.state = QuanLyTinTucStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps){
    var link = nextProps.params.link;
    QuanLyTinTucAction.getTinTucByLink(link); 

  }
  componentDidMount() {  
    QuanLyTinTucStore.listen(this.onChange);
    var link = this.props.params.link;
    QuanLyTinTucAction.getTinTucByLink(link); 

  }

  componentWillUnmount() {
    QuanLyTinTucStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }
  
  render() {    
    

    let content;
    if(this.state.tinByLink){
      var contentTin ='<div>' + this.state.tinByLink.content +'</div>';
      var htmlToReactParser = new HtmlToReact.Parser(React);
      var reactcontent = htmlToReactParser.parse(contentTin);  
      content = (
            <div>
                <ol className="breadcrumb no-overflow">
                  <li><Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Trang chủ</Link></li>
                  <li>{this.state.tinByLink.title}</li>
              </ol>
              <div className = "panel panel-default panel-blog rounded shadow">
                    <div className="panel-body">
                        <h3 className="page-title">{this.state.tinByLink.title}</h3>
                        <div className="content-page">
                            {reactcontent}
                        </div>
                    </div>
              </div>
            </div>
        );
    }
    else{
      content = (
            
                <h3>Không tìm thấy tin tức.</h3>
            
        );
    }
    return(
        <div className="container">   
          
            <div className="col-sm-9">
                {content}
            </div>
            <div className="col-md-3 col-sm-12">
              <CotPhaiHome />
            </div>
          
        </div>     
      );
    
  }
}

export default ViewDetailTinTuc;