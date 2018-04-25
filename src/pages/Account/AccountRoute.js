import Account from './';
import Layout from "../../layouts/BlankLayout";

export default {
  path: "/account",
  component: Layout,
  indexRoute: {
    component: Account.Account
  }
}