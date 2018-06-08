import Layout from "../../layouts/BlankLayout";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AccountActions from './actions/AccountAction.js'

const mapStateToProps = (state, ownProps) => {
    const data = state.AccountReducer;
    return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(AccountActions, dispatch)
    }
}

const connentAnything = (obj) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(obj.default)
}

export default {
  path: "/account(/:from)",
  component: Layout,
  indexRoute: {
    // component: Account.Account,
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./Account')));
      }, 'account');
    }
  }
}