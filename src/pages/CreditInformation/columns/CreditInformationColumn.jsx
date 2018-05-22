import { BaseColumn } from 'base';

/**
 * 定义列表的表头
 */
class CreditInformationColumn extends BaseColumn {

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
      title: '申请金额（元）',
      dataIndex: 'principalAmount',
      width: 150,
      cell: (value, index, record) => {
        return this.formatNumber(value, 0, true);
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
      width: 160,
      cell: (value, index, record) => {
        return (
          <div>
            {
              record.status && record.status == 'CLAIM' ?
                (
                  <div className="pch-table-operation">
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
                (
                  <div className="pch-table-operation">
                    <a href="javascript:;"
                       onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.VIEW)}>
                      详情
                    </a>
                    <a href="javascript:;"
                       onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.OTHER2)}>
                      征信录入
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

export default new CreditInformationColumn().getColumns();
