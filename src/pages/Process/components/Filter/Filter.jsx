import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Input, Grid, Select, Button, DatePicker, Form } from '@icedesign/base';

import { FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder,
} from '@icedesign/form-binder';
import { BaseCondition } from 'base';

const {Row, Col} = Grid;
const {Option} = Select;
const FormItem = Form.Item;

//获取下拉
import { COMPANY_TYPE } from '../../constants/CompanyTypeConstant'
import SpDataSource from '../../utils/SpDataSource'

export default class Filter extends BaseCondition {
    constructor() {
        super();

        // 搜索框表单的对应的值，可以设置默认值
        // 业务类型默认选中“贷款业务”
        // 资方数据受登录用户权限限制，即获取当前登录用户的资方信息，只展示一条数据
        this.state = {
            value: {
                businessTypeId: '1',
                businessTypeName: '贷款业务',
                tenantId: this.SpDataSource.defaultValue,
                tenantName: this.SpDataSource.defaultLabel,
                processName: '',
            }
        };
    }

    handleAdd() {
        let path = {
            pathname: 'process/add',
            state: this.state.value
        }
        hashHistory.push(path)
    }

    handleBusinessTypeChange(v, data){
        let value  = this.state.value;
        value.businessTypeName = data.label;

        this.setState({value});
    }

    handleTenantChange(v, data){
        let value  = this.state.value;
        value.tenantName = data.label;

        this.setState({value});
    }

    render() {
        return (
            <div className="pch-condition">
                <IceFormBinderWrapper value={this.state.value} onChange={this.filterFormChange.bind(this)}>
                    <Form size="large" direction="hoz">
                        <Row wrap>
                            <Col {...this.colspans}>
                                <FormItem {...this.formItemLayout} label="业务类型：">
                                    <IceFormBinder name="businessTypeId">
                                        <Select size="large" placeholder="请选择" dataSource={COMPANY_TYPE} onChange={this.handleBusinessTypeChange.bind(this)} />
                                    </IceFormBinder>
                                </FormItem>
                            </Col>
                            <Col {...this.colspans}>
                                <FormItem {...this.formItemLayout} label="资方：">
                                    <IceFormBinder name="tenantId">
                                    <Select size="large" placeholder="请选择" dataSource={this.SpDataSource.dataSource} onChange={this.handleTenantChange.bind(this)} />
                                    </IceFormBinder>
                                </FormItem>
                            </Col>
                            <Col {...this.colspans}>
                                <FormItem {...this.formItemLayout} label="流程名称：">
                                    <IceFormBinder name="processName">
                                        <Input size="large" placeholder="流程名称" />
                                    </IceFormBinder>
                                </FormItem>
                            </Col>
                            <Col {...this.colspans}>
                                <FormItem {...this.formItemLayout2} className="pch-condition-operate">
                                    <Button onClick={this.handleSubmit.bind(this)} type="secondary" htmlType="submit">
                                        查询
                                    </Button>
                                    <Button onClick={this.handleAdd.bind(this)} type="primary">
                                        新增
                                    </Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </IceFormBinderWrapper>
            </div>
            );
    }
}
