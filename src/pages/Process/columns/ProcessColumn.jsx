
import { BaseColumn } from 'base';

/**
 * 定义列表的表头
 */
class ProcessColumn extends BaseColumn {

    constructor() {
        super();

        this._columns = [{
            title: 'ID',
            dataIndex: 'id',
            width: 80
        }, {
            title: '业务类型',
            dataIndex: 'businessTypeName',
            width: 140
        }, {
            title: '流程名称',
            dataIndex: 'processName',
            width: 200
        }, {
            title: '资方',
            dataIndex: 'tenantName',
            width: 140
        }, {
            title: '状态',
            dataIndex: 'status',
            width: 100,
            cell: (value, index, record) =>{
                return record.status == '1' ? '已完成' : '未完成';
            }
        }, {
            title: '最后修改时间',
            dataIndex: 'updatedAt',
            width: 140
        }, {
            title: '操作',
            dataIndex: 'visible',
            lock: 'right',
            width: 180,
            cell: (value, index, record) => {

                let editdom, productdom;
                if(record.status == '1'){
                    //完成显示产品按钮，否则显示修改按钮
                    productdom = 
                        <a href="javascript:;" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.OTHER)}>
                            产品
                        </a>
                }
                if(!record.bindProduct || record.bindProduct < 1){
                    // 绑定了产品则不能显示修改按钮
                    editdom = 
                        <a href="javascript:;" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.EDIT)}>
                            修改
                        </a>
                }
                return (
                    <div className="pch-table-operation">
                        <a href="javascript:;" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.VIEW)}>
                            详情
                        </a>
                        {editdom}
                        {productdom}
                        <a href="javascript:;" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.OTHER1)}>
                            复制
                        </a>
                    </div>
                    );
            }
        }]
    }
}

export default new ProcessColumn().getColumns();
