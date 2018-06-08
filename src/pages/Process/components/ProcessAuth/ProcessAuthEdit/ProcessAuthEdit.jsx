import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { BaseApp } from 'base';
import { } from "@icedesign/base";
import { Button, Grid, Table, Dialog, Form, Feedback, Checkbox } from "@icedesign/base";
import { Title, PchTable, PchPagination } from 'components';
import { PROCESS_VIEW } from '../../../constants/ProcessViewConstant';

const {Row, Col} = Grid;
const {Group : CheckboxGroup} = Checkbox;

import './ProcessAuthEdit.scss';

export default class ProcessAuthEdit extends BaseApp {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            dataSourceRight: [],
            selectedRowOne: [],
            selectedRowTwo: [],
            current: 1,
            rowSelection: {
                selectedRowKeys: [],
                onChange: (selectedRowKeys, records) => {
                    console.log(selectedRowKeys, records)
                    let selectedRowOne = records;
                    records.map((item) => {
                        let result = [];
                        item.roles && item.roles.map((role) => {
                            result.push(role.id);
                        })
                        item.selectedRoles = result;
                    })
                    this.setState({
                        selectedRowOne,
                    });

                    let {rowSelection} = this.state;
                    rowSelection.selectedRowKeys = selectedRowKeys;
                    this.setState({
                        rowSelection
                    });
                },
                onSelect: (selected, record, records) => {
                  if(!selected){
                    record.selectedRoles = [];
                  }

                }
            },
            rowSelectionTwo: {
                selectedRowKeys: [],
                onChange: (selectedRowKeys, records) => {
                    // console.log(records)
                    // let selectedRowTwo = [];
                    // for (var i in records) {
                    //     records[i].departmentName = records[i].name
                    // }
                    // selectedRowTwo.push(...records);
                    // this.setState({
                    //     selectedRowTwo
                    // });

                    let selectedRowTwo = records;
                    records.map((item) => {
                        let result = [];
                        item.roles && item.roles.map((role) => {
                            result.push(role.id);
                        })
                        item.selectedRoles = result;
                    })
                    this.setState({
                        selectedRowTwo,
                    });

                    let {rowSelectionTwo} = this.state;
                    rowSelectionTwo.selectedRowKeys = selectedRowKeys;
                    this.setState({
                        rowSelectionTwo
                    });
                }
            }
        }
    }
    componentDidMount() {}
    componentWillReceiveProps(props) {
        this.setState({
            visible: this.props.visible,
            dataSourceRight: props.data
        })
    }
    onClose() {
        const {visibled, changeView} = this.props;
        Dialog.confirm({
            content: "取消后本次操作将不被保存，您确定吗？",
            onOk: () => {
                this.setState({
                    visible: false
                })
                changeView(PROCESS_VIEW.EDITFORM);
            }
        });
    }
    //确定
    submit() {
        let {formData} = this.props
        let dataArry = this.state.dataSourceRight;
        let datatemp = [];
        // for (var key in dataArry){
        //   datatemp.push({
        //     roleId: dataArry[key].,
        //     roleName: dataArry[key].name,
        //     orgId: dataArry[key].orgId,
        //     orgName: formData.tenantName,
        //     departmentId: dataArry[key].departmentId||dataArry[key].id,
        //     departmentName:dataArry[key].departmentName
        //   })
        // }
        //保存成功提示
        Feedback.toast.show({
            type: 'success',
            content: '保存成功！',
            afterClose: () => {
                this.props.onSave(dataArry)
            },
            duration: 500
        });
    }
    getRolesFromData(data, result){
      data.map(item => {
        if(item.selectedRoles && item.selectedRoles.length > 0){
          item.roles.map(role => {
            if(item.selectedRoles.indexOf(role.id) != -1){
              result.push({
                orgId: item.id,
                orgName: item.name,
                roleId: role.id,
                roleName: role.name
              })
            }
          })
        }

        if(item.children && item.children.length > 0){
          this.getRolesFromData(item.children, result);
        }
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

        if(orgsData.deprtments){
            this.getRolesFromData([orgsData.deprtments], tempArr);
        }
        if(orgsData.otherOrgs){
            this.getRolesFromData([orgsData.otherOrgs], tempArr);
        }

        console.log(tempArr);

        // tempArr.push(...this.state.selectedRowTwo, ...this.state.selectedRowOne);

        // tempArr.map((item) => {
        //     // 转换角色字段成保存需要的数据结构（）
        //     item.orgId = item.organizationId;
        //     item.roleId = item.id;
        //     item.roleName = item.name;
        // })

        // 连接处理后的数据到右侧框
        dataSourceRight = dataSourceRight.concat(tempArr);

        // 去除重复的数据，依据机构ID,部门ID,角色ID唯一标识
        for (var i = 0; i < dataSourceRight.length - 1; i++) {
            for (var j = i + 1; j < dataSourceRight.length; j++) {

                if (this.getAKey(dataSourceRight[i]) == this.getAKey(dataSourceRight[j])) {
                    dataSourceRight.splice(j, 1)
                }
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

        ret.push(data.orgId);
        ret.push(data.departmentId);
        if (data.roleId) {
            ret.push(data.roleId);
        }

        return ret.join(',');
    }

    deleteEvent(index) {
        const {dataSourceRight} = this.state;
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
        record.roles && record.roles.map((item) => {
            result.push({
                value: item.id,
                label: item.name
            })
        })
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
        record.roles && record.roles.map(item => {
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
        return `${record.orgName}-${record.roleName}`;
    // return record.roleName==record.departmentName?record.roleName:(record.roleName?`${record.departmentName}-${record.roleName}`:`${record.departmentName}`)
    }
    /**
     * 渲染
     */
    render() {
        console.log(this.props)
        const {dataSourceRight, current} = this.state;
        const {visible, changeView, formData, orgsData = {}} = this.props;
        let deprtments = [];
        if (orgsData.deprtments) {
            if (typeof orgsData.deprtments == 'object') {
                deprtments = [orgsData.deprtments];
            }
        }

        return (
            <IceContainer className="pch-container" style={{
                                                   display: visible ? '' : 'none'
                                               }}>
                <Title title="权限编辑" />
                <div className="pch-form edit-permission-dialog-content pch-condition">
                    <Form size="large" direction="hoz">
                        <Row className="row">
                            <Col span={6}>
                                业务类型:
                                {formData.businessTypeName}
                            </Col>
                            <Col span={6}>
                                资方:
                                {formData.tenantName}
                            </Col>
                            <Col span={6}>
                                流程名称:
                                {formData.processName}
                            </Col>
                        </Row>
                    </Form>
                    <div className="center">
                        中行进件-权限配置
                    </div>
                    <div className="table-list">
                        <div className="part-l">
                            <Table
                                dataSource={deprtments}
                                primaryKey="id"
                                isTree
                                expandedRowRender={this.renderLevel.bind(this)}
                                rowSelection={this.state.rowSelection}>
                                <Table.Column title="机构" dataIndex="name" />
                            </Table>
                            <Table dataSource={orgsData.otherOrgs} isTree rowSelection={this.state.rowSelectionTwo}>
                                <Table.Column title="其他机构" dataIndex="name" />
                            </Table>
                        </div>
                        <div className="btn-wrap">
                            <Button className="add-btn" onClick={this.addItem.bind(this)}>
                                >>
                            </Button>
                        </div>
                        <div className="part-r">
                            <Table dataSource={dataSourceRight} fixedHeader maxBodyHeight={370}>
                                <Table.Column title="权限" cell={this.orgNameShow} />
                                <Table.Column title="操作" cell={this.renderOperation.bind(this)} />
                            </Table>
                        </div>
                    </div>
                    <div className="container">
                        <div className="next-btn-box pch-form-buttons">
                            {/* <Button type="primary" className="return-btn buttonsBack" onClick={changeView.bind(this, PROCESS_VIEW.EDITFORM)}> */}
                            <Button type="normal" className="return-btn buttonsBack" onClick={() => this.onClose()}>
                                取消
                            </Button>
                            <Button type="secondary" className="buttonsSure" onClick={() => this.submit()}>
                                确定
                            </Button>
                        </div>
                    </div>
                </div>
            </IceContainer>
        )
    }
}
