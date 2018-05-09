import React, { Component } from 'react';
import { Button, Input, Dialog, Checkbox, Radio } from '@icedesign/base';
const {Group: CheckboxGroup} = Checkbox;

export default class SetFontEditDialog extends Component {
    static displayName = 'Fields';

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            fields: {},
            value: [], //添加字段时候字段的熟悉，例如只读
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible != this.props.visible) {
            this.setState({
                visible: nextProps.visible
            })
        }
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
        

        const codeNameTwo = (value) => {
            this.props.changeFormData({
                label: value
            })
        }


        const codeRequireTwo = (value) => {

            let data = {};
            data.isRequired = false
            data.isUnique = false
            data.isReadonly = false
            data.line = 1
            if (value.join().indexOf('true') != -1) {
                data.isRequired = true
            }
            if (value.join().indexOf('unique') != -1) {
                data.isUnique = true
            }
            if (value.join().indexOf('readonly') != -1) {
                data.isReadonly = true
            }
            if (value.join().indexOf('nowrap') != -1) {
                data.line = 1
            }

            this.props.changeFormData(data);
        }

        const list = [
            {
                value: "true",
                label: "必须填"
            },
            {
                value: "unique",
                label: "值唯一"
            },
            {
                value: "readonly",
                label: "只读"
            },
            {
                value: "nowrap",
                label: "独占一行"
            }
        ];

        let { data, visible, onClose } = this.props;


        const footerTwo = (
        <div key='1'>
            <Button type="primary" style={{
                                              marginLeft: '10px'
                                          }} onClick={this.handleSubmitCode}>
                提交
            </Button>
            <Button type="secondary" style={{
                                                marginLeft: '10px'
                                            }} onClick={onClose}>
                取消
            </Button>
        </div>
        );

        return (
            <Dialog
                visible={visible}
                closable="esc,mask,close"
                onClose={onClose}
                title="修改自定义字段"
                footer={footerTwo}
                footerAlign='center'>
                <div className='customerStr customerEdite'>
                    <div className='first'>
                        <label htmlFor="">
                            <span>字段名称</span>
                        </label>
                        <Input placeholder="请输入" onChange={codeNameTwo} />
                    </div>
                </div>
                <div className='beautify'>
                    <CheckboxGroup value={this.state.value} dataSource={list} onChange={codeRequireTwo} />
                </div>
                {data.type == "TEXT" ? <div>提示：字段类型为文本域，字段独占一行显示</div> : ''}
                {/* <div className='beautify constraint'>
                                                                                                <Checkbox />
                                                                                                <span className='marv5'>显示约束</span>
                                                                                                <Input className="marv5" placeholder="Medium" size='small' />
                                                                                                <Select size="small" className='marv5'>
                                                                                                    <Select.Option value="option1">option1</Select.Option>
                                                                                                    <Select.Option value="option2">option2</Select.Option>
                                                                                                    <Select.Option disabled>disabled</Select.Option>
                                                                                                </Select>
                                                                                                <Input className="marv5" placeholder="Medium" size='small' />
                                                                                                <Select size="small" className='marv5'>
                                                                                                    <Select.Option value="option1">option1</Select.Option>
                                                                                                    <Select.Option value="option2">option2</Select.Option>
                                                                                                    <Select.Option disabled>disabled</Select.Option>
                                                                                                </Select>
                                                                                            </div>
                                                                                            <div className='beautify'>
                                                                                                <label className='marr10'>值为计算所得</label>
                                                                                                <RadioGroup
                                                                                                    dataSource={list}
                                                                                                    onChange={this.onChange}
                                                                                                />
                                                                                            </div>
                                                                                            <div className='beautify constraint'>
                                                                                                <Select size="small" className='marv5 mar0'>
                                                                                                    <Select.Option value="option1">option1</Select.Option>
                                                                                                    <Select.Option value="option2">option2</Select.Option>
                                                                                                    <Select.Option disabled>disabled</Select.Option>
                                                                                                </Select>
                                                                                                <span className='insert'>插入</span>
                                                                                            </div>
                                                                                            <div className='beautify'>
                                                                                                <Input className="" placeholder="Medium" />
                                                                                            </div> */}
            </Dialog>
        )
    }
}
