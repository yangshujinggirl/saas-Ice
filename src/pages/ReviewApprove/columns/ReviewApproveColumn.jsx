
import { BaseColumn } from 'base';

/**
 * 定义列表的表头
 */
class ReviewApproveColumn extends BaseColumn {

    constructor() {
        super();

        this._columns = [{
            title: '贷款编号',
            dataIndex: 'code',
            width: 160
        }, {
            title: '贷款状态',
            dataIndex: 'loanStatus',
            width: 160
        }, {
            title: '主贷人姓名',
            dataIndex: 'borrowerName',
            width: 150
        }, {
            title: '证件号码',
            dataIndex: 'borrowerIdNo',
            width: 180
        }, {
            title: '手机号',
            dataIndex: 'borrowerMobile',
            width: 150
        }, {
          title: '申请金额',
          dataIndex: 'principalAmount',
          width: 150
        },{
          title: '贷款产品',
          dataIndex: 'productName',
          width: 150
        },{
          title: '展厅名称',
          dataIndex: 'exhibitionHallName',
          width: 160
        }, {
          title: '申请时间',
          dataIndex: 'submitAt',
          width: 160
        },{
            title: '操作',
            dataIndex: 'visible',
            lock: 'right',
            width: 150,
            cell: (value, index, record) => {
                return (
                    <div>
                      {
                        record.status  && record.status == 'CLAIM'  ?
                          (<button className="editbtn searchbtn" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.OTHER1)}>
                          签收
                        </button>)
                          :(<span></span> )
                      }
                      {
                        record.status  && record.status == 'SIGNED'  ?
                          ( <button className="searchbtn" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.VIEW)}>
                            详情
                          </button>)
                          :(<span></span> )
                      }
                    </div>
                    );
            }
        }]
    }
}

export default new ReviewApproveColumn().getColumns();
