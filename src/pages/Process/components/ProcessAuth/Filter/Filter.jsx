import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Input, Grid, Select, Button, DatePicker, Form } from '@icedesign/base';

import {
    FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;
const { Option } = Select;
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
                name: '',
                idNo: '',
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

    // handleBusinessTypeChange(v, data){
    //     let value  = this.state.value;
    //     value.icType = data.label;

    //     this.setState({value});
    // }

    render() {
        return (
            <div className="pch-condition">
                <IceFormBinderWrapper value={this.state.value} onChange={this.filterFormChange}>
                    <Form size="large" direction="hoz">
                        <Row className="row">
                            <Col span={6}>
                                业务类型:贷款业务类型
                            </Col>
                                <Col span={6}>
                                    资方:中国银行
                            </Col>
                                <Col span={6}>
                                    产品类型:新车贷
                            </Col>
                                <Col span={6}>
                                    产品名称:豪华车1
                            </Col>
                        </Row>
                    </Form>
                </IceFormBinderWrapper>
            </div>
        );
    }
}
