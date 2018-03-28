import CurdReq from '../../../base/reqs/CurdReq'

class ProductReq extends CurdReq{
	constructor(){
		super();

		//基本的curd接口
		//若有特殊定义的接口直接覆盖
		this.curd = {
            create: this._host + '/product',
            update: this._host + '/product/:id',
            retrieve: this._host + '/product/',
            delete: this._host + '/product/:id',
            detail: this._host + '/product/:id'
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
}

export default new ProductReq();