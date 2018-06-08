import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { BaseApp } from 'base';
import { } from "@icedesign/base";
import { Button, Grid, Table, Dialog, Form, Feedback, Checkbox } from "@icedesign/base";
import { Title, PchTable, PchPagination } from 'components';
import ProductReq from '../../../reqs/ProductReq';
const { Row, Col } = Grid;
const { Group: CheckboxGroup } = Checkbox;

import './ProcessAuthEdit.scss';

export default class ProcessAuthEdit extends BaseApp {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            dataSourceRight: [],
            selectedRowTwo: [],
            current: 1,
            rowSelection: {
                selectedRowKeys: [],
                onSelect: (selected, record, records) => {
                    if (!selected) {
                        record.selectedRoles = [];
                    }
                    let { rowSelection } = this.state;
                    let selectedRowKeys = rowSelection.selectedRowKeys;
                    if(selected){
                        selectedRowKeys.push(record.id);
                        // 选中某行如果有子集则子集全选中
                        this.multilayerStructure(record,selectedRowKeys)
                       
                    }else{
                        let idx = selectedRowKeys.indexOf(record.id);
                        if(idx != -1){
                            selectedRowKeys.splice(idx,1);
                        }
                    }
                    rowSelection.selectedRowKeys = selectedRowKeys;
                        this.setState({
                            rowSelection
                        });

                },
                onSelectAll:(selected, records)=>{
                    
                    let { rowSelection } = this.state;
                    let selectedRowKeys = rowSelection.selectedRowKeys;
                    if(selected){   
                        records.map((item,i)=>{
                        selectedRowKeys.push(item.id)
                            
                        })
                    }else{
                        selectedRowKeys = []
                    }

                    rowSelection.selectedRowKeys = selectedRowKeys;
                        this.setState({
                            rowSelection
                        });
                },
            },
            rowSelectionTwo: {
                selectedRowKeys: [],
                onChange: (selectedRowKeys, records) => {
                    records.map((item) => {
                        let result = [];
                        result.push(item.id);
                        item.selectedRoles = result;
                    })

                    let { rowSelectionTwo } = this.state;
                    rowSelectionTwo.selectedRowKeys = selectedRowKeys;
                    this.setState({
                        rowSelectionTwo
                    });

                },
                onSelect: (selected, record, records) => {
                    if (!selected) {
                        record.selectedRoles = [];
                    }

                },
                onSelectAll:(selected, record,records)=>{
                     let { orgsData = {} } = this.props;
                    if(!selected){
                        orgsData.otherOrgs.map((item,i)=>{
                            item.selectedRoles = []
                        })
                    }
                }
            }
        }
    }
    componentDidMount() {
        let { actions } = this.props;
        actions.getPrivilegeOrgs()
    }
   //多级结构
   multilayerStructure=(record,selectedRowKeys)=>{
    record.children && record.children.map((item) => {
        if(selectedRowKeys.indexOf(item.id) == -1){
            selectedRowKeys.push(item.id);
        }
        if(item.children){
            this.multilayerStructure(item,selectedRowKeys)
        }
    })
    return selectedRowKeys
   }


   componentWillUnmount(){
       
   }
    //确定
    submit() {
        let { params, actions } = this.props;
        let id = params.id
        let dataArry = this.state.dataSourceRight;
        if(dataArry.length==0){
            return ProductReq.tipError('请选择机构或SP')
        }
        actions.saveProductAuth({ 'productScopes': dataArry }, id)

    }
    getRolesFromData(data, result) {
        data.map(item => {
            if (item.selectedRoles && item.selectedRoles.length > 0) {
                item.children.map(role => {
                    if (item.selectedRoles.indexOf(role.id) != -1) {
                        result.push({
                            // orgId: item.id,
                            // orgName: item.name,
                            relatedPathName: item.name + '-' + role.name,
                            relatedId: role.id,
                            relatedName: role.name,
                            relatedPath: item.path,
                            type: "ORG"
                        })
                    }
                })
            }

            if (item.children && item.children.length > 0) {
                this.getRolesFromData(item.children, result);
            }
        })
    }


    getRolesFromData1(data, result, name) {
        data.map(item => {
            item.pname = (name ? name + '-' : '') + item.name;
            if (this.state.rowSelection.selectedRowKeys.indexOf(item.id) != -1) {
                
                result.push({
                    // orgId: item.id,
                    // orgName: item.name,
                    relatedPathName: (name ? name + '-' : '') + item.name,
                    relatedId: item.id,
                    relatedName: item.name,
                    relatedPath: item.path,
                    type: "ORG"
                })
            }

            if (item.children && item.children.length > 0) {
                this.getRolesFromData1(item.children, result, item.pname);
            }
        })
    }

    getSpFromData(data, result) {
        data.map(item => {
            item.map((em, i) => {
                if (em.selectedRoles && em.selectedRoles.length > 0) {
                    result.push({
                        // orgId: item.id,
                        // orgName: item.name,
                        relatedPathName: em.name,
                        relatedId: em.id,
                        relatedName: em.name,
                        relatedPath: '/' + em.id + '/',
                        type: "SP"
                    })
                }
            })

        })
    }
    /**
     * 合并两个表格的选择值
     * 去除重复
     */
    addItem() {
        let dataSourceRight = this.state.dataSourceRight;
        let tempArr = [];
        let { orgsData = {} } = this.props;

        if (orgsData.deprtments) {
            this.getRolesFromData1([orgsData.deprtments], tempArr);
        }
        if (orgsData.otherOrgs) {
            this.getSpFromData([orgsData.otherOrgs], tempArr);
        }

        // 连接处理后的数据到右侧框
        dataSourceRight = dataSourceRight.concat(tempArr);

        // 去除重复的数据，依据机构ID,部门ID,角色ID唯一标识
        for (var i = 0; i < dataSourceRight.length - 1; i++) {
            for (var j = i + 1; j < dataSourceRight.length; j++) {
                if(dataSourceRight[i].relatedId == dataSourceRight[j].relatedId){
                    dataSourceRight.splice(j, 1)
                }
                // if (this.getAKey(dataSourceRight[i]) == this.getAKey(dataSourceRight[j])) {
                // }
            }
        }

        // "roleId": 7, // 角色ID
        // "roleName": "营业员", // 角色名称
        // "orgId": "888", // 组织ID
        // "orgName": "中国银行上海分公司", // 组织名称
        // "departmentId": "8882", // 部门ID
        // "departmentName": "浦东营业部" // 部门名称
        this.setState({
            dataSourceRight
        })
    }

    getAKey(data) {
        let ret = [];

        // ret.push(data.orgId);
        // ret.push(data.departmentId);
        if (data.relatedId) {
            ret.push(data.relatedId);
        }

        return ret.join(',');
    }

    deleteEvent(index) {
        const { dataSourceRight } = this.state;
        dataSourceRight.splice(index, 1)
        this.setState({
            dataSourceRight
        })
    }
    renderOperation(value, index, record) {
        return (
            <Button type='normal' shape="text" onClick={() => this.deleteEvent(index)}>
                删除
            </Button>
        );
    }
    //机构=部门=角色
    renderLevel(record) {
        // return record.name ? record.name:record.departmentName ;
        let result = [];
        record.children && record.children.length > 0 ?
            record.children.map((item) => {
                result.push({
                    value: item.id,
                    label: item.name
                })
            }) : ''
        return (
            <div style={{
                padding: 12
            }}>
                <CheckboxGroup value={record.selectedRoles} dataSource={result} onChange={this.handleRoleChange.bind(this, record)} />
            </div>
        )
    }
    handleRoleChange(record, value, e) {
        record.selectedRoles = value;

        // TODO 全部选中角色后需要选中行记录
        let hasSelectedAll = true;
        record.children.map(item => {
            if (value.indexOf(item.id) == -1) {
                hasSelectedAll = false;
            }
        })
        let rowSelection = this.state.rowSelection;
        if (hasSelectedAll) {
            rowSelection.selectedRowKeys.push(record.id);
        } else {
            let idx = rowSelection.selectedRowKeys.indexOf(record.id);
            if (idx != -1) {
                rowSelection.selectedRowKeys.splice(idx, 1);
            }
        }

        this.setState({
            rowSelection
        })
    }
    changePage(current) {
        this.setState({
            current
        })
    }
    orgNameShow(value, index, record) {
        return record.relatedPathName
        // return `${record.orgName}-${record.relatedName}`;
        // return record.roleName==record.departmentName?record.roleName:(record.roleName?`${record.departmentName}-${record.roleName}`:`${record.departmentName}`)
    }
    /**
     * 渲染
     */
    render() {
        const { dataSourceRight, current } = this.state;
        const { orgsData = {} } = this.props;
        let deprtments = [];
        if (orgsData.deprtments) {
            if (typeof orgsData.deprtments == 'object') {
                deprtments = [orgsData.deprtments];
            }
        }

        return (
            <IceContainer className="pch-container">
                <Title title="权限编辑" />
                <div className="pch-form edit-permission-dialog-content pch-condition">
                    <div className="table-list">
                        <div className="part-l">
                            <Table
                                dataSource={deprtments}
                                primaryKey="id"
                                isTree
                                // expandedRowRender={this.renderLevel.bind(this)}
                                rowSelection={this.state.rowSelection}>
                                <Table.Column title="机构" dataIndex="name" />
                            </Table>
                            <Table dataSource={orgsData.otherOrgs} isTree rowSelection={this.state.rowSelectionTwo}>
                                <Table.Column title="SP" dataIndex="name" />
                            </Table>

                        </div>
                        <div className="btn-wrap">
                            <Button className="add-btn" onClick={this.addItem.bind(this)}>
                                >>
                            </Button>
                        </div>
                        <div className="part-r">
                            <Table dataSource={dataSourceRight}  maxBodyHeight={370}>
                                <Table.Column title="权限" cell={this.orgNameShow} />
                                <Table.Column title="操作" cell={this.renderOperation.bind(this)} />
                            </Table>
                        </div>
                    </div>
                    <div className="container">
                        <div className="next-btn-box pch-form-buttons">
                            {/*<Button type="secondary" className="buttonsSure" onClick={() => this.submit()}>
                                确定
                            </Button> */}
                            <div className="next-btn-box">
                                <Button type="secondary" size="large" onClick={this.submit.bind(this)}>下一步</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </IceContainer>
        )
    }
}
