import React, {Component} from 'react'
import OperateTypeConstant from '../constants/OperateTypeConstant';

/**
 * 容器组件基类
 * 1. 定义列表的搜索条件
 * 2. 定义列表的行操作类型
 */
export default class BaseApp extends Component {
    constructor(props, store, action) {
        super(props);

        this._store = store;//flux store
        this._action = action;//flux action

        this._condition = {//列表的搜索条件
            page: 1,
            limit: 10
        };

        this.OPERATE_TYPE = OperateTypeConstant;
    }

    /**
     * 组件生命周期事件-加载完成
     * @return {[type]} [description]
     */
    componentDidMount() {
        
    }

    /**
     * 组件生命周期时间-组件将要移除
     * @return {[type]} [description]
     */
    componentWillUnmount() {
        
    }

}