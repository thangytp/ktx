import React from 'react';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';
import localStorage from 'localStorage';

import CotPhaiHome from '../CotPhaiHome';

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
              <div className="row">
                <div className="col-md-9 ">
                  <ol className="breadcrumb no-overflow">
                      <li><Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Trang chủ</Link></li>
                      <li>Kết quả đăng ký lưu trú</li>
                  </ol>

                  <div className="panel rounded shadow no-overflow">
                    <div className="panel-heading">
                        <div className="pull-left"><h3 className="panel-title">Kết quả đăng ký lưu trú ký túc xá</h3></div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="panel-body no-padding">
                        Chào 
                    </div>
                  </div>
                </div>

                <div className="col-md-3 col-sm-12">
                    <CotPhaiHome />
                </div>

              </div>
              
            </div>
    );
  }
}
