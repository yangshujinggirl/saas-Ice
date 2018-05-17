import ContractFile from './';
import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/contractfile",
  name:'合同归档',
  childRoutes: [{
    path: 'detail/:id',
    name:'合同归档详情',
    component: ContractFile.ContractFileDetail
  },
  {
    path: 'downList/:id',
    name:'合同下载',
    component: ContractFile.ContractFileDownLoad
  }
],
  component: Layout,
  indexRoute: {
    component: ContractFile.ContractFileList
  }
}
