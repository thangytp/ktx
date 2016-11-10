import React from 'react';
import ReactDom from 'react-dom';
import {Modal} from 'react-bootstrap';

import AddPageAction from '../actions/admin/page/AddPageAction';
import AddPageStore from '../stores/admin/page/AddPageStore';

import ListImageAction from '../actions/admin/image/ListImageAction';
import ListImageStore from '../stores/admin/image/ListImageStore';

import AddImgItemAction from '../actions/shared/AddImgItemAction';
import AddImgItemStore from '../stores/shared/AddImgItemStore';


export default class AddImgItem extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {state1: ListImageStore.getState(), state2: AddImgItemStore.getState()};
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    ListImageStore.listen(this.onChange);
    AddImgItemStore.listen(this.onChange);
    ListImageAction.get();
  }

  componentWillUnmount() {
    ListImageStore.unlisten(this.onChange);
    AddImgItemStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState({state1: ListImageStore.getState(), state2: AddImgItemStore.getState()});  
  }

  handleChangTitle(e){
    var text = e.target.value;
    AddPageAction.updateImgText({text : text, id: this.props.number});
  }
  handleChangLink(e){
    var link = e.target.value;
    AddPageAction.updateImgLink({link : link, id: this.props.number});
  }

  openModDelete(e){
    e.preventDefault();
    var type = 'img';
    AddPageAction.openModDelete({id: this.props.number, type: type});
  }

  selectImg(link){
    var link = link;
    AddPageAction.updateImgLink({link : link, id: this.state.state2.idSelItemImg});
    console.log(this.state.state2.idSelItemImg);
  }

  openModal(id){
    AddImgItemAction.openModalSel(id);
    console.log(id);
  }
  
  render(){

    let listImg = this.state.state1.images.map((image, index) =>{
        return(
              <div className="col-sm-4" onClick={this.selectImg.bind(this, image.link)} key={index}>
                  <div className="panel panel-default">
                    <img src={image.link} className="img-responsive img-select"/>
                  </div>
              </div>
          );
    });

    return (
        <div>
          <div className="form-group image-item" id="image-item"> 
              <label className="control-label col-sm-2" htmlFor=""><i className="fa fa-file-image-o" aria-hidden="true"></i> Tiêu đề ảnh:</label>
              <div className="col-sm-10"> 
                <input type="text" className="form-control" id="image-item-text" placeholder="VD: Giới thiệu" 
                  onChange={this.handleChangTitle.bind(this)} value={this.props.state.imgText}/>
              </div>
          </div>
          <div className="form-group image-item" id="image-item"> 
              <label className="control-label col-sm-2" htmlFor="">Link ảnh:</label>
              <div className="col-sm-10"> 
                <input type="text" className="form-control" id="image-item-link" placeholder="VD: /uploads/tuvan_Internet1477983672758.jpg" 
                  onChange={this.handleChangLink.bind(this)} value={this.props.state.imgLink} onFocus={this.openModal.bind(this, this.props.number)}/>
              </div>
          </div>
          <div className="form-group">
              <div className="col-sm-10 col-sm-offset-2"> 
                  <button className="btn btn-danger" onClick={this.openModDelete.bind(this)}><i className="fa fa-trash" aria-hidden="true"></i></button>
              </div>
          </div>

        {/* modal select hinh anh */}
          <Modal show={this.state.state2.modalIsOpen} onHide ={AddImgItemAction.closeModal}>
                <Modal.Header>
                  <Modal.Title>
                    Chọn hình ảnh
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="row">
                    {listImg}
                  </div>
                </Modal.Body>      
                <Modal.Footer>
                    <button
                        className="btn btn-warning"
                      onClick={AddImgItemAction.closeModal}><i className="fa fa-times"> Hủy bỏ</i> </button>          
                </Modal.Footer>
            </Modal>

        </div>
      
    );
  }
}
