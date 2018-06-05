import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as LoanApplicationActions from './actions/LoanApplicationAction.js'

const mapStateToProps = (state, ownProps) => {
  const data = state.LoanApplicationReducer;
  return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators(LoanApplicationActions, dispatch)
  }
}


const connentAnything = (obj) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(obj.default)
}

export default {
  path: "/loanapplication/fixed(/:id)",
  name: '贷款管理',
  childRoutes: [],
  component: Layout,
  indexRoute: {
    name: "车贷申请",
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./LoanApplicationFixed')));
      }, 'loanapplication');
    }
  }
}
