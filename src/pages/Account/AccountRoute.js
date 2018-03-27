import Account from './';
import Layout from "../../layouts/BlankLayout";

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
  component: Layout,
  indexRoute: {
    component: Account.Account
  }
}