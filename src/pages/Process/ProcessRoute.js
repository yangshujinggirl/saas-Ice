// import Process from './';
import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

// import Process from './containers/Process'
// import ProcessForm from './containers/ProcessForm'
// import ProcessDetail from './containers/ProcessDetail'
// import ProcessConfig from './containers/ProcessConfig'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import * as ProcessActions from './actions/ProcessAction.js'
import ProcessActions from './actions/ProcessAction_.js'

// console.log(ProcessActions);

const mapStateToProps = (state, ownProps) => {
    const data = state.ProcessReducer;
    return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(ProcessActions, dispatch)
    }
}

// let ProcessObj = connect(
//     mapStateToProps,
//     mapDispatchToProps
// // )(Process);
// )(require('./containers/Process').default);

let ProcessFormObj = connect(
    mapStateToProps,
    mapDispatchToProps
// )(ProcessForm);
)(require('./containers/ProcessForm').default);

let ProcessDetailObj = connect(
    mapStateToProps,
    mapDispatchToProps
// )(ProcessDetail);
)(require('./containers/ProcessDetail').default);

let ProcessConfigObj = connect(
    mapStateToProps,
    mapDispatchToProps
// )(ProcessConfig);
)(require('./containers/ProcessConfig').default);


let Process = {
  // Process: ProcessObj,
  ProcessForm: ProcessFormObj,
    ProcessDetail: ProcessDetailObj,
    ProcessConfig:ProcessConfigObj
}

export default {
  path: "/process",
  name: "流程配置",
  childRoutes: [{
    path: 'add',
    name: '流程新增',
    // component: Process.ProcessForm,
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, Process.ProcessForm);
      },'process');
    }
  }, {
    path: 'edit/:id(/:copy)',
    name: '流程修改',
    // component: Process.ProcessForm,
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, Process.ProcessForm);
      },'process');
    }
  }, {
    path: 'detail/:id',
    name: '流程详情',
    // component: Process.ProcessDetail,
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, Process.ProcessDetail);
      },'process');
    }
  }, {
    path: 'config/:id',
    name: '流程配置产品',
    // component: Process.ProcessConfig,
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, Process.ProcessConfig);
      },'process');
    }
  }],
  component: Layout,
  indexRoute: {
    name: '流程查询',
    // component: Process.Process,
    getComponent(nextState, callback) {
      require.ensure([], require => {
        // callback(null, Process.Process);
        callback(null, require('./containers/Process').default);
      },'process');
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
