import React, { Component } from 'react';
import { Button, Input, Select, Dialog, Checkbox, Radio } from '@icedesign/base';
import FontConfigReq from './../../../reqs/FontConfigReq.js'
const {Group: CheckboxGroup} = Checkbox;

export default class SetFontAddDialog extends Component {
    static displayName = 'Fields';

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            fields: {},
            value: [], //添加字段时候字段的熟悉，例如只读
        }
    }

    componentWillReceiveProps(nextProps) {}

    // 添加自定义字段
    handleSubmitCode = () => {
        let reqData = {
            ...this.props.data
        };
        let resData = this.state.resData;

        if (reqData.label == "") {
            Dialog.alert({
                title: '提示',
                content: '字段名称不能为空'
            })
            return
        }
        if (reqData.type == "") {
            Dialog.alert({
                title: '提示',
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

        this.props.submitFormData();
        return;

        let id = this.props.router.location.query.id
        // console.log(this.state.resData);
        this.setState({
            dialogOne: false
        })
        // 判断是不是新的模块 ，新添加的模块会多一个new属性做呢判断 是不是新添加的模块
        //  if (resData.fieldset[reqData.fieldsetOrder].new) {

        if (false) {
            //  批量提交字段，目前这一块先放这里，后台接口在调整
            resData.fieldset[reqData.fieldsetOrder].fields.push(reqData);
            if (resData.fieldset[reqData.fieldsetOrder].name == '请输入标题名称') {
                Dialog.alert({
                    title: "提示",
                    content: '请输入标题名称'
                })

                return
            }

            delete resData.fieldset[reqData.fieldsetOrder].new
            reqData = resData.fieldset[reqData.fieldsetOrder];
            FontConfigReq.changPageName(reqData, id).then((data) => {
                if (data.code == 200) {
                    this.setState({
                        boolSelect: false,
                        resData,
                    })
                }
            })
        } else {
            FontConfigReq.submitCustomeCode(reqData, id).then((data) => {
                if (data.code == 200) {
                    let allData = this.state.resData
                    reqData.id = data.data.id
                    resData.fieldset[reqData.fieldsetOrder].fields.push(reqData);
                    this.setState({
                        resData
                    })
                } else {
                    console.log("添加字段", data.msg);
                }
            })
        }
    }

    render() {





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

        const listDate = [
            {
                value: "yyyy",
                label: "年"
            },
            {
                value: "MM",
                label: "月"
            },
            {
                value: "dd",
                label: "日"
            },
            {
                value: "HH",
                label: "时"
            },
            {
                value: "tt",
                label: "分"
            },
            {
                value: "ss",
                label: "秒"
            }
        ];


        const codeName = (value) => {
            console.log(value);
            let data = this.state.fields;
            data.label = value;
            this.setState({
                fields: data
            })
            this.props.changeFormData({
                label: value
            })
        }

        const codeSuffix = (value) => {
            // console.log(value);
            // let data = this.state.fields;
            // data.append = value;
            // this.setState({
            //     fields: data
            // })
            this.props.changeFormData({
                append: value
            })
        }


        // 根据字段类型判断值的设置是否显示出来
        const codeType = (value) => {
            // console.log(value);
            let data = this.state.fields;
            data.type = value;
            if (value == "SELECT" || value == "RADIO" || value == "CHECKBOX") {
                this.setState({
                    boolSelect: true,
                })
            } else {
                this.setState({
                    boolSelect: false,
                })
            }
            if (value == "DATE") {
                this.setState({
                    boolDate: true,
                })
            } else {
                this.setState({
                    boolDate: false,
                })
            }
            this.setState({
                fields: data
            })
            this.props.changeFormData({
                type: value
            })
        }


        // 自定义字段字段长度
        const codeLength = (value) => {
            console.log(value);
            let data = this.state.fields;
            data.length = value;
            this.setState({
                fields: data
            })
            this.props.changeFormData({
                length: value
            })
        }


        const codeDate = (value) => {
            let data = this.state.fields;
            data.dateFormat = value.join()
            this.props.changeFormData({
                dateFormat: value.join()
            })
            this.setState({
                listDate: value,
                fields: data
            })
        }

        // 字段必输值唯一选择执行的函数
        const codeRequire = (value) => {
            let data = this.state.fields;
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
            if (data.type == 'TEXT') {
                data.line = 1
            }
            this.setState({
                value: value,
                fields: data
            })
        }

        // 添加自定义字段，选择下拉框，下拉框输入值的时候触发的函数
        const handleSelect = (index, value) => {
            let data = this.props.data;
            data.options[index] = {
                label: value,
                value: value + index
            };
            this.setState({
                fields: data
            })
            console.log(this.state.fields);

            this.props.changeFormData({
                options: data.options
            })
        }

        // 自定义字段添加下拉框执行的函数
        const handleAddValue = (index) => {
            // let ds = this.state.fields;
            let data = this.props.data;
            if (index == 'add') {
                data.options.push({
                    label: '',
                    value: ''
                })
            // this.setState({
            //     fields: ds,
            // })
            } else {
                data.options.splice(index, 1);
            // this.setState({
            //     fields: ds,
            // })
            }
            this.props.changeFormData({
                options: data.options
            })
        }

        let {data, visible, onClose} = this.props;

        const footer = (
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
                onOk={this.handleSubmitCode}
                closable="esc,mask,close"
                onCancel={onClose}
                onClose={onClose}
                title="添加自定义字段"
                footer={footer}
                footerAlign='center'>
                <div className="pch-form">
                    <div className='customerStr'>
                        <div className='first'>
                            <label htmlFor="">
                                <span>字段名称</span>
                            </label>
                            <Input size="large" placeholder="请输入" value={data.label} onChange={codeName} />
                        </div>
                        <div>
                            <label htmlFor="">
                                <span>字段后缀</span>
                            </label>
                            <Input size="large" placeholder="请输入" value={data.append} onChange={codeSuffix} />
                        </div>
                        <br />
                        <div className='first'>
                            <label htmlFor="">
                                <span>字段类型</span>
                            </label>
                            <Select size="large" value={data.type} onChange={codeType}>
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
                            <Input size="large" placeholder="请输入" onChange={codeLength} />
                        </div>
                    </div>
                    <div className='beautify'>
                        <CheckboxGroup value={this.state.value} dataSource={list} onChange={codeRequire} />
                    </div>
                    {data.type == "TEXT" ? <div>
                                               提示：字段类型为文本域，字段独占一行显示
                                           </div> : ''}
                    {this.state.boolSelect ? <div className='beautify constraint'>
                                                 <label htmlFor="" className='changSet'>
                                                     选择设置:
                                                 </label>
                                                 <br />
                                                 {data.options.map((item, index) => {
                                                      return (
                                                      index == 0 ?
                                                          <div className='dropDown clearfix' key={index}>
                                                              <div>
                                                                  {/* <Checkbox /> */}
                                                                  <Input className="" placeholder="请输入值" onChange={handleSelect.bind(this, index)} />
                                                                  <div className='addReduce'>
                                                                      <span onClick={handleAddValue.bind(this, 'add')}>+</span>
                                                                  </div>
                                                              </div>
                                                          </div> :
                                                          <div className='dropDown' key={index}>
                                                              <div>
                                                                  {/* <Checkbox /> */}
                                                                  <Input className="" value={item.label} placeholder=" 请输入值" onChange={handleSelect.bind(this, index)} />
                                                                  <div className='addReduce'>
                                                                      <span onClick={handleAddValue.bind(this, 'add')}>+</span>
                                                                      <span onClick={handleAddValue.bind(this, index)}>-</span>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      )
                                                  
                                                  })}
                                             </div> : ''}
                    {this.state.boolDate ?
                     <div className='beautify'>
                         <label htmlFor="" className='marr10'>
                             日期格式
                         </label>
                         <CheckboxGroup value={this.state.listDate} dataSource={listDate} onChange={codeDate} />
                     </div> : ""}
                </div>
            </Dialog>
        )
    }
}
