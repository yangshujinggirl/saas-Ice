// import 'core-js/es6/map';
// import 'core-js/es6/set';
// import 'core-js/es6/object';
import 'core-js';

import ReactDOM from 'react-dom';
// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import routes from './routes';
// import routes from './routes2';
import DeepApp from './base/third/DeepApp.jsx';

let app = new DeepApp();

// 以下代码 ICE 自动生成, 请勿修改
// const container = document.createElement('div');
// container.dataset.reactRoot = true;
// document.body.appendChild(container);
const container = document.getElementById('ice-container');
ReactDOM.render(routes, container);
