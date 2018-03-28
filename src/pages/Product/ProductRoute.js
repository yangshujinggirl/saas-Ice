import Product from './';
import Layout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/product",
  childRoutes: [
    {
      path: 'search',
      component: Product.ProductSearch
    },{
      path: 'searchedit/:id',
      component: Product.SearchEdit
    },{
      path: 'proddetail/:id',
      component: Product.ProductDetail
    },{
      path: 'add',
      component: Product.ProductAdd
    },{
      path: 'addone',
      component: Product.AddOne
    },{
      path: 'addtwo/:id',
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