import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Input, Grid, Select, Button, DatePicker, Form } from '@icedesign/base';
import Req from '../../../reqs/ProcessReq'

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
                tenantId:null,
                productType:null,
                name:''
            },
            prodType:[],
        };
    }
   
    componentDidMount() {
        console.log(this.props)
        // let {params} = this.props
        Req.getProcessProdType().then((res)=>{ //{tenantId:tenantId}
            if(res.code==200){
                let prodType=res.data.productType
                this.setState({
                    prodType
                })
            }
            })
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
        value.tenantId = data.label;

        this.setState({value});
    }

    handleTenantChange(v, data){
        let value  = this.state.value;
        value.productType = data.label;

        this.setState({value});
    }

    render() {
        let {prodType} = this.state
        return (
            <div className="pch-condition pch-condition-padding ">
                <IceFormBinderWrapper value={this.state.value} onChange={this.filterFormChange}>
                    <Form size="large" direction="hoz">
                        <Row wrap>
                            <Col xxs={24} xs={12} l={8} xl={6}>
                                <FormItem {...formItemLayout} label="资方：">
                                    <IceFormBinder name="tenantId">
                                        <Select size="large" placeholder="资方"  onChange={this.handleBusinessTypeChange.bind(this)}>
                                        <Option value='china'>中国银行</Option>
                                        </Select>
                                    </IceFormBinder>
                                </FormItem>
                            </Col>
                            <Col xxs={24} xs={12} l={8} xl={6}>
                                <FormItem {...formItemLayout} label="产品类型：">
                                    <IceFormBinder name="productType">
                                        <Select size="large" placeholder="产品类型" onChange={this.handleTenantChange.bind(this)}>
                                            {
                                                prodType.map((item,i)=>{
                                                   return( <Option value={item.value} key={i}>{item.desc}</Option>)
                                                })
                                            }
                                        </Select>
                                    </IceFormBinder>
                                </FormItem>
                            </Col>
                            <Col xxs={24} xs={12} l={8} xl={6}>
                                <FormItem {...formItemLayout} label="产品名称：">
                                    <IceFormBinder name="name">
                                        <Input size="large" placeholder="产品名称" />
                                    </IceFormBinder>
                                </FormItem>
                            </Col>
                            <Col xxs={24} xs={12} l={8} xl={6}>
                                <FormItem {...formItemLayout} label="&nbsp;" className="pch-condition-operate">
                                    <Button onClick={this.handleSubmit.bind(this)} type="secondary">
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
