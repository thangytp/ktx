import React from 'react';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';
import ViewDetailPageAction from '../../../actions/main/page/ViewDetailPageAction';
import ViewDetailPageStore from '../../../stores/main/page/ViewDetailPageStore';
import moment from 'moment';
import HtmlToReact from 'html-to-react';
import YouTube from 'react-youtube';

import CotPhaiHome from '../CotPhaiHome';

class ContentRight extends React.Component {
  constructor(props) {
    super(props);       
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {  
  }
  componentWillUnmount() {
  }
  onChange(state) {
    this.setState(state);
  }
  
  render() {    
    
     
    if(this.props.page.cotPhaiHome==1){
      return (
            <div>
                <CotPhaiHome />
            </div>
        );
    }
    else{
      const opts = {
          height: '210',
          width: '100%',
          playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 1
          }
        };

        let imgRight = this.props.page.imgRight.map((item, index) =>{
          
          return (
              <div className="col-sm-12" key={index}>
                <div className="panel panel-primary rounded shadow no-overflow cotphaihome">
                              <div className="panel-heading">
                                <h3 className="panel-title text-center text-upper">{item.name}</h3>
                              </div>
                              <div className="panel-body panel-border-primary no-padding">
                                <Link to={'/'+item.linkToPage}><img className="responsive" src={item.image}/></Link>
                              </div>
                            </div>
              </div>
            );
        });
        let videoRight = this.props.page.videoRight.map((item, index) =>{
          return (
              <div className="col-sm-12" key={index}>
                <div className="panel panel-primary rounded shadow no-overflow">
                              <div className="panel-heading">
                                <h3 className="panel-title text-center text-upper">{item.name}</h3>
                              </div>
                              <div className="panel-body panel-border-primary no-padding">
                                <YouTube
                          videoId="IXfVciwlnoU"
                          opts={opts}
                        />
                              </div>
                            </div>
              </div>
            )
        });
      
      return (     
        <div className="">
            {videoRight}
            {imgRight}
        </div>

      );
    }
  }
}

export default ContentRight;