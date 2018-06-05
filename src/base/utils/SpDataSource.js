import Storage from './Storage';

/**
 * 资方下拉框数据
 * 1. 读取本地存储的用户所属资方
 * 2. 设置默认第一个值
 */
class SpDataSource {
  constructor() {

    this.dataSource = []; //数据源
    this.defaultValue = null; //默认值
    this.defaultLabel = null; //默认值label
    this.hasFind = false;
    this.inte = null;
    this.maxCount = 10;
    this.currentCount = 0;

    this.init();
  }

  init() {
    // 因为异步接口获取的用户数据，这里设置多次去取值
    this.inte = setInterval(() => {
      if (this.hasFind || this.currentCount > this.maxCount) {
        this.inte && clearInterval(this.inte);
        return;
      }
      this.getData();
      this.currentCount++;
    }, 500)
  }

  getData() {
    let userinfo = Storage.get('USERINFO');
    // ownerId 资方ID
    // organizationName 资方名称
    if (userinfo && userinfo.identity) {
      this.dataSource.push({
        label: userinfo.identity.organizationName,
        value: userinfo.identity.ownerId.toString()
      });

      this.defaultValue = this.dataSource[0].value;
      this.defaultLabel = this.dataSource[0].label;

      this.hasFind = true;
    }

  }
}


export default new SpDataSource();
