import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as InterViewActions from './actions/InterViewAction.js'

const mapStateToProps = (state, ownProps) => {
  const data = state.InterViewReducer;
  return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators(InterViewActions, dispatch)
  }
}

const connentAnything = (obj) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(obj.default)
}

export default {
  path: '/interview',
  name: '面签管理',
  childRoutes: [{
      path: 'sign',
      name: '签字列表',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, require('./InterViewForm').default);
        }, 'interview');
      }
    }, {
      path: 'detail/:type/:id',
      name: '面签详情',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, connentAnything(require('./InterViewDetail')));
        }, 'interview');
      }
    },
    {
      path: 'interViewOnly',
      name: '信用卡面签列表',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, require('./InterViewOnly').default);
        }, 'interview');
      }
    }
  ],
  component: Layout,
  indexRoute: {
    name: '面签列表',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('./InterView').default);
      }, 'interview');
    }
  },
};
