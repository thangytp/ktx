import alt from '../../../alt';

class InfoPageAction {
  	constructor() {
    	this.generateActions(

            'getStudentSuccess',
            'getStudentFail'

    	);
	}

    getStudent(id){
        $.ajax({
            type: 'GET',
            url: '/api/getInfostudent/' + id
        })
        .done((data) =>{
            console.log(data);
            this.actions.getStudentSuccess(data);
        })
        .fail((jqXhr) => {
            this.actions.getStudentFail(jqXhr.responseJSON);
        });
    }


}

export default alt.createActions(InfoPageAction);
