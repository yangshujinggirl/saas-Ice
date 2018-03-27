import CurdReq from '../../../base/reqs/CurdReq'

class AccountReq extends CurdReq{
	constructor(){
		super();

		//基本的curd接口
		//若有特殊定义的接口直接覆盖
		this.curd = {
            create: this._host + '/filter-table-list.json',
            update: this._host + '/filter-table-list.json',
            retrieve: this._host + '/filter-table-list.json',
            retrieve: this._host + '/fields?isFixed=true',
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

	/**
	 * 登录
	 * @return {[type]} [description]
	 */
	login(data){
		let options = {
			url: '/crm/saas/login',
			method: 'POST',
			contentType: 'application/json',
			data: data
		}
		return super.fetchData(options);
	}
}

export default new AccountReq();