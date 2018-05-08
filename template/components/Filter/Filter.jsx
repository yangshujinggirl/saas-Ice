import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Input, Grid, Select, Button, DatePicker, Form } from '@icedesign/base';

import { FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder,
} from '@icedesign/form-binder';

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

export default class Filter extends Component {
    constructor() {
        super();

        // 搜索框表单的对应的值，可以设置默认值
        this.state = {
            value: {
                businessTypeId: '10',
                businessTypeName: '营业执照',
                tenantId: 'small',
                tenantName: 'Small',
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

    filterFormChange = (value) => {
        this.setState({
            value: value,
        });
    }

    handleSubmit() {
        this.props.onSubmit && this.props.onSubmit(this.state.value);
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
                <IceFormBinderWrapper value={this.state.value} onChange={this.filterFormChange}>
                    <Form size="large" direction="hoz">
                        <Row wrap>
                            <Col xxs={24} xs={12} l={8} xl={6}>
                                <FormItem {...formItemLayout} label="资方：">
                                    <IceFormBinder name="tenantId">
                                        <Select size="large" placeholder="请选择" onChange={this.handleTenantChange.bind(this)}>
                                            <Option value="small">
                                                Small
                                            </Option>
                                            <Option value="medium">
                                                Medium
                                            </Option>
                                            <Option value="large">
                                                Large
                                            </Option>
                                        </Select>
                                    </IceFormBinder>
                                </FormItem>
                            </Col>
                            <Col xxs={24} xs={12} l={8} xl={6}>
                                <FormItem {...formItemLayout} label="流程名称：">
                                    <IceFormBinder name="processName">
                                        <Input size="large" placeholder="流程名称" />
                                    </IceFormBinder>
                                </FormItem>
                            </Col>
                            <Col xxs={24} xs={12} l={8} xl={6}>
                                <FormItem {...formItemLayout} label="&nbsp;" className="pch-condition-operate">
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
