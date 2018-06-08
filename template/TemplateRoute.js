import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/[ROUTERPATH]",
  childRoutes: [{
    path: 'add',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('./containers/[MODULE]Form').default);
      }, 'process');
    }
  },{
    path: 'edit/:id',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('./containers/[MODULE]Form').default);
      }, 'process');
    }
  },{
    path: 'detail/:id',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('./containers/[MODULE]Detail').default);
      }, 'process');
    }
  }],
  component: Layout,
  indexRoute: {
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('./containers/[MODULE]').default);
      }, 'process');
    }
  }
}