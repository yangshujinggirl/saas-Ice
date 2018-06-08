import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/product",
  name: '产品管理',
  childRoutes: [{
      path: 'search',
      name: '产品查询',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, require('./containers/Product').default);
        }, 'product');
      }
    }, {
      path: 'searchedit/:id',
      name: '产品编辑',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, require('./components/ProdSearch/SearchEdit').default);
        }, 'product');
      }
    }, {
      path: 'proddetail/:id',
      name: '产品详情',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, require('./components/ProdSearch/ProdDetail').default);
        }, 'product');
      }
    }, {
      path: 'add',
      name: '产品新增',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, require('./ProdAdd').default);
        }, 'product');
      }
    }, {
      path: 'addtwo/:id',
      name: '产品新增',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, require('./components/ProdAdd/addTwo').default);
        }, 'product');
      }
    }, {
      path: 'process/:id',
      name: '权限编辑',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, require('./components/ProdAdd/ProcessAuthEdit').default);
        }, 'product');
      }
    }, {
      path: 'addthree/:id',
      name: '产品新增',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, require('./components/ProdAdd/addThree').default);
        }, 'product');
      }
    }, {
      path: 'filelist',
      name: '材料查询',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, require('./components/FileList').default);
        }, 'product');
      }
    }, {
      path: 'fileedit/:id',
      name: '材料编辑',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, require('./components/FileList/Dialog').default);
        }, 'product');
      }
    }, {
      path: 'fileListnew',
      name: '材料新增',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, require('./components/FileList/Dialog').default);
        }, 'product');
      }
    },

  ],
  component: Layout,
  indexRoute: {
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('./containers/Product').default);
      }, 'product');
    }
  }
}
