
import { BaseColumn } from 'base';

/**
 * 定义列表的表头
 */
class ContractFileColumn extends BaseColumn {

    constructor() {
        super();

        this._columns = [{
            title: '贷款编号',
            dataIndex: 'loanNo',
            width: 120
        }, {
            title: '合同编号',
            dataIndex: 'contractNo',
            width: 120
        }, {
            title: '姓名',
            dataIndex: 'name',
            width: 100
        }, {
            title: '证件类型',
            dataIndex: 'documentType',
            width: 100
        }, {
            title: '证件号码',
            dataIndex: 'documentCode',
            width: 160
        }, {
            title: '合同类型',
            dataIndex: 'type',
            width: 120
        }, {
            title: '状态',
            dataIndex: 'status',
            width: 120
        }, {
            title: '操作',
            dataIndex: 'visible',
            lock: 'right',
            width: 200,
            cell: (value, index, record) => {
                return (
                    <div>
                        <button className="editbtn" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.VIEW)}>
                            详情
                        </button>
                        <button className="editbtn" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.CANCEL)}>
                            作废
                        </button>
                        <button className="editbtn" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.SIGN)}>
                            签字
                        </button>
                        <button className="searchbtn" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.CHANGE)}>
                            改电子
                        </button>
                    </div>
                    );
            }
        }]
    }
}

export default new ContractFileColumn().getColumns();
