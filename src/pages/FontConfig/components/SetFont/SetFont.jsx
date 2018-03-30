/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button, Input, Select, Field, DatePicker, Upload, Dialog, Checkbox, Radio } from '@icedesign/base';
import Sortable, { SortableContainer } from 'react-anything-sortable';
import "./SetFont.scss"
import 'react-anything-sortable/sortable.css';
import cx from 'classnames';
import FontConfigReq from './../../reqs/FontConfigReq.js'
import Tools from './../../../../base/utils/Tools'

const { Group: CheckboxGroup } = Checkbox;
const { Group: RadioGroup } = Radio;


export default class setFont extends Component {
    static displayName = 'SetFont';

    constructor(props) {
        super(props);

        // 请求参数缓存
        this.state = {
            resData: [],
            pageValue: '',
            leftActive: 0,
            subTitle: '',
            arraList: [5, 6, 7, 8, 9],
            visible: true,
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

    handleRemoveElement = (index) => {
        const newArr = this.state.arraList.slice();
        newArr.splice(index, 1);
        this.setState({
            arraList: newArr
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
    validEmpty = (view) => {
        console.log(view);
        
        if (view.target.value.length) {
            Dialog.alert({
                content: "区块名称不能为空",
            })
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
                value: "apple",
                label: "必须填"
            },
            {
                value: "pear",
                label: "值唯一"
            },
            {
                value: "orange",
                label: "只读"
            },
            {
                value: "orange",
                label: "独占一行"
            }
        ];
        const footer = (
            <div>
                <Button type="primary" style={{ marginLeft: '10px' }}>
                    提交
                </Button>
                <Button type="secondary" style={{ marginLeft: '10px' }} onClick={this.onClose}>
                    取消
                </Button>
            </div>
        );

        function renderItem(num, index) {
            return (
                <SortableContainer key={num} className="dynamic-item active firstModle" sortData={num}>
                    <div>
                        <label htmlFor="">
                            <span className='required'>*</span>
                            <span>资方名称{num}</span>
                        </label>
                        <Input placeholder="" {...init("input")} />
                        <span className='edite icon'>&#xe62a;</span>
                    </div>
                    <span className="delete"
                        onClick={this.handleRemoveElement.bind(this, index)}>
                        &times;
                    </span>
                </SortableContainer>
            );
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
                                                        <Input placeholder="" value={item.name} onChange={this.handleGroupTitle.bind(this, index)} onBlur={this.validEmpty} className='moduleStr' />
                                                        :
                                                        <Input placeholder="" value={item.name} className='moduleStr' readOnly />
                                            }    
                                                
                                            </span>
                                            {
                                            
                                                index == 0 ? <span className="addStr">自定义字段</span> :
                                                <span>    
                                                    <span className="addStr">自定义字段</span>
                                                    <span className='icon down'>&#xe629;</span>
                                                    <span className='icon up'>&#xe62b;</span>
                                                    <span className='icon delete'>&#xe625;</span>
                                                </span>
                                             }
                                            
                                        </div>
                                        <Sortable onSort={this.handleSort} containment>
                                            {this.state.arraList.map(renderItem, this)}
                                        </Sortable>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='addModule'> <span className='icon'>&#xe626;</span>添加区域</div>
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
                    visible={false}
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
                    <div className='beautify constraint'>
                        <label htmlFor="" className='changSet'>选择设置</label>
                        <div className='dropDown'>
                            <div>
                                <Checkbox />
                                <Input className="" placeholder="Medium" />
                                <div className='addReduce'>
                                    <span>+</span>
                                    <span>—</span>
                                </div>
                            </div>
                            <div>
                                <Checkbox />
                                <Input className="" placeholder="Medium" />
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
