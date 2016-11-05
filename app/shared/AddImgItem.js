import React from 'react';
import ReactDom from 'react-dom';


export default class AddImgItem extends React.Component {
  
  render(){
    return (
        <div>
          <div className="form-group image-item" id="image-item"> 
              <label className="control-label col-sm-2" for="">Tiêu đề ảnh:</label>
              <div className="col-sm-10"> 
                <input type="text" className="form-control" id="image-item-text" placeholder="VD: Giới thiệu"/>
              </div>
          </div>
          <div className="form-group image-item" id="image-item"> 
              <label className="control-label col-sm-2" for="">Link ảnh:</label>
              <div className="col-sm-10"> 
                <input type="text" className="form-control" id="image-item-link" placeholder="VD: /uploads/tuvan_Internet1477983672758.jpg"/>
              </div>
          </div>
        </div>
      
    );
  }
}
