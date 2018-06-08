// import 'core-js/es6/map';
// import 'core-js/es6/set';
// import 'core-js/es6/object';
import 'core-js';

import BaseConfig from './config/BaseConfig';
import ReactDOM from 'react-dom';
// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import routes from './routes';
// import routes from './routes2';
import DeepApp from './base/third/DeepApp.jsx';

// 非线上环境开启服务发布通知
if (BaseConfig.RUNTIME_ENV != 'PRO') {
  let app = new DeepApp();
}

const container = document.getElementById('ice-container');
ReactDOM.render(routes, container);
