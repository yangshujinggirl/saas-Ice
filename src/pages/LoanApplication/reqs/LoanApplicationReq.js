import CurdReq from '../../../base/reqs/CurdReq'

class LoanApplicationReq extends CurdReq{
	constructor(){
		super();

		//基本的curd接口
		//若有特殊定义的接口直接覆盖
		this.curd = {
            create: this._host + '/loans/',
            update: this._host + '/filter-table-list.json',
            retrieve: this._host + '/fields',
            delete: this._host + '/detail.json',
            detail: this._host + '/detail.json'
        }
	}

	getFields(){

			let options = {
				url: this._host + '/member/loginMobile',
				method: 'POST',
				contentType: 'application/x-www-form-urlencoded',
				params: 'mobile=13917538027&card=211224198612285536'
			}
			return super.fetchData(options);
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
	addLoanApi(params) {
		let options = {
			url: this._host + '/loans/',
			method: 'POST',
			contentType: 'application/json',
			params
		}
		return super.fetchData(options);
	}
}

export default new LoanApplicationReq();
