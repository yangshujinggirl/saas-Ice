import CreditInformation from './';
import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/creditinformation",
  name :'审查审批',
  childRoutes: [{
    path: 'add/:id',
    component: CreditInformation.CreditInformationForm,
    name: '征信录入'
  },{
    path: 'detail/:id',
    component: CreditInformation.CreditInformationDetail,
    name: '进件审查详情'
  }],
  component: Layout,
  indexRoute: {
    component: CreditInformation.CreditInformation,
    name : '进件审核',
  }
}
