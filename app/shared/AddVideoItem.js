import React from 'react';
import ReactDom from 'react-dom';


export default class AddVideoItem extends React.Component {
  
  render(){
    return (
        <div>
          <div className="form-group video-item" id="video-item"> 
              <label className="control-label col-sm-2" for="">Tiêu đề video:</label>
              <div className="col-sm-10"> 
                <input type="text" className="form-control" id="video-item-text" placeholder="VD: Lễ hội tết Sinh viên KTXBK"/>
              </div>
          </div>
          <div className="form-group video-item" id="video-item"> 
              <label className="control-label col-sm-2" for="">Link video:</label>
              <div className="col-sm-10"> 
                <input type="text" className="form-control" id="video-item-link" placeholder="VD: https://youtube.com/watch?v=ktxbachkhoa"/>
              </div>
          </div>
        </div>
      
    );
  }
}
