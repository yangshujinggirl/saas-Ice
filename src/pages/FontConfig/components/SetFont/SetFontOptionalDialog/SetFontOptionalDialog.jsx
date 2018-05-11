import React, { Component } from 'react';
import { Button, Input, Dialog, Checkbox, Radio } from '@icedesign/base';
import FontConfigReq from './../../../reqs/FontConfigReq.js';
import SetFontBaseDialog from '../SetFontBaseDialog';
const {Group: CheckboxGroup} = Checkbox;

export default class SetFontOptionalDialog extends SetFontBaseDialog {
    constructor(props) {
        super(props);

        // 弹框的底部按钮
        this.footerDom = (
            <div key='1'>
                <Button type="secondary" style={{
                                                  marginRight: '10px'
                                              }} onClick={this.handleSubmitCode}>
                    提交
                </Button>
                <Button type="normal" onClick={this.handleClose.bind(this)}>
                    取消
                </Button>
            </div>
        );
    }

    handleSubmitCode = () => {
        // let resData = this.state.resData;
        let fields = this.props.data;
        // let index = this.state.editeCodeIndex.index;
        // let inj = this.state.editeCodeIndex.inj;

        // fields.type = resData.fieldset[index].fields[inj].type
        // fields.fieldset = resData.fieldset[index].fields[inj].fieldset
        // fields.id = resData.fieldset[index].fields[inj].id
        // fields.fieldsetOrder = resData.fieldset[index].fields[inj].fieldsetOrder
        // fields.options = resData.fieldset[index].fields[inj].options

        // let id = this.props.router.location.query.id

        let fileId = fields.id
        console.log(fields);
        if (!fields.label.length) {
            Dialog.alert({
                title: "提示",
                content: '字段名称不能为空'
            })
            return
        }

        this.props.submitFormData();
        return;

        this.setState({
            dialogTwo: false,
        })
        FontConfigReq.submitModifyCode(fields, id, fileId).then((data) => {
            if (data.code == 200) {
                resData.fieldset[index].fields.splice(inj, 1, fields);
                this.setState({
                    resData
                })
            }
        })
    }

    render() {

        let {data, visible, onClose} = this.props;

        return (
            <Dialog
                visible={visible}
                closable="esc,mask,close"
                onClose={this.handleClose.bind(this)}
                title="修改预定义字段"
                footer={this.footerDom}
                footerAlign='center'>
                <div className='customerStr customerEdite'>
                    <div className='first'>
                        <label htmlFor="">
                            <span>字段名称</span>
                        </label>
                        <Input placeholder="请输入" value={data.label} onChange={this.changeFormData.bind(this, 'label')} />
                    </div>
                </div>
                <div className='beautify'>
                    <CheckboxGroup value={this.getValueForCheckbox()} dataSource={this.PROP_LIST} onChange={this.codeRequire} />
                </div>
                {data.type == "TEXT" ? <div>
                                           提示：字段类型为文本域，字段独占一行显示
                                       </div> : ''}
            </Dialog>
        )
    }
}
