import React from 'react';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';
import ViewDetailPageAction from '../../../actions/main/page/ViewDetailPageAction';
import ViewDetailPageStore from '../../../stores/main/page/ViewDetailPageStore';
import moment from 'moment';
import HtmlToReact from 'html-to-react';

class ContentLeft extends React.Component {
  constructor(props) {
    super(props);       
    this.onChange = this.onChange.bind(this);
  }
  componentWillReceiveProps(nextProps){
    document.title = nextProps.page.title + ' | Ký túc xá Bách Khoa';
  }
  componentDidMount() {  
    document.title = this.props.page.title + ' | Ký túc xá Bách Khoa';
  }
  componentWillUnmount() {
  }
  onChange(state) {
    this.setState(state);
  }
  
  render() {    
     var content ='<div>' + this.props.page.content +'</div>';
     var htmlToReactParser = new HtmlToReact.Parser(React);
     var reactcontent = htmlToReactParser.parse(content);  
    
    
    return (     
      <div>
        <ol className="breadcrumb no-overflow">
            <li><Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Trang chủ <i className="fa fa-angle-double-right" aria-hidden="true"></i></Link></li>
            
        </ol>
        <div className = "panel panel-default panel-blog rounded shadow">
          <div className="panel-body">
            
            <h3 className="page-title">{this.props.page.title}</h3>
            <div className="content-page">
                {reactcontent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContentLeft;