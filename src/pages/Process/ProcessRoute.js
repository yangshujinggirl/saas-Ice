import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ProcessActions from './actions/ProcessAction_.js'

const mapStateToProps = (state, ownProps) => {
  const data = state.ProcessReducer;
  return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators(ProcessActions, dispatch)
  }
}

const connentAnything = (obj) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(obj.default)
}

export default {
  path: "/process",
  name: "流程配置",
  childRoutes: [{
    path: 'add',
    name: '流程新增',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./containers/ProcessForm')));
      }, 'process');
    }
  }, {
    path: 'edit/:id(/:copy)',
    name: '流程修改',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./containers/ProcessForm')));
      }, 'process');
    }
  }, {
    path: 'detail/:id',
    name: '流程详情',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./containers/ProcessDetail')));
      }, 'process');
    }
  }, {
    path: 'config/:id',
    name: '流程配置产品',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./containers/ProcessConfig')));
      }, 'process');
    }
  }],
  component: Layout,
  indexRoute: {
    name: '流程查询',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./containers/Process')));
      }, 'process');
    }
  }
}

// import Process from './';
// import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

// export default {
//   path: "/process",
//   name:"流程配置",
//   childRoutes: [{
//     path: 'add',
//     name:'流程新增',
//     component: Process.ProcessForm
//   },{
//     path: 'edit/:id(/:copy)',
//     name:'流程修改',
//     component: Process.ProcessForm
//   },{
//     path: 'detail/:id',
//     name:'流程详情',
//     component: Process.ProcessDetail
//   },{
//     path: 'config/:id',
//     name:'流程配置产品',
//     component:Process.ProcessConfig
//   }],
//   component: Layout,
//   indexRoute: {
//     component: Process.Process,
//     name: '流程查询'
//   }
// }
