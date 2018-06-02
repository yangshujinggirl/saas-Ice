import Process from './';
import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/process",
  name:"流程配置",
  childRoutes: [{
    path: 'add',
    name:'流程新增',
    component: Process.ProcessForm
  },{
    path: 'edit/:id(/:copy)',
    name:'流程修改',
    component: Process.ProcessForm
  },{
    path: 'detail/:id',
    name:'流程详情',
    component: Process.ProcessDetail
  },{
    path: 'config/:id',
    name:'流程配置产品',
    component:Process.ProcessConfig
  }],
  component: Layout,
  indexRoute: {
    component: Process.Process,
    name: '流程查询'
  }
}
