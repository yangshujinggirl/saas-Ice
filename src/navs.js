// <!-- auto generated navs start -->
const autoGenHeaderNavs = [];
const autoGenAsideNavs = [
  {
    text: 'entry-query',
    to: '/enntryManagement/entryQuery',
    icon: 'nav-list',
  },
  { text: 'test', to: '/test', icon: 'nav-list' },
  {
    text: 'loan-application',
    to: '/loanManagement/LoanApplication',
    icon: 'nav-list',
  },
];

// <!-- auto generated navs end -->

const customHeaderNavs = [
  {
    text: '我的工作台',
    to: '/',
    external: true,
    newWindow: true,
  },
  {
    text: '消息',
    to: '/',
    external: true,
    newWindow: true,
  },
  {
    text: '支持',
    to: '/',
    external: true,
    newWindow: true,
  },
];
const customAsideNavs = [
  {
    text: '产品管理',
    to: '/product',
    icon: 'chart1',
    children: [
      {
        text: '产品查询',
        to: '/product/search',
        children:[]
      },
      {
        text: '新增产品',
        to: '/product/add',
        children:[]
      },
      {
        text: '资料清单',
        to: '/product/filelist',
        children:[]
      },
    ],
  },
  {
    text: '业务配置',
    to: '/font',
    icon: 'chart1',
    children: [
      {
        text: '字段配置',
        to: '/font/config',
      },
      {
        text: '流程配置',
        to: '',
      },
    ],
  },
  {
    text: '贷款管理',
    to: '/loanManagement',
    icon: 'chart1',
    children: [
      {
        text: '车贷申请',
        to: '/loanManagement/LoanApplication',
      },
      {
        text: '车贷查询',
        to: '/entryQuery',
      },
    ],
  },
  {
    text: '表格页',
    to: '/table',
    icon: 'table',
    children: [
      {
        text: '基础表格',
        to: '/table/basic-table',
      },
      {
        text: '常用竖向表格',
        to: '/table/table-display',
      },
    ],
  },
  {
    text: '列表页',
    to: '/list',
    icon: 'ul-list',
    children: [
      {
        text: '搜索列表',
        to: '/list/article-list',
      },
      {
        text: '卡片列表',
        to: '/list/card-list',
      },
    ],
  },
  {
    text: '内容页',
    to: '/portlets',
    icon: 'publish',
    children: [
      {
        text: '基础详情页',
        to: '/portlets/base',
      },
      {
        text: '条款协议页',
        to: '/portlets/terms',
      },
    ],
  },
  {
    text: '结果页',
    to: '/result',
    icon: 'result',
    children: [
      {
        text: '成功',
        to: '/result/success',
      },
      {
        text: '失败',
        to: '/result/fail',
      },
    ],
  },
  {
    text: '异常页',
    to: '/exception',
    icon: 'gaojingxinxi',
    children: [
      {
        text: '204',
        to: '/exception/204',
      },
      {
        text: '403',
        to: '/exception/403',
      },
      {
        text: '404',
        to: '/exception/404',
      },
      {
        text: '500',
        to: '/exception/500',
      },
    ],
  },
];

function transform(navs) {
  // custom logical
  return [...navs];
}

export const headerNavs = transform([
  ...autoGenHeaderNavs,
  ...customHeaderNavs,
]);

export const asideNavs = transform([ ...customAsideNavs]);
