import config from './config.js';

class BaseConfig {
  static HOST = '/loan-ft1';
  static SAAS_HOST = '/saas'; //SAAS相关服务
  static CRM_HOST = '/crm'; //中台相关服务
  static LOAN_HOST = '/loan'; //进件相关服务
  static WF_HOST = '/wf'; //流程配置相关服务
  static CONTRACT_HOST = '/contract'; //合同相关服务
  static PAGESIZE = 15;
  static IS_AUTO_MENU_USED = false; //是否使用自动生成菜单
}

let build = 'PRO';//默认使用线上环境配置
if ('PC_ENV' in window && PC_ENV == 'PRODUCTION') {
  //如果是非开发环境
  //依据运行时的hostname区分是哪种环境，测试、staging、线上
  //eg:daikuan-ft1.pingchang666.com => ft1
  let hostnameArr = location.hostname.split('.');
  if (hostnameArr.length == 3) {
    let firstHostnameArr = hostnameArr[0].split('-');
    if (firstHostnameArr.length == 2) {
      build = firstHostnameArr[1].toUpperCase();
    }
  }
} else {
  build = 'DEV';
}

BaseConfig.RUNTIME_ENV = build;

if (config[build]) {
  Object.assign(BaseConfig, config[build]);
}

window.BaseConfig = BaseConfig;
export default BaseConfig;
