
import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as DemoActions from './actions/DemoAction.js'

const mapStateToProps = (state, ownProps) => {
    const data = state.DemoReducer;
    return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(DemoActions, dispatch)
    }
}

const connentAnything = (obj) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(obj.default)
}

export default {
  path: "/demo",
  name: 'DEMO',
  childRoutes: [{
    path: 'add',
    name: '新增',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./DemoForm')));
      }, 'demo');
    }
  },{
    path: 'edit(/:id)',
    name: '编辑',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./DemoForm')));
      }, 'demo');
    }
  },{
    path: 'detail(/:id)',
    name: '详情',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./DemoDetail')));
      }, 'demo');
    }
  }],
  component: Layout,
  indexRoute: {
    name: '列表',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./Demo')));
      }, 'demo');
    }
  }
}