import React, { Component } from 'react';
import {hashHistory} from 'react-router';
import { Input, Grid, Select, Button, DatePicker, Form } from '@icedesign/base';

// form binder 详细用法请参见官方文档
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
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
  static displayName = 'Filter';

  handleAdd(){
    hashHistory.push('/demo/add');
  }

  render() {
    return (
      <div className="pch-condition">
      <IceFormBinderWrapper
        value={this.props.value}
        onChange={this.props.onChange}
      >
        <Form size="large" direction="hoz">
          <Row wrap>
            <Col xxs={24} xs={12} l={8} xl={6} >
              <FormItem {...formItemLayout} label="所属应用：">
              <IceFormBinder>
                <Input name="app" size="large" />
              </IceFormBinder>
              </FormItem>
            </Col>
            <Col xxs={24} xs={12} l={8} xl={6} >
              <FormItem {...formItemLayout} label="分类ID：">
              <IceFormBinder>
                <Input name="id" size="large" />
              </IceFormBinder>
              </FormItem>
            </Col>
            <Col xxs={24} xs={12} l={8} xl={6} >
            <FormItem {...formItemLayout} label="标签ID：">
              <IceFormBinder>
                <Input name="tag" size="large" />
              </IceFormBinder>
              </FormItem>
            </Col>
            <Col xxs={24} xs={12} l={8} xl={6} >
              <FormItem {...formItemLayout} label="开始时间：">
              <IceFormBinder
                valueFormatter={(date, strValue) => {
                  return strValue;
                }}
              >
                <DatePicker name="startTime" size="large" />
              </IceFormBinder>
              </FormItem>
            </Col>
            <Col xxs={24} xs={12} l={8} xl={6} >
            <FormItem {...formItemLayout} label="结束时间：">
              <IceFormBinder
                valueFormatter={(date, strValue) => {
                  return strValue;
                }}
              >
                <DatePicker name="endTime" size="large" />
              </IceFormBinder>
              </FormItem>
            </Col>
            <Col xxs={24} xs={12} l={8} xl={6}>
            <FormItem {...formItemLayout} label="尺寸：">
              <IceFormBinder>
                <Select
                  name="size"
                  size="large"
                  placeholder="请选择"
                >
                  <Option value="small">Small</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="large">Large</Option>
                </Select>
              </IceFormBinder>
              </FormItem>
            </Col>
            <Col xxs={24} xs={12} l={8} xl={6}>
              <FormItem {...formItemLayout} label="删除状态：">
              <IceFormBinder>
                <Select size="large" name="status">
                  <Option value="success">成功</Option>
                  <Option value="failed">失败</Option>
                </Select>
              </IceFormBinder>
              </FormItem>
            </Col>
            <Col xxs={24} xs={12} l={8} xl={6}>
            <FormItem {...formItemLayout} label="讨论ID：">
              <IceFormBinder name="commentId">
                <Input name="commentId" size="large" />
              </IceFormBinder>
              </FormItem>
            </Col>
            <Col xxs={24} xs={12} l={8} xl={6}>
              <FormItem {...formItemLayout} label="置顶：">
              <IceFormBinder>
                <Select
                  size="large"
                  name="isStick"
                  placeholder="请选择"
                >
                  <Option value="all">不限</Option>
                  <Option value="stick">置顶</Option>
                  <Option value="not-stick">不置顶</Option>
                </Select>
              </IceFormBinder>
              </FormItem>
            </Col>
            <Col xxs={24} xs={12} l={8} xl={6}></Col>
            <Col xxs={24} xs={12} l={8} xl={6}></Col>
            <Col xxs={24} xs={24} l={8} xl={6}>
            <FormItem {...formItemLayout} label="&nbsp;">
                <Button
                  onClick={this.props.onSubmit}
                  type="secondary"
                >
                  确定
                </Button>
                <Button
                  onClick={this.handleAdd}
                  type="primary"
                  style={{ marginLeft: '10px' }}
                >
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
