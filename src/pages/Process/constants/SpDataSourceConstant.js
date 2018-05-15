import { Storage } from 'utils';

class SpDataSourceConstant {
  constructor() {

    this.dataSource = [];

    this.init();
  }

  init() {
    let userinfo = Storage.get('USERINFO');
    if (userinfo) {
      this.dataSource.push({
        label: '中国银行',
        value: '10086'
      });
      this.dataSource.push({
        label: '平安银行',
        value: '100'
      });
    }
  }
}


export default new SpDataSourceConstant().dataSource;