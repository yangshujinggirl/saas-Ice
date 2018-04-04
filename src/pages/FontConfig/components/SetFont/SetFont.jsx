/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button, Input, Select, Field, DatePicker, Upload, Dialog, Checkbox, Radio, CascaderSelect } from '@icedesign/base';
import "./SetFont.scss"
import cx from 'classnames';
import FontConfigReq from './../../reqs/FontConfigReq.js'
import Tools from './../../../../base/utils/Tools'

const { Group: CheckboxGroup } = Checkbox;
const { Group: RadioGroup } = Radio;
const { MonthPicker, YearPicker, RangePicker } = DatePicker;


export default class setFont extends Component {
    static displayName = 'SetFont';

    constructor(props) {
        super(props);

        // 请求参数缓存
        this.state = {
            resData: [],
            pageValue: '',
            leftActive: 0,
            rightActive: '',
            subTitle: '',
            addValue: [1],
            fields: {
                fieldsetOrder:1,
                hasAttachedFields:false,
                isCustom:true,
                isRepeatable:false,
                isRequired:false,
                label:"",
                name:"",
                orderId:43,
                screenSchemeId:'',
                type: "",
                options: [],
                length: 30,
            },
            arraList: [5, 6, 7, 8, 9],
            dialogOne: false,
            dialogTwo: false,
            boolDate: false,
            boolSelect: false,
            value: ["true"],
            listDate: ["yyyy"],
            editeCodeIndex: {
                index: 0,
                inj: 0
            }
        };
    }
    field = new Field(this, {
        parseName: true,
        scrollToFirstError: true
    })
    toggleCompont = () => {
        console.log(324)
        this.props.router.push('/font/view')
    }
    handleSort = (sortedArray) => {
        this.setState({
            arraList: sortedArray
        });
    }

    handleAddElement = () => {
        this.setState({
            arraList: this.state.arraList.concat(Math.round(Math.random() * 1000))
        });
    }

    handleRemoveElement = (index, inj) => {
        let id = this.props.router.location.query.id        
        const newArr = this.state.resData;
        let deleteObj = newArr.fieldset[index].fields.splice(inj, 1);
        let fileId = deleteObj[0].id;
        console.log(deleteObj[0]);
        
        FontConfigReq.deleteCode(id,fileId).then((data) => {
            if (data.code == '200') {
                this.setState({
                    resData: newArr
                });
            } else {
                Dialog.alert({
                    content: data.msg
                })
            }
        })
        
    }
    // 上一页
    upPage = () => {
        let id =  this.props.router.location.query.id
        this.props.router.push(`font/add?id=${id}`)
    } 
    // 下一页
    downPage = () => {
        let id =  this.props.router.location.query.id        
        let pageName = {
            name: this.state.pageValue
        }
        FontConfigReq.changPageName(pageName,id).then((data) => {
            if (data == '200') {
                this.props.router.push(`font/view?id=${id}`)
                
            } else {
                Dialog.alert({
                    title: '提示',
                    content: data.msg
                })
            }
        })
    }
    //取消
    cancelPage = () => {
        this.props.router.push('font/list')
    }
    menuNav = (archer,index) => {
        this.scrollToAnchor(archer)
        this.setState({
            leftActive: index,
        })
    }
    titleState = (index) => {
        if (index == 1) {
            return
        }
        if (index) {
            this.setState({
                subTitle: index
            })
        } else {
            this.setState({
                subTitle: ''
            })
        }
    }
    handleGroupTitle = (index, view) => {
        let copyDate = this.state.resData;
        copyDate.fieldset[index].name = view
        this.setState({
            resData: copyDate
        })

    }

    scrollToAnchor = (anchorName) => {
        if (anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);
            // 如果对应id的锚点存在，就跳转到锚点
            if(anchorElement) { anchorElement.scrollIntoView(); }
        }
      }

    componentDidMount() {
        let id = this.props.router.location.query.id

        FontConfigReq.getCode(id).then((data) => {
            let res = data.data
            this.setState({
                resData: res,
                pageValue: res.name
            })
            for (const key in this.state.resData.fieldset) {

                if (this.state.resData.fieldset[key].name == '基本信息') {
                    let allDate = this.state.resData
                    let first = allDate.fieldset.splice(key, 1)
                    allDate.fieldset.unshift(...first)
                    this.setState({
                        resData: allDate
                    })
                }
            }
        })
    }

    render() {
        console.log(this.state.resData);
        const { init, setValue, getValue } = this.field;
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
        const onClose = () => {
            this.setState({
                dialogOne: false,
                dialogTwo: false
            })
        }
        const handleSubmit = () => {
            let reqData = this.state.fields;
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
            let id = this.props.router.location.query.id
            console.log(this.state.resData);
            this.setState({
                dialogOne: false
            })
            FontConfigReq.submitCustomeCode(reqData,id).then((data) => {
                if (data.code == '200') {
                    reqData.id = data.data.id;
                    resData.fieldset[reqData.fieldsetOrder].fields.push(reqData);
                } else {
                    Dialog.alert({
                        title: '提示',
                        content: data.msg
                    })  
                }                 
            })
        }
        const handleEdite = () => { 
            let resData = this.state.resData;
            let index = this.state.editeCodeIndex.index;
            let inj = this.state.editeCodeIndex.inj;
            let label = resData.fieldset[index].fields[inj].label;
            let isRequired = resData.fieldset[index].fields[inj].isRequired
            let isUnique = resData.fieldset[index].fields[inj].isUnique
            let isReadonly = resData.fieldset[index].fields[inj].isReadonly
            let line = resData.fieldset[index].fields[inj].line
            let type = resData.fieldset[index].fields[inj].type
            
            let reqData = {
                label,
                isRequired,
                isUnique,
                isReadonly,
                line,
                type
            }
            if (reqData.label == "") {
                Dialog.alert({
                    title: '提示',
                    content: '字段名称不能为空'
                })
                return 
            }
            let id = this.props.router.location.query.id
            let fileId = resData.fieldset[index].fields[inj].id
            console.log(reqData);
            this.setState({
                dialogTwo: false
            })
            FontConfigReq.submitModifyCode(reqData,id,fileId).then((data) => {
                if (data.code == '200') {
                    // reqData.id = data.data.id;
                    // resData.fieldset[reqData.fieldsetOrder].fields.push(reqData);
                } else {
                    Dialog.alert({
                        title: '提示',
                        content: data.msg
                    })  
                }                 
            })
        }
        
        const footer = (
            <div key='1'>
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={handleSubmit}>
                    提交
                </Button>
                <Button type="secondary" style={{ marginLeft: '10px' }} onClick={onClose}>
                    取消
                </Button>
            </div>
        );
        const footerTwo = (
            <div key='1'>
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={handleEdite}>
                    提交
                </Button>
                <Button type="secondary" style={{ marginLeft: '10px' }} onClick={onClose}>
                    取消
                </Button>
            </div>
        );
        
        const hover = (bool, item) => {

            if (bool) {
                this.setState({
                    rightActive: item
                })
            } else {
                this.setState({
                    rightActive: ''
                })
            }
        }
        const validEmpty = (e) => {
            if (!e.target.value.length) {
                Dialog.alert({
                    content: "区块名称不能为空",
                })
            }
            this.setState({
                subTitle: ''
            })
        }

        const validaRequire = (index, inj) => {
            const newArr = this.state.resData;
            newArr.fieldset[index].fields[inj].isRequired = !newArr.fieldset[index].fields[inj].isRequired
            this.setState({
                resData: newArr
            });
        }

        const deleteData = (index) => {
            const newArr = this.state.resData;
            newArr.fieldset.splice(index, 1)
            this.setState({
                resData: newArr
            });
        }

        const moveDown = (index) => {
            const newArr = this.state.resData;
            if ((newArr.fieldset.length - 1) == index) {
                return
            }
            [newArr.fieldset[index + 1], newArr.fieldset[index]] = [newArr.fieldset[index], newArr.fieldset[index + 1]]
            this.setState({
                resData: newArr
            });
        }

        const moveUp = (index) => {
            const newArr = this.state.resData;
            if (index == 1) {
                return
            }
            [newArr.fieldset[index - 1], newArr.fieldset[index]] = [newArr.fieldset[index], newArr.fieldset[index - 1]]
            this.setState({
                resData: newArr
            });
        }
        const handleAddModule = () => {
            const newArr = this.state.resData;
            let add = {
                name: '请输入标题',
                fields: []
            }
            newArr.fieldset.push(add)
            this.setState({
                resData: newArr
            });
        }
        const dataSource = [
            {
                value: "2973",
                label: "陕西",
                children: [
                    {
                        value: "2974",
                        label: "西安",
                        children: [
                            { value: "2975", label: "西安市" },
                            { value: "2976", label: "高陵县" }
                        ]
                    },
                    {
                        value: "2980",
                        label: "铜川",
                        children: [
                            { value: "2981", label: "铜川市" },
                            { value: "2982", label: "宜君县" }
                        ]
                    }
                ]
            },
            {
                value: "3371",
                label: "新疆",
                children: [
                    {
                        value: "3430",
                        label: "巴音郭楞蒙古自治州",
                        children: [
                            { value: "3431", label: "库尔勒市" },
                            { value: "3432", label: "和静县" }
                        ]
                    }
                ]
            }
        ];
        const handleFixed = (item) => {
            let inputType = <Input placeholder="" />
            switch (item.type) {
                case 'STRING':
                    inputType = <Input placeholder="" />
                    break;
                case 'TEXT':
                    inputType = <Input placeholder="" />
                    // inputType = <Input placeholder=""  multiple/>
                    break;
                case 'INT':
                    inputType = <Input placeholder="" />
                    break;
                case 'DECIMAL':
                    inputType = <Input placeholder="" />
                    break;
                case 'DATE':
                    inputType = <RangePicker
                        onChange={(val, str) => console.log(val, str)}
                        onStartChange={(val, str) => console.log(val, str)} />
                    break;
                case 'SELECT':
                    inputType = <Select
                        placeholder="选择尺寸"
                    >
                        {item.options && item.options.map((item, index) => {
                            return (
                                <Option value={item.value} key={index}>{item.label}</Option>
                            )
                        })}

                    </Select>
                    break;
                case 'CHECKBOX':
                    inputType = <Checkbox />
                    break;
                case 'RADIO':
                    inputType = <Radio />
                    break;
                case 'ADDRESS':
                    inputType = <CascaderSelect
                        dataSource={dataSource}
                    />
                    break;
                default:
                    break;
            }
            return inputType
        }

        const handleAddCode = (index) => {
            let data = this.state.fields;
            data.fieldset = this.state.resData.fieldset[index].name;
            data.fieldsetOrder = index;
            this.setState({
                dialogOne: true,
                fields: data
            })
        }
        const handleAddValue = (index) => {
            let data = this.state.addValue
            if (index == 'add') {
                data.push(index)
            } else {
                data.splice(index, 1)
                let ds = this.state.fields;
                ds.options.splice(index, 1);
                this.setState({
                    fields: ds
                })
            }
            this.setState({
                addValue: data
            })
        }

        const codeName = (value) => {
            console.log(value);
            let data = this.state.fields;
            data.label = value;
            this.setState({
                fields: data
            })
        }
        const codeNameTwo = (value) => {
            let data = this.state.resData;
            let index = this.state.editeCodeIndex.index;
            let inj = this.state.editeCodeIndex.inj;
            data.fieldset[index].fields[inj].label = value
            // this.setState({
            //     fields: data
            // })
        }

        const codeSuffix = (value) => {
            console.log(value);
            let data = this.state.fields;
            data.append = value;
            this.setState({
                fields: data
            })
        }
        const codeType = (value) => {
            console.log(value);
            let data = this.state.fields;
            data.type = value;
            if (value == "SELECT"||value == "RADIO"||value == "CHECKBOX") {
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
        }
        const codeLength = (value) => {
            console.log(value);
            let data = this.state.fields;
            data.length = value;
            this.setState({
                fields: data
            })
        }
        const codeDate = (value) => {
            let data = this.state.fields;
            data.dateFormat = value.join()
            this.setState({
                listDate: value,
                fields: data
            })
        }
        const codeRequire = (value) => {
            console.log(value);
            let data = this.state.fields;
            if (value.join().match('true')) {
                data.isRequired = true
            }
            if (value.join().match('unique')) {
                data.isUnique = true
            }
            if (value.join().match('readonly')) {
                data.isReadonly = true
            }
            if (value.join().match('nowrap')) {
                data.line = 1
            }
            this.setState({
                value: value,
                fields: data
            })
        }

        const codeRequireTwo = (value) => {
            console.log(value);
            let data = this.state.resData;
            let index = this.state.editeCodeIndex.index;
            let inj = this.state.editeCodeIndex.inj;

            if (value.join().match('true')) {
                data.fieldset[index].fields[inj].isRequired = true
            }
            if (value.join().match('unique')) {
                data.fieldset[index].fields[inj].isUnique = true
            }
            if (value.join().match('readonly')) {
                data.fieldset[index].fields[inj].isReadonly = true
            }
            if (value.join().match('nowrap')) {
                data.fieldset[index].fields[inj].line = 1
            }
            this.setState({
                value: value,
                resData: data
            })
        }
        
        const handleSelect = (index, value) => {
            let data = this.state.fields;
            data.options[index] = value;
            this.setState({
                fields: data
            })
            console.log(this.state.fields);
            
        }

        const handleEditeCoce = (index, inj) => {
            // let reqData = this.state.resData;
            // reqData.fieldset[index].fields[inj].label
            this.state.editeCodeIndex.index = index;
            this.state.editeCodeIndex.inj = inj;
            this.setState({
                dialogTwo: true,
            })
        }

        const handlePageName = (e) => {
   
            this.setState({
                pageValue : e.target.value
            })
        }
        return (
            <div className="setFont">
                <IceContainer className='subtitle'>
                    <div className="pageName">
                        <label>页面名称</label>
                        <input type="text" name='' onChange={handlePageName} value={this.state.pageValue} />
                    </div>
                </IceContainer>
                <div className="container">
                    {/*渲染左边  */}
                    <div className="container-left">
                        <ul>
                            {
                                this.state.resData.fieldset && this.state.resData.fieldset.map((item, index) => {
                                    return (
                                        <li className={cx({ 'active': this.state.leftActive === index })} key={index}>
                                            <a  onClick={this.menuNav.bind(this,item.name,index)}>{item.name}</a>
                                        </li>
                                    )
                                })}

                        </ul>
                    </div>
                    {/* 渲染右边 */}
                    <div className="container-right">
                        <div className="dynamic-demo">
                            {this.state.resData.fieldset && this.state.resData.fieldset.map((item, index) => {
                                return (
                                    <div key={index}>
                                        {/*添加字段按钮和小标题  */}
                                        <div className='baseDetail customer'>
                                            <span className='active' onClick={this.titleState.bind(this, index + 1)} id={item.name}>
                                                {
                                                    this.state.subTitle == index + 1 ?
                                                        <Input placeholder="" value={item.name} onChange={this.handleGroupTitle.bind(this, index)} onBlur={validEmpty} className='moduleStr' />
                                                        :
                                                        <Input placeholder="" value={item.name} className='moduleStr' readOnly />
                                                }

                                            </span>
                                            {

                                                index == 0 ? <span className="addStr" onClick={handleAddCode.bind(this, index)}>自定义字段</span> :
                                                    <span>
                                                        <span className="addStr" onClick={handleAddCode.bind(this, index)}>自定义字段</span>
                                                        <span className='icon down' onClick={moveDown.bind(this, index)}>&#xe629;</span>
                                                        <span className='icon up' onClick={moveUp.bind(this, index)}>&#xe62b;</span>
                                                        <span className='icon delete' onClick={deleteData.bind(this, index)}>&#xe625;</span>
                                                    </span>
                                            }

                                        </div>
                                        <div className='ui-sortable'>
                                            {index == 0 ? item.fields.map((item, inj) => {
                                                if (item.isCustom) {
                                                    return (
                                                        // 基本信息里面自定义字段
                                                        <div onMouseLeave={hover.bind(this, 0)} onMouseEnter={hover.bind(this, 1, item.label)} className={cx('dynamic-item', 'firstModle', ' ui-sortable-item',
                                                            'false', {active: this.state.rightActive == item.label} )} key={inj}>
                                                            <div className="clearfix">
                                                                <label htmlFor="">
                                                                    <span className='ellips' onDoubleClick={handleEditeCoce.bind(this,index,inj)} title={item.label}>{item.label}</span>
                                                                    <span className='required'>*</span>
                                                                </label>
                                                                {handleFixed(item)}
                                                                <span className='edite icon'>&#xe62a;</span>
                                                            </div>
                                                            <span className="delete"
                                                                onClick={this.handleRemoveElement.bind(this, index, inj)}>
                                                                &times;
                                                                </span>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        // 固定字段
                                                        <div className={cx('dynamic-item', 'firstModle', ' ui-sortable-item',
                                                            'false')} key={inj}>
                                                            <div className="clearfix">
                                                                <label htmlFor="">
                                                                    <span className='ellips' title={item.label}>{item.label}</span>
                                                                    <span className='required'>*</span>
                                                                </label>
                                                                {handleFixed(item)}
                                                                <span className='edite icon'>&#xe62a;</span>
                                                            </div>
                                                            <span className="delete"
                                                                onClick={this.handleRemoveElement.bind(this, index)}>
                                                                &times;
                                                                </span>
                                                        </div>
                                                    )
                                                }
                                                
                                            }) : ''
                                                // item.fields.map((item, index) => {
                                                //     return (
                                                //         <div  className={cx('dynamic-item', 'firstModle', ' ui-sortable-item',
                                                //             'false')} key={index}>
                                                //             <div className="clearfix">
                                                //                 <label htmlFor="">
                                                //                     <span className='ellips' title={item.label}>{item.label}</span>
                                                //                     <span className='required'>*</span>
                                                //                 </label>
                                                //                 {handleFixed(item)}
                                                //                 <span className='edite icon'>&#xe62a;</span>
                                                //             </div>
                                                //             <span className="delete"
                                                //                 onClick={this.handleRemoveElement.bind(this, index)}>
                                                //                 &times;
                                                //                 </span>
                                                //         </div>
                                                //     )
                                                // })  
                                            }
                                            

                                            {index == 0 ? '' : item.fields.map((item, inj) => {
                                                return (
                                                    <div key={inj} onMouseLeave={hover.bind(this, 0)} onMouseEnter={hover.bind(this, 1, item.label)} className={cx('dynamic-item', 'firstModle', ' ui-sortable-item',
                                                        'false', {
                                                            active: this.state.rightActive == item.label
                                                        })} >
                                                        <div className="clearfix">
                                                            <label htmlFor="">
                                                                <span className='ellips' onDoubleClick={handleEditeCoce.bind(this,index,inj)} title={item.label}>{item.label}</span>
                                                                <span className='required' onClick={validaRequire.bind(this, index, inj)}>
                                                                    {item.isRequired ? <span>*</span> : ''}
                                                                </span>
                                                            </label>
                                                            {handleFixed(item)}
                                                            <span className='edite icon'>&#xe62a;</span>
                                                        </div>
                                                        <span className="delete"
                                                            onClick={this.handleRemoveElement.bind(this, index, inj)}>
                                                            &times;
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='addModule' onClick={handleAddModule}> <span className='icon'>&#xe626;</span>添加区域</div>
                        <div className="dynamic-demo">
                            <div className='baseDetail customer'>
                                <span className='active'>
                                    <Input placeholder="" value='材料提交' readOnly className='moduleStr' readOnly />
                                </span>
                            </div>
                        </div>
                        <div className='submit'>
                            <Button
                                type="primary"
                                style={{ marginLeft: '10px' }}
                                onClick={this.upPage}>
                                上一步
                            </Button>
                            <Button
                                type="secondary"
                                style={{ marginLeft: '10px' }}
                                onClick={this.downPage}>
                                提交
                            </Button>
                            <Button
                                type="normal"
                                onClick={this.cancelPage}
                                style={{ marginLeft: '10px' }}>
                                取消
                            </Button>
                        </div>
                    </div>
                </div>

                <Dialog
                    visible={this.state.dialogOne}
                    onOk={handleSubmit}
                    closable="esc,mask,close"
                    onCancel={onClose}
                    onClose={onClose}
                    title="添加自定义字段"
                    footer={footer}
                    footerAlign='center'
                >
                    <div className='customerStr'>
                        <div className='first'>
                            <label htmlFor="">
                                <span>字段名称</span>
                            </label>
                            <Input placeholder="请输入" onChange={codeName} />
                        </div>
                        <div>
                            <label htmlFor="">
                                <span>字段后缀</span>
                            </label>
                            <Input placeholder="请输入" onChange={codeSuffix}/>
                        </div>
                        <br />
                        <div className='first'>
                            <label htmlFor="">
                                <span>字段类型</span>
                            </label>
                            <Select size="large" onChange ={codeType}>
                                <Select.Option select value="STRING">输入文本</Select.Option>
                                <Select.Option value="TEXT">文本域</Select.Option>
                                <Select.Option value="RADIO">单选框</Select.Option>
                                <Select.Option value="SELECT">下拉框</Select.Option>
                                <Select.Option value="INT">输入数字</Select.Option>
                                <Select.Option value="CHECKBOX">复选框</Select.Option>
                                <Select.Option value="DATE">选择日期</Select.Option>
                                <Select.Option value="ADDRESS">选择地址</Select.Option>
                                <Select.Option value="DECIMAL">输入数字（含小数点）</Select.Option>
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="">
                                <span>字段长度</span>
                            </label>
                            <Input placeholder="请输入" onChange ={codeLength} />
                        </div>
                    </div>
                    <div className='beautify'>
                        <CheckboxGroup
                            value={this.state.value}
                            dataSource={list}
                            onChange={codeRequire}
                        />
                    </div>
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
                    </div> */}
                    {/* <div className='beautify'>
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
                    
                    { this.state.boolSelect ? <div className='beautify constraint'>
                        <label htmlFor="" className='changSet' >选择设置:</label><br />
                        {this.state.addValue.map((item, index) => {
                            return (
                                index == 0 ?
                                    <div className='dropDown clearfix' key={index}>
                                        <div>
                                            {/* <Checkbox /> */}
                                            <Input className="" placeholder="请输入值" onChange={handleSelect.bind(this,index)}/>
                                            <div className='addReduce'>
                                                <span onClick={handleAddValue.bind(this, 'add')}>+</span>
                                            </div>
                                        </div>
                                    </div> :
                                    <div className='dropDown' key={index}>
                                        <div>
                                            {/* <Checkbox /> */}
                                            <Input className="" placeholder=" 请输入值" onChange={handleSelect.bind(this,index)}/>
                                            <div className='addReduce'>
                                                <span onClick={handleAddValue.bind(this, 'add')}>+</span>
                                                <span onClick={handleAddValue.bind(this, index)}>-</span>
                                            </div>
                                        </div>
                                    </div>
                            )

                        })}

                    </div>: ''}
                    {this.state.boolDate ? 
                    <div className='beautify'>
                        <label htmlFor="" className='marr10'>日期格式</label>
                        <CheckboxGroup
                            value={this.state.listDate}
                            dataSource={listDate}
                            onChange={codeDate}
                        /> 
                    </div>: ""}

                </Dialog>
                <Dialog
                    visible={this.state.dialogTwo}
                    onOk={this.onClose}
                    closable="esc,mask,close"
                    onCancel={this.onClose}
                    onClose={this.onClose}
                    title="添加自定义字段"
                    footer={footerTwo}
                    footerAlign='center'
                >
                    <div className='customerStr customerEdite'>
                        <div className='first'>
                            <label htmlFor="">
                                <span>字段名称</span>
                            </label>
                            <Input placeholder="请输入" onChange={codeNameTwo}/>
                        </div>
                    </div>
                    <div className='beautify'>
                        <CheckboxGroup
                            value={this.state.value}
                            dataSource={list}
                            onChange={codeRequireTwo}
                        />
                    </div>
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
            </div>

        );
    }
}
