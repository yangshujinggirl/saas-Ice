import React, { Component } from 'react';
import { Button, Input, Dialog, Checkbox, Radio, Balloon, DatePicker, Select } from '@icedesign/base';
import cx from 'classnames';
import FontConfigReq from './../../../reqs/FontConfigReq.js';
import SetFontBaseDialog from '../SetFontBaseDialog';

const {Group: CheckboxGroup} = Checkbox;
const {Group: RadioGroup} = Radio;
const {MonthPicker, YearPicker, RangePicker} = DatePicker;

export default class SetFontFieldsets extends Component {
    constructor(props) {
        super(props);

        this.state = {};
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
        let copyDate = this.props.resData;
        copyDate.fieldset[index].name = view
        copyDate.fieldset[index].fields.length && copyDate.fieldset[index].fields.map((item) => {
            item.fieldset = view
            item.name
        });
        this.props.changeData(copyDate);
    }

    /**
     * 提交区域标题
     * @param  {[type]} index [description]
     * @param  {[type]} view  [description]
     * @return {[type]}       [description]
     */
    handleGroupTitleSubmint = (index, view) => {
        let id = this.props.id;
        let copyDate = this.props.resData;
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

    /**
     * 更改某字段的必填属性
     * @param  {[type]} index [description]
     * @param  {[type]} inj   [description]
     * @return {[type]}       [description]
     */
    validaRequire = (index, inj) => {
        const newArr = this.props.resData;
        newArr.fieldset[index].fields[inj].isRequired = !newArr.fieldset[index].fields[inj].isRequired
        this.props.changeData(newArr);
    }

    /**
     * 下移动一个字段区域
     * @param  {[type]} index [description]
     * @return {[type]}       [description]
     */
    moveDown = (index) => {
        const newArr = this.props.resData;
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
        this.props.changeData(newArr);
    }

    /**
     * 上移一个字段区域
     * @param  {[type]} index [description]
     * @return {[type]}       [description]
     */
    moveUp = (index) => {
        const newArr = this.props.resData;
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
        this.props.changeData(newArr);
    }


    /**
     * 删除一个字段
     * @param  {[type]} index [description]
     * @param  {[type]} inj   [description]
     * @return {[type]}       [description]
     */
    handleRemoveElement = (index, inj) => {
        let id = this.props.id
        const newArr = Object.assign({}, this.props.resData);
        let deleteObj = newArr.fieldset[index].fields[inj];
        let fileId = deleteObj.id;
        FontConfigReq.deleteCode(id, fileId).then((data) => {
            if (data.code == 200) {
                newArr.fieldset[index].fields.splice(inj, 1);
                this.props.changeData(newArr);
            }
        })

    }

    /**
     * 删除一个字段区域
     * @param  {[type]} index [description]
     * @return {[type]}       [description]
     */
    handleRemoveModule = (index) => {
        let id = this.props.id
        const newArr = this.props.resData;
        let deleteObj = newArr.fieldset[index].name;

        FontConfigReq.deleteModelCode(id, encodeURIComponent(deleteObj)).then((data) => {
            if (data.code == 200) {
                newArr.fieldset.splice(index, 1)
                this.props.changeData(newArr);
            } else {
                Dialog.alert({
                    title: '提示',
                    content: data.msg
                })
            }
        })

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
        };

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

        let {resData, handleEditeCoce, handleAddCode} = this.props;

        return (
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
                                      <span><span className='icon delete' onClick={this.handleRemoveModule.bind(this, index)}></span> <span className='icon up' onClick={this.moveUp.bind(this, index)}></span> <span className='icon down'
                                          onClick={this.moveDown.bind(this, index)}></span></span>}
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
                                                          <Balloon type="primary" trigger={<span className='ellips' onDoubleClick={handleEditeCoce.bind(this, item, index, inj)} title={item.label}><span className='required' onClick={this.validaRequire.bind(this, index, inj)}>{item.isRequired ? <span>*</span> : ''}</span>
                                                                                           {item.label}
                                                                                           </span>} closable={false} triggerType="hover">
                                                              {item.label}
                                                          </Balloon>
                                                      </label>
                                                      {handleFixed(item)}
                                                      <span className='edite icon' onClick={handleEditeCoce.bind(this, item, index, inj)}></span>
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

        )
    }
}
