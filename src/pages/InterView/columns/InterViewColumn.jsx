
import { BaseColumn } from 'base';

/**
 * 定义列表的表头
 */
class InterViewColumn extends BaseColumn {

    constructor() {
        super();

        this._columns = [{
            title: 'ID',
            cell: (value, index, record) => {
                return <a className='id' onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.DETAIL)}>
                            {record.id}
                        </a>
            },
            width: 60
        }, {
            title: '姓名',
            dataIndex: 'userName',
            width: 100
        }, {
            title: '证件类型',
            dataIndex: 'icType',
            width: 100
        }, {
            title: '证件号码',
            dataIndex: 'icNo',
            width: 170
        }, {
            title: '录制日期',
            dataIndex: 'updateTime',
            width: 160
        }, {
            title: '进件ID',
            dataIndex: 'loanId',
            width: 220
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
            }
        }]
    }
}

export default new InterViewColumn().getColumns();
