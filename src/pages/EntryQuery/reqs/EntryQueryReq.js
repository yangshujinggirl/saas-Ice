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
    let options = {
      url: this._config.LOAN_HOST+ `/cars?name=${data.name}&productCode=${data.productCode}`,
      method: 'Get',
    }
    return super.fetchData(options);
  }
  //获取第一页基本信息字段
  searchField(data) {
    let options = {
      url: this._config.LOAN_HOST + `/fields?isFixed=${data.isFixed}`,
      method: 'Get',
      contentType: 'application/json'
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
  //轨迹详情
  getTrackDetail(data) {
    let options = {
      url: this._config.WF_HOST+ `/tasks/track?businessId=${data.businessId}&isApproveInfo=${data.isApproveInfo}`,
      // url: 'http://172.16.0.242:7300/mock/5a52d55884e9091a31919308/example/process/15698/track',
      method: 'Get',
      data:data
    }
    return super.fetchData(options);
  }
}

export default new EntryQueryReq();
