import axios from 'axios';
import BaseConfig from '../../config/BaseConfig'
import Cookie from '../utils/Cookie'
import Storage from '../utils/Storage'
import Tools from '../utils/Tools'

class BaseReq {

  constructor() {
    this._host = BaseConfig.HOST; //接口地址
    this._pageSize = BaseConfig.PAGESIZE; //分页大小
  }

  fetchData(options) {
    var header = {};

    if (Cookie.get('SID')) {
      header['userToken'] = Cookie.get('SID');
    } else {
      let token = Tools._GET('SID');
      if (token) {
        header['userToken'] = token.SID;
        Cookie.set('SID', token.SID);
      }
    }

    if (typeof options.processData == 'undefined') {
      options.processData = true;
    }

    if ('contentType' in options) {
      if (options.contentType != 'multipart/form-data') {
        header['Content-type'] = options.contentType
      }
    } else {
      header['Content-type'] = 'application/json';
    }
    return axios(options.url, {
        method: options.method || 'GET',
        headers: header,
        data: options.data,
        params: options.params,
      })
      .then(this._processResponse)
      .catch((error) => {
        console.error('request failed', error)
      })
      .then(this._processData)
  }

  _processHost(url, isJava) {
    return (isJava ? Config.JAVA_HOST : Config.PHP_HOST) + url;
  }

  _processOptions(options) {
    if (typeof options == 'string') {
      let url = options;
      options = {};
      options.url = url;
    }
    return options;
  }

  /**
   * 处理接口响应，当接口响应错误只记录日志不继续处理
   */
  _processResponse(response) {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      var error = new Error('接口异常')
      error.response = response
      throw error;
    }
  }

  /**
   * 处理数据正确性，数据验证错误抛出异常
   */
  _processData(data) {
    if (data.code == 200) {
      return data;
    } else if (data.status == 401) {
      return;
    } else {
      var error = new Error(data.message || '接口逻辑错误');
      error.data = data;
      throw error;
    }
  }
}

export default BaseReq;
