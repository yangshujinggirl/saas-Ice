import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ContractFileActions from './actions/ContractFileAction.js'

const mapStateToProps = (state, ownProps) => {
  const data = state.ContractFileReducer;
  return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators(ContractFileActions, dispatch)
  }
}

const connentAnything = (obj) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(obj.default)
}

export default {
  path: "/contractfile",
  name: '合同归档',
  childRoutes: [{
      path: 'detail/:id',
      name: '合同归档详情',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, require('./ContractFileDetail').default);
        }, 'contractfile');
      }
    },
    {
      path: 'downList/:id',
      name: '合同下载',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, require('./ContractFileDownLoad').default);
        }, 'contractfile');
      }
    }
  ],
  component: Layout,
  indexRoute: {
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('./ContractFileList').default);
      }, 'contractfile');
    }
  }
}
