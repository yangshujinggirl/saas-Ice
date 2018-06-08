
import { BaseColumn } from 'base';
import { Button, Moment } from "@icedesign/base";
import ProductTypeMap from '../../../base/constants/ProductTypeMap';

/**
 * 定义列表的表头
 */
 const typeTrans = {
   1:'电子',
   2:'纸质'
 }
 const statusTrans = {
   2:'已取消',
   4:'已作废',
   5:'已签字',
   7:'未签字',
 }
 const cardTrans = {
   1:'身份证',
   2:'港澳通行证',
   3:'军官证',
   4:'护照',
   5:'台湾通行证',
   6:'其他',
 }
class ContractFileColumn extends BaseColumn {
    constructor() {
        super();

        this._columns = [{
            title: '贷款编号',
            dataIndex: 'loanCode',
            width: 210
        }, {
            title: '合同编号',
            dataIndex: 'contractNo',
            width: 170
        }, {
            title: '客户姓名',
            dataIndex: 'name',
            width: 100
        }, {
            title: '证件类型',
            dataIndex: 'cardType',
            width: 120,
            cell:(value, index, record)=> {
              return cardTrans[record.cardType]
            }
        }, {
            title: '证件号码',
            dataIndex: 'cardNo',
            width: 170
        }, {
            title: '合同类型',
            dataIndex: 'type',
            width: 120,
            cell:(value, index, record)=> {
              return typeTrans[record.type]
            }
        }, {
            title: '状态',
            dataIndex: 'status',
            width: 120,
            cell:(value, index, record)=> {
              return statusTrans[record.status]
            }
        }, {
            title: '合同时间',
            dataIndex: 'contractTime',
            width: 160,
            cell:(value, index, record) => {
              return Moment(record.contractTime).format('YYYY-MM-DD H:mm:ss')
            }
        }, {
            title: '手机号码',
            dataIndex: 'phone',
            width: 120
        }, {
            title: '产品类型',
            dataIndex: 'productType',
            width: 120,
            cell:(value, index, record) => {
              return ProductTypeMap[record.productType]
            }
        }, {
            title: '产品名称',
            dataIndex: 'productName',
            width: 180
        }, {
            title: '客户经理',
            dataIndex: 'customerManagerName',
            width: 120
        }, {
          title: '资方',
          dataIndex: 'lenderName',
          width: 120
        }, {
            title: '操作',
            dataIndex: 'visible',
            lock: 'right',
            width: 240,
            cell: (value, index, record) => {
                return (
                    <div className="pch-table-operation">
                        <a href="javascript:;" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.VIEW)}>
                            详情
                        </a>
                        {
                          record.status != 2 &&
                          record.status != 4 && <a href="javascript:;"
                                                  onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.CANCEL)}>
                                                    作废
                                                </a>

                        }

                        {
                          record.type == 2 &&
                          record.status != 4 &&
                          record.status !=5 &&
                                                <a href="javascript:;"
                                                  onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.SIGN)}>
                                                    签字
                                                </a>
                        }
                        {
                          record.type == 2 &&
                          record.status != 4 &&
                          record.status !=5 && <a href="javascript:;"
                                                onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.CHANGE)}>
                                                  改电子
                                               </a>
                        }
                        {
                          record.status ==5 && <a
                                                href="javascript:;"
                                                onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.DOWNLOAD)}>
                                                  下载
                                               </a>
                        }
                    </div>
                    );
            }
        }]
    }
}

export default new ContractFileColumn().getColumns();
