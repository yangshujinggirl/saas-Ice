/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button, Input, Select, Field, DatePicker, Upload, Dialog, Checkbox, Radio, CascaderSelect, Balloon } from '@icedesign/base';
import "./SetFont.scss"
import cx from 'classnames';
import FontConfigReq from './../../reqs/FontConfigReq.js'
import { Tools } from 'utils'
import { Title, BtnAddRow } from 'components';
import SetFontCustomDialog from './SetFontCustomDialog';
import SetFontOptionalDialog from './SetFontOptionalDialog';
import SetFontFieldsets from './SetFontFieldsets';
import SetFontMenus from './SetFontMenus';

const {Group: CheckboxGroup} = Checkbox;
const {Group: RadioGroup} = Radio;
const {MonthPicker, YearPicker, RangePicker} = DatePicker;

export default class setFont extends Component {
    static displayName = 'SetFont';

    constructor(props) {
        super(props);

        // 请求参数缓存
        this.state = {
            resData: [],
            pageValue: '',
            subTitle: '',
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
                options: [{
                    value: '',
                    label: ""
                }],
                length: 30,
            },
            arraList: [5, 6, 7, 8, 9],
            dialogOne: false,
            dialogTwo: false,
            editeCodeIndex: {
                index: 0,
                inj: 0
            }
        };
    }


    componentDidMount() {
        let id = this.props.id
        // let pageName = this.props.router.location.query.pageName

        // FontConfigReq.getCode(id).then((data) => {
        //     if (data.code == 200) {
        //         let res = data.data
        //         this.setState({
        //             resData: res,
        //             pageValue: pageName || res && res.name
        //         })
        //         for (const key in this.state.resData.fieldset) {
        //             if (this.state.resData.fieldset[key].name == '基本信息') {
        //                 let allDate = this.state.resData
        //                 let first = allDate.fieldset.splice(key, 1)
        //                 allDate.fieldset.unshift(...first)
        //                 this.setState({
        //                     resData: allDate
        //                 })
        //             }
        //         }
        //     }

        // })
        // 固定左侧菜单
        window.onscroll = function() {
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
            console.log(nextProps.resData)
            this.setState({resData: nextProps.resData})
        }
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

    /**
     * 更改编辑字段的值
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    changeFormData(data) {
        let fields = this.state.fields;
        fields = Object.assign(fields, data);
        this.setState({
            fields
        })
    }

    /**
     * 更新字段集合
     * @param  {[type]} resData [description]
     * @return {[type]}         [description]
     */
    changeData(resData) {
        this.setState({
            resData
        });
    }

    // 上一页
    upPage = () => {
        let id = this.props.id
        this.props.router.push(`font/add?id=${id}`)
    }
    // 下一页
    downPage = () => {
        let id = this.props.id;
        let resData = this.state.resData;
        // 空区块删除
        let tts = resData.fieldset.every((item) => {
            if (!item.fields.length) {
                Dialog.alert({
                    title: '提示',
                    content: `${item.name}里面没有定义字段，请删除！`
                })
                return false
            } else {
                return true
            }
        })
        if (!tts) {
            return
        }

        let pageName = {
            name: this.state.pageValue,
        }
        if (!pageName.name.length) {
            Dialog.alert({
                title: '提示',
                content: '页面名称不能为空'
            })
            return
        }
        // resData.fieldset.map((item) => {
        //     item.fields.map((item) => {
        //         pageName.fields.push(item) 
        //     })
        // })
        // console.log(pageName);

        FontConfigReq.changPageName(pageName, id).then((data) => {
            if (data.code == 200) {
                this.props.router.push(`font/view?id=${id}`)
            }
        })
    }
    //取消
    cancelPage = () => {
        if(this.props.changeView){
            this.props.changeView();
            return;
        }
        this.props.router.push('font/list')
    }

    /**
     * 保存页面字段
     * @return {[type]} [description]
     */
    submit = () => {

        let id = this.props.id;
        let resData = this.state.resData;

        let reqDate = {
            "name": '',
            "businessType": "货款业务",
            "functionType": "进件",
            "fields": []
        }
        
        // if(!this.state.id){
        //     reqDate.fields = this.state.isFixed[0].fields;
        // }
        // let data = this.state.resDate;
        //     for (const index in data) {
        //         for (const key in data[index].fields) {
        //             if (data[index].fields[key].checked) {
        //                 reqDate.fields.push(data[index].fields[key])
        //             }
        //         }
                
        //     }
            
        resData.fieldset.map((item) => {
            item.fields.map((item) => {
                reqData.fields.push(item) 
            })
        })
        
        reqDate.fields.map((item) => {
            let fieldId = item.id;
            delete item.id;
            item.fieldId = fieldId;
        })

         // 如果id存在就更新字段
        if (id) {
            FontConfigReq.changPageName(reqDate,id).then((data) => {
                let res = data.data;
                if (data.code == 200) {
                    if(this.props.onSave){
                        this.props.onSave(id);
                        return
                    }
                    this.props.router.push(`/font/set/${this.state.id}`)  
                } else {
                    Dialog.alert({
                        content: res.msg,
                        closable: false,
                        title: "提示",
                    });
                }
            })
        } else {
            // 提交字段
            FontConfigReq.save(reqDate).then((data) => {
                let res = data.data;
                if (data.code == 200) {
                    if(this.props.onSave){
                        this.props.onSave(data.id);
                        return
                    }
                    this.props.router.push(`/font/set/${res.id}?pageName=${pageName}`)
                } else {
                    Dialog.alert({
                        content: res.msg,
                        closable: false,
                        title: "提示",
                    });
                }
            })
        }
    }

    /**
     * 保存字段
     * @return {[type]} [description]
     */
    saveFields() {
        let fields = this.state.fields;
        let id = this.props.id
        let resData = this.state.resData;
        let index = this.state.editeCodeIndex.index;
        let inj = this.state.editeCodeIndex.inj;

        console.log('saveFields', fields);

        if (fields.id) {
            FontConfigReq.submitModifyCode(fields, id, fields.id).then((data) => {
                if (data.code == 200) {
                    resData.fieldset[index].fields.splice(inj, 1, fields);
                    this.setState({
                        resData,
                        dialogOne: false,
                        dialogTwo: false
                    })
                }
            })
        } else {

            FontConfigReq.submitCustomeCode(fields, id).then((data) => {
                if (data.code == 200) {
                    let allData = this.state.resData
                    fields.id = data.data.id
                    resData.fieldset[fields.fieldsetOrder].fields.push(fields);
                    this.setState({
                        resData,
                        dialogOne: false,
                        dialogTwo: false
                    })
                } else {
                    console.log("添加字段", data.msg);
                }
            })
        }
    }

    /**
     * 编辑字段
     * 1.固定字段不能编辑，isFixed=true
     * 2.可选字段只编辑名称，isOptional=true
     * 3.自定义字段可编辑所有信息，isCustom=true
     * @param  {[type]} item  [description]
     * @param  {[type]} index [description]
     * @param  {[type]} inj   [description]
     * @return {[type]}       [description]
     */
    handleEditeCoce = (item, index, inj) => {
        // let reqData = this.state.resData;
        // reqData.fieldset[index].fields[inj].label
        this.state.editeCodeIndex.index = index;
        this.state.editeCodeIndex.inj = inj;
        if (item.isCustom) {
            this.setState({
                fields: item,
                dialogOne: true
            })
        } else {
            this.setState({
                fields: item,
                dialogTwo: true,
            })
        }
    }

    /**
     * 关闭修改字段弹窗
     * @return {[type]} [description]
     */
    onClose = () => {
        this.setState({
            dialogOne: false,
            dialogTwo: false
        })
    }

    /**
     * 点击添加自定义字段执行的函数，
     * 1. 设置自定义字段的默认值
     * 2. 自定义字段设置isCustom=true
     * 3. 默认添加排在当前组的最后
     * 4. 设置一个默认options
     * @param  {[type]} index [description]
     * @return {[type]}       [description]
     */
    handleAddCode = (index) => {
        let currentFieldSet = this.state.resData.fieldset[index];
        let data = {
            isCustom: true,
            filedsetOrder: index,
            type: null,
            options: [{
                label: '',
                value: ''
            }],
            orderId: currentFieldSet.fields.length + 1
        };

        // 字段必填选项等设置为空
        data.fieldset = currentFieldSet.name;
        data.name = currentFieldSet.name;

        this.setState({
            dialogOne: true,
            fields: data,
        })
    }

    /**
     * 添加一个区域
     * @return {[type]} [description]
     */
    handleAddModule = () => {
        const newArr = this.state.resData;
        let add = {
            new: 1,
            name: '请输入标题名称',
            fields: []
        }
        newArr.fieldset.push(add)
        this.setState({
            resData: newArr
        });
    }

    render() {
        const {init, setValue, getValue} = this.field;

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

        const {resData = {}} = this.state;
        let { id, visible } = this.props;

        return (
            <IceContainer className="pch-container setFont" style={{display: visible ? '' : 'none'}}>
                <Title title="进件模块页面字段编辑" />
                <div className="pch-form">
                    <div className="container">
                        {/*渲染左边  */}
                        <div className="container-left">
                            <SetFontMenus resData={resData} />
                        </div>
                        {/* 渲染右边 */}
                        <div className="container-right">
                            <SetFontFieldsets
                                id={id}
                                resData={resData}
                                changeData={this.changeData.bind(this)}
                                handleEditeCoce={this.handleEditeCoce}
                                handleAddCode={this.handleAddCode} />
                            <div className="addModule">
                                <BtnAddRow text="添加区域" onClick={this.handleAddModule} />
                            </div>
                            <div className="dynamic-demo">
                                <div className="base-detail customer">
                                    <span className="active"><Input
                                                                 placeholder=""
                                                                 value="材料提交"
                                                                 readOnly
                                                                 className="moduleStr"
                                                                 readOnly /></span>
                                </div>
                            </div>
                            <div className="submit">
                                <Button type="normal" onClick={this.cancelPage} style={{
                                                                                           marginLeft: '10px'
                                                                                       }}>
                                    返回
                                </Button>
                                <Button type="secondary" style={{
                                                                    marginLeft: '10px'
                                                                }} onClick={this.downPage}>
                                    提交
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <SetFontCustomDialog
                    visible={this.state.dialogOne}
                    onClose={this.onClose}
                    data={this.state.fields}
                    changeFormData={this.changeFormData.bind(this)}
                    submitFormData={this.saveFields.bind(this)} />
                <SetFontOptionalDialog
                    visible={this.state.dialogTwo}
                    onClose={this.onClose}
                    data={this.state.fields}
                    changeFormData={this.changeFormData.bind(this)}
                    submitFormData={this.saveFields.bind(this)} />
            </IceContainer>

            );
    }
}
