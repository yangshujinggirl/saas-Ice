import ReviewApprove from './';
import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/reviewApprove/:id",
  childRoutes: [{
    path: 'add',
    component: ReviewApprove.ReviewApproveForm
  },{
    path: 'edit/:id',
    component: ReviewApprove.ReviewApproveForm
  },{
    path: 'detail/:id/:proInstId/:taskId',
    component: ReviewApprove.ReviewApproveDetail,
    name :'审查审批详情'
  }],
  component: Layout,
  indexRoute: {
    component: ReviewApprove.ReviewApprove,
    name:'进件审查审批'
  }
}
