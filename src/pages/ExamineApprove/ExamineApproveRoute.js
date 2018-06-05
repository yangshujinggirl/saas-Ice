import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ExamineApproveActions from './actions/ExamineApproveAction.js'

const mapStateToProps = (state, ownProps) => {
  const data = state.ExamineApproveReducer;
  return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators(ExamineApproveActions, dispatch)
  }
}

const connentAnything = (obj) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(obj.default)
}

export default {
  path: "/examineapprove",
  name: '进件审查审批',
  childRoutes: [{
      path: 'detail/:proInstId/:loanId',
      name: '进件审查审批',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, connentAnything(require('./ExamineApprove')));
        }, 'examineapprove');
      }
    },
    {
      path: 'check/authority',
      name: '查看权限配置详情',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, connentAnything(require('./CheckAuthority')));
        }, 'examineapprove');
      }
    },
    {
      path: 'check/essential',
      name: '查看必要字详情',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, connentAnything(require('./CheckEssential')));
        }, 'examineapprove');
      }
    }
  ],
  component: Layout,
  indexRoute: {
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./ExamineAudit')));
      }, 'examineapprove');
    }
  }
}
