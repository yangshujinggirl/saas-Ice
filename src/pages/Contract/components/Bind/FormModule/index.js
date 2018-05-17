import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as  IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import { hashHistory } from 'react-router';
import { BaseApp } from 'base'
import { Title, PchTable, PchPagination } from 'components';

import {
  Input,
  Button,
  Select,
  Grid,
  Table,
  Form,
  Upload
} from '@icedesign/base';

const { Row, Col } = Grid;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 }
};
const formItemLayoutLine = {
  labelCol: { span: 3 },
  wrapperCol: { span: 8 }
};


class FormModule extends BaseApp {
  render() {
    return(
      <Row wrap>
        <Col span="24">
          <FormItem {...formItemLayoutLine} label='合同编号'>
              <IceFormBinder
                required
                name="code"
                message="合同编号不能为空"
                >
                  <Select
                    size="large"
                    style={{width:'100%'}}
                    placeholder="请输入"
                    >
                    <div value='营业执照' key='营业执照'>营业执照</div>
                    <div value='公司' key='公司'>公司</div>
                    <div value='经销商' key='经销商'>经销商</div>
                  </Select>
              </IceFormBinder>
              <div><IceFormError name="code" /></div>
            </FormItem>
          <IceFormError name="name"/>
        </Col>
        <Col span="24">
          <FormItem {...formItemLayoutLine} label='甲方（出租人）'>
              <IceFormBinder
                name="code">
                <Input value="联鑫（中国）融资租赁有限公司"/>
              </IceFormBinder>
            </FormItem>
          <IceFormError name="name"/>
        </Col>
        <Col span="6">
          <FormItem {...formItemLayout} label='证件类型'>
              <IceFormBinder
                name="code">
                <Select
                  size="large"
                  style={{width:'100%'}}
                  placeholder="请输入"
                  >
                  <div value='营业执照' key='营业执照'>营业执照</div>
                  <div value='公司' key='公司'>公司</div>
                  <div value='经销商' key='经销商'>经销商</div>
                </Select>
              </IceFormBinder>
            </FormItem>
          <IceFormError name="name"/>
        </Col>
        <Col span="6">
          <FormItem {...formItemLayout} label='证件号码'>
              <IceFormBinder
                name="code">
                <Input value="联鑫（中国）融资租赁有限公司"/>
              </IceFormBinder>
            </FormItem>
          <IceFormError name="name"/>
        </Col>
      </Row>
    )
  }
}

export default FormModule;
