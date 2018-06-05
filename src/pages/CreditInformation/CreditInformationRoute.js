import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as CreditInformationActions from './actions/CreditInformationAction.js'

const mapStateToProps = (state, ownProps) => {
  const data = state.CreditInformationReducer;
  return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators(CreditInformationActions, dispatch)
  }
}


const connentAnything = (obj) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(obj.default)
}

export default {
  path: "/creditinformation",
  name: '审查审批',
  childRoutes: [{
    path: 'add/:id',
    name: '征信录入',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./containers/CreditInformationForm')));
      }, 'creditinformation');
    }
  }, {
    path: 'detail/:id',
    name: '进件审查详情',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./containers/CreditInformationDetail')));
      }, 'creditinformation');
    }
  }],
  component: Layout,
  indexRoute: {
    name: '进件审核',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./containers/CreditInformation')));
      }, 'creditinformation');
    }
  }
}
