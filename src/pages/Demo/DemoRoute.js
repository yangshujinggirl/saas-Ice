import Demo from './';
import HeaderAsideFooterResponsiveLayout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/demo",
  childRoutes: [{
    path: 'add',
    component: Demo.DemoForm
  },{
    path: 'edit/:id',
    component: Demo.DemoForm
  },{
    path: 'detail/:id',
    component: Demo.DemoDetail
  }],
  component: HeaderAsideFooterResponsiveLayout,
  indexRoute: {
    component: Demo.Demo
  }
}