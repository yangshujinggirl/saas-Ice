import CurdReq from '../../../base/reqs/CurdReq'

class FontConfigReq extends CurdReq {
  constructor() {
    super();
    //基本的curd接口
    //若有特殊定义的接口直接覆盖
    this.curd = {
      create: this._config.LOAN_HOST + '/screen-schemes',
      update: this._config.LOAN_HOST + '/screen-schemes',
      retrieve: this._config.LOAN_HOST + '/screen-schemes',
      delete: this._config.LOAN_HOST + '/detail.json',
    }
  }

  /**
   * 获取字段
   */
  getDetail(query) {
    let data = {};

    let options = {
      url: this._config.LOAN_HOST + '/fields',
      params: query
    }
    return super.fetchData(options);
  }

  /**
   * 提交选中字段
   */
  fontCode(data, callback, callbackError) {
    let options = {
      url: this._config.LOAN_HOST + '/screen-schemes',
      data: data,
      method: 'post',
      contentType: 'application/json'
    }
    return super.fetchData(options);
  }

  /**
   * 获取选中字段
   */
  getCode(id, step) {
    let options = {
      url: this._config.LOAN_HOST + '/screen-schemes/' + id,
      contentType: 'application/json',
      params: {
        step: step
      }
    }
    return super.fetchData(options);
  }

  //移除已经配置step的字段
  removePageStep(id, step) {
    let options = {
      url: this._config.LOAN_HOST + '/screen-schemes/' + id + '/step/' + step,
      contentType: 'application/json',
      data: {
        step: step
      },
      method:'delete'
    }
    return super.fetchData(options);
  }

  /**
   * 批量修改字段
   */
  changPageName(data, id) {
    let options = {
      url: this._config.LOAN_HOST + '/screen-schemes/' + id,
      contentType: 'application/json',
      method: 'put',
      data: data
    }
    return super.fetchData(options);
  }

  /**
   * 删除字段
   */
  deleteCode(id, fieldId) {
    let options = {
      url: this._config.LOAN_HOST + '/screen-schemes/' + id + '/fields/' + fieldId,
      method: 'delete',
      contentType: 'application/json'
    }
    return super.fetchData(options);
  }


  /**
   * 删除模块
   */
  deleteModelCode(id, fieldsetName) {
    let options = {
      url: this._config.LOAN_HOST + '/screen-schemes/' + id + '/fieldset/' + fieldsetName,
      method: 'delete',
      contentType: 'application/json'
    }
    return super.fetchData(options);
  }

  /**
   * 添加单个字段（自定义）
   */
  submitCustomeCode(data, id) {
    let options = {
      url: this._config.LOAN_HOST + '/screen-schemes/' + id + '/fields',
      method: 'post',
      data: data,
      contentType: 'application/json'
    }
    return super.fetchData(options);
  }

  /**
   * 修改字段
   */
  submitModifyCode(data, id, fieldId) {
    let options = {
      url: this._config.LOAN_HOST + '/screen-schemes/' + id + '/fields/' + fieldId,
      method: 'put',
      data: data,
      contentType: 'application/json'
    }
    return super.fetchData(options);
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
}

export default new FontConfigReq();
