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
const customAsideNavs = [];

import BaseConfig from './config/BaseConfig';
import { Storage } from './base/utils';
import myCustomNavs from './_navs';

let leafs = [];

if('PC_ENV' in window && PC_ENV.toLowerCase() == 'development' && BaseConfig.IS_AUTO_MENU_USED){
  //仅仅在开发环境且启用使用自动自动生成菜单
  leafs = myCustomNavs;
}


function transform(navs) {
  // custom logical
  return [...navs];
}

export const headerNavs = transform([
  ...autoGenHeaderNavs,
  ...customHeaderNavs,
]);

export const asideNavs = transform([...customAsideNavs, ...leafs]);
