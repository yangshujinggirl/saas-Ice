import CreditInformation from './';
import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/creditinformation",
  name :'审查审批',
  childRoutes: [{
    path: 'add',
    component: CreditInformation.CreditInformationForm
  },{
    path: 'edit/:id',
    component: CreditInformation.CreditInformationForm
  },{
    path: 'detail/:id',
    component: CreditInformation.CreditInformationDetail
  }],
  component: Layout,
  indexRoute: {
    component: CreditInformation.CreditInformation,
    name : '征信处理',
  }
}
