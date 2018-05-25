import axios from 'axios';
import BaseConfig from '../../config/BaseConfig'
import Cookie from '../utils/Cookie'
import Storage from '../utils/Storage'
import Tools from '../utils/Tools'
import { hashHistory } from 'react-router'
import qs from 'qs';

import { Feedback } from "@icedesign/base";

let requests = [];
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
        header['Content-Type'] = options.contentType
      }
    } else {
      header['Content-Type'] = 'application/json';
    }

    if (header['Content-Type'] == 'application/json') {
      options.data = JSON.stringify(options.data);
    }else{
      options.data = qs.stringify(options.data);
    }

    //追加请求头
    let pctoken = Cookie.get('PCTOKEN');
    if (pctoken) {
      header['Authorization'] = 'PCHTOKEN ' +  pctoken;
      //header['Authorization'] = pctoken;
    }

    if (!options.method || options.method == 'get') {
      if (!options.params) {
        options.params = {};
      }
      // options.params.t = new Date().getTime().toString(32);
    }

    console.log(options.url, typeof options.data)

    let promise = axios({
        url: options.url,
        method: options.method || 'get',
        headers: header,
        data: options.data,
        params: options.params,
        timeout: 5000
      })
      .then(r=>{
        r = this._processResponse(r);
        if(200 == r.code)return r;
        /** 
          ➡️ 当api接口的code != 200
          ➡️ 本次业务失败，return Promise.reject(r)确保交给总入口的catch处理错误
          ➡️ 总入口的catch弹出错误提示，继续return Promise.reject(e)
          ➡️ 确保进入业务代码回调时只有两种情况: 
          ➡️ 业务的成功回调里一定是成功的数据，业务的失败回调里一定是失败的code
          ➡️ ok->then(successCallback), error=>catch(errorCallback)
        */
        return Promise.reject(r)
      })
      .catch(e=>{
        e = this._processError(e);
        return Promise.reject(e)
      });
    requests.push(promise);
    return promise;
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
    let response = {}, 
        code = 0, 
        msg = '', 
        data = {};

    if (!res.data) {
      code = 400;
      msg = '响应格式数据不正确'
    }else{
      code = res.data.code || code;
      msg  = res.data.msg  || res.data.message || msg;
      // 有些接口data会直接返回boolean值
      data = (typeof res.data.data == 'boolean' || res.data.data) ? res.data.data : data;
      /*
      let resData = res.data.data;
      if(!resData){
        data = {}
      }else if(resData instanceof Array){
        data = [...resData];
      }else if('object' == typeof resData){
        data = {...resData}
      }else{
        data = resData
      }*/
      if (code == 200 && res.headers.token) {
        //处理请求头，获取token，存储cookie
        Cookie.set('PCTOKEN', res.headers.token);
      }
    }
    return {
      code,
      msg,
      data
    }
  }

  /**
   * 统一错误处理
   * @param  {[type]} error [description]
   * @return {[type]}       [description]
   */
  _processError(error) {
    //debugger;
    console.log('_processError', error);
    let res = error.response || error.request || {};
    let existData = 'object' == typeof res.data && res.data || {};

    if (error.code == 103 || /103|401/.test(res.status) || existData.code == 103) {
      this._redirectToLogin();
      return { status: 401, msg: '未授权，请重新登录', data: { code: 401 } };
    }

    let msg = error.msg || 'RES_MESSAGE';

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

  /**
   * 统一错误消息提示
   * @param  {[type]} type [description]
   * @param  {[type]} msg  [description]
   * @param  {[type]} tick [description]
   * @return {[type]}      [description]
   */
  _showMsg(type, msg, ...rest) {
    if (!msg) {
      return;
    }
    // 'success', 'error', 'prompt', 'help', 'loading'
    Feedback.toast.show({
      type: type,
      content: msg,
      duration: 2000,
      ...rest
    });
  }



  /**
   * 未登陆跳转到登陆页
   * 1. 匹配包含域名pingchang666才跳转，否则不处理
   * 2. 替换当前系统关键字成login，例如贷前daikuan->login
   * @return {[type]} [description]
   */
  _redirectToLogin() {
    //debugger;
    let _host = location.host;
    /*
      由于获取菜单和获取登录用户信息会并列请求，未登录时会不分先后两次触发未登录重定向，
      故判断需要判断当前页面是否已经是登录页面，是则不予处理，不是则重定向到登录页
    */
    let hash = location.hash.substring(2) || '';
    if(hash.indexOf('account') == 0){
      return;
    }

    // 登录超时，直接清除token
    Cookie.remove('PCTOKEN');

    //替换当前系统的域名成登录域名，
    //eg:daikuan-staging.pingchang666.com=>login-staging.pingchang666.com
    _host = _host.replace('daikuan', 'login');
    location.href = '//' + _host + '/#/account/' + encodeURIComponent(location.href);
    // hashHistory.push('/account');
  }
}

Object.keys(Feedback.toast).forEach(k=>{
  BaseReq.prototype['tip' + k[0].toUpperCase() + k.slice(1)] = function(content, duration, afterCloseCallback, ...rest){
    let opts = {};
    if('object' != typeof content){
      opts.content = String(content);
    }else{
      opts = {...content, ...opts}
    }
    if('object' != typeof duration && duration){
      opts.duration = Number(duration);
      opts.duration = isNaN(opts.duration) ? 300 : opts.duration;
    }

    if('function' == typeof afterCloseCallback){
      opts.afterClose = afterCloseCallback
    }
    
    opts = {...opts, ...rest}
    Feedback.toast[k]({
      duration: 500,
      content: '未知信息',
      ...opts
    })
  }
})

export default BaseReq;
