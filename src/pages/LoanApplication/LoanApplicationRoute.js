import LoanApplication from './';
import HeaderAsideFooterResponsiveLayout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/loanapplication/fixed(/:id)",
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
    component: LoanApplication.LoanApplicationFixed
  }
}
