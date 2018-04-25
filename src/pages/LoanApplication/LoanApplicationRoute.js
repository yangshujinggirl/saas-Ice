import LoanApplication from './';
import HeaderAsideFooterResponsiveLayout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/loanapplication/fixed(/:id)",
  name:'贷款管理',
  childRoutes: [],
  component: HeaderAsideFooterResponsiveLayout,
  indexRoute: {
    component: LoanApplication.LoanApplicationFixed,
    name:"车贷申请"
  }
}
