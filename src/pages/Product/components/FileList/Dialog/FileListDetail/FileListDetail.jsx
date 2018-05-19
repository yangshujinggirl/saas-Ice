import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router'
import { FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder, FormError as IceFormError,
} from '@icedesign/form-binder';
import { Input, NumberPicker, Checkbox, Select, Table} from '@icedesign/base';

const {Group: CheckboxGroup} = Checkbox;

export default class DiaLog extends Component {

    constructor(props) {
        super(props);
    }

    renderFileName = (value, index, record, context) => {
        return (
            <div>
                <IceFormBinder required name={`collectionDetails[${index}].fileName`} message="材料名称必填">
                    <Input size="large" placeholder="材料名称" />
                </IceFormBinder>
                <div><IceFormError name={`collectionDetails[${index}].fileName`}/></div>
            </div>
            );
    }

    renderFileType = (value, index, record, context) => {
        return (
            record.fileTypeArr && record.fileTypeArr.map((typeItem, j) => {
                return (
                    <div className="filelist-exts-row" key={j}>
                        <span className="filelist-exts-row-name">{typeItem.name}</span>
                        <IceFormBinder name={`collectionDetails[${index}].fileTypeArr[${j}].value`}>
                            <CheckboxGroup value={typeItem.value} dataSource={typeItem.exts} onChange={this.props.onChangeType.bind(this, index, j)} />
                        </IceFormBinder>
                    </div>
                )
            })
        );
    }
    renderFileSize = (value, index, record, context) => {
        return (
            <div>
                <IceFormBinder name={`collectionDetails[${index}].fileSize`} required type="number" message="文件大小必填">
                    <NumberPicker
                        size="large"
                        placeholder="文件大小"
                        type="inline"
                        max={100}
                        min={0} />
                </IceFormBinder>
                <div><IceFormError name={`collectionDetails[${index}].fileSize`}/></div>
            </div>
            );
    }
    renderOperate = (value, index, record, context) => {
        return (
            <div className="filter-table-operation">
                <a href="#" onClick={this.handleRemoveClick.bind(this, record.id, index)}>删除</a>
            </div>
            );
    }

    handleRemoveClick(id, index, e) {
        e.preventDefault();
        this.props.onRemove && this.props.onRemove(id, index)
    }

    render() {
        let {data} = this.props;
        return (
            <Table dataSource={data} className="basic-table">
                <Table.Column title="材料名称" cell={this.renderFileName} width={230} />
                <Table.Column title="文件类型" cell={this.renderFileType} />
                <Table.Column title="限制大小" cell={this.renderFileSize} width={200} />
                <Table.Column title="操作" cell={this.renderOperate} width={120} />
            </Table>
        )
    }
}
