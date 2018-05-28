import { CurdReq } from 'base';

class InterViewReq extends CurdReq{
	constructor(){
		super();

		//基本的curd接口
		//若有特殊定义的接口直接覆盖
		this.curd = {
            create: this._host + '/filter-table-list.json',
            update: this._host + '/filter-table-list.json',
            retrieve: this._config.CONTRACT_HOST + `/interview/list`,
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
	//面签列表获取
	searchList(){
		let options = {
      // url: this._config.CONTRACT_HOST + `/interview/list`,
      url: 'https://www.easy-mock.com/mock/5b07a8c04514163f2d193445/example/list',
			method: 'get',
			contentType: 'application/x-www-form-urlencoded',
		}
		return super.fetchData(options);
	}
	//平安中行面签详情接口
  getInterViewDetail(id){
    let options = {
      // url: 'http://172.16.0.242:7300/mock/5a52d55884e9091a31919308/example/sign/signCheckContract',
      url: this._config.CONTRACT_HOST + `/visaInterview/chinate/detail/${id}`,
      method: 'get',
      contentType: 'application/x-www-form-urlencoded',
    }
    return super.fetchData(options);
  }
  //仅面签详情接口
  getInterViewOnlyDetail(id){
    let options = {
      url: this._config.CONTRACT_HOST + `/visaInterview/only/detail/${id}`,
      method: 'get',
      contentType: 'application/x-www-form-urlencoded',
    }
    return super.fetchData(options);
  }
  //获取进件详情
  getDetail(id) {
    let options = {
      // url: this._config.LOAN_HOST + `/loans/${id}/screen`,
      url: this._config.WF_HOST + `/audit/loans/${id}`,
      method: 'Get',
      contentType: 'application/json'
    }
    return super.fetchData(options);
  }
  //查看报告
  getViewReport(id) {
    let options = {
      url: this._config.CONTRACT_HOST + `/visaInterview/${id}/preview`,
      method: 'get',
      contentType: 'application/json'
    }
    return super.fetchData(options);
  }
  //上传文件报告
  getUpReport(data) {
    let options = {
      url: this._config.CONTRACT_HOST + `/visaInterview/upload`,
      method: 'POST',
      data: data
    }
    return super.fetchData(options);
  }

  //获取产品编号
  getProductNumApi(limit) {
    let options = {
      url:this._config.LOAN_HOST + `/product?limit=${limit}&status=1`,
      method: 'Get',
      contentType: 'application/json'
    }
    return super.fetchData(options);
  }
}

export default new InterViewReq();
