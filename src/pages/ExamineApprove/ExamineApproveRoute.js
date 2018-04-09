import ExamineApprove from './';
import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/examineapprove",
  name:'审查审批',
  childRoutes: [{
    path: 'audit',
    name:'进件审核',
    component: ExamineApprove.ExamineAudit
  }],
  component: Layout,
  indexRoute: {
    name:'审查审批',
    component: ExamineApprove.ExamineApprove
  }
}
