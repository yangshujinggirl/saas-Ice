import Index from './index';
import HeaderAsideFooterResponsiveLayout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/entryQuery",
  name:'贷款管理',
  childRoutes: [
    {
      path: 'detail/:id',
      name:'车贷申请详情',
      component: Index.LoanDetails
    },
    {
      path: 'update/:id',
      name:'车贷申请',
      component: Index.LoanModify
    },
    {
      path: 'loanApplication(/:id)',
      name:'车贷申请',
      component: Index.LoanApplication
    }
  ],
  component: HeaderAsideFooterResponsiveLayout,
  indexRoute: {
    component: Index.EntryQuery,
    name:'车贷查询'
  }
}
