import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Input, Grid, Select, Button, DatePicker, Form } from '@icedesign/base';

import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';
import Req from '../../../reqs/ContractReq';

const {Row, Col} = Grid;
const {Option} = Select;
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 14
    }
};
//获取下拉
import { company_type } from '../../../config'

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      value:{},
      typeDataSource:[]
    }
  }
  componentWillMount() {
    this.getTypeSource()
  }
  //查询下拉框
  getTypeSource() {
    Req.getSelectSourceApi()
    .then((res) => {
      const { productType } = res.data;
      this.setState({
        typeDataSource:productType
      })
    })
  }
  //查询
  handleSubmit() {
    this.refs.form.validateAll((errors, values) => {
      this.props.onSubmit && this.props.onSubmit(values);
    });
  }

  render() {
    const { typeDataSource } =this.state;
      return (
        <div className="pch-condition">
            <IceFormBinderWrapper ref="form" value={this.state.value}>
              <Form size="large" direction="hoz">
                <Row wrap>
                  <Col xxs={24} xs={12} l={6} xl={6}>
                    <FormItem {...formItemLayout} label="资方:">
                      <IceFormBinder name="tenantId">
                          <Input size="large" value="中国银行" readonly/>
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                  <Col xxs={24} xs={12} l={6} xl={6}>
                    <FormItem {...formItemLayout} label="产品类型:">
                      <IceFormBinder name="productType">
                        <Select size="large">
                          {
                            typeDataSource.length>0 &&
                            typeDataSource.map((el,index) => (
                              <span key={index} value={el.value}>{el.desc}</span>
                            ))
                          }
                        </Select>
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                  <Col xxs={24} xs={12} l={6} xl={6}>
                    <FormItem {...formItemLayout} label="产品名称:">
                      <IceFormBinder name="name">
                          <Input size="large" />
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                  <Col xxs={24} xs={12} l={6} xl={6}>
                    <FormItem className="pch-condition-operate">
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

export default Filter;
