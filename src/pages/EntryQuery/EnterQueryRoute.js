import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as EntryQueryActions from './actions/EntryQueryAction.js'

const mapStateToProps = (state, ownProps) => {
  const data = state.EntryQueryReducer;
  return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators(EntryQueryActions, dispatch)
  }
}

const connentAnything = (obj) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(obj.default)
}

export default {
  path: "/entryQuery",
  name: '贷款管理',
  childRoutes: [{
      path: 'detail/:id',
      name: '车贷申请详情',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, connentAnything(require('./LoanDetails')));
        }, 'enterquery');
      }
    },
    {
      path: 'update/:id',
      name: '车贷申请',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, connentAnything(require('./LoanModify')));
        }, 'enterquery');
      }
    },
    {
      path: 'loanApplication/:id',
      name: '车贷申请',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, connentAnything(require('./LoanApplication')));
        }, 'enterquery');
      }
    },
    {
      path: 'loanApplicationOne(/:id)',
      name: '车贷申请',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, connentAnything(require('./LoanApplicationOne')));
        }, 'enterquery');
      }
    }
  ],
  component: Layout,
  indexRoute: {
    name: '车贷查询',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./EntryQuery')));
      }, 'enterquery');
    }
  }
}
