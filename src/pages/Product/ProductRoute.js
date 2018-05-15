import Product from './';
import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/product",
  name: '产品管理',
  childRoutes: [{
      path: 'search',
      name: '产品查询',
      component: Product.ProductSearch
    }, {
      path: 'searchedit/:id',
      name: '产品编辑',
      component: Product.SearchEdit
    }, {
      path: 'proddetail/:id',
      name: '产品详情',
      component: Product.ProductDetail
    }, {
      path: 'add',
      name: '产品新增',
      component: Product.ProductAdd
    },  {
      path: 'addtwo/:id',
      name: '产品新增',
      component: Product.AddTwo
    }, {
      path: 'addthree/:id',
      name: '产品新增',
      component: Product.AddThree
    },{
      path: 'addprocess/:id',
      name: '流程配置',
      component: Product.AddProcess
    },{
      path: 'filelist',
      name: '材料查询',
      component: Product.FileList
    }, {
      path: 'fileedit/:id',
      name: '材料编辑',
      component: Product.FileEdit
    },{
      path: 'fileListnew',
      name: '材料新增',
      component: Product.FileEdit
    },

  ],
  component: Layout,
  indexRoute: {
    component: Product.ProductSearch
  }
}
