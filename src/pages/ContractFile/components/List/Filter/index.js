import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Input, Grid, Select, Button, DatePicker, Form } from '@icedesign/base';

import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';

const {Row, Col} = Grid;
const {Option} = Select;
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    }
};

class Filter extends Component {
  constructor() {
    super();
  }
  handleSubmit() {
    this.refs.form.validateAll((errors, values) => {
      this.props.onSubmit && this.props.onSubmit(values);
    });
  }

  render() {
      return (
        <div className="pch-condition">
            <IceFormBinderWrapper ref="form">
              <Form size="large" direction="hoz">
                <Row wrap>
                  <Col span={5}>
                    <FormItem {...formItemLayout} label="贷款编号:">
                      <IceFormBinder name="loanNo">
                          <Input size="large" placeholder="请输入"/>
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                  <Col span={5}>
                    <FormItem {...formItemLayout} label="客户名称:">
                      <IceFormBinder name="name">
                          <Input size="large" placeholder="请输入"/>
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                  <Col span={5}>
                    <FormItem {...formItemLayout} label="证件号码:">
                      <IceFormBinder name="documentCode">
                          <Input size="large" placeholder="请输入"/>
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                  <Col span={5}>
                    <FormItem {...formItemLayout} label="手机号码:">
                      <IceFormBinder name="phone">
                          <Input size="large" placeholder="请输入"/>
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                  <Col span={4}>
                    <FormItem {...formItemLayout} label="">
                      <Button type="secondary" size="large" onClick={this.handleSubmit.bind(this)}>
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
