import React from 'react';
import {Route} from 'react-router';

import App from './components/admin/App';
import HomeMenu from './components/admin/menu/HomeMenu';
import AddItemMenu from './components/admin/menu/AddItemMenu';
import Images from './components/admin/image/Images';

import Main from './components/main/Main';
import Home from './components/main/Home';
import DangKyLuuTru from './components/main/luutru/DangKyLuuTru';
import KetQuaDangKyLuuTru from './components/main/luutru/KetQuaDangKyLuuTru';
import SignUp from './components/main/user/SignUp';
import LogIn from './components/main/user/LogIn';
import LogInAdmin from './components/admin/LogIn';
import InfoPage from './components/main/user/InfoPage';

export default (
  <Route>

        <Route component={App}>
            <Route path='/quanly@ktx' component={HomeMenu}/>
            <Route path='/quanly@ktx/them-menu-item' component={AddItemMenu}/>
            <Route path='/quanly@ktx/quan-ly-hinh-anh' component={Images}/>
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
