import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder, FormError as IceFormError,
} from '@icedesign/form-binder';
import { hashHistory, Link } from 'react-router';

import { Title } from 'components';
import { BaseComponent } from 'base';
import './PinganContractDetail.scss';
import { Grid, Form, Input, Balloon,Feedback} from '@icedesign/base';
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
export default class PinganContractDetail extends BaseComponent {
  static displayName = 'PinganContractDetail';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      Component: [],
      formData: {},

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
    //   Req.getInterViewDetail(params.id)
    //     .then((res) => {
    //       if (res && res.code == 200 && res.data) {
    //         console.log(res.data)
    //
    //         this.setState({
    //           formData: res.data.chinateContracResponse
    //         });
    //       } else {
    //         Toast.show({
    //           type: 'error',
    //           content: res.msg,
    //         });
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
  }

//label的提示
  labelTitle = (label) => {
    var labelName = <span> {label}</span>;
    console.log(labelName);
    console.log(label);
    return (
      <Balloon
        type="primary"
        trigger={labelName}
        closable={false}
      >
        {label}
      </Balloon>
    );
  };
  goContract() {
    let { formData ={},contract,id,contractId } = this.props ;
    window.open(`${location.origin}/#/contractedit/edit/${contractId}`,'_blank');
  }
  render() {
    let { formData ={},contract,id } = this.props ;
    console.log(this.props)
    console.log(formData)
    return (
      <IceContainer className="pch-container PinganContractDetail">
        <Title title="平安银行合同详情"/>
        <IceFormBinderWrapper value={formData} onBlur={this.formChange} >
          <div className='pch-form'>
            <Form size="large">
              <Row wrap>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 合同编号:</span>}>
                    <IceFormBinder
                      name="contractCode"
                    >
                      <Input disabled size="large"  className="custom-input"/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 客户姓名：</span>}>
                    <IceFormBinder
                      name="customerName"
                    >
                      <Input disabled size="large"  className="custom-input"/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 证件类型：</span>}>
                    <IceFormBinder
                      name="customerCardType"
                    >
                      <Input disabled size="large"  className="custom-input"/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 证件号码：</span>}>
                    <IceFormBinder
                      name="customerCardNo"
                    >
                      <Input disabled size="large"  className="custom-input"/>
                    </IceFormBinder>
                  </FormItem>
                </Col>

                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 客户手机号码：</span>}>
                    <IceFormBinder
                      name="customerMobile"
                    >
                      <Input disabled size="large"  className="custom-input"/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span>现居住地址：</span>}>
                    <IceFormBinder
                      name="cusomerLiveAddress"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="productSerialColor"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 车型：</span>}>
                    <IceFormBinder
                      name="loanBrandCar"
                    >
                      <Input disabled size="large"  className="custom-input"/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 车架号：</span>}>
                    <IceFormBinder
                      name="loanVin"
                    >
                      <Input disabled size="large"  className="custom-input"/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 发动机号：</span>}>
                    <IceFormBinder
                      name="loanEngine"
                    >
                      <Input disabled size="large"  className="custom-input"/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 标的车辆总价款：</span>}>
                    <IceFormBinder
                      name="loanApplyAmount"
                    >
                      <Input disabled size="large"  className="custom-input"/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 年化利率：</span>}>
                    <IceFormBinder
                      name="loanYearRate"
                    >
                      <Input disabled size="large"  className="custom-input"/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 贷款期数：</span>}>
                    <IceFormBinder
                      name="loanApplyPeriod"
                    >
                      <Input disabled size="large"  className="custom-input"/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 租金总额：</span>}>
                    <IceFormBinder
                      name="loanApplyAmount"
                    >
                      <Input disabled size="large"  className="custom-input"/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 每期支付金额：</span>}>
                    <IceFormBinder
                      name="loanPeriodDeductFee"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                  </FormItem>
                </Col><Col {...this.colspans}>
                <FormItem {...formItemLayout} label={<span> 租金支付周期：</span>}>
                  <IceFormBinder
                    name="12122"
                  >
                    <Input disabled size="large"  className="custom-input" value="每1个月支付1期"/>
                  </IceFormBinder>
                  <div><IceFormError name="cusomerZipCode"/></div>
                </FormItem>
              </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 首期租金服务费率（%）：</span>}>
                    <IceFormBinder
                      name="loanFirstServiceFeeRate"
                    >
                      <Input disabled size="large"  className="custom-input"/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 首期租金服务费：</span>}>
                    <IceFormBinder
                      name="loanFirstServiceFee"
                    >
                      <Input disabled size="large"  className="custom-input"/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 分期服务费总额：</span>}>
                    <IceFormBinder
                      name="loanChargeFeeAmount"
                    >
                      <Input disabled size="large"  className="custom-input"/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 租金服务费总额：</span>}>
                    <IceFormBinder
                      name="loanTotalFeeAmount"
                    >
                      <Input disabled size="large"  className="custom-input"/>
                    </IceFormBinder>
                  </FormItem>
                </Col>


                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 每期支付金额：</span>}>
                    <IceFormBinder
                      name="loanStagFee"
                    >
                      <Input disabled size="large"  className="custom-input"  />
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 支付周期：</span>}>
                    <IceFormBinder
                      name="customerLivedTime"
                    >
                      <Input disabled size="large"  className="custom-input" value="每1个月支付1期"/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 开户银行：</span>}>
                    <IceFormBinder
                      name="loanDepositBank"
                    >
                      <Input disabled size="large"  className="custom-input"/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 所属支行：</span>}>
                    <IceFormBinder
                      name="loanAffiliatedBranch"
                    >
                      <Input disabled size="large"  className="custom-input"/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 账户名：</span>}>
                    <IceFormBinder
                      name="loanName"
                    >
                      <Input disabled size="large"  className="custom-input"/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 银行卡号：</span>}>
                    <IceFormBinder
                      name="loanBankAccount"
                    >
                      <Input disabled size="large"  className="custom-input"/>
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 合同签订地：</span>}>
                    <IceFormBinder
                      name="contractSignPlace"
                    >
                      <Input disabled size="large"  className="custom-input"/>
                    </IceFormBinder>
                  </FormItem>
                </Col>


              </Row>
            </Form>
            {
              formData.signedDocumentUR && formData.signedDocumentUR != '' ?
                (
                  <div className='file'>
                    <a href={formData.signedDocumentUR} target='_blank'>查看待签名文件</a>
                  </div>
                ) : (
                  <span></span>
                )
            }
            {/* {
              contract=='1'? (
                <div className='file'>
                  <a onClick={this.goContract.bind(this)}>编辑待签名文件</a>
                </div>
              ) : (
                <span></span>
              )
            } */}
          </div>
        </IceFormBinderWrapper>
      </IceContainer>
    );
  }
}
