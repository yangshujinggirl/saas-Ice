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
      width: 210,
    }, {
      title: '贷款状态',
      dataIndex: 'loanStatus',
      width: 160,
    }, {
      title: '主贷人姓名',
      dataIndex: 'borrowerName',
      width: 150,
    }, {
      title: '证件号码',
      dataIndex: 'borrowerIdNo',
      width: 180,
    }, {
      title: '手机号',
      dataIndex: 'borrowerMobile',
      width: 150,
    }, {
      title: '申请金额(元)',
      dataIndex: 'principalAmount',
      width: 150,
      cell: (value, index, record) => {
        if(value){
          return this.formatNumber(value, 2, true);
        }
        return;
      },
    }, {
      title: '贷款产品',
      dataIndex: 'productName',
      width: 150,
    }, {
      title: '展厅名称',
      dataIndex: 'exhibitionHallName',
      width: 160,
    }, {
      title: '申请时间',
      dataIndex: 'submitAt',
      width: 160,
    }, {
      title: '操作',
      dataIndex: 'visible',
      lock: 'right',
      width: 150,
      cell: (value, index, record) => {
        return (
          <div>
            {
              record.taskTypeKey == '5' ?
                (<div className='pch-table-operation'>
                    <a href="javascript:;"
                       onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.OTHER5)}>
                      详情
                    </a>
                  </div>
                )
                : record.status && record.status == 'CLAIM' ?
                (<div className="pch-table-operation">
                    <a href="javascript:;"
                       onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.OTHER1)}>
                      签收
                    </a>
                  </div>
                )
                : (<span></span>)
            }
            {
              record.status && record.status == 'SIGNED' ?
                //taskTypeKey == 10 为征信录入
                record.taskTypeKey == '10' ? (
                    <div className='pch-table-operation'>
                      <a href="javascript:;" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.OTHER3)}>
                        详情
                      </a>
                      <a href="javascript:;" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.OTHER4)}>
                        征信录入
                      </a>
                    </div>
                  ) :
                  //taskTypeKey == 5 为面签详情
                  record.taskTypeKey == '5' ? (
                    (<span></span>)
                  ) : (
                    <div className='pch-table-operation'>
                      <a href="javascript:;" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.VIEW)}>
                        详情
                      </a>
                    </div>
                  )
                : (<span></span>)
            }

          </div>
        );
      },
    }];
  }
}

export default new ReviewApproveColumn().getColumns();
