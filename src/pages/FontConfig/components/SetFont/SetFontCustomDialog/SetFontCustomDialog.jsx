import React, { Component } from 'react';
import { Button, Input, Select, Dialog, Feedback, Checkbox, Radio } from '@icedesign/base';
import cx from 'classnames';
import FontConfigReq from './../../../reqs/FontConfigReq.js';
import SetFontBaseDialog from '../SetFontBaseDialog';
const {Group: CheckboxGroup} = Checkbox;

export default class SetFontCustomDialog extends SetFontBaseDialog {
    constructor(props) {
        super(props);

        this.state = {};

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

    componentWillReceiveProps(nextProps) {
        if (nextProps.allPageFields) {
            this.setState({
                allPageFields: nextProps.allPageFields
            })
        }
    }

    // 添加自定义字段
    handleSubmitCode = () => {
        let reqData = this.props.data;

        if (!reqData.label) {
            Feedback.toast.show({
                type: 'error',
                content: '字段名称不能为空'
            })
            return
        }
        if (!reqData.type) {
            Feedback.toast.show({
                type: 'error',
                content: '字段类型不能为空'
            })
            return
        }
        // 删除下拉框的单选框复选框空置值
        reqData.options && reqData.options.map((item, index) => {
            if (item.label == '') {
                reqData.options.splice(index, 1)
            }
        })

        this.props.submitFormData(this.state.allPageFields);
    }

    /**
     * 显示下拉框的字段编辑内容
     * @return {[type]} [description]
     */
    showSelectForm() {
        let {data} = this.props;

        return data.type == "SELECT" || data.type == "RADIO" || data.type == "CHECKBOX";
    }

    /**
     * 显示日期类型的字段编辑内容
     * @return {[type]} [description]
     */
    showDateForm() {
        let {data} = this.props;

        return data.type == "DATE";
    }

    /**
     * 字段的全选、反选操作
     * @param  {[type]} index [description]
     * @param  {[type]} all   [description]
     * @return {[type]}       [description]
     */
    selected = (index, all) => {
        let data = this.state.allPageFields;

        if (!all) {
            for (const key in data[index].fields) {
                data[index].fields[key].checked = !data[index].fields[key].checked;
            }
        } else {
            for (const key in data[index].fields) {
                data[index].fields[key].checked = true;
            }
        }

        this.setState({
            allPageFields: data
        })
    }

    /**
     * 字段的点击操作
     * @param  {[type]} index    [description]
     * @param  {[type]} subindex [description]
     * @return {[type]}          [description]
     */
    addClass = (index, subindex) => {
        let data = this.state.allPageFields;
        data[index].fields[subindex].checked = !data[index].fields[subindex].checked;
        this.setState({
            allPageFields: data
        })
    }

    render() {
        const codeDate = (value) => {
            let data = this.state.fields;
            data.dateFormat = value.join()
            this.props.changeFormData({
                dateFormat: value.join()
            })
        }

        // 添加自定义字段，选择下拉框，下拉框输入值的时候触发的函数
        const handleSelect = (index, value) => {
            let data = this.props.data;
            data.options[index] = {
                label: value,
                value: value + index
            };

            this.props.changeFormData({
                options: data.options
            })
        }

        // 自定义字段添加下拉框执行的函数
        const handleAddValue = (index) => {
            let data = this.props.data;
            if (index == 'add') {
                data.options.push({
                    label: '',
                    value: ''
                })
            } else {
                data.options.splice(index, 1);
            }
            this.props.changeFormData({
                options: data.options
            })
        }

        let {data, visible, onClose} = this.props;
        let { allPageFields = [] } = this.state;

        if (!data.options || data.options.length == 0) {
            data.options = [{
                label: '',
                value: ''
            }]
        }


        return (
            <Dialog
                visible={visible}
                onOk={this.handleSubmitCode}
                closable="esc,mask,close"
                onCancel={this.handleClose.bind(this)}
                onClose={this.handleClose.bind(this)}
                title={(data.id ? "编辑" : "添加") + "自定义字段"}
                footer={this.footerDom}
                footerAlign='center'>
                <div className="pch-form" style={{
                                                     width: 800
                                                 }}>
                    <div className="serfont-custom-dialog-title">
                        可选字段
                    </div>
                    <div className="addFont">
                        {allPageFields.map((item, index) => {
                             return (
                                 <div className='subDif' key={index}>
                                     <div>
                                         {item.name}
                                     </div>
                                     <div className="select">
                                         <span onClick={this.selected.bind(this, index, true)}>全选</span>
                                         <span onClick={this.selected.bind(this, index, false)}>反选</span>
                                     </div>
                                     {item.fields.map((item, subindex) => {
                                          return (
                                              <div className={cx('listCode', {
                                                          'selectCode': item.checked
                                                      })} onClick={this.addClass.bind(this, index, subindex)} key={subindex}>
                                                  {item.label}
                                                  <span className="icon"></span>
                                              </div>
                                          )
                                      })}
                                 </div>
                             )
                         })}
                    </div>
                    <div className="serfont-custom-dialog-title">
                        自定义字段
                    </div>
                    <div className='customerStr'>
                        <div className='first'>
                            <label htmlFor="">
                                <span>字段名称</span>
                            </label>
                            <Input size="large" placeholder="请输入" value={data.label} onChange={this.changeFormData.bind(this, 'label')} />
                        </div>
                        <div>
                            <label htmlFor="">
                                <span>字段后缀</span>
                            </label>
                            <Input size="large" placeholder="请输入" value={data.append} onChange={this.changeFormData.bind(this, 'append')} />
                        </div>
                        <br />
                        <div className='first'>
                            <label htmlFor="">
                                <span>字段类型</span>
                            </label>
                            <Select
                                size="large"
                                placeholder="请选择"
                                disabled={!!data.id}
                                value={data.type}
                                onChange={this.changeFormData.bind(this, 'type')}>
                                <Select.Option select value="STRING">
                                    输入文本
                                </Select.Option>
                                <Select.Option value="TEXT">
                                    文本域
                                </Select.Option>
                                <Select.Option value="RADIO">
                                    单选框
                                </Select.Option>
                                <Select.Option value="SELECT">
                                    下拉框
                                </Select.Option>
                                <Select.Option value="INT">
                                    输入数字
                                </Select.Option>
                                <Select.Option value="CHECKBOX">
                                    复选框
                                </Select.Option>
                                <Select.Option value="DATE">
                                    选择日期
                                </Select.Option>
                                <Select.Option value="ADDRESS">
                                    选择地址
                                </Select.Option>
                                <Select.Option value="DECIMAL">
                                    输入数字（含小数点）
                                </Select.Option>
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="">
                                <span>字段长度</span>
                            </label>
                            <Input size="large" placeholder="请输入" onChange={this.changeFormData.bind(this, 'length')} />
                        </div>
                    </div>
                    <div className='beautify'>
                        <CheckboxGroup value={this.getValueForCheckbox()} dataSource={this.PROP_LIST} onChange={this.codeRequire} />
                    </div>
                    {data.type == "TEXT" ? <div>
                                               提示：字段类型为文本域，字段独占一行显示
                                           </div> : ''}
                    {this.showSelectForm() ? <div className='beautify constraint'>
                                                 <label htmlFor="" className='changSet'>
                                                     选择设置:
                                                 </label>
                                                 <br />
                                                 {data.options && data.options.map((item, index) => {
                                                      return (
                                                          <div className='dropDown' key={index}>
                                                              <div>
                                                                  <Input value={item.label} placeholder=" 请输入值" onChange={handleSelect.bind(this, index)} />
                                                                  <div className='addReduce'>
                                                                      <span onClick={handleAddValue.bind(this, 'add')}>+</span>
                                                                      {index != 0 && <span onClick={handleAddValue.bind(this, index)}>-</span>}
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      )
                                                  
                                                  })}
                                             </div> : ''}
                    {this.showDateForm() ?
                     <div className='beautify'>
                         <label htmlFor="" className='marr10'>
                             日期格式
                         </label>
                         <CheckboxGroup value={this.state.listDate} dataSource={this.DATE_FORMATS} onChange={codeDate} />
                     </div> : ""}
                </div>
            </Dialog>
        )
    }
}
