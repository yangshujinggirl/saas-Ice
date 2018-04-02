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
            arraList: [5, 6, 7, 8, 9],
            dialogOne: false,
            dialogTwo: false,
            value: ["orange"]
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
        const newArr = this.state.resData;
        newArr.fieldset[index].fields.splice(inj,1);
        this.setState({
            resData: newArr
        });
    }
    upPage = () => {
        this.props.router.go(-1)
    }
    menuNav = (index) => {
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
        copyDate.fieldset[index].name=view
        this.setState( {
            resData: copyDate
        })
        
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
                value: "apple",
                label: "必须填"
            },
            {
                value: "pear",
                label: "值唯一"
            },
            {
                value: "orange",
                label: "只写"
            },
            {
                value: "orange",
                label: "独占一行"
            }
        ];
        
        const footer = (
            <div key='1'>
                <Button type="primary" style={{ marginLeft: '10px' }}>
                    提交
                </Button>
                <Button type="secondary" style={{ marginLeft: '10px' }} onClick={this.onClose}>
                    取消
                </Button>
            </div>
        );
        const hover = (bool,item) => {
            
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

        const validaRequire = (index,inj) => {
            const newArr = this.state.resData;
            newArr.fieldset[index].fields[inj].isRequired = !newArr.fieldset[index].fields[inj].isRequired
            this.setState({
                resData: newArr
            });
        }

        const deleteData = (index) => {
            const newArr = this.state.resData;
            newArr.fieldset.splice(index,1)
            this.setState({
                resData: newArr
            });
        }

        const moveDown = (index) => {
            const newArr = this.state.resData;            
            if ((newArr.fieldset.length - 1) == index) {
                return
            }
            [newArr.fieldset[index+1], newArr.fieldset[index]] = [newArr.fieldset[index], newArr.fieldset[index+1]]
            this.setState({
                resData: newArr
            });
        }

        const moveUp = (index) => {
            const newArr = this.state.resData;            
            if (index==1) {
                return
            }
            [newArr.fieldset[index-1], newArr.fieldset[index]] = [newArr.fieldset[index], newArr.fieldset[index-1]]
            this.setState({
                resData: newArr
            });
        }
        const handleAddModule = () => {
            const newArr = this.state.resData;            
            let add = {
                name: '请输入标题',
                fields:[]
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
                    inputType = <Input placeholder=""  />
                    break;
                case 'TEXT':
                    inputType = <Input placeholder=""  />
                // inputType = <Input placeholder=""  multiple/>
                    break;
                case 'INT':
                    inputType = <Input placeholder=""  />
                    break;
                case 'DECIMAL':
                    inputType = <Input placeholder=""  />                
                    break;
                case 'DATE':
                    inputType = <RangePicker
                        onChange={(val, str) => console.log(val, str)}
                        onStartChange={(val, str) => console.log(val, str)}/>
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
                    dataSource= {dataSource}
                  />
                    break;
                default:
                    break;
            }
            return  inputType
        }

        const handleAddCode = (index) => {
            this.setState({
                dialogOne: true,
            })
        }

        return (
            <div className="setFont">
                <IceContainer className='subtitle'>
                    <div className="pageName">
                        <label>页面名称</label>
                        <input type="text" name='' value={this.state.pageValue} />
                    </div>
                </IceContainer>
                <div className="container">
                    <div className="container-left">
                        <ul>
                            {
                                this.state.resData.fieldset && this.state.resData.fieldset.map((item, index) => {
                                    return (
                                        <li className={cx({ 'active': this.state.leftActive === index })} key={index}>
                                            <a href={`#${item.name}`} onClick={this.menuNav.bind(this, index)}>{item.name}</a>
                                        </li>
                                    )
                                })}

                        </ul>
                    </div>
                    <div className="container-right">
                        <div className="dynamic-demo">
                            {this.state.resData.fieldset && this.state.resData.fieldset.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div className='baseDetail customer'>
                                            <span className='active' onClick={this.titleState.bind(this,index+1)}>
                                                {
                                                    this.state.subTitle == index +1 ?
                                                        <Input placeholder="" value={item.name} onChange={this.handleGroupTitle.bind(this, index)} onBlur={validEmpty} className='moduleStr' />
                                                        :
                                                        <Input placeholder="" value={item.name} className='moduleStr' readOnly />
                                            }    
                                                
                                            </span>
                                            {
                                            
                                                index == 0 ? <span className="addStr" onClick={handleAddCode.bind(this,index)}>自定义字段</span> :
                                                <span>    
                                                    <span className="addStr" onClick={handleAddCode.bind(this,index)}>自定义字段</span>
                                                        <span className='icon down' onClick={moveDown.bind(this,index)}>&#xe629;</span>
                                                        <span className='icon up' onClick={moveUp.bind(this,index)}>&#xe62b;</span>
                                                        <span className='icon delete' onClick={deleteData.bind(this,index)}>&#xe625;</span>
                                                </span>
                                             }
                                            
                                        </div>
                                        <div className='ui-sortable'>
                                            {index == 0 ? item.fields.map((item, index) => {
                                                return (
                                                    <div className={cx('dynamic-item', 'firstModle', ' ui-sortable-item',
                                                        'false', )} key={index}>
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
                                            }):''}    
                                             
                                            {index == 0 ? '' : item.fields.map((item, inj) => {
                                                return (
                                                    <div key={inj} onMouseLeave={hover.bind(this,0)} onMouseEnter={hover.bind(this,1,item.label)} className={cx('dynamic-item', 'firstModle',' ui-sortable-item',
                                                        'false', {
                                                        active: this.state.rightActive == item.label
                                                    })} >
                                                        <div className="clearfix">
                                                            <label htmlFor="">
                                                                <span className='ellips' title={item.label}>{item.label}</span>
                                                                <span className='required' onClick={validaRequire.bind(this,index,inj)}>
                                                                    {item.isRequired?<span>*</span>:''}    
                                                                </span>
                                                            </label>
                                                            {handleFixed(item)}
                                                            <span className='edite icon'>&#xe62a;</span>
                                                        </div>
                                                        <span className="delete"
                                                            onClick={this.handleRemoveElement.bind(this, index,inj)}>
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
                                onClick={this.toggleCompont}>
                                提交
                            </Button>
                            <Button
                                type="normal"
                                style={{ marginLeft: '10px' }}>
                                取消
                            </Button>
                        </div>
                    </div>
                </div>

                <Dialog
                    visible={this.state.dialogOne}
                    onOk={this.onClose}
                    closable="esc,mask,close"
                    onCancel={this.onClose}
                    onClose={this.onClose}
                    title="添加自定义字段"
                    footer={footer}
                    footerAlign='center'
                >
                    <div className='customerStr'>
                        <div className='first'>
                            <label htmlFor="">
                                <span>字段名称</span>
                            </label>
                            <Input placeholder="" {...init("input")} />
                        </div>
                        <div>
                            <label htmlFor="">
                                <span>字段后缀</span>
                            </label>
                            <Input placeholder="" {...init("input")} />
                        </div>
                        <br />
                        <div className='first'>
                            <label htmlFor="">
                                <span>字段类型</span>
                            </label>
                            <Select size="large">
                                <Select.Option value="option1">option1</Select.Option>
                                <Select.Option value="option2">option2</Select.Option>
                                <Select.Option disabled>disabled</Select.Option>
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="">
                                <span>字段长度</span>
                            </label>
                            <Input placeholder="" {...init("input")} />
                        </div>
                    </div>
                    <div className='beautify'>
                        <CheckboxGroup
                            value={this.state.value}
                            dataSource={list}
                            onChange={this.onChange}
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
                    <div className='beautify constraint'>
                        <label htmlFor="" className='changSet'>选择设置</label>
                        <div className='dropDown'>
                            <div>
                                <Checkbox />
                                <Input className="" placeholder=" 请输入值" />
                                <div className='addReduce'>
                                    <span>+</span>
                                </div>
                            </div>
                            <div>
                                <Checkbox />
                                <Input className="" placeholder="请输入值" />
                                <div className='addReduce'>
                                    <span>+</span>
                                    <span>—</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='beautify'>
                        <label htmlFor="" className='marr10'>日期格式</label>
                        <CheckboxGroup
                            value={this.state.value}
                            dataSource={list}
                            onChange={this.onChange}
                        />
                    </div>

                </Dialog>
                <Dialog
                    visible={false}
                    onOk={this.onClose}
                    closable="esc,mask,close"
                    onCancel={this.onClose}
                    onClose={this.onClose}
                    title="添加自定义字段"
                    footer={footer}
                    footerAlign='center'
                >
                    <div className='customerStr customerEdite'>
                        <div className='first'>
                            <label htmlFor="">
                                <span>字段名称</span>
                            </label>
                            <Input placeholder="" {...init("input")} />
                        </div>
                    </div>
                    <div className='beautify'>
                        <CheckboxGroup
                            value={this.state.value}
                            dataSource={list}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className='beautify constraint'>
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
                    </div>

                </Dialog>
            </div>

        );
    }
}
