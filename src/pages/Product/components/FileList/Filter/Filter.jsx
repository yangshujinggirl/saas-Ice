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

    addNewItem() {
    	// TODO 是否需要重置
        // this.props.actions && this.props.actions.changeFileDetail({
        //     dataType: '',
        //     name: '',
        //     collectionDetails: [{
        //         dataName: '',
        //         fileSize: undefined,
        //         fileType: ''
        //     }]
        // })
        hashHistory.push(`/product/filelistnew`)
    }

    render() {
        return (
            <IceFormBinderWrapper value={this.state.value} onChange={this.filterFormChange.bind(this)}>
                <div className="pch-condition">
                    <Form size="large" direction="hoz">
                        <Row wrap>
                            <Col {...this.colspans}>
                                <FormItem {...this.formItemLayout} label="清单类型：">
                                    <IceFormBinder name="dataType">
                                        <Select placeholder="请选择" hasClear={true} size="large">
                                            <Option value="产品进件">
                                                产品进件
                                            </Option>
                                        </Select>
                                    </IceFormBinder>
                                </FormItem>
                            </Col>
                            <Col {...this.colspans}>
                                <FormItem {...this.formItemLayout} label="清单名称：">
                                    <IceFormBinder name="name">
                                        <Input size="large" placeholder="清单名称" />
                                    </IceFormBinder>
                                </FormItem>
                            </Col>
                            <Col {...this.colspans}>
                                <FormItem {...this.formItemLayout} className="pch-condition-operate">
                                    <Button type="secondary" htmlType='submit' onClick={this.handleSubmit.bind(this)}>
                                        查询
                                    </Button>
                                    <Button type="primary" onClick={this.addNewItem.bind(this)}>
                                        新增
                                    </Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </IceFormBinderWrapper>
            );
    }
}
