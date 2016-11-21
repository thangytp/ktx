import React from 'react';
import {Route} from 'react-router';

import App from './components/admin/App';
import HomeMenu from './components/admin/menu/HomeMenu';
import ManageStudent from './components/admin/manage-user/ManageStudent';
import XetDuyetMoi from './components/admin/manage-user/XetDuyetMoi';
import ChiTieu from './components/admin/manage-chitieu/ChiTieu';
import UuTien from './components/admin/manage-uutien/UuTien';

import AddItemMenu from './components/admin/menu/AddItemMenu';
import AddPage from './components/admin/page/AddPage';
import Images from './components/admin/image/Images';
import LienKetSite from './components/admin/lienketsite/LienKetSite';
import CotPhaiHome from './components/admin/cotphaihome/CotPhaiHome';

import Main from './components/main/Main';
import Home from './components/main/Home';
import DangKyLuuTru from './components/main/luutru/DangKyLuuTru';
import KetQuaDangKyLuuTru from './components/main/luutru/KetQuaDangKyLuuTru';
import SignUp from './components/main/user/SignUp';
import LogIn from './components/main/user/LogIn';
import LogInAdmin from './components/admin/LogIn';
import InfoPage from './components/main/user/InfoPage';

import localStorage from 'localStorage';


function requireAuth(nextState, replace) {
  if (!localStorage.getItem('adminEmail')) {
    replace({
      pathname: '/admin/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export default (
  <Route>
        <Route component={App}>
            <Route path='/quanly@ktx' component={HomeMenu} onEnter={requireAuth} />
            <Route path='/quanly@ktx/them-page' component={AddPage} onEnter={requireAuth}/>
            <Route path='/quanly@ktx/quan-ly-hinh-anh' component={Images} onEnter={requireAuth}/>
            <Route path='/quanly@ktx/quan-ly-sinh-vien' component={ManageStudent} onEnter={requireAuth} />
            <Route path="/quanly@ktx/xet-duyet-luu-tru-moi" component={XetDuyetMoi}/>
            <Route path="/quanly@ktx/chi-tieu" component={ChiTieu}/>
            <Route path="/quanly@ktx/uu-tien" component={UuTien}/>
            <Route path="/quanly@ktx/cotphai-home" component={CotPhaiHome}/>
            <Route path="/quanly@ktx/lienket-site" component={LienKetSite}/>

        </Route>

        <Route path='/admin/login' component={LogInAdmin}/>

        <Route component={Main}>
            <Route path='/' component={Home}/>
            <Route path='/dang-ky-luu-tru' component={DangKyLuuTru}/>
            <Route path='/xem-ket-qua-luu-tru' component={KetQuaDangKyLuuTru}/>
            <Route path='/login' component={LogIn}/>
            <Route path='/info-stu' component={InfoPage}/>
        </Route>
  </Route>
);
