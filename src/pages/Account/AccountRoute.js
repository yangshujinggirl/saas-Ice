import Account from './';
import Layout from "../../layouts/BlankLayout";

export default {
  path: "/account(/:from)",
  component: Layout,
  indexRoute: {
    component: Account.Account
  }
}