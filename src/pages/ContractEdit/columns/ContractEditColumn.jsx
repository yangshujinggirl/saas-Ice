
import { BaseColumn } from 'base';

/**
 * 定义列表的表头
 */
 const typeTrans = {
   1:'电子',
   2:'纸质'
 }
 const statusTrans = {
   1:'待确认',
   6:'签署中',
 }
 const cardTrans = {
   1:'身份证',
   2:'港澳通行证',
   3:'军官证',
   4:'护照',
   5:'台湾通行证',
   6:'其他',
 }
 const productTypeTrans = {
   NEW_CAR_LOAN:'新车贷款',
   NEW_CAR_RENTAL:'新车租赁',
   SECONDHAND_CAR_LOAN:'二手车贷款',
   SECONDHAND_CAR_RENTAL:'二手车租赁',
   CAR_MORTGAGE_LOAN:'汽车抵押贷款',
   CONSUMER_LOAN:'消费贷款',
 }
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
            title: '客户姓名',
            dataIndex: 'name',
            width: 100
        }, {
            title: '证件类型',
            dataIndex: 'cardType',
            width: 160,
            cell:(value, index, record)=> {
              return cardTrans[record.cardType]
            }
        }, {
            title: '证件号码',
            dataIndex: 'cardNo',
            width: 160
        }, {
            title: '手机号',
            dataIndex: 'phone',
            width: 160
        }, {
            title: '合同时间',
            dataIndex: 'contractTime',
            width: 160
        }, {
            title: '状态',
            dataIndex: 'visible',
            width: 120,
            cell:(value, index, record)=> {
              return statusTrans[record.status]
            }
        }, {
            title: '资方',
            dataIndex: 'capital',
            width: 120
        }, {
            title: '产品类型',
            dataIndex: 'productType',
            width: 120,
            cell:(value, index, record) => {
              return productTypeTrans[record.productType]
            }
        }, {
            title: '产品名称',
            dataIndex: 'productName',
            width: 120
        }, {
            title: '客户经理',
            dataIndex: 'customerManagerName',
            width: 120
        }, {
            title: '贷款金额',
            dataIndex: 'loanAmount',
            width: 160
        }, {
            title: '操作',
            dataIndex: 'visible',
            lock: 'right',
            width: 200,
            cell: (value, index, record) => {
                return (
                    <div className="contract-handle-btn-list-wrap">
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
