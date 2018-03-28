// <!-- auto generated navs start -->
const autoGenHeaderNavs = [];
const autoGenAsideNavs = [{
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

const customHeaderNavs = [];
const customAsideNavs = [{
    value: {
      icon: "&#xe643;",
      id: 13,
      name: "产品管理",
      value: "/product"
    },
    leaf: [{

        value: {
          icon: "&#xe643;",
          id: 13,
          name: "产品查询",
          value: "/product/search"
        },
        leaf: []
      },
      {
        value: {
          icon: "&#xe643;",
          id: 13,
          name: "新增产品",
          value: "/product/add"
        },
        leaf: []
      },
      {
        value: {
          icon: "&#xe643;",
          id: 13,
          name: "资料清单",
          value: "/product/filelist"
        },
        leaf: []
      }
    ]
  },
  {
    value: {
      icon: "&#xe643;",
      id: 13,
      name: "业务配置",
      value: "/font"
    },
    leaf: [{
        value: {
          icon: "&#xe643;",
          id: 13,
          name: "字段配置",
          value: "/font/config"
        },
        leaf: []
      },
      {
        value: {
          icon: "&#xe643;",
          id: 13,
          name: "流程配置",
          value: "/font/config1"
        },
        leaf: []
      },
    ],
  }
];

import { Storage } from './base/utils';

let leafs = Storage.get('MENUS') || [];

function transform(navs) {
  // custom logical
  return [...navs];
}

export const headerNavs = transform([
  ...autoGenHeaderNavs,
  ...customHeaderNavs,
]);

export const asideNavs = transform([...customAsideNavs, ...leafs]);
