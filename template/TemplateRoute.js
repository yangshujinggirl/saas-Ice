import [MODULE] from './';
import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/[ROUTERPATH]",
  childRoutes: [{
    path: 'add',
    component: [MODULE].[MODULE]Form
  },{
    path: 'edit/:id',
    component: [MODULE].[MODULE]Form
  },{
    path: 'detail/:id',
    component: [MODULE].[MODULE]Detail
  }],
  component: Layout,
  indexRoute: {
    component: [MODULE].[MODULE]
  }
}