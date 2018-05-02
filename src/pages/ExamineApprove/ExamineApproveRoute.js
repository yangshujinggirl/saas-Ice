import ExamineApprove from './';
import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/examineapprove",
  name:'进件审查审批',
  childRoutes: [
    {
      path: 'detail/:proInstId/:loanId',
      name: '进件审查审批',
      component: ExamineApprove.ExamineApprove
    },
    {
      path: 'check/authority',
      name: '查看权限配置详情',
      component: ExamineApprove.CheckAuthority
    },
    {
      path: 'check/essential',
      name: '查看必要字详情',
      component: ExamineApprove.CheckEssential
    }
  ],
  component: Layout,
  indexRoute: {
    component: ExamineApprove.ExamineAudit
  }
}
