import Contract from './';
import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/contract",
  name:'合同模板',
  childRoutes: [{
    path: 'add(/:id)',
    name:'合同新增',
    component: Contract.ContractAdd
  },{
    path: 'bind/:id',
    name:'合同绑定产品',
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
