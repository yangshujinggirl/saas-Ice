import CurdReq from '../../../base/reqs/CurdReq'

class FontConfigReq extends CurdReq{
	constructor(){
		super();
		//基本的curd接口
		//若有特殊定义的接口直接覆盖
		this.curd = {
            create: this._host + '/filter-table-list.json',
            update: this._host + '/filter-table-list.json',
            retrieve: this._host + '/filter-table-list.json',
            delete: this._host + '/detail.json',
            detail: this._host + '/fields'
        }
	}

	/**
   * 获取详情
   */
  getDetail(id, callback, callbackError) {
    let data = {};


    let options = {
      url: this.curd.detail,

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
}

export default new FontConfigReq();