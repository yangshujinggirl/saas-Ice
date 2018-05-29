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
    name: '面签详情',
    component: InterView.InterViewDetail,
  },
    {
      path: 'interViewOnly',
      name: '信用卡面签列表',
      component: InterView.InterViewOnly,
    }
  ],
  component: Layout,
  indexRoute: {
    component: InterView.InterView,
    name: '面签列表',
  },
};
