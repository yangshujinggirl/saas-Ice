
import { BaseColumn } from 'base';

/**
 * 定义列表的表头
 */
class [MODULE]Column extends BaseColumn {

    constructor() {
        super();

        this._columns = [{
            title: '业务类型',
            dataIndex: 'productCode',
            width: 160
        }, {
            title: '流程名称',
            dataIndex: 'name',
            width: 200
        }, {
            title: '资方',
            dataIndex: 'contractDisplayName',
            width: 160
        }, {
            title: '产品类型',
            dataIndex: 'productType',
            width: 160
        }, {
            title: '产品名称',
            dataIndex: 'endedAt',
            width: 250
        }, {
            title: '最后修改时间',
            dataIndex: 'commissionRate',
            width: 120
        }, {
            title: '操作',
            dataIndex: 'visible',
            lock: 'right',
            width: 140,
            cell: (value, index, record) => {
                return (
                    <div>
                        <button className="editbtn" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.EDIT)}>
                            编辑
                        </button>
                        <button className="searchbtn" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.VIEW)}>
                            查看
                        </button>
                    </div>
                    );
            }
        }]
    }
}

export default new [MODULE]Column().getColumns();
