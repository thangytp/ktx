import React from 'react';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';
import localStorage from 'localStorage';

import CotPhaiHomeAction from '../../../actions/admin/cotphaihome/CotPhaiHomeAction';
import CotPhaiHomeStore from '../../../stores/admin/cotphaihome/CotPhaiHomeStore';

import ListImageAction from '../../../actions/admin/image/ListImageAction';
import ListImageStore from '../../../stores/admin/image/ListImageStore';

import ListCotPhaiHome from './ListCotPhaiHome';

class CotPhaiHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {state1: CotPhaiHomeStore.getState(), state2: ListImageStore.getState()};
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    CotPhaiHomeStore.listen(this.onChange);
    ListImageStore.listen(this.onChange);
    ListImageAction.get();
  }
  componentWillUnmount() {
    CotPhaiHomeStore.unlisten(this.onChange);
    ListImageStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState( {state1: CotPhaiHomeStore.getState(), state2: ListImageStore.getState()} );
  }

  handleSubmitHinhAnh(event){
    event.preventDefault();

    var id = this.state.state1.idImage;
    var name = this.state.state1.nameImage;
    var link = this.state.state1.linkToPage;
    var image = this.state.state1.image;
    var type = 'image';
    if(!name){
      CotPhaiHomeAction.invalidNameImage();
      this.refs.NameImageField.focus();
    }
    else if(!link){
      CotPhaiHomeAction.invalidLinkToPage();
      this.refs.LinkImageField.focus();
    }
    else if(!image){
      CotPhaiHomeAction.invalidImage();
      this.refs.ImageField.focus();
    }

    if(name && link && image){
        if(!id){
            CotPhaiHomeAction.addItemImage({name: name, link: link, image: image, type: type});
        }
        else { CotPhaiHomeAction.updateItemImage({id: id, name: name, link: link, image: image, type: type});}
    }
    

  }

  handleSubmitVideo(event){
    event.preventDefault();

    var id = this.state.state1.idVideo;
    var name = this.state.state1.nameVideo;
    var link = this.state.state1.linkVideo;
    var type = 'video';

    if(!name){
      CotPhaiHomeAction.invalidNameVideo();
      this.refs.NameVideoField.focus();
    }
    else if(!link){
      CotPhaiHomeAction.invalidLinkVideo();
      this.refs.LinkVideoField.focus();
    }

    if(name && link){
        if(!id){
            CotPhaiHomeAction.addItemVideo({name: name, link: link, type: type});
        }
        else { CotPhaiHomeAction.updateItemVideo({id: id, name: name, link: link, type: type});}
    }
    

  }

  deleteSite(e){
    e.preventDefault();
    var id = this.state.state1.idToDelete;
    if(id){
      CotPhaiHomeAction.deleteSite(id);
    }
  }

  selectImg(link){
    var link = link;
    CotPhaiHomeAction.updateImgLink(link);
  }

  openModalSelectImage(){
    CotPhaiHomeAction.openModalSelectImage();
  }

  itemMenuClick(slug, title){
    CotPhaiHomeAction.updateItemMenuSelect({slug: slug, title: title});
  }

  render(){

      let listImg = this.state.state2.images.map((image, index) =>{
          return(
                <div className="col-sm-4" onClick={this.selectImg.bind(this, image.link)} key={index}>
                    <div className="panel panel-default">
                      <img src={image.link} className="img-responsive img-select"/>
                    </div>
                </div>
            );
      });

      let listMenuSearch;
      if(this.state.state1.listMenuSearch.length>0){
        listMenuSearch = this.state.state1.listMenuSearch.map((item, index) =>{
          return (
              <div className="item-page" key={index} onClick={this.itemMenuClick.bind(this, item.slug, item.title)}>{item.title}</div>
            );
        });
      }
      else{
        listMenuSearch = (
            <span className='err-findpage'>Không tìm thấy trang, vui lòng thử với từ khóa khác</span>
          );
      }

      return(
            <div className="body-content animated fadeIn no-overflow">
              <div className="row">
                  <div className="col-md-12">
                    <ol className="breadcrumb no-overflow">
                      <li><Link to="/quanly@ktx"><i className="fa fa-home" aria-hidden="true"></i> Trang quản trị</Link></li>
                      <li>Cột phải home</li>
                    </ol>
                    <div className="panel rounded shadow no-overflow">
                      <div className="panel-heading">
                        <div className="pull-left"><h3 className="panel-title">Thêm item hình ảnh</h3></div>
                        <div className="pull-right">
                            <button className="btn btn-sm" data-action="collapse" data-container="body" data-toggle="panel-body" data-placement="top" 
                                data-title="Collapse" data-original-title="" title=""><i className="fa fa-angle-up"></i></button>
                        </div>
                        <div className="clearfix"></div>
                      </div>
                      <div className="panel-body no-padding">
                          <form className="form-horizontal mt-10" encType="multipart/form-data" onSubmit={this.handleSubmitHinhAnh.bind(this)}>
                            <div className="form-body">
                              <div className="form-group">
                                <label className="control-label col-sm-3" htmlFor="name-item">Tên item:</label>
                                <div className="col-sm-7">
                                    <input type="text" className="form-control" id="name-item" placeholder="VD: DM vật tư SC phòng ở SV" 
                                      ref="NameImageField" value={this.state.state1.nameImage} onChange={CotPhaiHomeAction.updateNameImage}/>
                                    <span className='help-block text-danger'>{this.state.state1.helpBlockNameImage}</span>
                                </div>
                              </div>
                              <div className="form-group">
                                <label className="control-label col-sm-3" htmlFor="link-to-page">Link đến trang:</label>
                                <div className="col-sm-7">
                                    <input type="text" className="form-control" id="link-to-page" placeholder="VD: /gioi-thieu" 
                                      ref="LinkImageField" value={this.state.state1.linkToPage} onChange={CotPhaiHomeAction.updateLink}/>
                                    
                                    <div className="live-search" style={{'display':this.state.state1.displayListPage}}>
                                        {listMenuSearch}
                                    </div>

                                    <span className='help-block text-danger'>{this.state.state1.helpBlockLinkToPage}</span>
                                </div>
                              </div>
                              <div className="form-group">
                                <label className="control-label col-sm-3" htmlFor="image-item">Hình ảnh:</label>
                                <div className="col-sm-7">
                                    <input type="text" className="form-control" id="image-item" placeholder="/upload/internet.jpg" 
                                      ref="ImageField" value={this.state.state1.image} onChange={CotPhaiHomeAction.updateImage}
                                        onFocus={this.openModalSelectImage.bind(this)} />
                                    <span className='help-block text-danger'>{this.state.state1.helpBlockImage}</span>
                                </div>
                              </div>
                            </div>
                            <div className="form-footer">
                              <div className="form-group"> 
                                <div className="col-sm-offset-3">
                                    <button type="submit" className="btn btn-success" disabled={this.state.state1.disableButtonAddPage}>{this.state.state1.textButtonImage}</button>
                                    <span className="text-success">{this.state.state1.stateAddItemImage}</span>
                                </div>
                              </div>
                            </div>
                          </form>
                      </div>
                    </div>

                    <div className="panel rounded shadow no-overflow">
                      <div className="panel-heading">
                        <div className="pull-left"><h3 className="panel-title">Thêm item video</h3></div>
                        <div className="pull-right">
                            <button className="btn btn-sm" data-action="collapse" data-container="body" data-toggle="panel-body" data-placement="top" 
                                data-title="Collapse" data-original-title="" title=""><i className="fa fa-angle-up"></i></button>
                        </div>
                        <div className="clearfix"></div>
                      </div>
                      <div className="panel-body no-padding" id="panel-body">
                          <form className="form-horizontal mt-10" encType="multipart/form-data" onSubmit={this.handleSubmitVideo.bind(this)}>
                            <div className="form-body">
                              <div className="form-group">
                                <label className="control-label col-sm-3" htmlFor="video-item">Tên item:</label>
                                <div className="col-sm-7">
                                    <input type="text" className="form-control" id="video-item" placeholder="VD: Lễ hội tết Sinh viên KTXBK" 
                                      ref="NameVideoField" value={this.state.state1.nameVideo} onChange={CotPhaiHomeAction.updateNameVideo}/>
                                    <span className='help-block text-danger'>{this.state.state1.helpBlockNameVideo}</span>
                                </div>
                              </div>
                              <div className="form-group">
                                <label className="control-label col-sm-3" htmlFor="video-link">Link video:</label>
                                <div className="col-sm-7">
                                    <input type="text" className="form-control" id="video-link" placeholder="VD: https://www.youtube.com/watch?v=IXfVciwlnoU" 
                                      ref="LinkVideoField" value={this.state.state1.linkVideo} onChange={CotPhaiHomeAction.updateLinkVideo}/>
                                    <span className='help-block text-danger'>{this.state.state1.helpBlockLinkVideo}</span>
                                </div>
                              </div>
                              
                            </div>
                            <div className="form-footer">
                              <div className="form-group"> 
                                <div className="col-sm-offset-3">
                                    <button type="submit" className="btn btn-success">{this.state.state1.textButtonVideo}</button>
                                    <span className="text-success">{this.state.state1.stateAddItemVideo}</span>
                                </div>
                              </div>
                            </div>
                          </form>
                      </div>
                    </div>

                  </div>

                  <ListCotPhaiHome/>

                  {/* modal xoa item */}
                  <Modal show={this.state.modalIsOpenDelete} onHide ={CotPhaiHomeAction.closeModalDelete}>
                      <Modal.Header>
                        <Modal.Title>
                          Xóa
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>Bạn có chắc muốn xóa site này?</p>
                      </Modal.Body>      
                      <Modal.Footer>
                          <button
                              className="btn btn-warning"
                            onClick={CotPhaiHomeAction.closeModalDelete}><i className="fa fa-times"> Hủy bỏ</i> </button>          
                          <button
                              className="btn btn-success"
                            onClick={this.deleteSite.bind(this)}><i className="fa fa-check"> Xóa</i> </button>          
                      </Modal.Footer>
                  </Modal>

                  {/* modal select hinh anh */}
                  <Modal show={this.state.state1.modalIsOpenSelectImage} onHide ={CotPhaiHomeAction.closeModalSelectImage}>
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
                              onClick={CotPhaiHomeAction.closeModalSelectImage}><i className="fa fa-times"> Hủy bỏ</i> </button>          
                        </Modal.Footer>
                  </Modal>

              </div>
            </div>
        );
    }
}
export default CotPhaiHome;