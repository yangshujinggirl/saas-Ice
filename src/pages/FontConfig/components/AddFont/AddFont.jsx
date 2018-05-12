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
import Storage from './../../../../base/utils/Storage.js'

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
            id: this.props.router.location.query.id
        };
    }
    submit = () => {
        // 页面名称
        let pageName = this.props.router.location.query.pageName
        console.log(pageName);
        
        let reqDate = {
            "name": '',
            "businessType": "货款业务",
            "functionType": "进件",
            "fields": []
        }
        // if(!reqDate.name.length) {
        //     Dialog.alert({
        //         content: "页面名称不能为空",
        //         closable: false,
        //         title: "提示",
        //     });
        //     return 
        // }
        // console.log(reqDate.fields);
        if(!this.state.id){
            reqDate.fields = this.state.isFixed[0].fields;
        }
        let data = this.state.resDate;
            for (const index in data) {
                for (const key in data[index].fields) {
                    if (data[index].fields[key].checked) {
                        reqDate.fields.push(data[index].fields[key])
                    }
                }
                
            }
        // localStorage.setItem('configCode',data)
        Storage.set('configCode',data)
        reqDate.fields.map((item) => {
            let fieldId = item.id;
            delete item.id;
            item.fieldId = fieldId;
            })
         // 如果id存在就更新字段
        if (this.state.id) {
            FontConfigReq.changPageName(reqDate,this.state.id).then((data) => {
                let res = data.data;
                if (data.code == 200) {
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
    reset = () => {
        let data = this.state.resDate;
        for (const index in data) {
            for (const key in data[index].fields) {
                data[index].fields[key].checked = false
            }
            this.setState({
                resDate: data
            })
        }    
    }
    selected = (index,all) => {
        if (!all) {
            let data = this.state.resDate;
            for (const key in data[index].fields) {
                data[index].fields[key].checked = !data[index].fields[key].checked;
            }
            this.setState({
                resDate: data
            })
        } else {
            let data = this.state.resDate;
            for (const key in data[index].fields) {
                data[index].fields[key].checked = true;
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
        data[index].fields[subindex].checked = !data[index].fields[subindex].checked;
        this.setState({
            resDate:data
        })
        // console.log(data[index].fields[subindex]);
        // let fieldId = data[index].fields[subindex].id;
        // data[index].fields[subindex].fieldId = fieldId;
        // delete data[index].fields[subindex].id;
        // if (this.state.id) {
        //     FontConfigReq.submitCustomeCode(data[index].fields[subindex], fieldId).then((data) => {
        //         console.log(data);
                
        //     })
        // }
    }
    componentDidMount() {
        FontConfigReq.getDetail('isFixed=true').then((data) => {
            let res = data.data.list;
            this.setState({
                isFixed: res,
            })
        })
        if (this.state.id) {
            let localRes = Storage.get('configCode')           
            this.setState({
                resDate: localRes,
                pageName: localRes.name
            })
        } else {
            FontConfigReq.getDetail('isFixed=false').then((data) => {
                let res = data.data.list;
                this.setState({
                    resDate: res,
                })
            })
        }
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
        console.log(this.state.isFixed);
        
        return (
            <IceContainer className="pch-container addFont">
                <legend className="pch-legend" >
                  <span className="pch-legend-legline"></span>选择字段
                </legend>
                <div>
                    <div className="diffence" style={{marginTop:20}}>字段（已锁定）</div>
                    {/* <DragFields
                        isFixed={true}
                        data={this.state.isFixed}
                        onChange={this.changeFixedFieldsSort.bind(this)}
                    /> */}
                    {this.state.isFixed[0] && this.state.isFixed[0].fields.map((item, index) => {
                        return (
                            <div className="listCode selectCode isFixed" key={index}>
                                {item.label}
                                <span className="icon">&#xe62c;</span>
                            </div>
                        )
                    })}
                    <div className="diffence">字段（可选字段）</div>
                    {/* <DragFields
                        data={this.state.resDate}
                        onChange={this.changeFieldsSort.bind(this)}
                        onFieldClick={this.addClass.bind(this)}
                        onOperateClick={this.selected.bind(this)}
                    /> */}
                    
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
                    })}
                </div>
                <div className='btn-list'>
                    <Button onClick={this.submit.bind(this)} type="normal" className='next-btn-search btn'>
                        下一步
                    </Button>
                    <Button className='btn' onClick={this.reset}>
                        重置
                    </Button>
                </div>

            </IceContainer>
        );
    }
}
