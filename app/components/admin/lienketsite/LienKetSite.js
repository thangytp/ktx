import React from 'react';
import {Link} from 'react-router';
import {Modal, Tabs, Tab} from 'react-bootstrap';
import localStorage from 'localStorage';

import LienKetSiteAction from '../../../actions/admin/lienketsite/LienKetSiteAction';
import LienKetSiteStore from '../../../stores/admin/lienketsite/LienKetSiteStore';

import ListLienKetSite from './ListLienKetSite';

class LienKetSite extends React.Component {

  constructor(props) {
    super(props);
    this.state = LienKetSiteStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    LienKetSiteStore.listen(this.onChange);
  }
  componentWillUnmount() {
    LienKetSiteStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmitSite(event){
    event.preventDefault();

    var id = this.state.id;
    var name = this.state.name;
    var link = this.state.link;
    var image = this.state.image;

    if(!name){
      LienKetSiteAction.invalidName();
      this.refs.NameField.focus();
    }
    else if(!link){
      LienKetSiteAction.invalidLink();
      this.refs.LinkField.focus();
    }
    else if(!image){
      LienKetSiteAction.invalidLogo();
      this.refs.LogoField.focus();
    }

    if(name && link && image){
        if(!id){
            LienKetSiteAction.addSite({name: name, link: link, image: image});
        }
        else { LienKetSiteAction.updateSite({id: id, name: name, link: link, image: image});}
    }


  }

  deleteSite(e){
    e.preventDefault();
    var id = this.state.idToDelete;
    if(id){
      LienKetSiteAction.deleteSite(id);
    }
  }

  render(){
  		return(
            <div className="body-content animated fadeIn no-overflow">
              <div className="row">
                  <div className="col-md-12">
                    <ol className="breadcrumb no-overflow">
                      <li><Link to="/quanly@ktx"><i className="fa fa-home" aria-hidden="true"></i> Trang quản trị</Link></li>
                      <li>Site liên kết</li>
                    </ol>
                    <Tabs defaultActiveKey={1}>
                      <Tab eventKey={1} title="Thêm liên kết">
                      <div className="panel rounded shadow no-overflow">
                        <div className="panel-heading">
                          <div className="pull-left"><h3 className="panel-title">Thêm site liên kết</h3></div>
                          <div className="clearfix"></div>
                        </div>
                        <div className="panel-body no-padding">
                            <form className="form-horizontal mt-10" encType="multipart/form-data" onSubmit={this.handleSubmitSite.bind(this)}>
                              <div className="form-body">
                                <div className="form-group">
                                  <label className="control-label col-sm-3" htmlFor="name-item">Tên site:</label>
                                  <div className="col-sm-7">
                                      <input type="text" className="form-control" id="name-item" placeholder="VD: ĐH Bách Khoa"
                                        ref="NameField" value={this.state.name} onChange={LienKetSiteAction.updateName}/>
                                      <span className='help-block text-danger'>{this.state.helpBlockName}</span>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <label className="control-label col-sm-3" htmlFor="name-item">Link site:</label>
                                  <div className="col-sm-7">
                                      <input type="text" className="form-control" id="name-item" placeholder="VD: http://hcmut.edu.vn"
                                        ref="LinkField" value={this.state.link} onChange={LienKetSiteAction.updateLink}/>
                                      <span className='help-block text-danger'>{this.state.helpBlockLink}</span>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <label className="control-label col-sm-3" htmlFor="name-item">Logo site:</label>
                                  <div className="col-sm-7">
                                      <input type="text" className="form-control" id="name-item" placeholder="http://www.aao.hcmut.edu.vn/catalog/view/theme/default/images/logo.png"
                                        ref="LogoField" value={this.state.image} onChange={LienKetSiteAction.updateLogo}/>
                                      <span className='help-block text-danger'>{this.state.helpBlockLogo}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="form-footer">
                                <div className="form-group">
                                  <div className="col-sm-offset-3">
                                      <button type="submit" className="btn btn-success">Thêm</button>
                                  </div>
                                </div>
                              </div>
                            </form>
                        </div>
                      </div>
                      </Tab>
                      <Tab eventKey={2} title="Danh sách liên kết">
                        <ListLienKetSite/>
                      </Tab>
                    </Tabs>
                  </div>
                  <Modal show={this.state.modalIsOpen} onHide ={LienKetSiteAction.closeModal}>
                      <Modal.Header>
                        <Modal.Title>
                          Sửa
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                      <form className="form-horizontal mt-10" encType="multipart/form-data" onSubmit={this.handleSubmitSite.bind(this)}>
                        <div className="form-body">
                          <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="name-item">Tên site:</label>
                            <div className="col-sm-7">
                                <input type="text" className="form-control" id="name-item" placeholder="VD: ĐH Bách Khoa"
                                  ref="NameField" value={this.state.name} onChange={LienKetSiteAction.updateName}/>
                                <span className='help-block text-danger'>{this.state.helpBlockName}</span>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="name-item">Link site:</label>
                            <div className="col-sm-7">
                                <input type="text" className="form-control" id="name-item" placeholder="VD: http://hcmut.edu.vn"
                                  ref="LinkField" value={this.state.link} onChange={LienKetSiteAction.updateLink}/>
                                <span className='help-block text-danger'>{this.state.helpBlockLink}</span>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="name-item">Logo site:</label>
                            <div className="col-sm-7">
                                <input type="text" className="form-control" id="name-item" placeholder="http://www.aao.hcmut.edu.vn/catalog/view/theme/default/images/logo.png"
                                  ref="LogoField" value={this.state.image} onChange={LienKetSiteAction.updateLogo}/>
                                <span className='help-block text-danger'>{this.state.helpBlockLogo}</span>
                            </div>
                          </div>
                        </div>
                          <div className="form-group">
                            <div className="col-sm-offset-3">
                                <button type="submit" className="btn btn-success">Luu</button>
                            </div>
                          </div>
                      </form>
                      </Modal.Body>
                      <Modal.Footer>
                          <button
                              className="btn btn-warning"
                            onClick={LienKetSiteAction.closeModal}><i className="fa fa-times"> Hủy bỏ</i> </button>
                      </Modal.Footer>
                  </Modal>
                  {/* modal xoa item */}
                  <Modal show={this.state.modalIsOpenDelete} onHide ={LienKetSiteAction.closeModalDelete}>
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
                            onClick={LienKetSiteAction.closeModalDelete}><i className="fa fa-times"> Hủy bỏ</i> </button>
                          <button
                              className="btn btn-success"
                            onClick={this.deleteSite.bind(this)}><i className="fa fa-check"> Xóa</i> </button>
                      </Modal.Footer>
                  </Modal>

              </div>
            </div>
  			);
  	}
}
export default LienKetSite;
