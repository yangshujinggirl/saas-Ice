
/**
 * action的基类，主要处理curd的一些操作
 * 
 */
class BaseActions {

    /**
     * 构造函数
     * @param  {[type]} req 接口请求
     * @param  {[type]} dispatcher 分发器
     * @param  {[type]} constant 常量
     */
    constructor(req, dispatcher, constant) {
        this._req = req || {}; //接口
        this._dispatcher = dispatcher; //flux分发器
        this._constant = constant; //flux常量
        this.lastCondition = {}; //上次的搜索条件
        this.tick;
        this.tickNum = 0;
        this._hasFetch = false; //是否以抓取数据
    }

    /**
     * 重置数据
     */
    resetData() {
        this.dispatch({
            actionType: this._constant.RESET_DATA,
        });
    }

    /**
     * 点击用户头像
     * @return {[type]} [description]
     */
    handleAvatarClick() {
        this.dispatch({
            actionType: this._constant.TOGGLE_MENU_FUNC_DIALOG
        });
    }

}

export default BaseActions;
