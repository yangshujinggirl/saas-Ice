
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
    fetchFailed(error) {
      return {
        type: this.T.FETCH_FAILED,
        error,
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
