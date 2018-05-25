import { BaseColumn } from 'base';

/**
 * 定义列表的表头
 */
class InterViewColumn extends BaseColumn {

  constructor() {
    super();
    this.state = {
      idList: [
        { key: '1', value: '身份证' },
        { key: '2', value: '港澳通行证' },
        { key: '3', value: '军官证' },
        { key: '4', value: '护照' },
        { key: '5', value: '台湾通行证' },
        { key: '6', value: '其他' },
      ],
    };

    this._columns = [{
      title: 'ID',
      cell: (value, index, record) => {
        return(
          <div>
            {
              record.type ?
                (<div className="pch-table-operation">
                    <a href="javascript:;"
                       onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.OTHER1)}>
                      {record.id}
                    </a>
                  </div>
                )
                : (<span></span>)
            }
          </div>
        )
      },
      width: 60,
    }, {
      title: '姓名',
      dataIndex: 'userName',
      width: 100,
    }, {
      title: '证件类型',
      dataIndex: 'icType',
      width: 100,
      cell: (value, index, record) => {
        var statusText = '';
        this.state.idList.map((item, index) => {
          if (item.key == record.icType) {
            statusText = item.value;
          }
        });
        return statusText;
      },
    }, {
      title: '证件号码',
      dataIndex: 'icNo',
      width: 170,
    }, {
      title: '录制日期',
      dataIndex: 'updateTime',
      width: 160,
    }, {
      title: '进件ID',
      dataIndex: 'loanId',
      width: 220,
    }, {
      title: '操作',
      dataIndex: 'visible',
      lock: 'right',
      width: 200,
      cell: (value, index, record) => {
        return (
          <div>
            <a className="see" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.SEE)}>
              查看报告
            </a>
            <a className="upload" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.UPLOAD)}>
              上传报告
            </a>
            <a className="sign" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.SIGN)}>
              查看签名报告
            </a>
          </div>
        );
      },
    }];
  }
}

export default new InterViewColumn().getColumns();
