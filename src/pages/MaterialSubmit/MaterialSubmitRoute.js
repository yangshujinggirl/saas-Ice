import index from './index';
import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/MaterialSubmit(/:id)",
  name:'材料提交',
  childRoutes: [],
  component: Layout,
  indexRoute: {
    component: index.MaterialSubmit,
    name:'材料提交',
  }
}
