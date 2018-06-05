import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ProductActions from './actions/ProductAction.js'

const mapStateToProps = (state, ownProps) => {
  const data = state.ProductReducer;
  return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators(ProductActions, dispatch)
  }
}

const connentAnything = (obj) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(obj.default)
}

export default {
  path: "/product",
  name: '产品管理',
  childRoutes: [{
      path: 'search',
      name: '产品查询',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, connentAnything(require('./containers/Product')));
        }, 'product');
      }
    }, {
      path: 'searchedit/:id',
      name: '产品编辑',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, connentAnything(require('./components/ProdSearch/SearchEdit')));
        }, 'product');
      }
    }, {
      path: 'proddetail/:id',
      name: '产品详情',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, connentAnything(require('./components/ProdSearch/ProdDetail')));
        }, 'product');
      }
    }, {
      path: 'add',
      name: '产品新增',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, connentAnything(require('./ProdAdd')));
        }, 'product');
      }
    }, {
      path: 'addtwo/:id',
      name: '产品新增',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, connentAnything(require('./components/ProdAdd/addTwo')));
        }, 'product');
      }
    }, {
      path: 'process/:id',
      name: '权限编辑',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, connentAnything(require('./components/ProdAdd/ProcessAuthEdit')));
        }, 'product');
      }
    }, {
      path: 'addthree/:id',
      name: '产品新增',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, connentAnything(require('./components/ProdAdd/addThree')));
        }, 'product');
      }
    }, {
      path: 'filelist',
      name: '材料查询',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, connentAnything(require('./components/FileList')));
        }, 'product');
      }
    }, {
      path: 'fileedit/:id',
      name: '材料编辑',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, connentAnything(require('./components/FileList/Dialog')));
        }, 'product');
      }
    }, {
      path: 'fileListnew',
      name: '材料新增',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, connentAnything(require('./components/FileList/Dialog')));
        }, 'product');
      }
    },

  ],
  component: Layout,
  indexRoute: {
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, connentAnything(require('./containers/Product')));
      }, 'product');
    }
  }
}
