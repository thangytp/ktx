import alt from '../../../alt';
import moment from 'moment';

import InfoPageAction from '../../../actions/main/user/InfoPageAction';

class InfoPageStore {
  	constructor() {
    	this.bindActions(InfoPageAction);

    	this.stu = {};

    	this.id = '';
    	this.ten = '';
        this.holot = '';
    	this.mssv = '';
    	this.nganh = '';
    	this.khoa = '';
    	this.ngaySinh  = '';
    	this.gioitinh = '';
    	this.cmnd = '';
    	this.hokhau = '';
    	this.sdtsinhvien = '';
    	this.sdtgiadinh = '';
    	this.emailKhac = '';

    	// thong tin luu tru
    	this.phong = '';
    	this.giuong = '';
    	this.dichvu = '';
    }
    onGetStudentSuccess(data){
        console.log(data);
        if(data){
            this.stu = data;

            this.id = data._id;
            this.ten = data.ten;
            this.holot = data.ho_lot;
            this.mssv = '';
            this.nganh = '';
            this.khoa = '';
            this.ngaySinh  = '';
            this.gioitinh = '';
            this.cmnd = '';
            this.hokhau = '';
            this.sdtsinhvien = '';
            this.sdtgiadinh = '';
            this.emailKhac = '';

            // thong tin luu tru
            this.phong = '';
            this.giuong = '';
            this.dichvu = '';
        }
    }
    onGetStudentFail(data){
        console.log(data);
    }
}

export default alt.createStore(InfoPageStore);