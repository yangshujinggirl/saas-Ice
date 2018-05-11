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
import SetFontMenus from '../SetFont/SetFontMenus';

const { Group: CheckboxGroup } = Checkbox;
const { Group: RadioGroup } = Radio;
const { MonthPicker, YearPicker, RangePicker } = DatePicker;


export default class SetFontView_ extends Component {
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
    // 返回
    handleCancel = () => {
    	if(this.props.changeView){
    		this.props.changeView();
    		return;
    	}
        this.props.router.push(`font`)
    }

    componentDidMount() {
        // let id = this.props.params.id

        // FontConfigReq.getCode(id).then((data) => {
        //     let res = data.data
        //     this.setState({
        //         resData: res,
        //         pageValue: res && res.name
        //     })
        //     for (const key in this.state.resData.fieldset) {

        //         if (this.state.resData.fieldset[key].name == '基本信息') {
        //             let allDate = this.state.resData
        //             let first = allDate.fieldset.splice(key, 1)
        //             allDate.fieldset.unshift(...first)
        //             this.setState({
        //                 resData: allDate
        //             })
        //         }
        //     }
        // })
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

    componentWillReceiveProps(nextProps){
        if(nextProps.resData){
            this.setState({resData: nextProps.resData})
        }
    }

    render() {
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

        const handleEditeCoce = (index, inj) => {
            // let reqData = this.state.resData;
            // reqData.fieldset[index].fields[inj].label
            this.state.editeCodeIndex.index = index;
            this.state.editeCodeIndex.inj = inj;
            this.setState({
                dialogTwo: true,
            })
        }

        const {resData = {}} = this.state;
        let { id, visible } = this.props;

        return (
            <IceContainer className="pch-container setFont" style={{display: visible ? '' : 'none'}}>
                <Title title="进件模块-预览" />
                <div className="pch-form">
                    <div className="container">
                        {/*渲染左边  */}
                        <div className="container-left">
                            <SetFontMenus resData={resData} />
                        </div>
                        {/* 渲染右边 */}
                        <div className="container-right">
                            <div className="dynamic-demo">
                                {this.state.resData.fieldset && this.state.resData.fieldset.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            {/*添加字段按钮和小标题  */}
                                            <div className='baseDetail customer'>
                                                <span className='active' id={item.name}>
                                                    <Input placeholder="" value={item.name} className='moduleStr' readOnly />
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
                                    type="normal"
                                    style={{ marginLeft: '10px' }}
                                    onClick={this.handleCancel}>
                                    返回
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </IceContainer>
        );
    }
}
