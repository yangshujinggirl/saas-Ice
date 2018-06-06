import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ReviewApproveActions from './actions/ReviewApproveAction.js'

const mapStateToProps = (state, ownProps) => {
  const data = state.ReviewApproveReducer;
  return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators(ReviewApproveActions, dispatch)
  }
}

const connentAnything = (obj) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(obj.default)
}

export default {
  path: "/reviewApprove/:typeId",
  name: '审查审批',
  childRoutes: [{
    path: 'add',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./ReviewApproveForm')));
      }, 'reviewapprove');
    }
  }, {
    path: 'edit/:id',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./ReviewApproveForm')));
      }, 'reviewapprove');
    }
  }, {
    path: 'detail/:id',
    name: '审查审批详情',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('./ReviewApproveDetail').default);
      }, 'reviewapprove');
    }
  }],
  component: Layout,
  indexRoute: {
    name: '进件审核',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('./ReviewApprove').default);
      }, 'reviewapprove');
    }
  }
}
