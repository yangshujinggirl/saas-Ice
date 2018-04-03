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

import { Storage } from './base/utils';
import myCustomNavs from './_navs';

let leafs = Storage.get('MENUS') || [];

leafs = [];

function transform(navs) {
  // custom logical
  return [...navs];
}

export const headerNavs = transform([
  ...autoGenHeaderNavs,
  ...customHeaderNavs,
]);

export const asideNavs = transform([...customAsideNavs, ...myCustomNavs, ...leafs]);
