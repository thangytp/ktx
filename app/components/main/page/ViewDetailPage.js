import React from 'react';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';
import ViewDetailPageAction from '../../../actions/main/page/ViewDetailPageAction';
import ViewDetailPageStore from '../../../stores/main/page/ViewDetailPageStore';
import moment from 'moment';
import HtmlToReact from 'html-to-react';

import ContentLeft from './ContentLeft';
import ContentRight from './ContentRight';

class ViewDetailPage extends React.Component {
  constructor(props) {
    super(props);       
    this.state = ViewDetailPageStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.params.link3){
      var link = nextProps.params.link + '/' + nextProps.params.link2 + '/' + nextProps.params.link3;
    }
    else var link = nextProps.params.link + '/' + nextProps.params.link2;
    ViewDetailPageAction.getPageByLink(link);   
    console.log(link);
  }
  componentDidMount() {  
    ViewDetailPageStore.listen(this.onChange);
    if(this.props.params.link3){
      var link = this.props.params.link + '/' + this.props.params.link2 + '/' + this.props.params.link3;
    }
    else var link = this.props.params.link + '/' + this.props.params.link2;
    ViewDetailPageAction.getPageByLink(link);   
    console.log(link);
  }
  componentWillUnmount() {
    ViewDetailPageStore.unlisten(this.onChange);
  }
  onChange(state) {
    this.setState(state);
  }
  
  render() {    
    

    let content;
    if(this.state.page){
      if(this.state.page.layoutType==1){
        content = (
            <div className="col-md-12 col-sm-12">
              <ContentLeft page={this.state.page} />
            </div>
          );
      }
      else if(this.state.page.layoutType == 2){
          content = (
              <div className="container"> 
                <div className="col-md-9 col-sm-12">
                  <ContentLeft page={this.state.page} />
                </div>
                <div className="col-md-3 col-sm-12">
                  <ContentRight page={this.state.page} />
                </div>
              </div>
          );
      }
    }
    else{
      content = (
            
                <h3>Trang không tồn tại</h3>
            
        );
    }
    return(
        <div className="container">
            {content}
        </div>
      );
    
  }
}

export default ViewDetailPage;