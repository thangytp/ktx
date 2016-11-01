import React from 'react';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';

export default class ActionBar extends React.Component {
constructor(props)
  {
    super(props);
    this.state = {modalIsOpen : false };
    this.onChange = this.onChange.bind(this);
  }
  close() { 
    this.setState( {modalIsOpen: false});
  }
  open() {
    this.setState({modalIsOpen: true});
  }
  onChange(state) {
    this.setState(state);
  }
  delete() {
    this.props.deleteAction.delete(this.props.item._id);
    this.props.deleteAction.get();
    this.close();

  }
  edit() {     
    this.props.editAction.getById(this.props.item._id); 
  }
  showProfile(){   

  }
  render() {
     let style={'text-align':'center'};
    return (
      <div className="action">
        <span className="action-buttons">                          
          <button
            className="btn btn-success"
            onClick={this.edit.bind(this)}><i className="fa fa-pencil"></i>        
            </button>  
           <button
              className="btn btn-danger"
            onClick={this.open.bind(this)}><i className="fa fa-times"></i> </button>   
        </span>

        <Modal show={this.state.modalIsOpen} onHide ={this.close.bind(this)}>
          <Modal.Header>
           <div style ={style}>
            <Modal.Title><i className="fa fa-check-square-o fa-2x"></i></Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body>
          <div style ={style}>
          <h3 style ={{'color':'green'}}>Đồng ý xóa ?</h3>
          </div>
          </Modal.Body>      
          <Modal.Footer>
              <button
                  className="btn btn-warning"
                onClick={this.close.bind(this)}><i className="fa fa-times"> Hủy bỏ</i> </button>          
              <button
                  className="btn btn-success"
                onClick={this.delete.bind(this)}><i className="fa fa-check"> Xóa</i> </button>          
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
