import React from 'react';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';
import localStorage from 'localStorage';

export default class KetQuaDangKyLuuTru extends React.Component {
  constructor(props)
  {
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
    return (     
            <div className="container ket-qua-kluu-tru">
              <h2>Danh sách kết quả đăng ký lưu trú</h2>
              
            </div>
    );
  }
}
