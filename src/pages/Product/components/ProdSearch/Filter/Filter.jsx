import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Input, Grid, Select, Button, DatePicker, Form } from '@icedesign/base';

import { FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder,
} from '@icedesign/form-binder';
import { BaseCondition } from 'base';

const {Row, Col} = Grid;
const {Option} = Select;
const FormItem = Form.Item;

export default class Filter extends BaseCondition {
    constructor() {
        super();

        // 搜索框表单的对应的值，可以设置默认值
        this.state = {
            value: {
            }
        };
    }

    handleAdd() {
        let path = {
            pathname: 'product/add',
            state: this.state.value
        }
        hashHistory.push(path)
    }

    render() {
        return (
            <div className="pch-condition">
                <IceFormBinderWrapper value={this.state.value} onChange={this.filterFormChange.bind(this)}>
                    <Form size="large" direction="hoz">
                        <Row wrap>
                            <Col {...this.colspans}>
                                <FormItem {...this.formItemLayout} label="产品编号：">
                                    <IceFormBinder name="productCode">
                                        <Input size="large" placeholder="产品编号" />
                                    </IceFormBinder>
                                </FormItem>
                            </Col>
                            <Col {...this.colspans}>
                                <FormItem {...this.formItemLayout} label="产品名称：">
                                    <IceFormBinder name="name">
                                        <Input size="large" placeholder="产品名称" />
                                    </IceFormBinder>
                                </FormItem>
                            </Col>
                            <Col {...this.colspans}>
                                <FormItem {...this.formItemLayout} label="产品类型：">
                                    <IceFormBinder name="productType">
                                        <Select placeholder="请选择" hasClear={true} size="large">
                                            <Option value="NEW_CAR_LOAN">
                                                新车贷款
                                            </Option>
                                            <Option value="NEW_CAR_RENTAL">
                                                新车租赁
                                            </Option>
                                            <Option value="SECONDHAND_CAR_LOAN">
                                                二手车贷款
                                            </Option>
                                            <Option value="SECONDHAND_CAR_RENTAL">
                                                二手车租赁
                                            </Option>
                                            <Option value="CAR_MORTGAGE_LOAN">
                                                汽车抵押贷款
                                            </Option>
                                            <Option value="CONSUMER_LOAN">
                                                消费贷款
                                            </Option>
                                        </Select>
                                    </IceFormBinder>
                                </FormItem>
                            </Col>
                            <Col {...this.colspans}>
                                <FormItem {...this.formItemLayout} label="状态：">
                                    <IceFormBinder name="status">
                                        <Select placeholder="请选择" hasClear={true} size="large">
                                            <Option value="1">
                                                生效
                                            </Option>
                                            <Option value="0">
                                                关闭
                                            </Option>
                                        </Select>
                                    </IceFormBinder>
                                </FormItem>
                            </Col>
                            <Col {...this.colspans}>
                                <FormItem {...this.formItemLayout} label="合同名称：">
                                    <IceFormBinder name="contractDisplayName">
                                        <Input size="large" placeholder="合同名称" />
                                    </IceFormBinder>
                                </FormItem>
                            </Col>
                            <Col {...this.colspans}>
                                <FormItem {...this.formItemLayout2} className="pch-condition-operate">
                                    <Button onClick={this.handleSubmit.bind(this)} type="secondary">
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
