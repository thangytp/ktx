import alt from '../../../alt';

class ViewDetailPageAction {
  constructor() {
    this.generateActions(

        'getPageByLinkSuccess',
        'getPageByLinkFail'

        
    
    );
  }

  

  //get page by link
  getPageByLink(link){
    $.ajax({
    url: '/api/getpagebylink/'+link})
    .done((data) => {
      this.actions.getPageByLinkSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getPageByLinkFail(jqXhr.responseJSON.message);
    });
  }


}

export default alt.createActions(ViewDetailPageAction);
