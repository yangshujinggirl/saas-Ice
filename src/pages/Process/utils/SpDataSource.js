import { Storage } from 'utils';

/**
 * 资方下拉框数据
 * 1. 读取本地存储的用户所属资方
 * 2. 设置默认第一个值
 */
class SpDataSource {
  constructor() {

    this.dataSource = [];//数据源
    this.defaultValue = null;//默认值
    this.defaultLabel = null;//默认值label

    this.init();
  }

  init() {
    let userinfo = Storage.get('USERINFO');
    // TODO 加入资方的key
    if (userinfo) {
      this.dataSource.push({
        label: '中国银行',
        value: '10086'
      });
      this.dataSource.push({
        label: '平安银行',
        value: '100'
      });

      this.defaultValue = this.dataSource[0].value;
      this.defaultLabel = this.dataSource[0].label;
    }
  }
}


export default new SpDataSource();