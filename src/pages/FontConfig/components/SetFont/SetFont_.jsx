/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button, Input, Select, Field, DatePicker, Upload, Dialog, Feedback, Checkbox, Radio, CascaderSelect, Balloon } from '@icedesign/base';
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
    /**
     * 取消，如果是组件中使用依据传入的回调否则跳转到默认页面配置页
     * @return {[type]} [description]
     */
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

        let reqData = {
            "name": '',
            "businessType": "货款业务",
            "functionType": "进件",
            "fields": []
        }

        // 校验是否有已命名空区域，有则弹出提示框“xxxx区域未添加字段，请添加后提交或删除该区域后提交”
        // 空区块删除
        let tts = resData.fieldset.every((item) => {
            if (!item.fields.length) {
                Feedback.toast.show({
                    type: 'error',
                    content: `${item.name}区域未添加字段，请添加后提交或删除该区域后提交！`
                })
                return false
            } else {
                return true
            }
        })
        if (!tts) {
            return
        }

            
        // 转换fieldset到fields
        resData.fieldset.map((item) => {
            item.fields.map((item) => {
                reqData.fields.push(item) 
            })
        })
        
        reqData.fields.map((item) => {
            let fieldId = item.id;
            delete item.id;
            item.fieldId = fieldId;
        })

         // 如果id存在就更新字段
        if (id) {
            FontConfigReq.changPageName(reqData,id).then((res) => {
                let data = res.data;
                if (res.code == 200) {
                    if(this.props.onSave){
                        this.props.onSave(id);
                        return
                    }
                    this.props.router.push(`/font/set/${id}`)  
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
            FontConfigReq.save(reqData).then((res) => {
                let data = res.data;
                if (res.code == 200) {
                    if(this.props.onSave){
                        this.props.onSave(data.id);
                        return
                    }
                    this.props.router.push(`/font/set/${data.id}?pageName=${pageName}`)
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
            if(id){
                FontConfigReq.submitModifyCode(fields, id, fields.id).then((data) => {
                    if (data.code == 200) {
                        // resData.fieldset[index].fields.splice(inj, 1, fields);
                        // this.setState({
                        //     resData,
                        //     dialogOne: false,
                        //     dialogTwo: false
                        // })
                        this.removeField(resData, index, inj, fields);
                    }
                })
            }else{
                this.removeField(resData, index, inj, fields);
            }
        } else {
            if(id){
                FontConfigReq.submitCustomeCode(fields, id).then((data) => {
                    if (data.code == 200) {
                        fields.id = data.data.id
                        // resData.fieldset[fields.fieldsetOrder].fields.push(fields);
                        // this.setState({
                        //     resData,
                        //     dialogOne: false,
                        //     dialogTwo: false
                        // })

                        this.addField(resData, index, fields);
                    } else {
                        console.log("添加字段", data.msg);
                    }
                })
            }else if(fields.tempId){
                this.removeField(resData, index, inj, fields);
            }else{
                fields.tempId = 1;
                this.addField(resData, index, fields);
            }
        }
    }

    removeField(resData, i, j, fields){
        resData.fieldset[i].fields.splice(j, 1, fields);
        this.setState({
            resData,
            dialogOne: false,
            dialogTwo: false
        })
    }

    addField(resData, i, fields){
        resData.fieldset[i].fields.push(fields);
        this.setState({
            resData,
            dialogOne: false,
            dialogTwo: false
        })
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
        let editeCodeIndex = {
            index,
            inj
        }
        if (item.isCustom) {
            this.setState({
                editeCodeIndex,
                fields: item,
                dialogOne: true
            })
        } else {
            this.setState({
                editeCodeIndex,
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
            name: '新区域',
            fields: []
        }
        newArr.fieldset.push(add)
        this.setState({
            resData: newArr
        });
    }

    /**
     * 获取页面剩余的未配置字段，从所有字段中过滤当前页面中的字段
     * @return {[type]} [description]
     */
    getOtherFields(){
        let {allPageFields = {}, resData = {}} = this.props;

        if(!allPageFields.fieldset || !resData.fieldset){
            return [];
        }

        return allPageFields.fieldset.filter((fieldset, i) => {
            let re = fieldset.fields.filter((field, j) => {
                return this._existsInFields(resData.fieldset, field)
            });
            return re.length > 0;
        })
    }

    _existsInFields(fields, field){
        let flag = false;

        fields.map((item, i) => {
            item.fields.map(sitem => {
                if(sitem.id = field.id){
                    flag = true;
                    return;
                }
            })

            if(flag){
                return;
            }
        })

        return flag;
    }

    render() {
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
                                <BtnAddRow text="添加新区域" onClick={this.handleAddModule} />
                            </div>
                            <div className="submit">
                                <Button type="normal" onClick={this.cancelPage} style={{
                                                                                           marginLeft: '10px'
                                                                                       }}>
                                    返回
                                </Button>
                                <Button type="secondary" style={{
                                                                    marginLeft: '10px'
                                                                }} onClick={this.submit}>
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
                    allPageFields={this.getOtherFields()}
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
