/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button, Input, Select, Field, DatePicker, Upload, Dialog, Checkbox, Radio, CascaderSelect } from '@icedesign/base';
import { Balloon } from "@icedesign/base";
// import "./SetFont.scss"
import cx from 'classnames';
import FontConfigReq from './../../reqs/FontConfigReq.js'
import Tools from 'utils'
import { Title } from 'components';

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
                fieldsetOrder: 1,
                hasAttachedFields: false,
                isCustom: true,
                isRepeatable: false,
                isRequired: false,
                label: "",
                name: "",
                orderId: 43,
                screenSchemeId: '',
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

        FontConfigReq.deleteCode(id, fileId).then((data) => {
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
        let id = this.props.router.location.query.id
        this.props.router.push(`font/add?id=${id}`)
    }
    // 下一页
    downPage = () => {
        this.props.router.push(`font`)
    }
    //取消
    cancelPage = () => {
        this.props.router.push('font/list')
    }
    menuNav = (archer, index) => {
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
            if (anchorElement) { anchorElement.scrollIntoView(); }
        }
    }

    componentDidMount() {
        let id = this.props.router.location.query.id

        FontConfigReq.getCode(id).then((data) => {
            let res = data.data
            this.setState({
                resData: res,
                pageValue: res && res.name
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
        // 固定左侧菜单
        window.onscroll = function () {
            let scrollFix = document.querySelector('.scrollFix');
            if (!scrollFix) {
                return
            }
            if (window.scrollY > 130) {
                scrollFix.style.cssText += 'position:fixed;top:50px;'
            } else {
                scrollFix.style.cssText += 'position:static;top:auto;'
            }
        }
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
            FontConfigReq.submitCustomeCode(reqData, id).then((data) => {
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
            FontConfigReq.submitModifyCode(reqData, id, fileId).then((data) => {
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
                        placeholder="请选择"
                    >
                        {item.options && item.options.map((item, index) => {
                            return (
                                <Option value={item.value} key={index}>{item.label}</Option>
                            )
                        })}

                    </Select>
                    break;
                case 'CHECKBOX':
                    inputType = <span className="addNewCheckbox">
                        {
                            <label>
                                <CheckboxGroup
                                    dataSource={item.options}
                                />
                            </label>
                        }
                    </span>
                    break;
                case 'RADIO':
                    inputType = <span className="addNewRadio">
                        {
                            <label>
                                <RadioGroup
                                    dataSource={item.options}
                                />
                            </label>
                        }
                    </span>
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
                data.push("123")
                this.setState({
                    addValue: data
                })
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
            data.options[index] = { label: value, value: value };
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
                pageValue: e.target.value
            })
        }
        return (
            <div className="setFont">
                <IceContainer className='pch-container subtitle'>
                    <Title title="预览页面" />
                    <div className="container">
                        {/*渲染左边  */}
                        <div className="container-left">
                            <ul className='scrollFix'>
                                {
                                    this.state.resData.fieldset && this.state.resData.fieldset.map((item, index) => {
                                        return (
                                            <li className={cx({ 'active': this.state.leftActive === index })} key={index}>
                                                <a onClick={this.menuNav.bind(this, item.name, index)}>{item.name}</a>
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


                                            </div>
                                            <div className='ui-sortable'>
                                                {index == 0 ? item.fields.map((item, inj) => {
                                                    if (item.isCustom) {
                                                        return (
                                                            // 基本信息里面自定义字段
                                                            <div onMouseLeave={hover.bind(this, 0)} className={cx('dynamic-item', 'firstModle', ' ui-sortable-item',
                                                                'false')} key={inj} data-row={item.line==1? true : ''}>
                                                                <div className="clearfix">
                                                                    <label htmlFor="" className='label'>
                                                                        <Balloon
                                                                                type="primary"
                                                                                trigger={ <span className='ellips'  title={item.label}>
                                                                                <span className='required'>
                                                                                    {item.isRequired ? <span>*</span> : ''}
                                                                                </span>    
                                                                                {item.label}
                                                                            </span>}
                                                                                closable={false}
                                                                                triggerType="hover">
                                                                                {item.label}
                                                                        </Balloon>    
                                                                    </label>
                                                                    {handleFixed(item)}
                                                                    <span className='edite icon' onClick={handleEditeCoce.bind(this,index,inj)}>&#xe62a;</span>
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
                                                                'false')} key={inj} data-row={item.line == 1 ? true : ''}>
                                                                <div className="clearfix">
                                                                    <label htmlFor="" className='label'>
                                                                        <Balloon
                                                                                type="primary"
                                                                                trigger={ <span className='ellips'>
                                                                                <span className='required'>*</span>  
                                                                                {item.label}:
                                                                                </span>}
                                                                                closable={false}
                                                                                triggerType="hover">
                                                                                {item.label}
                                                                        </Balloon>    
                                                                    </label>
                                                                    {handleFixed(item)}
                                                                    <span className='edite icon'>&#xe62a;</span>
                                                                </div>
                                                                <span className="delete">
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
                                                        <div key={inj} className={cx('dynamic-item', 'firstModle', ' ui-sortable-item',
                                                            'false')} data-row={item.line == 1 ? true : ''}>
                                                            <div className="clearfix">
                                                                <label htmlFor=""  className='label'>
                                                                    <Balloon
                                                                            type="primary"
                                                                            trigger={ <span className='ellips'  title={item.label}>
                                                                            <span className='required'>
                                                                                {item.isRequired ? <span>*</span> : ''}
                                                                            </span>    
                                                                            {item.label}
                                                                        </span>}
                                                                            closable={false}
                                                                            triggerType="hover">
                                                                            {item.label}
                                                                    </Balloon> 
                                                                </label>
                                                                {handleFixed(item)}
                                                                <span className='edite icon' onClick={handleEditeCoce.bind(this,index,inj)}>&#xe62a;</span>
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
                            <div className="dynamic-demo">
                                <div className='baseDetail customer'>
                                    <span className='active'>
                                        <Input placeholder="" value='材料提交' readOnly className='moduleStr' readOnly />
                                    </span>
                                </div>
                            </div>
                            <div className='submit'>
                                <Button
                                    type="secondary"
                                    style={{ marginLeft: '10px' }}
                                    onClick={this.downPage}>
                                    返回
                                </Button>
                            </div>
                        </div>
                    </div>
                </IceContainer>
            </div>

        );
    }
}
