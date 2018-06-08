
import { BaseColumn } from 'base';

/**
 * 定义列表的表头
 */
class InterViewColumnFrom extends BaseColumn {

    constructor() {
        super();

        this._columns = [{
            title: 'ID',
            dataIndex:'id',
            width: 60
            }, {
                title: '签字人姓名',
                dataIndex: 'name',
                width: 100
            }, {
                title: '签字人证件类型',
                dataIndex: 'idType',
                width: 140
            }, {
                title: '签字人证件号码',
                dataIndex: 'idNo',
                width: 200
            }, {
                title: '贷款总金额',
                dataIndex: 'amount',
                width: 160
            }, {
                title: '期数',
                dataIndex: 'period',
                width: 100
            }, {
                title: '贷款费率',
                dataIndex: 'rate',
                width: 100
            }, {
                title: '月供金额',
                dataIndex: 'monthSupply',
                width: 100
            }, {
                title: '客户经理编号',
                dataIndex: 'staffId',
                width: 200
            }, {
                title: '客户经理姓名',
                dataIndex: 'staffName',
                width: 200 
            },{
                title: '创建时间',
                dataIndex: 'createdDate',
                width: 200
            }, {
                title: '操作',
                dataIndex: 'visible',
                lock: 'right',
                width: 200,
                cell: (value, index, record) => {
                    return (
                        <div>
                            <button className="searchbtn" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.VIEW)}>
                                详情
                            </button>
                            <button className="searchbtn" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.EDIT)}>
                                编辑
                            </button>
                            {/* <a className="see" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.SEE)}>
                                查看报告
                            </a>
                            <a className="upload" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.UPLOAD)}>
                                上传报告
                            </a>
                            <a className="sign" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.SIGN)}>
                                查看签名报告
                            </a> */}
                        </div>
                        );
                }
            }]
    }
}

export default new InterViewColumnFrom().getColumns();
