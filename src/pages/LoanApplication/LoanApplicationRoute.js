import LoanApplication from './';
import HeaderAsideFooterResponsiveLayout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/loanapplication/fixed(/:id)",
  name:'贷款申请',
  childRoutes: [],
  component: HeaderAsideFooterResponsiveLayout,
  indexRoute: {
    component: LoanApplication.LoanApplicationFixed,
    name:"车贷申请"
  }
}
