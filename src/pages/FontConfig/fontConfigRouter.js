import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as FontConfigActions from './actions/FontConfigAction.js'

const mapStateToProps = (state, ownProps) => {
  const data = state.FontConfigReducer;
  return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators(FontConfigActions, dispatch)
  }
}

const connentAnything = (obj) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(obj.default)
}

export default {
  path: "/font",
  name: '业务配置',
  childRoutes: [{
    path: 'list',
    name: '字段配置新增',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./FontConfig')));
      }, 'font');
    }
  }, {
    path: 'add',
    name: '字段配置新增',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./AddFont')));
      }, 'font');
    }
  }, {
    path: 'set/:id',
    name: '字段配置新增',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./SetFont')));
      }, 'font');
    }
  }, {
    path: 'view/:id',
    name: '字段配置详情',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./SetFontView')));
      }, 'font');
    }
  }],
  component: Layout,
  indexRoute: {
    name: '页面配置',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./FontConfig')));
      }, 'font');
    }
  }
}
