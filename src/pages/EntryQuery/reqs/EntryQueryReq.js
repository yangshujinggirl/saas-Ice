import CurdReq from '../../../base/reqs/CurdReq'

class EntryQueryReq extends CurdReq{
	constructor(){
		super();

		//基本的curd接口
		//若有特殊定义的接口直接覆盖
		this.curd = {
            create: this._config.LOAN_HOST + '/filter-table-list.json',
            update: this._config.LOAN_HOST + '/loans/:id',
            retrieve: this._config.LOAN_HOST+ '/loans',
            delete: this._config.LOAN_HOST+ '/detail.json',
            detail: this._config.LOAN_HOST + '/loans/:id/screen'
        }
	}

	/**
	 * 自定义请求
	 * @return {[type]} [description]
	 */
	postDemo(){
		let options = {
			url: this._config.LOAN_HOST+ '/member/loginMobile',
			method: 'POST',
			contentType: 'application/x-www-form-urlencoded',
			params: 'mobile=13917538027&card=211224198612285536'
		}
		return super.fetchData(options);
	}
	//保存表单
  saveFrom(data){
    let options = {
      url: this._config.LOAN_HOST + '/loans/'+data.id,
      method: 'PUT',
      data:data
    }
    return super.fetchData(options);
  }
  //获取进件详情
  getLoanUploadApi(id) {
    let options = {
      url: this._config.LOAN_HOST+ `/loans/${id}/collect`,
      method: 'Get',
      contentType: 'application/json'
    }
    return super.fetchData(options);
  }
  //获取select下拉框的options
  getSelectList(data) {
	  console.log(data)
    let options = {
      url: this._config.LOAN_HOST+ `/cars`,
      params: data
    }
    return super.fetchData(options);
  }
  //获取第一页基本信息字段
  searchField(data) {
    let options = {
      url: this._config.LOAN_HOST + `/fields?step=${data.step}`,
      method: 'Get',
      contentType: 'application/json'
    }
    return super.fetchData(options);
  }
  //获取产品编号
  getProductNumApi(data) {
	  console.log(data)
    let options = {
      url:this._config.LOAN_HOST + `/product?status=1`,
      method: 'Get',
      contentType: 'application/json',
      params : data
    }
    return super.fetchData(options);
  }
  //新增进件
  addLoanApi(params) {
    let options = {
      url: this._config.LOAN_HOST + '/loans',
      method: 'POST',
      contentType: 'application/json',
      data:params
    }
    return super.fetchData(options);
  }
  addLoanApi(params) {
    let options = {
      url: this._config.LOAN_HOST + '/loans',
      method: 'POST',
      contentType: 'application/json',
      data:params
    }
    return super.fetchData(options);
  }
  //轨迹详情
  getTrackDetail(data) {
    if(!data.isApproveInfo){
      var options = {
        url: this._config.WF_HOST + `/tasks/track?businessId=${data.businessId}&isApproveInfo=${data.isApproveInfo}`,
        method: 'Get',
      }
    }else {
      var options = {
        url: this._config.WF_HOST + `/tasks/track?businessId=${data.businessId}`,
        method: 'Get',
      }
    }
    return super.fetchData(options);
  }
  //获取进件详情
  getDetail(data) {
    let options = {
      url: this._config.LOAN_HOST + `/loans/${data.id}/screen`,
      method: 'Get',
      params:data,
      contentType: 'application/json'
    }
    return super.fetchData(options);
  }
}

export default new EntryQueryReq();
