import { BaseColumn } from 'base';

/**
 * 定义列表的表头
 */
class EntryQueryColumn extends BaseColumn {

  renderStatus = (value, index, record) => {
    var statusText = '';
    this.state.statusList.map((item, index) => {
      if (item.key == record.status) {
        statusText = item.value;
      }
    });
    return statusText;
  };

  constructor() {
    super();
    this.state = {
      statusList: [
        { key: 'DRAFT', value: '待提交' },
        { key: 'RETURNED', value: '退回' },
        { key: 'SUBMIT', value: '提交' },
        // {key:'CREDIT',value:'征信'},
        { key: 'AUDIT', value: '审查审批' },
        { key: 'MAKEUP', value: '补录' },
        { key: 'REJECTED', value: '审批拒绝' },
        { key: 'INTERVIEW', value: '面签' },
        { key: 'LENDING_APPLY', value: '出账申请' },
        { key: 'LENDING_AUDIT', value: '出账审核' },
        { key: 'LENDING', value: '已放款' },
      ],
    };

    this._columns = [{
      title: '贷款编号',
      dataIndex: 'code',
      width: 210,
    }, {
      title: '贷款状态',
      dataIndex: 'status',
      width: 160,
      cell: (value, index, record) => {
        var statusText = '';
        this.state.statusList.map((item, index) => {
          if (item.key == record.status) {
            statusText = item.value;
          }
        });
        return statusText;
      },
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
              record.status && (record.status == 'DRAFT' || record.status == 'RETURNED') ?
                (
                  <div className="pch-table-operation">
                    <a href="javascript:;"
                       onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.EDIT)}>
                      修改
                    </a>
                  </div>
                )
                : (<span></span>)
            }
            {
              record.status && record.status == 'MAKEUP' ?
                (
                  <div className="pch-table-operation">
                    <a href="javascript:;"
                       onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.OTHER)}>
                      补录
                    </a>
                  </div>
                )
                : (<span></span>)
            }
            {
              record.status && record.status != 'DRAFT' &&   record.status != 'RETURNED'&&   record.status != 'MAKEUP'?

                (
                  <div className="pch-table-operation">
                    <a href="javascript:;"
                       onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.VIEW)}>
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

export default new EntryQueryColumn().getColumns();
