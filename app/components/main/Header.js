import React from 'react';
import {Link, browserHistory} from 'react-router';
import {Modal} from 'react-bootstrap';
import localStorage from 'localStorage';
import LogInAction from '../../actions/main/user/LogInAction';

import HomeMenuAction from '../../actions/admin/menu/HomeMenuAction';
import HomeMenuStore from '../../stores/admin/menu/HomeMenuStore';

import SubItem from '../admin/menu/SubItem';
import SubItemMobile from '../admin/menu/SubItemMobile';

class Header extends React.Component {
    constructor(props) {
        super(props);    
        this.state = HomeMenuStore.getState();
        this.onChange = this.onChange.bind(this);
    }
    componentWillMount() {
    }
    componentDidMount() {  
        HomeMenuStore.listen(this.onChange);
        HomeMenuAction.testGetListCha();
    }
    componentWillUnmount() {
        HomeMenuStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    // search tin tuc
    handleFind(event){
        event.preventDefault();
        var textFind = this.state.textFind;
        console.log(textFind);
        if(textFind.length == 0){
            browserHistory.push('/tat-ca-tin-tuc');
        }
        else{
            browserHistory.push('/tim-kiem/'+textFind);
        }
    }
  
    render() {   
        let menu = this.state.testListCha.map((cha, index)=> {
            return(
                    <li key={index} className='menu-item-has-children'>
                        <Link to='#'><span>{cha.title}</span></Link>
                        <SubItem listCon = {cha.child} num={index}/>
                    </li>
                );
        });

        let userEmail = localStorage.getItem('email');
        let NavbarUser = <ul></ul>;
        if(!userEmail){
          NavbarUser = (
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/login"><i className="fa fa-sign-in" aria-hidden="true"></i> Đăng nhập</Link></li>
            </ul>
          )
        }
        else{
          NavbarUser = (
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/thong-tin-ca-nhan"><img className='img-responsive img-user' src={localStorage.getItem('avatar')}></img><span className="user-email">{userEmail}</span></Link></li>
                <li><a href="#" type="button" name="button" onClick ={LogInAction.logout}> <i className="fa fa-sign-out" /> Thoát</a></li>
              </ul>
            )
        }
        return (
            <header>
                <div className='top-bar'>
                    <div className="container">
                        <div className="row">
                            <span className="hidden-xs pull-left text-wellcome text-white">Chào mừng bạn đến với website của Ký túc ĐH Bách Khoa TP HCM</span>
                            <div className="cs-user">

                                {NavbarUser}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                        <div className="row">
                            <nav className="navbar navbar-default">
                                <div className="container-fluid">
                                    <div className="navbar-header">
                                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span> 
                                        </button>
                                        <Link className="navbar-brand" to="/">KTX Bách Khoa</Link>
                                    </div>
                                    <div className="collapse navbar-collapse main-header" id="myNavbar">
                                        <ul className="nav navbar-nav main-navigation">
                                            
                                            {menu}
                                            
                                            <li className='menu-item-has-children'><a><span>Tiện ích sinh viên</span></a>
                                                <ul>
                                                    <li><Link to="/dang-ky-luu-tru">Đăng ký lưu trú</Link></li>
                                                    <li><Link to="/xem-ket-qua-luu-tru">Xem kết quả đăng ký lưu trú</Link></li>
                                                </ul>
                                            </li>
                                            <li className="nML">
                                                <form className="navbar-form" role="search" onSubmit={this.handleFind.bind(this)}>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control search" placeholder="Search" value={this.state.textFind} onChange={HomeMenuAction.updateTextFind}/>
                                                        <div className="input-group-btn">
                                                            <button className="btn btn-default btn-search"><i className="fa fa-search" aria-hidden="true"></i></button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </li>
                                        </ul>
                                        
                                    </div>
                                </div>
                            </nav>
                        </div>
                </div>
            </header>    
        );
    }
}

export default Header;