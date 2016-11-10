import React from 'react';
import ReactDom from 'react-dom';

import AddPageAction from '../actions/admin/page/AddPageAction';
import AddPageStore from '../stores/admin/page/AddPageStore';

export default class AddVideoItem extends React.Component {
  
  handleChangTitle(e){
    var text = e.target.value;
    AddPageAction.updateVideoText({text : text, id: this.props.number});
  }
  handleChangLink(e){
    var link = e.target.value;
    AddPageAction.updateVideoLink({link : link, id: this.props.number});
  }

  openModDelete(e){
    e.preventDefault();
    var type = 'video';
    AddPageAction.openModDelete({id: this.props.number, type: type});
  }

  render(){
    return (
        <div>
          <div className="form-group video-item" id="video-item"> 
              <label className="control-label col-sm-2" htmlFor=""><i className="fa fa-youtube" aria-hidden="true"></i> Tiêu đề video:</label>
              <div className="col-sm-10"> 
                <input type="text" className="form-control" id="video-item-text" placeholder="VD: Lễ hội tết Sinh viên KTXBK"
                  onChange={this.handleChangTitle.bind(this)} value={this.props.state.videoText} />
              </div>
          </div>
          <div className="form-group video-item" id="video-item"> 
              <label className="control-label col-sm-2" htmlFor="">Link video:</label>
              <div className="col-sm-10"> 
                <input type="text" className="form-control" id="video-item-link" placeholder="VD: https://youtube.com/watch?v=ktxbachkhoa"
                  onChange={this.handleChangLink.bind(this)} value={this.props.state.videoLink} />
              </div>
          </div>
          <div className="form-group">
              <div className="col-sm-10 col-sm-offset-2"> 
                  <button className="btn btn-danger" onClick={this.openModDelete.bind(this)}><i className="fa fa-trash" aria-hidden="true"></i></button>
              </div>
          </div>
        </div>
      
    );
  }
}
