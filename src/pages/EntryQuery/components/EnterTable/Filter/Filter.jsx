import React, { Component } from 'react';
import { Form, Input, Grid, Select, Button, DatePicker,Feedback,Field} from '@icedesign/base';

// form binder 详细用法请参见官方文档
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;
const { Option } = Select;
const FormItem = Form.Item;
const Toast = Feedback.toast;

const formItemLayout = {
  labelCol: {
    span: 10
  },
  wrapperCol: {
    span: 12
  }
};

export default class Filter extends Component {
  static displayName = 'Filter';
  field = new Field(this);
  constructor() {
    super();

    // 搜索框表单的对应的值，可以设置默认值
    this.state = {
      value: {
        limit : 10,
      }
    };
  }

  submit = () =>{

    this.props.onSubmit && this.props.onSubmit(this.state.value);

  }
  filterFormChange = (value) => {
    this.setState({
      value: value,
    });
  }
  render() {
    return (
      <div className="pch-condition">
        <IceFormBinderWrapper value={this.state.value} onChange={this.filterFormChange}>
          <Form size="large" direction="hoz">
            <Row wrap>
              <Col s="8" l="6">
                <FormItem {...formItemLayout} label="贷款编号：">
                  <IceFormBinder
                    name="code"
                  >
                    <Input size="large" placeholder="贷款编号" />
                  </IceFormBinder>
                </FormItem>

              </Col>
              <Col s="8" l="6">
                <FormItem {...formItemLayout} label="主贷人姓名：">
                  <IceFormBinder
                    name="borrowerName"
                  >
                    <Input size="large" placeholder="主贷人姓名" />
                  </IceFormBinder>
                </FormItem>
              </Col>
              <Col s="8" l="6">
                <FormItem {...formItemLayout} label="申请开始时间：">
                  <IceFormBinder
                    name="submitStart"
                  >
                    <DatePicker
                      size="large"
                      style={{width:"100%"}}
                      placeholder="申请开始时间"
                    />
                  </IceFormBinder>
                </FormItem>
              </Col>
              <Col s="8" l="6">
                <FormItem {...formItemLayout} label="申请结束时间：">
                  <IceFormBinder
                    name="submitEnd"
                  >
                    <DatePicker
                      size="large"
                      style={{width:"100%"}}
                      placeholder="申请结束时间" />
                  </IceFormBinder>
                </FormItem>
              </Col>
              <Col s="8" l="6">
                <FormItem {...formItemLayout} label="贷款状态：">
                  <IceFormBinder
                    name="exhibitionHallName"
                  >
                    <Input size="large" placeholder="贷款状态" />
                  </IceFormBinder>
                </FormItem>
              </Col>
              <Col s="8" l="6">
                <FormItem {...formItemLayout} label="展厅名称：">
                  <IceFormBinder
                    name="exhibitionHallName"
                  >
                    <Input size="large" placeholder="展厅名称" />
                  </IceFormBinder>
                </FormItem>
              </Col>
              <Col s="8" l="6">
              </Col>
              <Col s="8" l="6">
                <FormItem {...formItemLayout} label="&nbsp;" className="pch-condition-operate">
                  <Button onClick={this.submit.bind(this)} type="secondary">
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
