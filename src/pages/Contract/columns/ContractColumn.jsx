
import { BaseColumn } from 'base';

/**
 * 定义列表的表头
 */
class ContractColumn extends BaseColumn {

    constructor() {
        super();

        this._columns = [{
            title: '模板编号',
            dataIndex: 'templateCode',
            width: 100
        }, {
            title: '模板名称',
            dataIndex: 'templateName',
            width: 160
        }, {
            title: '模板类型',
            dataIndex: 'templateType',
            width: 160
        }, {
            title: '状态',
            dataIndex: 'visible',
            width: 120,
            cell: (value, index, record) => {
                return (
                  <button className="editbtn" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.SWITCH)}>
                      {record.status == 1?'启用':'停用'}
                  </button>
                    );
            }
        }, {
            title: '操作',
            dataIndex: 'visible',
            lock: 'right',
            width: 200,
            cell: (value, index, record) => {
                return (
                    <div>
                        <button className="editbtn" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.CHANGE)}>
                            修改
                        </button>
                        <button className="searchbtn" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.VIEW)}>
                            详情
                        </button>
                        <button className="searchbtn" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.REMOVE)}>
                            删除
                        </button>
                        <button className="searchbtn" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.BIND)}>
                            产品
                        </button>
                        <button className="searchbtn" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.VIEW)}>
                            复制
                        </button>
                    </div>
                    );
            }
        }]
    }
}

export default new ContractColumn().getColumns();
