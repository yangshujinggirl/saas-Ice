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


	/**
	 * 自定义请求
	 * @return {[type]} [description]
	 */
	//新增进件
	addLoanApi(params) {
		let options = {
			url: this._host + '/loans',
			method: 'POST',
			contentType: 'application/json',
			data:params
		}
		return super.fetchData(options);
	}
	//获取进件详情
	getLoanDetailApi(id) {
		let options = {
			url: this._host + `/loans/${id}/screen`,
			method: 'Get',
			contentType: 'application/json'
		}
		return super.fetchData(options);
	}
	//获取进件详情
	getLoanUploadApi(id) {
		let options = {
			url: this._host + `/loans/${id}/collect`,
			method: 'Get',
			contentType: 'application/json'
		}
		return super.fetchData(options);
	}
	//获取产品编号
	getProductNumApi(limit) {
		let options = {
			url: this._host + `/product?limit=${limit}&status=1`,
			method: 'Get',
			contentType: 'application/json'
		}
		return super.fetchData(options);
	}
}

export default new LoanApplicationReq();
