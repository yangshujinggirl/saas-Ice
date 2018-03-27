import Account from './';
import HeaderAsideFooterResponsiveLayout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/account",
  childRoutes: [{
    path: 'add',
    component: Account.AccountForm
  },{
    path: 'edit/:id',
    component: Account.AccountForm
  },{
    path: 'detail/:id',
    component: Account.AccountDetail
  }],
  component: HeaderAsideFooterResponsiveLayout,
  indexRoute: {
    component: Account.Account
  }
}