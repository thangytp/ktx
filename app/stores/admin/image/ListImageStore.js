import alt from '../../../alt';
import ListImageAction from '../../../actions/admin/image/ListImageAction';

class ListImageStore {
  constructor() {
    this.bindActions(ListImageAction);
    this.images = [];
    this.copiedMes = '';
    this.deletemessage='';
    this.arrayIDtoDel=[];
    this.modalIsOpen=false;
  }

  onUpdateMesCopy(){
    this.copiedMes = 'Sao chép thành công!';
  }

  onDelImageSuccess() {
    ListImageAction.get();
  }

  onUpdateArrayId(id)
  {
    this.arrayIDtoDel.push(id);
  }
  onRemoveArrayId(id)
  {
    var index = this.arrayIDtoDel.indexOf(id);
    this.arrayIDtoDel.splice(index,1);
  }
 onOpenModal()
  {
    if (this.arrayIDtoDel.length > 0)
      this.modalIsOpen=true;
  }
  onCloseModal()
  {
      this.modalIsOpen=false;
  }

  onGetListImageSuccess(data)
  {
  	this.images = data;
  }
  onGetListImageFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
  onDeleteSuccess(message)
  {
     this.deletemessage=message;
     ListImageAction.get();
  }
   onDeleteFail(jqXhr)
  {
    toastr.error(jqXhr.responseJSON.message);
  }
}
export default alt.createStore(ListImageStore);
