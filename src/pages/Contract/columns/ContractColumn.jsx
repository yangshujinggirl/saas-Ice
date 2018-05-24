
import { BaseColumn } from 'base';
import { Button,Switch, Moment } from "@icedesign/base";
/**
 * 定义列表的表头
 */
class ContractColumn extends BaseColumn {

    constructor() {
        super();

        this._columns = [{
            title: '模板编号',
            dataIndex: 'templateCode',
            width: 100
        }, {
            title: '模板名称',
            dataIndex: 'templateName',
            width: 160
        }, {
            title: '模板类型',
            dataIndex: 'templateTypeName',
            width: 160
        }, {
            title: '最后修改时间',
            dataIndex: 'updatedAt',
            width: 160,
            cell:(value, index, record) => {
              return Moment(record.updatedAt).format('YYYY-MM-DD H:mm:ss')
            }
        }, {
            title: '状态',
            dataIndex: 'visible',
            width: 120,
            cell: (value, index, record) => {
                return (
                    <Switch
                      className="contract-switch"
                      checkedChildren="启"
                      unCheckedChildren="停"
                      onChange={record.onOperateClick.bind(this, this.OPERATE_TYPE.SWITCH)}
                      checked={record.status == 1?true:false}/>
                );
            }
        }, {
            title: '操作',
            dataIndex: 'visible',
            lock: 'right',
            width: 200,
            cell: (value, index, record) => {
                return (
                    <div className="contract-handle-btn-list-wrap">
                        {
                          record.status != 1 && record.templateType != 1 &&
                          <Button type="secondary" shape="text" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.CHANGE)}>
                              修改
                          </Button>
                        }
                        <Button type="secondary" shape="text"  onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.VIEW)}>
                            详情
                        </Button>
                        {
                          record.status != 1 && record.templateType != 1 &&
                          <Button type="secondary" shape="text"  onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.REMOVE)}>
                              删除
                          </Button>
                        }
                        <Button type="secondary" shape="text"  onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.BIND)}>
                            产品
                        </Button>
                        <Button type="secondary" shape="text"  onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.COPY)}>
                            复制
                        </Button>
                    </div>
                    );
            }
        }]
    }
}

export default new ContractColumn().getColumns();
