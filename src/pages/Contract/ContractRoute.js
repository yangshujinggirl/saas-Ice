import Contract from './';
import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/contract",
  name:'合同管理',
  childRoutes: [{
    path: 'add/(:id)',
    name:'新增',
    component: Contract.ContractAdd
  },{
    path: 'bind/:id',
    name:'合同绑定',
    component: Contract.ContractBind
  },{
    path: 'detail/:id',
    name:'合同详情',
    component: Contract.ContractDetail
  }],
  component: Layout,
  indexRoute: {
    component: Contract.ContractList
  }
}
