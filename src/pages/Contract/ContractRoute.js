import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ContractActions from './actions/ContractAction.js'

const mapStateToProps = (state, ownProps) => {
    const data = state.ContractReducer;
    return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(ContractActions, dispatch)
    }
}

const connentAnything = (obj) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(obj.default)
}

export default {
  path: "/contract",
  name:'合同模板',
  childRoutes: [{
    path: 'add(/:id)',
    name:'合同新增',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./ContractAdd')));
      }, 'contract');
    }
  },{
    path: 'bind/:id',
    name:'合同绑定产品',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./ContractBind')));
      }, 'contract');
    }
  },{
    path: 'detail/:id',
    name:'合同详情',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./ContractDetail')));
      }, 'contract');
    }
  }],
  component: Layout,
  indexRoute: {
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./ContractList')));
      }, 'contract');
    }
  }
}
