import alt from '../../../alt';

class CotPhaiHomeAction {
  constructor() {
    this.generateActions(
    		'getListItemSuccess',
    		'getListItemFail',

    		'addItemImageSuccess',
    		'addItemImageFail',

    		'updateItemImageSuccess',
    		'updateItemImageFail',

        'addItemVideoSuccess',
        'addItemVideoFail',
        'updateItemVideoSuccess',
        'updateItemVideoFail',

    		'updateNameImage',
    		'updateLink',
    		'updateImage',

        'updateNameVideo',
        'updateLinkVideo',

    		'invalidNameImage',
    		'invalidLinkToPage',
    		'invalidImage',

        'invalidNameVideo',
        'invalidLinkVideo',

    		'openMoDDelete',
    		'closeModalDelete',

    		'deleteItemSuccess',
    		'deleteItemFail',

    		'getItemSuccess',
    		'getItemFail',

        'openModalSelectImage',
        'closeModalSelectImage',

        'searchItemMenuSuccess',
        'updateItemMenuSelect'
    	);
  }

  getListItem(){
  	$.ajax({
	  		url: '/api/getlistcotphaihome',
	  		type: 'GET',
  	})
  	.done((data) =>{
  		this.actions.getListItemSuccess(data);
  		console.log("success");
  	})
  	.fail((jqXhr) =>{
  		this.actions.getListItemFail(jqXhr.responseJSON);
  		console.log("error");
  	});
  	
  }

  addItemImage(payload){
  	$.ajax({
  		url: '/api/additemimage',
  		type: 'POST',
  		data: {name: payload.name, link: payload.link, image: payload.image, type: payload.type}
  	})
  	.done((data) =>{
	    this.actions.addItemImageSuccess(data.message);
	    console.log("success");
  	})
  	.fail((jqXhr) =>{
	    this.actions.addItemImageFail(jqXhr.responseJSON.message);
	    console.log("error");
  	});
  }
   	updateItemImage(payload){
	  	$.ajax({
	  		url: '/api/updateitemimage',
	  		type: 'PUT',
	  		data: {id: payload.id, name: payload.name, link: payload.link, image: payload.image, type: payload.type}
	  	})
	  	.done((data) =>{
		    this.actions.updateItemImageSuccess(data);
		    console.log("success");
	  	})
	  	.fail((jqXhr) =>{
		    this.actions.updateItemImageFail(jqXhr.responseJSON.message);
		    console.log("error");
	  	});
	}

  addItemVideo(payload){
    $.ajax({
      url: '/api/additemvideo',
      type: 'POST',
      data: {name: payload.name, link: payload.link, type: payload.type}
    })
    .done((data) =>{
      this.actions.addItemVideoSuccess(data.message);
      console.log("success");
    })
    .fail((jqXhr) =>{
      this.actions.addItemVideoFail(jqXhr.responseJSON.message);
      console.log("error");
    });
  }
    updateItemVideo(payload){
      $.ajax({
        url: '/api/updateitemvideo',
        type: 'PUT',
        data: {id: payload.id, name: payload.name, link: payload.link, type: payload.type}
      })
      .done((data) =>{
        this.actions.updateItemVideoSuccess(data);
        console.log("success");
      })
      .fail((jqXhr) =>{
        this.actions.updateItemVideoFail(jqXhr.responseJSON.message);
        console.log("error");
      });
  }

	openMoDDelete(id){
		this.actions.openMoDDelete(id);
	}

	getItem(payload){
		$.ajax({
	    url: '/api/getitem/'+payload.id})
	    .done((data) => {
	      this.actions.getItemSuccess({data: data, type: payload.type});
	    })
	    .fail((jqXhr) => {
	      this.actions.getItemFail(jqXhr.responseJSON.message);
	    });
	}

	deleteSite(id){
		$.ajax({
	      type: 'POST',
	      url: '/api/deleteitem',
	      data: { id: id}
	    })
	      .done((data) => {
	        this.actions.deleteItemSuccess(data.message);
	      })
	      .fail((jqXhr) => {
	        this.actions.deleteItemFail(jqXhr.responseJSON.message);
	      });
	}

  updateImgLink(link){
    this.actions.updateImage(link);
  }

  searchItemMenu(name){
    $.ajax({
      type:'GET',
      url:'/api/searchItemMenu/' + name,
      
    })
    .done((data) => {
      this.actions.searchItemMenuSuccess(data);
    })
    .fail((jqXhr) =>{      
     console.log(jqXhr.responseText.message);
      // this.actions.noneExistTitle();
    });
  }

  updateItemMenuSelect(payload){
    this.actions.updateItemMenuSelect({slug: payload.slug, title: payload.slug});
  }

}

export default alt.createActions(CotPhaiHomeAction);