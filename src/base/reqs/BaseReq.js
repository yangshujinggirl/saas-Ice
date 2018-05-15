import axios from 'axios';
import BaseConfig from '../../config/BaseConfig'
import Cookie from '../utils/Cookie'
import Storage from '../utils/Storage'
import Tools from '../utils/Tools'
import { hashHistory } from 'react-router'

import { Feedback } from "@icedesign/base";

class BaseReq {

  constructor() {
    this._host = BaseConfig.HOST; //接口地址
    this._loanHost = BaseConfig.LOAN_HOST; //贷前接口
    this._pageSize = BaseConfig.PAGESIZE; //分页大小
    this._config = BaseConfig;
  }

  fetchData(options) {
    var header = {};

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

    if (header['Content-type'] == 'application/json') {
      options.data = JSON.stringify(options.data);
    }

    //追加请求头
    let pctoken = Cookie.get('PCTOKEN');
    if (pctoken) {
      header['Authorization'] = pctoken;
    }

    if (!options.method || options.method == 'get') {
      if (!options.params) {
        options.params = {};
      }
      // options.params.t = new Date().getTime().toString(32);
    }

    return axios({
        url: options.url,
        method: options.method || 'get',
        headers: header,
        data: options.data,
        params: options.params,
        timeout: 5000
      })
      .then(this._processResponse.bind(this))
      .catch(this._processError.bind(this))
  }

  _processHost(url, isJava) {
    return (isJava ? Config.JAVA_HOST : Config.PHP_HOST) + url;
  }

  /**
   * 约定接口统一返回格式，约定只有200正确
   * {
   *   code: 200|400|...,
   *   data: {},
   *   msg: ''
   * }
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  _processResponse(res) {
    console.log('_processResponse', res);

    if (!res.data) {
      return {
        code: 400,
        msg: '响应格式数据不正确'
      };
    }

    if (res.data.code == 200) {
      //处理请求头，获取token，存储cookie
      if (res.headers.token) {
        Cookie.set('PCTOKEN', res.headers.token);
      }
      // 请求成功响应格式
      // res.data = {
      //   code: 200,
      //   data: {},
      //   msg: ''
      // }
      return res.data;
    } else {
      // 请求成功响应，但响应数据格式不正确，直接提示响应的消息
      if (res.data.code == 103) {
        this._redirectToLogin();
      }

      this._showMsg('error', res.data.msg || res.data.message || '未知错误');
      return res.data;
    }
  }

  /**
   * 统一错误处理
   * @param  {[type]} error [description]
   * @return {[type]}       [description]
   */
  _processError(error) {
    console.log('_processError', error);

    let res = error.response || error.request;

    if ((res.status == 500 && res.data.code == 401) || (res.status == 500 && res.data.message == 'Username or password error') || res.status == 103) {
      this._redirectToLogin();
      return { status: 401, msg: 'Unauthorized未登录', data: { code: 401 } };
    }

    let msg = 'RES_MESSAGE';

    if (res.data && (res.data.msg || res.data.message)) {
      //接口返回错误格式
      // {
      //   error: "Internal Server Error",
      //   exception: "org.apache.shiro.UnavailableSecurityManagerException",
      //   message: "No SecurityManager accessible to the calling code, either bound to the org.apache.shiro.util.ThreadContext or as a vm static singleton.  This is an invalid application configuration.",
      //   path: "/crm/login",
      //   status: 500,
      //   timestamp: 1521861550469
      // }
      msg = res.data.code + ' ' + (res.data.msg || res.data.message);
    }

    if (res.status == 0) {
      // 接口发起成功但没收到响应，一般请求超时
      msg = '请求超时，请重试';

      //解决退出登陆302跳转的错误提示
      if (error.config && error.config.url == '/crm/saas/logout') {
        msg = '';
      }
    }

    this._showMsg('error', msg);

    // 异常状态下，把错误信息返回去
    return {
      code: -404,
      msg: msg
    }
  }

  _showMsg(type, msg, tick) {
    if (!msg) {
      return;
    }
    // 'success', 'error', 'prompt', 'help', 'loading'
    Feedback.toast.show({
      type: type,
      content: msg,
    });
  }

  /**
   * 未登陆跳转到登陆页
   * 1. 匹配包含域名pingchang666才跳转，否则不处理
   * 2. 替换当前系统关键字成login，例如贷前daikuan->login
   * @return {[type]} [description]
   */
  _redirectToLogin() {
    let _host = location.host;
    if(_host.indexOf('pingchang666') == -1){
      return;
    }

    _host = _host.replace('daikuan', 'login');
    location.href = '//' + _host + '/#/account/' + encodeURIComponent(location.href);
    // hashHistory.push('/account');
  }
}

export default BaseReq;
