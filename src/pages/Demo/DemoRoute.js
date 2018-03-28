import Demo from './';
import HeaderAsideFooterResponsiveLayout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/demo",
  name: 'DEMO模块',
  childRoutes: [{
    path: 'add',
    name: '新增',
    component: Demo.DemoForm
  },{
    path: 'edit(/:id)',
    name: '编辑',
    component: Demo.DemoForm
  },{
    path: 'detail(/:id)',
    name: '详情',
    component: Demo.DemoDetail
  }],
  component: HeaderAsideFooterResponsiveLayout,
  indexRoute: {
    name: '列表',
    component: Demo.Demo
  }
}