import React from 'react';
import ReactDom from 'react-dom';


export default class AddImgItem extends React.Component {
   handleFile(e){
    var reader = new FileReader();
    var file = e.target.files[0];   
    if (!file) return;
    reader.onload = function(img) {
      console.log(img.target.result);
      ReactDom.findDOMNode(this.refs.in).value = '';
      this.props.actions.updateImagepreview(img.target.result);   
      this.props.actions.updateImagefile(file);      
    }.bind(this);
    reader.readAsDataURL(file);
    console.log(file);

  }
  upload(event)
    {
        var imgfile = this.props.state.fileAvatar;
        var imgURL = this.props.state.imagePreviewUrl;
        this.props.actions.handleUpload();
        this.props.actions.uploadImage(imgfile);
        console.log(this.props.state.imageUrl);
    }
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
