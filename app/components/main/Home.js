import React from 'react';
import {Link} from 'react-router';
import YouTube from 'react-youtube';

import CotPhaiHomeAction from '../../actions/admin/cotphaihome/CotPhaiHomeAction';
import CotPhaiHomeStore from '../../stores/admin/cotphaihome/CotPhaiHomeStore';

import CotPhaiHome from './CotPhaiHome';

class Home extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = CotPhaiHomeStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		CotPhaiHomeStore.listen(this.onChange);
		CotPhaiHomeAction.getListItem();
	}

	componentWillUnmount() {
		CotPhaiHomeStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);  
	}
  	render() {

  		const opts = {
	      height: '210',
	      width: '100%',
	      playerVars: { // https://developers.google.com/youtube/player_parameters
	        autoplay: 1
	      }
	    };

  		let listItem = this.state.listItem.map((item, index) =>{
  			if(item.type==='image'){
				return (
						<div className="col-sm-12" key={index}>
							<div className="panel panel-primary rounded shadow no-overflow cotphaihome">
	                      		<div className="panel-heading">
	                      			<h3 className="panel-title text-center text-upper">{item.name}</h3>
	                      		</div>
	                      		<div className="panel-body panel-border-primary no-padding">
	                      			<Link to={'/'+item.linkToPage}><img className="responsive" src={item.image}/></Link>
	                      		</div>
	                      	</div>
						</div>
					);
			}
			else {
				return (
						<div className="col-sm-12" key={index}>
							<div className="panel panel-primary rounded shadow no-overflow">
	                      		<div className="panel-heading">
	                      			<h3 className="panel-title text-center text-upper">{item.name}</h3>
	                      		</div>
	                      		<div className="panel-body panel-border-primary no-padding">
	                      			<YouTube
								        videoId="IXfVciwlnoU"
								       	opts={opts}
								      />
	                      		</div>
	                      	</div>
						</div>
					)
			}
		});

	    return (  
		    <div className="container">   
		    	<section id="tin-tuc-moi">
		    		<div className="col-sm-9">
			    		<h3 className="text-upper title-tin-tuc"><i className="fa fa-newspaper-o" aria-hidden="true"></i> Tin tức mới</h3>
			    		<div id="">
				    		<h4>Thông báo về việc thực hiện BHYT học sinh – sinh viên năm học 2016 - 2017</h4>
							Thứ tư, 28 Tháng 9 năm 2016 09:10
							<br/>
							      Căn cứ công văn hướng dẫn số 1988/BHXH-QLT ngày 09/08/2016 của BHXH Thành phố Hồ Chí Minh về việc hướng dẫn thực hiện BHYT học sinh, sinh viên năm học 2016-2017.<br/>
							        Căn cứ công văn số 183/ĐHBK-CTCT&SV ngày 23/9/2016 của Phòng Công tác Chính trị & Sinh viên Trường Đại học Bách Khoa về việc thu BHYT năm học 2016-2017.<br/>
							Theo đó, trung tâm Dịch vụ Ký túc xá Bách Khoa thông báo về việc thực hiện bảo hiểm y tế bắt buộc đối với học sinh, sinh viên tại Ký túc xá Bách Khoa năm học 2016 – 2017 như sau:<br/>
							<p><strong>1.    Đối tượng tham gia:</strong></p>
							Học sinh, sinh viên (HSSV) đang thuê chỗ ở tại Ký túc xá Bách Khoa, đều là đối tượng có trách nhiệm tham gia BHYT bắt buộc.
							<p><strong>2.    Mức đóng Bảo hiểm Y tế Học sinh – Sinh viên:</strong></p>
							Theo quy định, mức đóng Bảo hiểm Y tế Học sinh – Sinh viên (BHYT HSSV)  bằng 4.5% mức lương cơ sở (Mức lương cơ sở hiện tại: 1.210.000 đồng) nhân với số tháng tương ứng thời hạn sử dụng của thẻ BHYT, áp dụng cho năm học 2016-2017, cụ thể như sau: 4,5% x 1.210.000 đồng x 12 tháng = 653.400 đồng
							Trong đó:
							+ Học sinh, sinh viên đóng 70% = 457.380 đồng (làm tròn 457.500 đồng)
							+ Ngân sách nhà nước hỗ trợ 30% = 196.020 đồng
							<p><strong>3.    Phương thức đóng:</strong></p> Sinh viên nộp tiền mặt theo từng phòng, trưởng phòng hoặc đại diện phòng nộp trực tiếp tại Phòng Kế toán Ký túc xá.
			    		</div>
			    	</div>
			    	<div className="col-md-3 col-sm-12">
			    		<CotPhaiHome />
			    	</div>
		    	</section>
		    </div>     
	    );
  	}
}

export default Home;