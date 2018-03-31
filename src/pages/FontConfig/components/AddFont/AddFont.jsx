/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button,Dialog } from '@icedesign/base';
import cx from 'classnames';
import axios from 'axios';
import {
    FormBinderWrapper as IceFormBinderWrapper,
    FormBinder as IceFormBinder,
    FormError as IceFormError,
} from '@icedesign/form-binder';
import "./addFont.scss"
import FontConfigReq from './../../reqs/FontConfigReq.js'
import DragFields from '../DragFields';


export default class AdFont extends Component {
    static displayName = 'AddFont';

    constructor(props) {
        super(props);

        // 请求参数缓存
        this.state = {
            pageName: '',
            resDate: [],
            isFixed: [],
        };
    }
    submit = () => {
        let reqDate = {
            "name": this.state.pageName,
            "businessType": "货款业务",
            "functionType": "进件",
            "fields": []
        }
        if(!reqDate.name.length) {
            Dialog.alert({
                content: "页面名称不能为空",
                closable: false,
                title: "提示",
            });
            return 
        }
        // console.log(this.state.isFixed[0].fields);
        
        reqDate.fields = this.state.isFixed.list[0].fields;
        let data = this.state.resDate;
        let tempData = data.list
            for (const index in tempData) {
                for (const key in tempData[index].fields) {
                    if (tempData[index].fields[key].checked) {
                        reqDate.fields.push(tempData[index].fields[key])
                    }
                }
                
            }
        reqDate.fields.map((item) => {
            let fieldId = item.id;
            delete item.id;
            item.fieldId = fieldId;
            })
        
        FontConfigReq.save(reqDate).then((data) => {
            let res = data.data;
            if (res.msg) {
                Dialog.alert({
                    content: "页面名称重复",
                    closable: false,
                    title: "提示",
                });
                return 
            }
            this.props.router.push(`/font/set?id=${res.id}`)
        })

    }
    reset = () => {
        let data = this.state.resDate;
        let tempData = data.list
        
        for (const index in tempData) {
            for (const key in tempData[index].fields) {
                tempData[index].fields[key].checked = false
            }
            this.setState({
                resDate: data
            })
        }    
    }
    selected = (index,all) => {
        if (!all) {
            let data = this.state.resDate;
            let tempData = data.list
            for (const key in tempData[index].fields) {
                tempData[index].fields[key].checked = !tempData[index].fields[key].checked;
            }
            this.setState({
                resDate: data
            })
        } else {
            let data = this.state.resDate;
            let tempData = data.list
            for (const key in tempData[index].fields) {
                tempData[index].fields[key].checked = true;
            }
            this.setState({
                resDate: data
            })
        }   
    }
    onChang = (e) => {     
        this.setState({
            pageName: e.target.value
        })
    }
    addClass = (index, subindex) => {
        let data = this.state.resDate;
        let tempData = data.list
        tempData[index].fields[subindex].checked = !tempData[index].fields[subindex].checked;
        this.setState({
            resDate:data
        })
        
    }
    componentDidMount() {
        FontConfigReq.getDetail('isFixed=true').then((data) => {
            let res = data.data.list;
            this.setState({
                isFixed: res,
            })
        })
        FontConfigReq.getDetail('isFixed=false').then((data) => {
            let res = data.data.list;
            this.setState({
                resDate: res,
            })
        })
    }
    changeFieldsSort(dragParent, hoverParent, dragIndex, hoverIndex){
        let resDate = this.state.resDate;
        let temp = resDate[dragParent].fields.splice(dragIndex,1)
        resDate[hoverParent].fields.splice(hoverIndex, 0, ...temp);
        this.setState({resDate});
    }
    changeFixedFieldsSort(dragParent, hoverParent, dragIndex, hoverIndex){
        let isFixed = this.state.isFixed;
        let temp = isFixed[dragParent].fields.splice(dragIndex,1)
        isFixed[hoverParent].fields.splice(hoverIndex, 0, ...temp);
        this.setState({isFixed});
    }
    render() {
        console.log(this.state.resDate);
        
        return (
            <div className="addFont">
                <IceContainer className='subtitle'>
                    <div className="pageName">
                        <label>页面成名</label>
                        <input type="text" name='' onChange={this.onChang.bind(this)} />
                    </div>
                </IceContainer>
                <IceContainer title="选择字段" className='subtitle'>
                    {
                        <div>
                            <div className="diffence">字段（必选）</div>
                            <DragFields
                                isFixed={true}
                                data={this.state.isFixed}
                                onChange={this.changeFixedFieldsSort.bind(this)}
                            />
                            {/*{this.state.isFixed[0] && this.state.isFixed[0].fields.map((item, index) => {
                                return (
                                    <div className="listCode selectCode isFixed" key={index}>
                                        {item.label}
                                        <span className="icon">&#xe62c;</span>
                                    </div>
                                )
                            })}*/}
                            <div className="diffence">字段（可选字段）</div>
                            <DragFields
                                data={this.state.resDate}
                                onChange={this.changeFieldsSort.bind(this)}
                                onFieldClick={this.addClass.bind(this)}
                                onOperateClick={this.selected.bind(this)}
                            />{/*
                            {this.state.resDate.map((item, index) => {
                                return (
                                    <div className='subDif' key={index}>
                                        <div>{item.name}</div>
                                        <div className="select">
                                            <span onClick={this.selected.bind(this,index,true)}> 全选</span>
                                            <span onClick={this.selected.bind(this,index,false)}>反选</span>
                                        </div>
                                        {item.fields.map((item, subindex) => {
                                            return (
                                                <div className={cx('listCode',{'selectCode': item.checked})} onClick={this.addClass.bind(this,index,subindex)} key={subindex}>
                                                    {item.label}
                                                    <span className="icon">&#xe62c;</span>
                                                </div>
                                            )
                                        })}
                                        
                                    </div>

                                )
                            })}*/}
                        </div>
                    }

                </IceContainer>
                <div className='btn-list'>
                    <Button onClick={this.submit.bind(this)} type="normal" className='next-btn-search btn'>
                        下一步
                    </Button>
                    <Button className='btn' onClick={this.reset}>
                        重置
                    </Button>
                </div>

            </div>
        );
    }
}
