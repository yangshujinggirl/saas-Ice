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
      component: Product.ProductDetail
    }, {
      path: 'add',
      name: '产品新增',
      component: Product.ProductAdd
    }, {
      path: 'addone',
      component: Product.AddOne
    }, {
      path: 'addtwo/:id',
      component: Product.AddTwo
    }, {
      path: 'filelist',
      name: '材料清单',
      component: Product.FileList
    }, {
      path: 'fileedit/:id',
      name: '材料编辑',
      component: Product.FileEdit
    },

  ],
  component: Layout,
  indexRoute: {
    component: Product.Product
  }
}
