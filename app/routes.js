import React from 'react';
import {Route} from 'react-router';

import App from './components/admin/App';
import HomeMenu from './components/admin/menu/HomeMenu';
import ManageStudent from './components/admin/manage-user/ManageStudent';
import XetDuyetMoi from './components/admin/manage-user/XetDuyetMoi';
import GiaHanCu from './components/admin/manage-user/GiaHanCu';
import XetDuyetStudent from './components/admin/manage-user/XetDuyetStudent';
import GiaHanStudent from './components/admin/manage-user/GiaHanStudent';

import ChiTieu from './components/admin/manage-chitieu/ChiTieu';
import UuTien from './components/admin/manage-uutien/UuTien';
import Tang from './components/admin/manage-phong/Tang';
import Phong from './components/admin/manage-phong/Phong';
import PhongChiTiet from './components/admin/manage-phong/PhongChiTiet';
import Giuong from './components/admin/manage-phong/Giuong';
import Dichvu from './components/admin/manage-dichvu/Dichvu';

import AddItemMenu from './components/admin/menu/AddItemMenu';
import AddPage from './components/admin/page/AddPage';
import Images from './components/admin/image/Images';
import LienKetSite from './components/admin/lienketsite/LienKetSite';
import CotPhaiHome from './components/admin/cotphaihome/CotPhaiHome';
import TinTucHome from './components/admin/tintuchome/TinTucHome';
import QuanLyTinTuc from './components/admin/quanlytintuc/QuanLyTinTuc';
import Admin from './components/admin/manage-admin/Admin';

import CaiDatDangKyLuuTru from './components/admin/caidatluutru/CaiDatDangKyLuuTru';
import KhoaAdmin from './components/admin/khoa/KhoaAdmin';
import HeDaoTao from './components/admin/hedaotao/HeDaoTao';

import Main from './components/main/Main';
import Home from './components/main/Home';
import DangKyLuuTru from './components/main/luutru/DangKyLuuTru';
import KetQuaDangKyLuuTru from './components/main/luutru/KetQuaDangKyLuuTru';
import SignUp from './components/main/user/SignUp';
import LogIn from './components/main/user/LogIn';
import LogInAdmin from './components/admin/LogIn';
import InfoPage from './components/main/user/InfoPage';
import Ticket from './components/main/user/Ticket';
import ViewDetailTicket from './components/main/user/ViewDetailTicket';

import ViewDetailPage from './components/main/page/ViewDetailPage';
import ViewDetailTinTuc from './components/main/tintuc/ViewDetailTinTuc';
import Search from './components/main/tintuc/Search';

import Quanlycauhoi from './components/admin/ticket/Quanlycauhoi';
import Xemchitietcauhoi from './components/admin/ticket/Xemchitietcauhoi';
import TraCuu from './components/main/luutru/TraCuu';



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
            <Route path="/quanly@ktx/quan-ly-admin" component={Admin} onEnter={requireAuth}/>
            <Route path='/quanly@ktx/quan-ly-hinh-anh' component={Images} onEnter={requireAuth}/>
            <Route path='/quanly@ktx/quan-ly-sinh-vien' component={ManageStudent} onEnter={requireAuth} />
            <Route path='/quanly@ktx/sinh-vien-xet-duyet' component={XetDuyetStudent} onEnter={requireAuth} />
            <Route path='/quanly@ktx/sinh-vien-gia-han' component={GiaHanStudent} onEnter={requireAuth} />
            <Route path="/quanly@ktx/xet-duyet-luu-tru-moi" component={XetDuyetMoi} onEnter={requireAuth}/>
            <Route path="/quanly@ktx/gia-han-luu-tru-cu" component={GiaHanCu} onEnter={requireAuth}/>

            <Route path="/quanly@ktx/chi-tieu" component={ChiTieu} onEnter={requireAuth}/>
            <Route path="/quanly@ktx/uu-tien" component={UuTien} onEnter={requireAuth}/>
            <Route path="/quanly@ktx/tang" component={Tang} onEnter={requireAuth}/>
            <Route path="/quanly@ktx/loaiphong" component={Phong} onEnter={requireAuth}/>
            <Route path="/quanly@ktx/phong" component={PhongChiTiet} onEnter={requireAuth}/>
            <Route path="/quanly@ktx/giuong" component={Giuong} onEnter={requireAuth}/>
            <Route path="/quanly@ktx/dich-vu" component={Dichvu} onEnter={requireAuth}/>

            <Route path="/quanly@ktx/cotphai-home" component={CotPhaiHome} onEnter={requireAuth}/>
            <Route path="/quanly@ktx/lienket-site" component={LienKetSite} onEnter={requireAuth}/>
            <Route path="/quanly@ktx/hien-thi-tin-tuc" component={TinTucHome} onEnter={requireAuth}/>
            <Route path="/quanly@ktx/quan-ly-tin-tuc" component={QuanLyTinTuc} onEnter={requireAuth}/>
            <Route path="/quanly@ktx/quan-ly-khoa" component={KhoaAdmin} onEnter={requireAuth}/>
            <Route path="/quanly@ktx/quan-ly-he-dao-tao" component={HeDaoTao} onEnter={requireAuth}/>
            <Route path="/quanly@ktx/cai-dat-dang-ky-luu-tru" component={CaiDatDangKyLuuTru} onEnter={requireAuth}/>
            <Route path="/quanly@ktx/quan-ly-cau-hoi" component={Quanlycauhoi} onEnter={requireAuth}/>
            <Route path="/quanly@ktx/quan-ly-cau-hoi/:id" component={Xemchitietcauhoi} onEnter={requireAuth}/>

        </Route>

        <Route path='/admin/login' component={LogInAdmin}/>

        <Route component={Main}>
            <Route path='/' component={Home}/>
            <Route path='/tim-kiem/:text' component= {Search}/>
            <Route path='/dang-ky-luu-tru' component={DangKyLuuTru}/>
            <Route path='/xem-ket-qua-luu-tru' component={KetQuaDangKyLuuTru}/>
            <Route path='/login' component={LogIn}/>
            <Route path='/thong-tin-ca-nhan' component={InfoPage}/>
            <Route path='/tra-cuu-luu-tru' component={TraCuu}/>
            <Route path='/cau-hoi' component={Ticket}/>
            <Route path='/cau-hoi/:id' component={ViewDetailTicket}/>
            <Route path='/tin-tuc/:link' component={ViewDetailTinTuc} />
            <Route path=':link/:link2' component={ViewDetailPage}/>
            <Route path=':link/:link2/:link3' component={ViewDetailPage}/>
        </Route>
  </Route>
);
