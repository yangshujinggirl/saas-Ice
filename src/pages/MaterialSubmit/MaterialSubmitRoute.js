import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as MaterialSubmitActions from './actions/MaterialSubmitAction.js'

const mapStateToProps = (state, ownProps) => {
  const data = state.MaterialSubmitReducer;
  return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators(MaterialSubmitActions, dispatch)
  }
}


const connentAnything = (obj) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(obj.default)
}

export default {
  path: "/MaterialSubmit(/:id)",
  name: '材料提交',
  childRoutes: [],
  component: Layout,
  indexRoute: {
    name: '材料提交',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('./MaterialSubmit').default);
      }, 'materialsubmit');
    }
  }
}
