import Product from './';
import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/product",
  childRoutes: [
    {
      path: 'search',
      component: Product.ProductSearch
    },{
      path: 'edit/:id',
      component: Product.SearchEdit
    },{
      path: 'detail/:id',
      component: Product.ProductDetail
    },{
      path: 'add',
      component: Product.ProductAdd
    },{
      path: 'addone',
      component: Product.AddOne
    },{
      path: 'addtwo',
      component: Product.AddTwo
    },{
      path: 'filelist',
      component: Product.FileList
    },
  
  ],
  component: Layout,
  indexRoute: {
    component: Product.Product
  }
}