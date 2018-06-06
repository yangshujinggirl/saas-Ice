import React, { Component } from 'react';
import { Button, Input, Dialog, Checkbox, Radio, Balloon, DatePicker, Select, CascaderSelect, Feedback,TimePicker } from '@icedesign/base';
import cx from 'classnames';
import FontConfigReq from './../../../reqs/FontConfigReq.js';
import SetFontBaseDialog from '../SetFontBaseDialog';

const {Group: CheckboxGroup} = Checkbox;
const {Group: RadioGroup} = Radio;
const {MonthPicker, YearPicker, RangePicker} = DatePicker;

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend';
import FieldsOne from '../DragFields/Fields/FieldsOne';
import FieldsTwo from '../DragFields/Fields/FieldsTwo';
import FieldsEmpty from '../DragFields/Fields/FieldsEmpty';


class SetFontFieldsets extends Component {
    constructor(props) {
        super(props);
        this.moveCard = this.moveCard.bind(this)
        this.state = {
          resData:this.props.resData
        };
    }
    componentWillReceiveProps(props) {
      this.setState({
        resData:props.resData
      })
    }
    moveCard(dragParent, hoverParent, dragIndex, hoverIndex) {
        this.changeFieldsSort(dragParent, hoverParent, dragIndex, hoverIndex)
    }

    titleState = (index) => {
        // if (index == 1) {
        //     return
        // }
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
        // let hasAName = copyDate.fieldset.some((item, i) => {
        //   return item.name == view && index != i
        // });
        // if(hasAName){
        //   Feedback.toast.error('区域名称重复')
        // }

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

        let hasAName = copyDate.fieldset.some((item, i) => {
          return item.name == copyDate.fieldset[index].name && index != i
        });
        if(hasAName){
          Feedback.toast.error('区域名称重复')
        }

        if (!id) {
            //新增时直接更改数据
            this.setState({
                subTitle: ''
            });
            return;
        }

        FontConfigReq.changPageName(obj, id).then((data) => {
          this.setState({
              subTitle: ''
          })
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
        console.log(index,inj)
        let id = this.props.id
        const newArr = Object.assign({}, this.props.resData);
        let deleteObj = newArr.fieldset[index].fields[inj];
        let fileId = deleteObj.id;

        if (!id) {
            //新增时直接更改数据
            newArr.fieldset[index].fields.splice(inj, 1);
            this.props.changeData(newArr);
            return;
        }

        FontConfigReq.deleteCode(id, fileId).then((data) => {
            if (data.code == 200) {
                newArr.fieldset[index].fields.splice(inj, 1);
                this.props.changeData(newArr);
            }
        })

    }

    /**
     * 删除一个字段区域
     * 点击弹出确认框“是否确认删除xxx区域？”，不能删除含“*”的区域
     * @param  {[type]} index [description]
     * @return {[type]}       [description]
     */
    handleRemoveModule = (index) => {

        let id = this.props.id
        const newArr = this.props.resData;
        let deleteObj = newArr.fieldset[index].name;

        // 校验当前区域是否有必填字段
        let allFields = newArr.fieldset[index].fields.filter((item) => {
            return item.isRequired
        });
        if (allFields.length > 0) {
            Feedback.toast.error('含有*的区域不能删除');
            return;
        }

        Dialog.confirm({
            content: `是否确认删除${deleteObj}区域？`,
            onOk: () => {
                if (!id) {
                    //新增时直接更改数据
                    newArr.fieldset.splice(index, 1);
                    this.props.changeData(newArr);
                    return;
                }

                FontConfigReq.deleteModelCode(id, encodeURIComponent(deleteObj)).then((data) => {
                    if (data.code == 200) {
                        newArr.fieldset.splice(index, 1);
                        this.props.changeData(newArr);
                    } else {
                        Dialog.alert({
                            title: '提示',
                            content: data.msg
                        })
                    }
                }).catch((error) =>{
                  Dialog.alert({
                    title: '提示',
                    content: error.msg
                  })
                })
            }
        })

    }

    changeFieldsSort =(dragParent, hoverParent, dragIndex, hoverIndex) =>{
        let { resData } = this.state;
        let temp = resData.fieldset[dragParent].fields.splice(dragIndex,1)
        resData.fieldset[hoverParent].fields.splice(hoverIndex, 0, ...temp);
        this.setState({resData});
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
            let inputType = <Input size="large" placeholder="" />

            let defaultValue;
            if (item.options) {
                let defaultOptions = item.options.filter((opt) => {
                    return opt.isDefault
                });
                if (defaultOptions.length > 0) {
                    defaultValue = defaultOptions[0].value;
                }
            }

            switch (item.type) {
                case 'STRING':
                    inputType = <Input size="large" placeholder="请输入" readOnly={item.isReadonly ? true : false} />
                    break;
                case 'TEXT':
                    inputType = <Input size="large" placeholder="请输入" addonAfter={item.append} />
                    // inputType = <Input placeholder=""  multiple/>
                    break;
                case 'INT':
                    inputType = <Input size="large" placeholder="请输入" addonAfter={item.append} />
                    break;
                case 'DECIMAL':
                    inputType = <Input size="large" placeholder="请输入" addonAfter={item.append} />
                    break;
                case 'DATE':
                    if(item.dateFormat =='yyyy-MM-dd HH:mm:ss'){
                      inputType = <DatePicker size="large"  showTime onChange={(val, str) => console.log(val, str)} onStartChange={(val, str) => console.log(val, str)} />
                      break;
                    }else if(item.dateFormat =='HH:mm:ss'){
                      inputType = <TimePicker size="large" onChange={(val, str) => console.log(val, str)} onStartChange={(val, str) => console.log(val, str)} />
                      break;
                    }else{
                      inputType = <DatePicker size="large" onChange={(val, str) => console.log(val, str)} onStartChange={(val, str) => console.log(val, str)} />
                      break;
                    }

                case 'SELECT':
                    inputType = <Select size="large" placeholder="请选择" dataSource={item.options} defaultValue={defaultValue} />
                    break;
                case 'CHECKBOX':
                    inputType = <span className="addNewCheckbox"><CheckboxGroup size="large" dataSource={item.options} defaultValue={[defaultValue]} /></span>
                    break;
                case 'RADIO':
                    inputType = <span className="addNewRadio"><RadioGroup size="large" dataSource={item.options} defaultValue={defaultValue} /></span>
                    break;
                case 'ADDRESS':
                    inputType = <CascaderSelect size="large" dataSource={dataSource} />
                    break;
                default:
                    break;
            }
            return inputType
        }

        let {resData, handleEditeCoce, handleAddCode} = this.props;

        return (
            <div className="setfont-fieldsets">
                {this.state.resData.fieldset && this.state.resData.fieldset.map((item, index) => {
                     return (
                         <div key={index} className="setfont-field">
                             {/*添加字段按钮和小标题  */}
                             <div className='base-detail clearfix'>
                                 <div className='base-detail-name active' onClick={this.titleState.bind(this, index + 1)} id={item.name}>
                                     <Input
                                         placeholder="区域名称"
                                         maxLength={35}
                                         value={item.name}
                                         onChange={this.handleGroupTitle.bind(this, index)}
                                         onBlur={this.handleGroupTitleSubmint.bind(this, index)}
                                         className='moduleStr'
                                         readOnly={this.state.subTitle != index + 1} />
                                 </div>
                                 <div className="base-detail-opt">
                                     {
                                       index != 0 &&
                                        <span>
                                          <span
                                            className='icon delete'
                                            onClick={this.handleRemoveModule.bind(this, index)}>
                                            
                                          </span>
                                          <span
                                            className={cx('icon up', {'disabled': index == 1})}
                                            onClick={this.moveUp.bind(this, index)}>
                                            
                                          </span>
                                          <span
                                            className={cx('icon down', {'disabled': index == resData.fieldset.length - 1})}
                                            onClick={this.moveDown.bind(this, index)}>
                                            
                                          </span>
                                        </span>
                                      }
                                     <span className="addStr" onClick={handleAddCode.bind(this, index)}>添加字段</span>
                                 </div>
                             </div>
                             <div className='ui-sortable'>
                                 {item.fields.map((item, inj) => {
                                      if (item.isFixed) {
                                          // 固定字段
                                          return (
                                              <FieldsOne
                                                item={item}
                                                id={item.id}
                                                parent={index}
                                                index={inj}
                                                key={inj}
                                                moveCard={this.moveCard}
                                                onClick={this.handleRemoveElement.bind(this, index)}>
                                                {handleFixed(item)}
                                              </FieldsOne>
                                          )
                                      } else {
                                          return (
                                              <FieldsTwo
                                                item={item}
                                                id={item.id}
                                                parent={index}
                                                index={inj}
                                                key={inj}
                                                moveCard={this.moveCard}
                                                onMouseLeave={hover.bind(this, 0)}
                                                onMouseEnter={hover.bind(this, 1, item.label)}
                                                rightActive={this.state.rightActive}
                                                handleEditeCoce={handleEditeCoce.bind(this, item, index, inj)}
                                                validaRequire={this.validaRequire.bind(this, index, inj)}
                                                handleRemoveElement={this.handleRemoveElement.bind(this, index)}>
                                                {handleFixed(item)}
                                              </FieldsTwo>
                                          )
                                      }
                                  })}
                                 {
                                   item.fields.length == 0 &&
                                   <FieldsEmpty
                                     parent={index}
                                     index={0}
                                     moveCard={this.moveCard}/>
                                 }
                             </div>
                         </div>
                     )
                 })}
            </div>

        )
    }
}

export default DragDropContext(HTML5Backend)(SetFontFieldsets);
