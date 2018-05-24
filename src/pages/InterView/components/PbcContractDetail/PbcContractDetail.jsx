import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder, FormError as IceFormError,
} from '@icedesign/form-binder';
import { Title } from 'components';
import { Feedback, } from '@icedesign/base/index';
import { BaseComponent } from 'base';
import './PbcContractDetail.scss';
import { Grid, Form, Input,Balloon} from '@icedesign/base';

const { Row, Col } = Grid;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 24,
  },
};
export default class PbcContractDetail extends BaseComponent {
  static displayName = 'PbcContractDetail';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      Component: [],
    };
    this.colspans = {
      xxs: 24,
      xs: 12,
      l: 8,
      xl: 6,
    };
  }
//label的提示
  labelTitle = (label) => {
    var labelName = <span> {label}</span>;
    console.log(labelName)
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

  render() {
    return (
      <IceContainer className="pch-container PbcContractDetail">
        <Title title="中行合同详情"/>
        <IceFormBinderWrapper value={this.state.formData} onBlur={this.formChange} ref={(formRef) => {
          this.formRef = formRef;
        }}>
          <div className='pch-form'>
            <Form>
              <Row wrap>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 合同编号:</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 合同签订地：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 经销商账户名称：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 经销商账号：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>

                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 经销商账号：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>


                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 经销商账号：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 商品名称或品牌：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span>商品型号、颜色：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 客户姓名：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 证件类型：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 证件号码：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 客户性别：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 客户手机号码：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 证件有效期：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 出生日期：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 现居住地址：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col><Col {...this.colspans}>
                <FormItem {...formItemLayout} label={<span> 邮政编码：</span>}>
                  <IceFormBinder
                    name="credentialsNo"
                  >
                    <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                  </IceFormBinder>
                  <div><IceFormError name="credentialsNo"/></div>
                </FormItem>
              </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 建筑面积或规格型号：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 婚姻状态：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 国籍：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 签证有效期：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>


                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 签证类型：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 现已居住时间(年)：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 住宅性质：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 住宅电话：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 母亲姓氏：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 单位名称：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 签证有效期：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 行业性质：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 职业信息：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 经济类型：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 职位或职级：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 电子邮箱：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 称谓：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 户籍所在地：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 现单位地址：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 单位邮编：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 单位电话：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 现职年限数(年)：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>


                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 月收入(元)：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 年收入总额(万元)：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 与申请人的关系：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 姓名：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 称谓：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 联系电话或手机：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 专向分期付款额度(元）：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 现职年限数(年)：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 期数(月)：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span>手续费费率额度(%)：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 手续费金额(元)：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={this.labelTitle('甲方应在本合同签署x日内与乙方到有关登记部门办理抵押登记(日):')}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={

                    <Balloon align='bl'
                    // style={styles.box}
                    trigger={<span> 担保最高本金金额不超过人民币(元)：</span>}
                    triggerType="hover">
                    担保最高本金金额不超过人民币(元)：
                    </Balloon>
                    }>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 评估值(元)：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 本合同项下的抵押财产共作价(元)：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 乙方催告后的x日乙方有权停止发放尚未划付的分期付款(日)：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 申请金额(元)：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 还款期数(月)：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 分期手续费(元)：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 每期扣账金额(元)：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 已交付首付金额(元)：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 首付比例(%)：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 分期手续费费率(%)：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 卡面代码：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 卡面简称：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 开户行所在省市：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 还款币种：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 人民币账号：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 外币账号：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 客户经理单位地址：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 单位邮编：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 客户经理身份证号：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 客户经理员工号：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 是否有配偶共借：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 家庭净收入(元)：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 工作电话核实：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 移动电话核实：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 配偶电话核实：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 调查时间：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 调查地点：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 现职年限数(年)：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 若您申请的金卡或白金卡未能满足要求，我们将为您寄送同一品牌的普卡：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 是否申请透支额度：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 对账单发送方式：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 资料寄送地址：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 您的国外交易是否统一以人民币记账和还款：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 自动转账方式：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 状态：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 申请人ID：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 现职年限数(年)：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 申请人名称：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col {...this.colspans}>
                  <FormItem {...formItemLayout} label={<span> 组织机构路径：</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                    >
                      <Input disabled size="large" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </IceFormBinderWrapper>
      </IceContainer>
    );
  }
}
