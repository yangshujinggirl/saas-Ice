import ContractEdit from './';
import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/contractedit",
  name:'合同编辑',
  childRoutes: [{
    path: 'edit/:id',
    name:'合同编辑',
    component: ContractEdit.ContractEdit
  }],
  component: Layout,
  indexRoute: {
    name:'待编辑列表',
    component: ContractEdit.ContractEditList
  }
}
