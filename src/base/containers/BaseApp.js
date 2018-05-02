import React, {Component} from 'react'
import OperateTypeConstant from '../constants/OperateTypeConstant';

/**
 * 容器组件基类
 */
class BaseApp extends Component {
    constructor(props, store, action) {
        super(props);

        this._store = store;//flux store
        this._action = action;//flux action

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

export default BaseApp;