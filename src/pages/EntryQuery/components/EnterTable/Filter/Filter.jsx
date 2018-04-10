import React, { Component } from 'react';
import { Form, Input, Grid, Select, Button, DatePicker } from '@icedesign/base';

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

  render() {
    return (
      <IceFormBinderWrapper
        value={this.props.value}
        onChange={this.props.onChange}
      >
        <div className="pch-condition">
          <Form
            size="large"
            direction="hoz"
            >
            <Row>
              <Col s="8" l="8">
                <FormItem {...formItemLayout} label="贷款编号：">
                  <IceFormBinder
                    name="productCode"
                  >
                    <Input size="large" placeholder="贷款编号" />
                  </IceFormBinder>
                </FormItem>

              </Col>
              <Col s="8" l="8">
                <FormItem {...formItemLayout} label="主贷人姓名：">
                  <IceFormBinder
                    name="borrowerName"
                  >
                    <Input size="large" placeholder="主贷人姓名" />
                  </IceFormBinder>
                </FormItem>
              </Col>
              <Col s="8" l="8">
                <FormItem {...formItemLayout} label="申请开始时间：">
                  <IceFormBinder
                    name="startTime"
                  >
                    <DatePicker
                      size="large"
                      style={{width:"100%"}}
                      placeholder="申请开始时间" />
                  </IceFormBinder>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col s="8" l="8">
                <FormItem {...formItemLayout} label="申请结束时间：">
                  <IceFormBinder
                    name="endTime"
                  >
                    <DatePicker
                      size="large"
                      style={{width:"100%"}}
                      placeholder="申请结束时间" />
                  </IceFormBinder>
                </FormItem>
              </Col>
              <Col s="8" l="8">
                <FormItem {...formItemLayout} label="贷款状态：">
                  <IceFormBinder
                    name="borrowerMobile"
                  >
                    <Input size="large" placeholder="贷款状态" />
                  </IceFormBinder>
                </FormItem>
              </Col>
              <Col s="8" l="8">
                <FormItem {...formItemLayout} label="展厅名称：">
                  <IceFormBinder
                    name="borrowerName"
                  >
                    <Input size="large" placeholder="展厅名称" />
                  </IceFormBinder>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col s="8" l="8">

              </Col>
              <Col s="8" l="8">

              </Col>
              <Col s="8" l="8">
                <FormItem {...formItemLayout} label="&nbsp;">
                  <Button style={styles.btns1} type="secondary" htmlType='submit' onClick={this.props.onSubmit}>
                    查询
                  </Button>
                </FormItem>
              </Col>
            </Row>
          </Form>


        </div>
      </IceFormBinderWrapper>
    );
  }
}

const styles = {
  filterCol: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },

  filterTitle: {
    width: '68px',
    textAlign: 'left',
    marginRight: '12px',
    fontSize: '14px',
    marginLeft:'10px',
  },

  filterTool: {
    width: '200px',
  },
  formItem: {
    height: '33px',
    lineHeight: '33px',
    marginBottom:'28px'
  },
  formLabel: {
    marginLeft: '85px',
    textAlign: 'right',
  },
};
