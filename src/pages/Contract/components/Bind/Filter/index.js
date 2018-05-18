import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Input, Grid, Select, Button, DatePicker, Form } from '@icedesign/base';

import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';
import { BaseCondition } from 'base'
import Req from '../../../reqs/ContractReq';

const {Row, Col} = Grid;
const {Option} = Select;
const FormItem = Form.Item;

class Filter extends BaseCondition {
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
            <IceFormBinderWrapper ref="form" value={this.state.value} onChange={this.filterFormChange.bind(this)}>
              <Form size="large" direction="hoz">
                <Row wrap>
                  <Col {...this.colspans}>
                    <FormItem {...this.formItemLayout} label="资方:">
                      <IceFormBinder name="tenantId">
                          <Input size="large" value="中国银行" readonly/>
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                  <Col {...this.colspans}>
                    <FormItem {...this.formItemLayout} label="产品类型:">
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
                  <Col {...this.colspans}>
                    <FormItem {...this.formItemLayout} label="产品名称:">
                      <IceFormBinder name="name">
                          <Input size="large" placeholder="请输入" />
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                  <Col {...this.colspans}>
                    <FormItem className="pch-condition-operate">
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

export default Filter;
