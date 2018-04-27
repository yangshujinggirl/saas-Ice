import OperateTypeConstant from '../constants/OperateTypeConstant'

/**
 * 列表的表头的基类，处理一些表头
 */
class BaseColumn {
    constructor() {
        this._columns = []; //列的数据
        this._defaultOperateColumn = { //默认的操作栏
            title: '操作',
            key: 'operation',
            checked: true,
            type: 'operation'
        };
        this.OPERATE_TYPE = OperateTypeConstant; //操作类型
    }

    
    getColumns(){
        return this._columns;
    }
}

export default BaseColumn;
