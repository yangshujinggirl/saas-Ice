import Font from './';
import HeaderAsideFooterResponsiveLayout from "../../layouts/HeaderAsideFooterResponsiveLayout";

export default {
  path: "/font",
  name: '业务配置',
  childRoutes: [{
    path: 'list',
    name: '字段配置新增',
    component: Font.fontConfig
  },{
    path: 'add',
    name: '字段配置新增',
    component: Font.addFont
  },{
    path: 'set/:id',
    name: '字段配置新增',
    component: Font.setFont
  },{
    path: 'view',
    name: '字段配置详情',
    component: Font.setFontView
  }],
  component: HeaderAsideFooterResponsiveLayout,
  indexRoute: {
    name: '页面配置',
    component: Font.fontConfig
  }
}