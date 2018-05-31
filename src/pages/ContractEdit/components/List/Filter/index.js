import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Input, Grid, Select, Button, DatePicker, Form } from '@icedesign/base';

import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';
import { BaseCondition } from 'base';

const {Row, Col} = Grid;
const {Option} = Select;
const FormItem = Form.Item;

class Filter extends BaseCondition {
  constructor() {
    super();
    this.state ={
      value:{}
    }
  }

  render() {
      return (
        <div className="pch-condition">
            <IceFormBinderWrapper ref="form" value={this.state.value} onChange={this.filterFormChange.bind(this)}>
              <Form size="large" direction="hoz">
                <Row wrap>
                  <Col {...this.colspans}>
                    <FormItem {...this.formItemLayout} label="贷款编号:">
                      <IceFormBinder name="loanCode">
                          <Input size="large" placeholder="请输入"/>
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                  <Col {...this.colspans}>
                    <FormItem {...this.formItemLayout} label="客户名称:">
                      <IceFormBinder name="name">
                          <Input size="large" placeholder="请输入"/>
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                  <Col {...this.colspans}>
                    <FormItem {...this.formItemLayout} label="证件号码:">
                      <IceFormBinder name="cardNo">
                          <Input size="large" placeholder="请输入"/>
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                  <Col {...this.colspans}>
                    <FormItem {...this.formItemLayout} label="手机号码:">
                      <IceFormBinder name="phone">
                          <Input size="large" placeholder="请输入"/>
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                  <Col {...this.colspans}>
                    <FormItem {...this.formItemLayout} label="">
                      <Button type="secondary" size="large" onClick={this.handleSubmit.bind(this)} htmlType="submit">
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
