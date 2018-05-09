/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button, Input, Select, Field, DatePicker, Upload, Dialog, Checkbox, Radio, CascaderSelect } from '@icedesign/base';
import { Balloon } from "@icedesign/base";
import "./SetFont.scss"
import cx from 'classnames';
import FontConfigReq from './../../reqs/FontConfigReq.js'
import { Tools } from 'utils'
import { Title, BtnAddRow } from 'components';
import SetFontAddDialog from './SetFontAddDialog';
import SetFontEditDialog from './SetFontEditDialog';

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
            leftActive: 0,
            rightActive: '',
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
            fieldsEdite: {
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
            boolDate: false,
            boolSelect: false,
            value: [], //添加字段时候字段的熟悉，例如只读
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

    changeFormData(data) {
        let fields = this.state.fields;
        fields = Object.assign(fields, data);
        this.setState({
            fields
        })
    }

    // handleAddElement = () => {
    //     this.setState({
    //         arraList: this.state.arraList.concat(Math.round(Math.random() * 1000))
    //     });
    // }

    handleRemoveElement = (index, inj) => {

        let id = this.props.params.id
        const newArr = Object.assign({}, this.state.resData);
        let deleteObj = newArr.fieldset[index].fields[inj];
        let fileId = deleteObj.id;
        FontConfigReq.deleteCode(id, fileId).then((data) => {
            if (data.code == 200) {
                newArr.fieldset[index].fields.splice(inj, 1);
                this.setState({
                    resData: newArr
                });
            }
        })

    }

    handleRemoveModule = (index) => {
        let id = this.props.params.id
        const newArr = this.state.resData;
        let deleteObj = newArr.fieldset[index].name;

        FontConfigReq.deleteModelCode(id, encodeURIComponent(deleteObj)).then((data) => {
            if (data.code == 200) {
                newArr.fieldset.splice(index, 1)
                this.setState({
                    resData: newArr
                });
            } else {
                Dialog.alert({
                    title: '提示',
                    content: data.msg
                })
            }
        })

    }
    // 上一页
    upPage = () => {
        let id = this.props.params.id
        this.props.router.push(`font/add?id=${id}`)
    }
    // 下一页
    downPage = () => {
        let id = this.props.params.id;
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
    /**
     * 修改区域标题
     * @param  {[type]} index [description]
     * @param  {[type]} view  [description]
     * @return {[type]}       [description]
     */
    handleGroupTitle = (index, view) => {
        let id = this.props.params.id;
        let copyDate = this.state.resData;
        copyDate.fieldset[index].name = view
        copyDate.fieldset[index].fields.length && copyDate.fieldset[index].fields.map((item) => {
            item.fieldset = view
            item.name
        })
        this.setState({
            resData: copyDate
        })
    }

    handleGroupTitleSubmint = (index, view) => {
        let id = this.props.params.id;
        let copyDate = this.state.resData;
        let obj = {}
        obj.fields = copyDate.fieldset[index].fields
        FontConfigReq.changPageName(obj, id).then((data) => {
            if (data.code == 200) {
                this.setState({
                    subTitle: ''
                })
            }
        })
    }

    scrollToAnchor = (anchorName) => {
        if (anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);
            // 如果对应id的锚点存在，就跳转到锚点
            if (anchorElement) {
                anchorElement.scrollIntoView();
            }
        }
    }

    componentDidMount() {
        let id = this.props.params.id
        let pageName = this.props.router.location.query.pageName

        FontConfigReq.getCode(id).then((data) => {
            if (data.code == 200) {
                let res = data.data
                this.setState({
                    resData: res,
                    pageValue: pageName || res && res.name
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
            }

        })
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

    handleSubmitFormData() {
        let reqData = this.state.fields;
        let id = this.props.params.id
        let resData = this.state.resData;

        FontConfigReq.submitCustomeCode(reqData, id).then((data) => {
            if (data.code == 200) {
                let allData = this.state.resData
                reqData.id = data.data.id
                resData.fieldset[reqData.fieldsetOrder].fields.push(reqData);
                this.setState({
                    resData,
                    dialogOne: false
                })
            } else {
                console.log("添加字段", data.msg);
            }
        })
    }

    handleSubmitPreFormData() {
        let fields = this.state.fieldsEdite;
        let id = this.props.params.id
        let resData = this.state.resData;
        let index = this.state.editeCodeIndex.index;
        let inj = this.state.editeCodeIndex.inj;

        FontConfigReq.submitModifyCode(fields, id, fields.id).then((data) => {
            if (data.code == 200) {
                resData.fieldset[index].fields.splice(inj, 1, fields);
                this.setState({
                    resData,
                    dialogTwo: false
                })
            }
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

    render() {
        const {init, setValue, getValue} = this.field;

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


        const moveDown = (index) => {
            const newArr = this.state.resData;
            if ((newArr.fieldset.length - 1) == index) {
                return
            }
            [newArr.fieldset[index + 1], newArr.fieldset[index]] = [newArr.fieldset[index], newArr.fieldset[index + 1]]
            newArr.fieldset[index + 1].fields.map((item) => {
                item.fieldsetOrder = index + 1;
            })
            newArr.fieldset[index].fields.map((item) => {
                item.fieldsetOrder = index - 1;
            })
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
            newArr.fieldset[index - 1].fields.map((item) => {
                item.fieldsetOrder = index - 1;
            })
            newArr.fieldset[index].fields.map((item) => {
                item.fieldsetOrder = index + 1;
            })
            this.setState({
                resData: newArr
            });
        }
        const handleAddModule = () => {
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
        const dataSource = [
            {
                value: "2973",
                label: "陕西",
                children: [
                    {
                        value: "2974",
                        label: "西安",
                        children: [
                            {
                                value: "2975",
                                label: "西安市"
                            },
                            {
                                value: "2976",
                                label: "高陵县"
                            }
                        ]
                    },
                    {
                        value: "2980",
                        label: "铜川",
                        children: [
                            {
                                value: "2981",
                                label: "铜川市"
                            },
                            {
                                value: "2982",
                                label: "宜君县"
                            }
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
                            {
                                value: "3431",
                                label: "库尔勒市"
                            },
                            {
                                value: "3432",
                                label: "和静县"
                            }
                        ]
                    }
                ]
            }
        ];
        //  根据type值渲染不同的输入框
        const handleFixed = (item) => {
            let inputType = <Input placeholder="" />

            switch (item.type) {
                case 'STRING':
                    inputType = <Input placeholder="" readOnly={item.isReadonly ? true : false} />
                    break;
                case 'TEXT':
                    inputType = <Input placeholder="" addonAfter={item.append} />
                    // inputType = <Input placeholder=""  multiple/>
                    break;
                case 'INT':
                    inputType = <Input placeholder="" addonAfter={item.append} />
                    break;
                case 'DECIMAL':
                    inputType = <Input placeholder="" addonAfter={item.append} />
                    break;
                case 'DATE':
                    inputType = <RangePicker onChange={(val, str) => console.log(val, str)} onStartChange={(val, str) => console.log(val, str)} />
                    break;
                case 'SELECT':
                    inputType = <Select placeholder="请选择">
                                    {item.options && item.options.map((item, index) => {
                                         return (
                                             <Option value={item.value} key={index}>
                                                 {item.label}
                                             </Option>
                                         )
                                     })}
                                </Select>
                    break;
                case 'CHECKBOX':
                    inputType = <span className="addNewCheckbox">{<label>
                                      <CheckboxGroup dataSource={item.options} />
                                  </label>}</span>
                    break;
                case 'RADIO':
                    inputType = <span className="addNewRadio">{<label>
                                   <RadioGroup dataSource={item.options} />
                               </label>}</span>
                    break;
                case 'ADDRESS':
                    inputType = <CascaderSelect dataSource={dataSource} />
                    break;
                default:
                    break;
            }
            return inputType
        }
        // 点击添加自定义字段执行的函数
        const handleAddCode = (index) => {
            let data = this.state.fields;
            // 字段必填选项等设置为空
            let value = this.state.value;
            data.fieldset = this.state.resData.fieldset[index].name;
            data.name = this.state.resData.fieldset[index].name;
            // 下拉框初始化值
            data.type = '';
            data.options = [{
                label: '',
                value: ''
            }];
            data.fieldsetOrder = index;
            value = [];
            this.setState({
                dialogOne: true,
                fields: data,
                boolSelect: false,
                value
            })
        }

        const handlePageName = (e) => {

            this.setState({
                pageValue: e.target.value
            })
        }
        const {resData = {}} = this.state;

        return (
            <IceContainer className="pch-container setFont">
                <Title title="进件模块页面字段编辑" />
                <div className="pch-form">
                    <div className="pageName">
                        <label>
                            页面名称
                        </label>
                        <input type="text" name='' onChange={handlePageName} value={this.state.pageValue} />
                    </div>
                    <div className="container">
                        {/*渲染左边  */}
                        <div className="container-left">
                            <ul className='scrollFix'>
                                {resData.fieldset && resData.fieldset.map((item, index) => {
                                     return (
                                         <li className={cx({
                                                    'active': this.state.leftActive === index
                                                })} key={index}>
                                             <a onClick={this.menuNav.bind(this, item.name, index)}>
                                                 {item.name}
                                             </a>
                                         </li>
                                     )
                                 })}
                            </ul>
                        </div>
                        {/* 渲染右边 */}
                        <div className="container-right">
                            <div className="dynamic-demo">
                                {resData.fieldset && resData.fieldset.map((item, index) => {
                                     return (
                                         <div key={index}>
                                             {/*添加字段按钮和小标题  */}
                                             <div className='base-detail customer clearfix'>
                                                 <div className='base-detail-name active' onClick={this.titleState.bind(this, index + 1)} id={item.name}>
                                                     <Input
                                                         placeholder=""
                                                         value={item.name}
                                                         onChange={this.handleGroupTitle.bind(this, index)}
                                                         onBlur={this.handleGroupTitleSubmint.bind(this, index)}
                                                         className='moduleStr'
                                                         readOnly={this.state.subTitle != index + 1} />
                                                 </div>
                                                 <div className="base-detail-opt">
                                                     {index != 0 &&
                                                      <span><span className='icon delete' onClick={this.handleRemoveModule.bind(this, index)}></span> <span className='icon up' onClick={moveUp.bind(this, index)}></span> <span className='icon down'
                                                          onClick={moveDown.bind(this, index)}></span></span>}
                                                     <span className="addStr" onClick={handleAddCode.bind(this, index)}>自定义字段</span>
                                                 </div>
                                             </div>
                                             <div className='ui-sortable'>
                                                 {item.fields.map((item, inj) => {
                                                      if (item.isFixed) {
                                                          // 固定字段
                                                          return (
                                                              <div className={cx('dynamic-item', 'firstModle', 'ui-sortable-item',
                                                                      'false')} key={inj} data-row={item.line == 1 ? true : ''}>
                                                                  <div className="clearfix">
                                                                      <label htmlFor="" className='label'>
                                                                          <Balloon type="primary" trigger={<span className='ellips'><span className='required'>*</span>
                                                                                                           {item.label}:</span>} closable={false} triggerType="hover">
                                                                              {item.label}
                                                                          </Balloon>
                                                                      </label>
                                                                      {handleFixed(item)}
                                                                      <span className='edite icon'></span>
                                                                  </div>
                                                                  <span className="delete" onClick={this.handleRemoveElement.bind(this, index)}>×</span>
                                                              </div>
                                                          )
                                                      } else {
                                                          return (
                                                              <div
                                                                  onMouseLeave={hover.bind(this, 0)}
                                                                  onMouseEnter={hover.bind(this, 1, item.label)}
                                                                  className={cx('dynamic-item', 'firstModle', 'ui-sortable-item',
                                                                                 'false', {
                                                                                     active: this.state.rightActive == item.label
                                                                                 })}
                                                                  key={inj}
                                                                  data-row={item.line == 1 ? true : ''}>
                                                                  <div className="clearfix">
                                                                      <label htmlFor="" className='label'>
                                                                          <Balloon type="primary" trigger={<span className='ellips' onDoubleClick={this.handleEditeCoce.bind(this, item, index, inj)} title={item.label}><span className='required' onClick={validaRequire.bind(this, index, inj)}>{item.isRequired ? <span>*</span> : ''}</span>
                                                                                                           {item.label}
                                                                                                           </span>} closable={false} triggerType="hover">
                                                                              {item.label}
                                                                          </Balloon>
                                                                      </label>
                                                                      {handleFixed(item)}
                                                                      <span className='edite icon' onClick={this.handleEditeCoce.bind(this, item, index, inj)}></span>
                                                                  </div>
                                                                  <span className="delete" onClick={this.handleRemoveElement.bind(this, index, inj)}>×</span>
                                                              </div>
                                                          )
                                                      }
                                                  })}
                                             </div>
                                         </div>
                                     )
                                 })}
                            </div>
                            <div className="addModule">
                                <BtnAddRow text="添加区域" onClick={handleAddModule} />
                            </div>
                            <div className="dynamic-demo">
                                <div className='base-detail customer'>
                                    <span className='active'><Input
                                                                 placeholder=""
                                                                 value='材料提交'
                                                                 readOnly
                                                                 className='moduleStr'
                                                                 readOnly /></span>
                                </div>
                            </div>
                            <div className='submit'>
                                <Button type="primary" style={{
                                                                  marginLeft: '10px'
                                                              }} onClick={this.upPage}>
                                    上一步
                                </Button>
                                <Button type="secondary" style={{
                                                                    marginLeft: '10px'
                                                                }} onClick={this.downPage}>
                                    提交
                                </Button>
                                <Button type="normal" onClick={this.cancelPage} style={{
                                                                                           marginLeft: '10px'
                                                                                       }}>
                                    取消
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <SetFontAddDialog
                    visible={this.state.dialogOne}
                    onClose={this.onClose}
                    data={this.state.fields}
                    changeFormData={this.changeFormData.bind(this)}
                    submitFormData={this.handleSubmitFormData.bind(this)} />
                <SetFontEditDialog
                    visible={this.state.dialogTwo}
                    onClose={this.onClose}
                    data={this.state.fields}
                    changeFormData={this.changeFormData.bind(this)}
                    submitFormData={this.handleSubmitFormData.bind(this)} />
            </IceContainer>

            );
    }
}
