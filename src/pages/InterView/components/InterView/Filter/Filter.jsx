import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Input, Grid, Select, Button, DatePicker, Form } from '@icedesign/base';

import { FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder,
} from '@icedesign/form-binder';
import { BaseCondition } from 'base';

const {Row, Col} = Grid;
const {Option} = Select;
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 12
    }
};
//获取下拉
import { company_type } from '../../../config'

export default class Filter extends BaseCondition {
    constructor() {
        super();

        // 搜索框表单的对应的值，可以设置默认值
        this.state = {
            value: {
                icType: null,
                icNo: '',
                userName: '',
            }
        };
    }

    filterFormChange = (value) => {
        this.setState({
            value: value,
        });
    }

    handleSubmit() {
        this.props.onSubmit && this.props.onSubmit(this.state.value);
    }

    render() {
        return (
            <div className="pch-condition">
                <IceFormBinderWrapper value={this.state.value} onChange={this.filterFormChange}>
                    <Form size="large" direction="hoz">
                        <Row wrap>
                            <Col {...this.colspans}>
                                <FormItem {...this.formItemLayout} label="证件类型：">
                                    <IceFormBinder name="icType">
                                        <Select size="large" hasClear={true} placeholder="请选择" dataSource={company_type}>
                                        </Select>
                                    </IceFormBinder>
                                </FormItem>
                            </Col>
                            <Col {...this.colspans}>
                                <FormItem {...this.formItemLayout} label="证件号码：">
                                    <IceFormBinder name="icNo">
                                        <Input size="large" placeholder="证件号码" />
                                    </IceFormBinder>
                                </FormItem>
                            </Col>
                            <Col {...this.colspans}>
                                <FormItem {...this.formItemLayout} label="真实姓名：">
                                    <IceFormBinder name="userName">
                                        <Input size="large" placeholder="真实姓名" />
                                    </IceFormBinder>
                                </FormItem>
                            </Col>
                            <Col {...this.colspans}>
                                <FormItem {...this.formItemLayout} className="pch-condition-operate">
                                    <Button onClick={this.handleSubmit.bind(this)} type="secondary" htmlType="submit">
                                        查询
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
