/**
 * action的基类，主要处理curd的一些操作
 * 
 */
export default class BaseAction {

  /**
   * 构造函数
   * @param  {[type]} req 接口请求
   * @param  {[type]} dispatcher 分发器
   * @param  {[type]} constant 常量
   */
  constructor(req, dispatcher, constant) {
    this.Req = req || {}; //接口
    this.T = constant; //constant常量

    this.lastCondition = {}; //上次的搜索条件
    this.tick;
    this.tickNum = 0;
    this._hasFetch = false; //是否以抓取数据

    this._actions = {}; //定义通知给reducer的方法

    this._defaultKeys = [];//定义默认的
  }

  get actions() {
    return this._actions;
  }

  /**
   * 初始化
   * @return {[type]} [description]
   */
  init() {
    this.bindActions();
  }

  /**
   * 自动绑定定义的所有方法到actions上，包括默认定义的
   * @param  {[type]} key  [description]
   * @param  {[type]} func [description]
   * @return {[type]}      [description]
   */
  bindActions() {

    let arr = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    arr.map((item) => {
      if (item != 'constructor' && typeof this[item] == 'function') {
        this._actions[item] = this[item].bind(this);
      }
    });

    //追加默认定义的
    this._defaultKeys.map((item) => {
      if(typeof this._actions[item] == 'undefined' && typeof this[item] == 'function'){
        this._actions[item] = this[item].bind(this);
      }
    });
  }


  /**
   * 请求开始的通知
   */
  fetchStart(data = {}) {
    return {
      type: this.T.FETCH_START,
      ...data,
      time: Date.now()
    }
  }


  /**
   * 请求成功的通知
   * @param data 成功后的数据
   */
  fetchSuccess(data) {
    return {
      type: this.T.FETCH_SUCCESS,
      ...data,
      time: Date.now()
    }
  }

  /**
   * 请求失败后的通知
   * @param error 异常信息
   */
  fetchFailed(data = {}) {
    return {
      type: this.T.FETCH_FAILED,
      ...data,
      time: Date.now()
    }
  }

  change(data) {
    return {
      type: this.T.CHANGE,
      ...data,
      time: Date.now()
    }
  }

}
