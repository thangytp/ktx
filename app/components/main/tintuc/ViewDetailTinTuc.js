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
    document.title = this.state.tinByLink.title + ' | Ký túc xá Bách Khoa';
    var link = nextProps.params.link;
    QuanLyTinTucAction.getTinTucByLink(link); 

  }
  componentDidMount() {  
    document.title = this.state.tinByLink.title  + ' | Ký túc xá Bách Khoa';
    QuanLyTinTucStore.listen(this.onChange);
    var link = this.props.params.link;
    QuanLyTinTucAction.getTinTucByLink(link); 

  }

  componentWillUnmount() {
    QuanLyTinTucStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
    document.title = this.state.tinByLink.title + ' | Ký túc xá Bách Khoa';
  }
  
  render() {    
    
    var weekday = new Array(7);
    weekday[0] =  "Chủ Nhật";
    weekday[1] = "Thứ Hai";
    weekday[2] = "Thứ Ba";
    weekday[3] = "Thứ Tư";
    weekday[4] = "Thứ Năm";
    weekday[5] = "Thứ Sáu";
    weekday[6] = "Thứ Bảy";    

    let content;
    if(this.state.tinByLink){
      var contentTin ='<div>' + this.state.tinByLink.content +'</div>';
      var htmlToReactParser = new HtmlToReact.Parser(React);
      var reactcontent = htmlToReactParser.parse(contentTin);  

      let check = this.state.tinByLink.dateModify? moment(this.state.tinByLink.dateModify) : moment(this.state.tinByLink.dateCreate);
      var nDay = weekday[check._d.getDay()];

      let time = check._d.getHours() + ':' + ( check._d.getMinutes()>10 ? check._d.getMinutes() : '0'+check._d.getMinutes() );
      let date = (check._d.getDate() > 10) ? check._d.getDate()  : '0' + check._d.getDate();
      let fullDate = date + '/' + (check._d.getMonth()+1) + '/' + check._d.getFullYear();

      let displayTime = nDay + ', ngày ' + fullDate + ' ' + time;

      content = (
            <div>
                <ol className="breadcrumb no-overflow">
                  <li><Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Trang chủ</Link></li>
                  <li><Link to="/tat-ca-tin-tuc">Tin tức</Link></li>
              </ol>
              <div className = "panel panel-default panel-blog rounded shadow">
                    <div className="panel-body">
                        <h3 className="page-title">{this.state.tinByLink.title}</h3>
                        <div className="time-news">{displayTime}</div>
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
          
            <div className="col-md-9 col-sm-12">
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