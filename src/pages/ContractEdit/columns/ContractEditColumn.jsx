
import { BaseColumn } from 'base';

/**
 * 定义列表的表头
 */
class ContractEditColumn extends BaseColumn {

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
            title: '证件号码',
            dataIndex: 'documentCode',
            width: 160
        }, {
            title: '资方',
            dataIndex: 'capital',
            width: 120
        }, {
            title: '操作',
            dataIndex: 'visible',
            lock: 'right',
            width: 200,
            cell: (value, index, record) => {
                return (
                    <div>
                        <button className="editbtn" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.EDIT)}>
                            编辑
                        </button>
                        <button className="searchbtn" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.CANCEL)}>
                            取消
                        </button>
                        <button className="searchbtn" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.CHANGE)}>
                            改纸质
                        </button>
                    </div>
                    );
            }
        }]
    }
}

export default new ContractEditColumn().getColumns();
