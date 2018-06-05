import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Input, Grid, Select, Button, DatePicker, Form } from '@icedesign/base';

import { FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder,
} from '@icedesign/form-binder';
import { BaseCondition } from 'base';

const {Row, Col} = Grid;
const {Option} = Select;
const FormItem = Form.Item;

class Filter extends BaseCondition {
    constructor() {
        super();
        this.state = {
            value: {}
        }
    }
    //新增
    handleAdd() {
        let path = {
            pathname: 'contract/add',
            state: {
                code: '21',
                name: '22'
            }
        }
        hashHistory.push(path)
    }

    //重置
    resetSubmit() {
        this.setState({
            value: {
                templateCode: '',
                templateName: ''
            }
        })
        this.props.onSubmit && this.props.onSubmit();
    }

    render() {
        return (
            <div className="pch-condition">
                <IceFormBinderWrapper ref="form" value={this.state.value} onChange={this.filterFormChange.bind(this)}>
                    <Form size="large" direction="hoz">
                        <Row wrap>
                            <Col {...this.colspans}>
                                <FormItem {...this.formItemLayout} label="模板编号:">
                                    <IceFormBinder name="templateCode">
                                        <Input size="large" placeholder="请输入" />
                                    </IceFormBinder>
                                </FormItem>
                            </Col>
                            <Col {...this.colspans}>
                                <FormItem {...this.formItemLayout} label="模板名称:">
                                    <IceFormBinder name="templateName">
                                        <Input size="large" placeholder="请输入" />
                                    </IceFormBinder>
                                </FormItem>
                            </Col>
                            <Col {...this.colspans}>
                                <FormItem className="pch-condition-operate">
                                    <Button onClick={this.handleSubmit.bind(this)} type="secondary" htmlType="submit">
                                        查询
                                    </Button>
                                    <Button onClick={this.resetSubmit.bind(this)} type="secondary">
                                        重置
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

export default Filter;
