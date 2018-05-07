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
//获取下拉
import { company_process } from '../../../../config'

export default class Filter extends Component {
    constructor() {
        super();

        // 搜索框表单的对应的值，可以设置默认值
        this.state = {
            value: {
                icType: '',
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
    //新增流程
    handleSubmitAddnew(){
        console.log('handleSubmitAddnew....')
    }
    //流程详情
    handleSubmitDetail(){
        console.log('handleSubmitDetail....')
    }
    handleBusinessTypeChange(v, data){
        let value  = this.state.value;
        value.icType = data.label;

        this.setState({value});
    }

    render() {
        return (
            <div className="pch-condition">
                <IceFormBinderWrapper value={this.state.value} onChange={this.filterFormChange}>
                    <Form size="large" direction="hoz">
                        <Row wrap>
                            <Col xxs={24} xs={12} l={8} xl={6}>
                                <FormItem {...formItemLayout} label="业务类型：">
                                    <IceFormBinder name="type">
                                    <Input size="large" placeholder="业务类型"/>
                                    </IceFormBinder>
                                </FormItem>
                            </Col>
                            <Col xxs={24} xs={12} l={8} xl={6}>
                                <FormItem {...formItemLayout} label="资方：">
                                    <IceFormBinder name="zifang">
                                        <Input size="large" placeholder="资方" />
                                    </IceFormBinder>
                                </FormItem>
                            </Col>
                            <Col xxs={24} xs={12} l={8} xl={6}>
                                <FormItem {...formItemLayout} label="产品类型：">
                                    <IceFormBinder name="prodType">
                                        <Input size="large" placeholder="产品类型" />
                                    </IceFormBinder>
                                </FormItem>
                            </Col>
                            <Col xxs={24} xs={12} l={8} xl={6}>
                                <FormItem {...formItemLayout} label="产品名称：">
                                    <IceFormBinder name="prodName">
                                        <Input size="large" placeholder="产品名称" />
                                    </IceFormBinder>
                                </FormItem>
                            </Col>
                            <Col xxs={24} xs={12} l={8} xl={6}>
                                <FormItem {...formItemLayout} label="流程名称：">
                                    <IceFormBinder name="processName">
                                         <Select size="large" placeholder="请选择" dataSource={company_process} onChange={this.handleBusinessTypeChange.bind(this)}>
                                        </Select>
                                    </IceFormBinder>
                                </FormItem>
                            </Col>
                            <Col xxs={24} xs={12} l={8} xl={6}>
                                <FormItem {...formItemLayout} label="&nbsp;" className="pch-condition-operate">
                                    <Button onClick={this.handleSubmitAddnew.bind(this)} type="secondary" style={{'background':'#1AA8F0'}}>
                                        新增流程
                                    </Button>
                                </FormItem>
                            </Col>
                            <Col xxs={24} xs={12} l={8} xl={6}>
                                <FormItem {...formItemLayout} label="&nbsp;" className="pch-condition-operate" >
                                    <Button onClick={this.handleSubmitDetail.bind(this)} type="secondary" style={{'background':'#1AA8F0'}}>
                                        查看流程详情
                                    </Button>
                                </FormItem>
                            </Col>
                        
                            <div className="next-btn-box">
                                <Button type="secondary" size="large" onClick={this.handleSubmit.bind(this)}>下一步</Button>
                            </div>
                        </Row>
                    </Form>
                </IceFormBinderWrapper>
            </div>
            );
    }
}
