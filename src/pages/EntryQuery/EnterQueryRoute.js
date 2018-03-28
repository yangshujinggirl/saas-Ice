import Index from './index';
import HeaderAsideFooterResponsiveLayout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/entryQuery",
  childRoutes: [
    {
      path: 'detail/:id',
      component: Index.LoanDetails
    },
    {
      path: 'update/:id',
      component: Index.LoanModify
    }
  ],
  component: HeaderAsideFooterResponsiveLayout,
  indexRoute: {
    component: Index.EntryQuery
  }
}
