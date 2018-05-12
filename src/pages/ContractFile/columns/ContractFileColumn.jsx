
import { BaseColumn } from 'base';
import { Button } from "@icedesign/base";

/**
 * 定义列表的表头
 */
 const typeTrans = {
   1:'电子',
   2:'纸质'
 }
 const statusTrans = {
   1:'待确认',
   2:'已取消',
   3:'已退回',
   4:'已作废',
   5:'已签字'
 }
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
            title: '客户姓名',
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
            width: 120,
            cell:(value, index, record)=> {
              return typeTrans[record.type]
            }
        }, {
            title: '合同时间',
            dataIndex: 'contractTime',
            width: 160
        }, {
            title: '资方',
            dataIndex: 'capital',
            width: 120
        }, {
            title: '产品类型',
            dataIndex: 'productType',
            width: 120
        }, {
            title: '产品名称',
            dataIndex: 'productName',
            width: 120
        }, {
            title: '客户经理',
            dataIndex: 'customerManagerName',
            width: 120
        }, {
            title: '状态',
            dataIndex: 'status',
            width: 120,
            cell:(value, index, record)=> {
              return statusTrans[record.status]
            }
        }, {
            title: '操作',
            dataIndex: 'visible',
            lock: 'right',
            width: 240,
            cell: (value, index, record) => {
                return (
                    <div className="contract-handle-btn-list-wrap">
                        <Button type="secondary" shape="text" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.VIEW)}>
                            详情
                        </Button>
                        {
                          record.status != 2 &&
                          record.status != 4 && <Button
                                                  type="secondary"
                                                  shape="text"
                                                  onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.CANCEL)}>
                                                    作废
                                                </Button>

                        }

                        {
                          record.type == 2 &&
                          record.status !=5 && <Button
                                                  type="secondary"
                                                  shape="text"
                                                  onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.SIGN)}>
                                                    签字
                                                </Button>
                        }
                        {
                          record.type == 2 &&
                          record.status !=5 && <Button
                                                type="secondary"
                                                shape="text"
                                                onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.CHANGE)}>
                                                  改电子
                                               </Button>
                        }
                        {
                          record.status ==5 && <Button
                                                type="secondary"
                                                shape="text"
                                                onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.ONLOAD)}>
                                                  下载
                                               </Button>
                        }
                    </div>
                    );
            }
        }]
    }
}

export default new ContractFileColumn().getColumns();
