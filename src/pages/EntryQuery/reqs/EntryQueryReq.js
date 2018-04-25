import CurdReq from '../../../base/reqs/CurdReq'

class EntryQueryReq extends CurdReq{
	constructor(){
		super();

		//基本的curd接口
		//若有特殊定义的接口直接覆盖
		this.curd = {
            create: this._host + '/filter-table-list.json',
            update: this._host + '/loans/:id',
            retrieve: this._host + '/loans',
            delete: this._host + '/detail.json',
            detail: this._host + '/loans/:id/screen'
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
	//保存表单
  saveFrom(data){
    let options = {
      url: this._host + '/loans/'+data.id,
      method: 'PUT',
      data:data
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
  //获取select下拉框的options
  getSelectList(data) {
    let options = {
      url: this._host + `/cars?name=${data.name}&productCode=${data.productCode}`,
      method: 'Get',
    }
    return super.fetchData(options);
  }
}

export default new EntryQueryReq();
