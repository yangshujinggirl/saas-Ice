import React, { Component } from 'react';
import { Button, Input, Dialog, Checkbox, Radio } from '@icedesign/base';
import FontConfigReq from './../../../reqs/FontConfigReq.js';
import SetFontBaseDialog from '../SetFontBaseDialog';
const { Group: CheckboxGroup } = Checkbox;

export default class SetFontOptionalDialog extends SetFontBaseDialog {
    constructor(props) {
        super(props);

        // 弹框的底部按钮
        this.footerDom = (
            <div key='1'>

                <div className="footerDom-btn">
                    <Button type="normal" size="large" onClick={this.handleClose.bind(this)}>
                        取消
                </Button>
                    <Button type="secondary" size="large" onClick={this.handleSubmitCode}>
                        确定
                </Button></div>
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
        console.log(222);
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

        let { data, visible, onClose } = this.props;

        return (
            <Dialog
                visible={visible}
                closable="esc,mask,close"
                onClose={this.handleClose.bind(this)}
                // title="修改预定义字段"
                footer={this.footerDom}
                footerAlign='center'>
                <div className="pch-form">
                    <div className="dialog-title">
                    修改预定义字段
                    </div>
                    <div className='customerStr customerEdite'>
                        <div className='first'>
                            <label htmlFor="">
                                <span>字段名称</span>
                            </label>
                            <Input size="large" placeholder="请输入" value={data.label} onChange={this.changeFormData.bind(this, 'label')} />
                        </div>
                    </div>
                    <div className='beautify'>
                        <CheckboxGroup size="large" value={this.getValueForCheckbox()} onChange={this.codeRequire}>
                            {this.PROP_LIST && this.PROP_LIST.map((val, i) => {
                                let disabledArr = this.getDisabledForCheckbox();
                                return (
                                    <Checkbox value={val.value} key={i} disabled={disabledArr.indexOf(val.value) != -1}>{val.label}</Checkbox>
                                )
                            })}
                        </CheckboxGroup>
                    </div>
                </div>
            </Dialog>
        )
    }
}
