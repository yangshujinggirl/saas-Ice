import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ContractEditActions from './actions/ContractEditAction.js'

const mapStateToProps = (state, ownProps) => {
  const data = state.ContractEditReducer;
  return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators(ContractEditActions, dispatch)
  }
}

const connentAnything = (obj) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(obj.default)
}

export default {
  path: "/contractedit",
  name: '合同编辑',
  childRoutes: [{
    path: 'edit/:id',
    name: '合同编辑',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('./ContractEdit').default);
      }, 'contractedit');
    }
  }],
  component: Layout,
  indexRoute: {
    name: '待编辑列表',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('./ContractEditList').default);
      }, 'contractedit');
    }
  }
}
