import { CurdReq } from 'base';

class ReviewApproveReq extends CurdReq{
	constructor(){
		super();

		//基本的curd接口
		//若有特殊定义的接口直接覆盖
		this.curd = {
            create: this._host + '/filter-table-list.json',
            update: this._host + '/filter-table-list.json',
            retrieve: this._host + '/filter-table-list.json',
            delete: this._host + '/detail.json',
            detail: this._host + '/detail.json'
        }
	}

	/**
	 * 自定义请求
	 * @return {[type]} [description]
	 */
	postDemo(){
		let options = {
			url: this._host + '/member/loginMobile',
			method: 'POST',
			contentType: 'application/x-www-form-urlencoded',
			params: 'mobile=13917538027&card=211224198612285536'
		}
		return super.fetchData(options);
	}
  //获取列表数据
  getListData() {
    let options = {
      // url: this._loanHost + `/tasks`,
      url: 'http://172.16.0.242:7300/mock/5a52d55884e9091a31919308/example/tasks#!method=get',
      method: 'Get',
    }
    return super.fetchData(options);
  }
  //点击点击签收
  signIn(data) {
    let options = {
      // url: this._loanHost + `/assignee/${data.taskId}`,
      url: `http://172.16.0.242:7300/mock/5a52d55884e9091a31919308/example/assignee`,
      method: 'PUT',
    }
    return super.fetchData(options);
  }

  //点击点击签收
  getDetail(data) {
    let options = {
      // url: this._loanHost + ` /loans/${data.loanId}/tasks/${data.proInstId}`,
      url: 'http://172.16.0.242:7300/mock/5a52d55884e9091a31919308/example/loans',
      method: 'Get',
    }
    return super.fetchData(options);
  }
}

export default new ReviewApproveReq();
