import ReviewApprove from './';
import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/reviewApprove",
  childRoutes: [{
    path: 'add',
    component: ReviewApprove.ReviewApproveForm
  },{
    path: 'edit/:id',
    component: ReviewApprove.ReviewApproveForm
  },{
    path: 'detail/:loanId/:proInstId/:taskId',
    component: ReviewApprove.ReviewApproveDetail,
    name :'审查审批详情'
  }],
  component: Layout,
  indexRoute: {
    component: ReviewApprove.ReviewApprove,
    name:'进件审查审批'
  }
}
