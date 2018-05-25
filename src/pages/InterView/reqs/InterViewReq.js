import { CurdReq } from 'base';

class InterViewReq extends CurdReq{
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
	//面签列表获取
	searchList(){
		let options = {
      url: this._config.CONTRACT_HOST + `/interview/list`,
			method: 'get',
			contentType: 'application/x-www-form-urlencoded',
		}
		return super.fetchData(options);
	}
	// 初始化网易的数据accid
	initInterviw() { 
		let options = {
			url: this._config.CONTRACT_HOST + '/video/account'
		}
		return super.fetchData(options);		
	}
}

export default new InterViewReq();
