import CurdReq from '../../../base/reqs/CurdReq'

class ProductReq extends CurdReq {
  constructor() {
    super();

    //基本的curd接口
    //若有特殊定义的接口直接覆盖
    this.curd = {
      create: this._config.LOAN_HOST + '/product',
      update: this._config.LOAN_HOST + '/product/:id',
      retrieve: this._config.LOAN_HOST + '/product/',
      delete: this._config.LOAN_HOST + '/product/:id', //删除
      detail: this._config.LOAN_HOST + '/product/:id', //详情
      filedeletedes: this._config.LOAN_HOST + '/product/collect/detail/:id',
      fileupdate: this._config.LOAN_HOST + '/product/collect/:id'
    }
  }

  /**
   * 自定义请求
   * @return {[type]} [description]
   */
  postDemo() {
    let options = {
      url: this._config.LOAN_HOST + '/member/loginMobile',
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      params: 'mobile=13917538027&card=211224198612285536'
    }
    return super.fetchData(options);
  }
  //产品初始数据
  prodActions(condition) {
    let options = {
      url: this._config.LOAN_HOST + '/product/data',
      method: 'get',
      contentType: 'application/x-www-form-urlencoded',
      params: condition
    }
    return super.fetchData(options);
  }

  save(data) {
    // var url = this.formatUrl(this.curd.create);
    // if (data && data.id) {
    //   url = this.formatUrl(this.curd.update, data.id);
    // }
    let options = {
      url: this._config.LOAN_HOST + '/product',
      method: 'POST',
      data: data,
      contentType: 'application/json'
    }
    return super.fetchData(options);
  }

  //产品提交第二步保存
  productsave(data, id) {
    var url = this._config.LOAN_HOST + `/product/${id}/scope`;
    let options = {
      url: url,
      method: 'POST',
      data: data,
      contentType: 'application/json'
    }
    return super.fetchData(options);
  }

  //产品权限编辑
  saveProductAuth(data,id){
    var url = this._config.LOAN_HOST + `/product/${id}/scope`;
    let options = {
      url: url,
      method: 'POST',
      data: data,
      contentType: 'application/json'
    }
    return super.fetchData(options);
  }

  //产品提交addThree保存
  saveProductAdd( productId,data,processDefId) {
    if(processDefId==0){
      data = []
    }
    var url = this._config.WF_HOST + `/processes/product/${processDefId}/loan`;
    let options = {
      url: url,
      method: 'POST',
      data: data,
      contentType: 'application/json'
    }
    return super.fetchData(options);
  }

  //流程名称
  _processList(condition){
    var url = this._config.WF_HOST + `/processes?status=1`;
    let options = {
      url: url,
      method: 'get',
      params: condition,
      contentType: 'application/json'
    }
    return super.fetchData(options);
  }

  //合同模板、
  getContractTemplateList(condition){
    var url = this._config.CONTRACT_HOST + `/contract/template/`;
    let options = {
      url: url,
      method: 'get',
      params: Object.assign({status:1},condition),
      contentType: 'application/json'
    }
    return super.fetchData(options);
  }
  //合同保存
  saveContractTemplate(data){
    console.log(data)
    var url = this._config.CONTRACT_HOST + `/contract/template/bondTemplate`;
    let options = {
      url: url,
      method: 'post',
      data: data,
      contentType: 'application/json'
    }
    return super.fetchData(options);
  }

  //产品修改
  prodedit(id) {
    let options = {
      url: this._config.LOAN_HOST + `/product/${id}/history`,
      method: 'get',
      contentType: 'application/x-www-form-urlencoded',
    }
    return super.fetchData(options);
  }

  //产品修改后保存
  prodrevise(data) {
    var url = this.formatUrl(this._config.LOAN_HOST + `/product/${data.id}`);
    let options = {
      url: url,
      method: 'put',
      data: data,
      contentType: 'application/json'
    }
    return super.fetchData(options);
  }

  //材料清单查询
  filesearch(condition){
    let options = {
      url: this._config.LOAN_HOST + `/product/collect`,
      method: 'get',
      contentType: 'application/x-www-form-urlencoded',
      params: condition
    }
    return super.fetchData(options);
  }
  //资料清单明细
  fileDetail(id) {
    let options = {
      url: this._config.LOAN_HOST + `/product/collect/${id}`,
      method: 'get',
      contentType: 'application/x-www-form-urlencoded',
    }
    return super.fetchData(options);
  }


  //删除资料清单一条数据
  fileremove(id, callback, callbackError) {
    let options = {
      // url: this.formatUrl(this.curd.filedelete, id),
      url: this._config.LOAN_HOST + `/product/collect/${id}`,
      method: 'DELETE',
      contentType: this.contentType || 'application/json'
    }
    return super.fetchData(options);
  }

  //删除资料清单明细
  fileRemoveDes(id, callback, callbackError) {
    let options = {
      // url: this.formatUrl(this.curd.filedeletedes, id),
      url: this._config.LOAN_HOST + `/product/collect/detail/${id}`,
      method: 'DELETE',
      contentType: this.contentType || 'application/json'
    }
    return super.fetchData(options);
  }


  //材料编辑修改后确定
  fileEditSave(data, id) {
    var url = this._config.LOAN_HOST + '/product/collect/' + id
    if (data) {

      let options = {
        url: url,
        method: 'put',
        data: data,
        contentType: 'application/json'
      }
      return super.fetchData(options);
    }
  }
  //资料保存
  fileSave(data) {
    var url = this._config.LOAN_HOST + '/product/collect'
    if (data) {
      let options = {
        url: url,
        method: 'post',
        data: data,
        contentType: 'application/json'
      }
      return super.fetchData(options);
    }
  }

  //品牌、车型、车系
  addTwoList(type, name, page) {
    let condition = {
      name: name,
      type: type,
      page: page,
    }
    let options = {
      // url: this._config.LOAN_HOST + '/product/data
      url: this._config.LOAN_HOST + `/cars`,
      // url:'/cars',
      method: 'get',
      contentType: 'application/x-www-form-urlencoded',
      params: condition
    }
    return super.fetchData(options);
  }


  //集团、渠道、厅店
  getGroupList(type, name, page){
    let condition = {
      name: name,
      type: type,
      page: page,
    }
    let options = {
      // url: this._config.LOAN_HOST + '/product/data
      url: this._config.LOAN_HOST + `/product/agency/type`,
      // url:'/cars',
      method: 'get',
      contentType: 'application/x-www-form-urlencoded',
      params: condition
    }
    return super.fetchData(options);
  }

  //查询产品名称是否重复
  productNameRepeat(condition) {
    let options = {
      // url: this._config.LOAN_HOST + '/product/data
      url: this._config.LOAN_HOST + `/product/name/exists?name=${condition}`,
      method: 'get',
      contentType: 'application/x-www-form-urlencoded',
    }
    return super.fetchData(options);
  }

  //查询材料名称是否重复
  fileNameRepeat(condition) {
    let options = {
      // url: this._config.LOAN_HOST + '/product/data
      url: this._config.LOAN_HOST + `/product/collect/exists?name=${condition}`,
      method: 'get',
      contentType: 'application/x-www-form-urlencoded',
    }
    return super.fetchData(options);
  }

  //渠道
  getProdeuctAgency(condition){
    let options = {
      url: this._config.LOAN_HOST + `/product/agency`,
      // url:'https://www.easy-mock.com/mock/5a1629ea8eb5f73bfafa4f4f/lxapi/test',
      method: 'get',
      contentType: 'application/x-www-form-urlencoded',
      // params:condition
    }
    return super.fetchData(options);
  }


  //权限编辑机构／角色
  getPrivilegeOrgs(){
    let options = {
      url:this._config.LOAN_HOST + '/product/orgs/roles',
      // url:'https://www.easy-mock.com/mock/5a1629ea8eb5f73bfafa4f4f/lxapi/processes/privilege/orgs',
      contentType: 'application/x-www-form-urlencoded',
      method:'GET',
      // params:condition
    }
    return super.fetchData(options);
  }

  //产品状态
  getProductStatus(condition){
    let options = {
      url:this._config.LOAN_HOST + `/product/enable?productId=${condition}`,
      // url:'https://www.easy-mock.com/mock/5a1629ea8eb5f73bfafa4f4f/lxapi/processes/privilege/orgs',
      contentType: 'application/x-www-form-urlencoded',
      method:'PUT',
      // params:condition
    }
    return super.fetchData(options);
  }
}




// put :data delete :data params




export default new ProductReq();
