import alt from '../../../alt';

class LienKetSiteAction {
  constructor() {
    this.generateActions(
    		'getListSiteSuccess',
    		'getListPageFail',

    		'addSiteSuccess',
    		'addSiteFail',

    		'updateSiteSuccess',
    		'updateSiteFail',

    		'updateName',
    		'updateLink',
    		'updateLogo',

    		'invalidName',
    		'invalidLink',
    		'invalidLogo',

    		'openMoDDelete',
    		'closeModalDelete',

    		'deleteSiteSuccess',
    		'deleteSiteFail',

    		'getSiteSuccess',
    		'getSiteFail'
    	);
  }

  getListSite(){
  	$.ajax({
	  		url: '/api/getlistsite',
	  		type: 'GET',
  	})
  	.done((data) =>{
  		this.actions.getListSiteSuccess(data);
  		console.log("success");
  	})
  	.fail((jqXhr) =>{
  		this.actions.getListPageFail(jqXhr.responseJSON);
  		console.log("error");
  	});
  	
  }

  addSite(payload){
  	$.ajax({
  		url: '/api/addsite',
  		type: 'POST',
  		data: {name: payload.name, link: payload.link, image: payload.image}
  	})
  	.done((data) =>{
	    this.actions.addSiteSuccess(data.message);
	    console.log("success");
  	})
  	.fail((jqXhr) =>{
	    this.actions.addSiteFail(jqXhr.responseJSON.message);
	    console.log("error");
  	});
  }
   	updateSite(payload){
	  	$.ajax({
	  		url: '/api/updatesite',
	  		type: 'PUT',
	  		data: {id: payload.id, name: payload.name, link: payload.link, image: payload.image}
	  	})
	  	.done((data) =>{
		    this.actions.updateSiteSuccess(data);
		    console.log("success");
	  	})
	  	.fail((jqXhr) =>{
		    this.actions.updateSiteFail(jqXhr.responseJSON.message);
		    console.log("error");
	  	});
	}

	openMoDDelete(id){
		this.actions.openMoDDelete(id);
	}

	getSite(id){
		$.ajax({
	    url: '/api/getsite/'+id})
	    .done((data) => {
	      this.actions.getSiteSuccess(data);
	    })
	    .fail((jqXhr) => {
	      this.actions.getSiteFail(jqXhr.responseJSON.message);
	    });
	}

	deleteSite(id){
		$.ajax({
	      type: 'POST',
	      url: '/api/deletesite',
	      data: { id: id}
	    })
	      .done((data) => {
	        this.actions.deleteSiteSuccess(data.message);
	      })
	      .fail((jqXhr) => {
	        this.actions.deleteSiteFail(jqXhr.responseJSON.message);
	      });
	}

}

export default alt.createActions(LienKetSiteAction);