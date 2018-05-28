import { CurdReq } from 'base';

class ProcessReq extends CurdReq {
  constructor() {
    super();

    //基本的curd接口
    //若有特殊定义的接口直接覆盖
    this.curd = {
      create: this._config.WF_HOST + '/processes',
      update: this._config.WF_HOST + '/processes/:id',
      retrieve: this._config.WF_HOST + '/processes',
      // retrieve: 'http://172.16.0.242:7300/mock/5a52d52384e9091a319192fb/api/processes',
      delete: this._config.WF_HOST + '/detail.json',
      detail: this._config.WF_HOST + '/processes/:id'
    }
  }

  /**
   * 获取流程新增/修改左侧
   * @return {[type]} [description]
   */
  getCustomMenuList() {
    let options = {
      // url: 'http://172.16.0.242:7300/mock/5a52d52384e9091a319192fb/api/task/types',
      url: this._config.WF_HOST + '/tasks/types',
      method: 'GET',
      contentType: 'application/x-www-form-urlencoded',
      // params: 'mobile=13917538027&card=211224198612285536'
    }
    return super.fetchData(options);
  }

  /**
   * 复制流程
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  copyProcess(id) {
    let options = {
      url: this._config.WF_HOST + `/processes/${id}/replication`,
      method: 'GET',
      contentType: 'application/x-www-form-urlencoded'
    }
    return super.fetchData(options);
  }
  //流程配置产品——产品类型
  getProcessProdType() {
    let options = {
      url: this._config.LOAN_HOST + `/product/data`,
      method: 'get',
      contentType: 'application/x-www-form-urlencoded',
      // params:condition
    }
    return super.fetchData(options);
  }
  //流程配置产品左侧列表
  getProcessProdList(condition) {
    let options = {
      url: this._config.LOAN_HOST + `/product`,
      method: 'get',
      contentType: 'application/x-www-form-urlencoded',
      params: condition
    }
    return super.fetchData(options);
	}
	//流程配置产品右侧列表
	getProcessProdOldList(id){
		let options = {
			url: this._config.WF_HOST + `/processes/product/${id}`,
			// url: this._config.WF_HOST + `/processes/product/123`,
      method: 'get',
      contentType: 'application/x-www-form-urlencoded',
      // params: condition
    }
    return super.fetchData(options);
	}
  //流程配置产品保存
  saveProcessConfigProduct(data,id) {
    let options = {
      url: this._config.WF_HOST + `/processes/product/${id}/wf`,
      method: 'POST',
      contentType: 'application/json',
      data: data
    }
    return super.fetchData(options);
  }
  /**
   * 获取必要字段
   * @param  {[type]} taskTypeId [description]
   * @return {[type]}      [description]
   */
  getTasksFields(taskTypeId) {
    let options = {
      url: this._config.WF_HOST + `/tasks/fields/${taskTypeId}`,
      method: 'GET',
    }
    return super.fetchData(options);
  }
  //权限编辑机构／角色
  getPrivilegeOrgs(){
    let options = {
      url:this._config.WF_HOST + '/processes/privilege/orgs',
      // url:'https://www.easy-mock.com/mock/5a1629ea8eb5f73bfafa4f4f/lxapi/processes/privilege/orgs',
      contentType: 'application/x-www-form-urlencoded',
      method:'GET',
      // params:condition
    }
    return super.fetchData(options);
  }
}

export default new ProcessReq();
