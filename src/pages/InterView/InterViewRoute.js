import InterView from './';
import Layout from '../../layouts/HeaderAsideFooterResponsiveLayout';

export default {
  path: '/interview',
  name: '面签管理',
  childRoutes: [{
    path: 'sign',
    name: '签字列表',
    component: InterView.InterViewForm,
  }, {
    path: 'detail/:type/:id',
    name: '中国银行合同详情',
    component: InterView.InterViewDetail,
  }],
  component: Layout,
  indexRoute: {
    component: InterView.InterView,
    name: '面签列表',
  },
};
