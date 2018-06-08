import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder, FormError as IceFormError,
} from '@icedesign/form-binder';
import { Title } from 'components';
import { BaseComponent } from 'base';
import './InterviewOnlyDetail.scss';
import { Grid, Form, Input, Balloon, Feedback, Select } from '@icedesign/base';
import Req from '../../reqs/InterViewReq';

const { Row, Col } = Grid;
const FormItem = Form.Item;
const Toast = Feedback.toast;
const formItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};

export default class InterviewOnlyDetail extends BaseComponent {
  static displayName = 'InterviewOnlyDetail';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      Component: [],
      formData: {},
      idList: [
        { value: '1', label: '身份证' },
        { value: '2', label: '港澳通行证' },
        { value: '3', label: '军官证' },
        { value: '4', label: '护照' },
        { value: '5', label: '台湾通行证' },
        { value: '6', label: '其他' },
      ],

    };
    this.colspans = {
      xxs: 24,
      xs: 12,
      l: 8,
      xl: 6,
    };
  }

  componentDidMount() {
    let { actions, params } = this.props;

    // if (params.id) {
    //   Req.getInterViewOnlyDetail(params.id)
    //     .then((res) => {
    //       console.log(res.data);
    //       this.setState({
    //         formData: res.data,
    //       });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
  }


  render() {
    let { type = '' } = this.props;
    let { formData ={} } = this.props ;
    if (type == 'interviewOnly') {
      return (
        <IceContainer className="pch-container">
          <Title title="仅面签详情"/>
          <IceFormBinderWrapper value={formData}>
            <div className='pch-form'>
              <Form size="large">
                <Row wrap>
                  <Col {...this.colspans}>
                    <FormItem {...formItemLayout} label={<span> 姓名:</span>}>
                      <IceFormBinder
                        name="userName"
                      >
                        <Input disabled size="large" className="custom-input"/>
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                  <Col {...this.colspans}>
                    <FormItem {...formItemLayout} label={<span> 证件类型：</span>}>
                      <IceFormBinder
                        name="icType"
                      >
                        {/*<Input disabled size="large"  className="custom-input"/>*/}
                        <Select disabled dataSource={this.state.idList}/>
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                  <Col {...this.colspans}>
                    <FormItem {...formItemLayout} label={<span> 证件号码：</span>}>
                      <IceFormBinder
                        name="icNo"
                      >
                        <Input disabled size="large" className="custom-input"/>
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                  <Col {...this.colspans}>
                    <FormItem {...formItemLayout} label={<span> 手机号码：</span>}>
                      <IceFormBinder
                        name="mobile"
                      >
                        <Input disabled size="large" className="custom-input"/>
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                  <Col {...this.colspans}>
                    <FormItem {...formItemLayout} label={<span> 贷款金额：</span>}>
                      <IceFormBinder
                        name="amount"
                      >
                        <Input disabled size="large" className="custom-input"/>
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                  <Col {...this.colspans}>
                    <FormItem {...formItemLayout} label={<span> 备注：</span>}>
                      <IceFormBinder
                        name="remarks"
                      >
                        <Input disabled size="large" className="custom-input"/>
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </div>
          </IceFormBinderWrapper>
        </IceContainer>
      );
    } else if (type == 'creditCard') {
      return (
        <IceContainer className="pch-container InterviewOnlyDetail">
          <Title title="信用卡面签详情"/>
          <IceFormBinderWrapper value={formData}>
            <div className='pch-form'>
              <Form>
                <Row wrap>
                  <Col {...this.colspans}>
                    <FormItem {...formItemLayout} label={<span> 姓名:</span>}>
                      <IceFormBinder
                        name="userName"
                      >
                        <Input disabled size="large" className="custom-input"/>
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                  <Col {...this.colspans}>
                    <FormItem {...formItemLayout} label={<span> 证件类型：</span>}>
                      <IceFormBinder
                        name="icType"
                      >
                        {/*<Input disabled size="large"  className="custom-input"/>*/}
                        <Select disabled dataSource={this.state.idList}/>
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                  <Col {...this.colspans}>
                    <FormItem {...formItemLayout} label={<span> 证件号码：</span>}>
                      <IceFormBinder
                        name="icNo"
                      >
                        <Input disabled size="large" className="custom-input"/>
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </div>
          </IceFormBinderWrapper>
        </IceContainer>
      );
    }
    return null;
  }
}
