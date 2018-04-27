import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Input, Grid, Select, Button, DatePicker, Form } from '@icedesign/base';

// form binder 详细用法请参见官方文档
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
    static displayName = 'Filter';

    handleAdd() {
        hashHistory.push('/demo/add');
    }

    render() {
        return (
            <div className="pch-condition">
                <IceFormBinderWrapper
                    value={this.props.value}
                    onChange={this.props.onChange}>
                    <Form
                        size="large"
                        direction="hoz">
                        <Row wrap>
                            <Col
                                xxs={24}
                                xs={12}
                                l={8}
                                xl={6}>
                                <FormItem
                                    {...formItemLayout}
                                    label="业务类型：">
                                    <IceFormBinder name="type">
                                        <Select
                                            size="large"
                                            placeholder="请选择">
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
                            <Col
                                xxs={24}
                                xs={12}
                                l={8}
                                xl={6}>
                                <FormItem
                                    {...formItemLayout}
                                    label="资方：">
                                    <IceFormBinder name="lenderType">
                                        <Select
                                            size="large"
                                            placeholder="请选择">
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
                            <Col
                                xxs={24}
                                xs={12}
                                l={8}
                                xl={6}>
                                <FormItem
                                    {...formItemLayout}
                                    label="流程名称：">
                                    <IceFormBinder>
                                        <Input
                                            name="name"
                                            size="large" />
                                    </IceFormBinder>
                                </FormItem>
                            </Col>
                            <Col
                                xxs={24}
                                xs={12}
                                l={8}
                                xl={6}>
                                <FormItem
                                    {...formItemLayout}
                                    label="&nbsp;">
                                    <Button
                                        onClick={this.props.onSubmit}
                                        type="secondary">
                                        查询
                                    </Button>
                                    <Button
                                        onClick={this.handleAdd}
                                        type="primary"
                                        style={{
                                                   marginLeft: '10px'
                                               }}>
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
