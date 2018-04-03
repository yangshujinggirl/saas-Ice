import LoanApplication from './';
import HeaderAsideFooterResponsiveLayout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/loanapplication/fixed(/:id)",
  name:'贷款申请',
  childRoutes: [{
    path: '/loanapplication/config/:id',
    component: LoanApplication.LoanApplicationConfig
  },{
    path: 'edit/:id',
    component: LoanApplication.LoanApplicationForm
  },{
    path: 'detail/:id',
    component: LoanApplication.LoanApplicationDetail
  }],
  component: HeaderAsideFooterResponsiveLayout,
  indexRoute: {
    component: LoanApplication.LoanApplicationFixed,
    name:"车贷申请"
  }
}
