import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import Req from '../../../reqs/ProductReq'
import {
  Form, Input, Button, Checkbox, Select, DatePicker, Switch, Radio, Grid, Field, Dialog,
  Table, Transfer, Feedback
} from '@icedesign/base';
import IceContainer from '@icedesign/container';
// import CellEditor from './CellEditor';
// form binder 详细用法请参见官方文档
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';


import './addThree.scss';
const { Row, Col } = Grid;
const { Option } = Select;

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 8 }
};
export default class addThree extends Component {
  static displayName = 'addThree';

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      show: false,
      processList: [],
      processDefId: '',//流程名称的Id
      processData: [],
    };
  }
  componentWillMount() {
    let { actions, params, formData } = this.props;
    let { product = {} } = formData;
    //流程名称获取
    Req._processList({ tenantId: product.tenantId }).then((data) => {
      let temp = this.state.processList;
      temp = data.data.list;
      this.setState({ processList: temp }, function () { });
      console.log(this.state.processList)
    })
    //产品详情
    if (params.id) {
      actions.getDetail(params.id)
    }

  }

  onsubmit = () => {
    let { actions, params, formData } = this.props;
    let { product = {} } = formData
    let id = params.id;
    console.log(formData, product)
    this.formRef.validateAll((error, value) => {
      this.state.processData.push(
        {
          productId: product.id,
          productName: product.name,
          productType: product.productType,
          processDefId: value.processName,
          status: product.status,
          businessTypeId: 1,
          businessTypeName: "车贷业务",
          tenantId: product.tenantId,
          tenantName: "中行"
        }
      )
      if (error) {
        return;
      }
      let boolean = true;
      if (product.status == 1 && value.processName == undefined) {
        Feedback.toast.show({
          type: 'error',
          content: '流程名称未选择，产品不能生效',
        });
        boolean = false
      }
      if (!boolean) return
      //提交当前填写的数据
      this.props.actions.saveProductAdd(id, this.state.processData,value.processName);
     this.setState({
        processData: []
      })
    });
  }

  onFormChange = (value) => {
    this.setState({
      value
    })
  }
  //流程名称的id值
  onChangeProcess(value) {
    this.setState({
      processDefId: value,
      show: true
    })
  }
  //新增流程
  handleSubmitAddnew() {
    hashHistory.push('/process/add');
  }
  //流程详情
  handleSubmitDetail() {
    let id = this.state.processDefId;
    if (id) {
      hashHistory.push(`/process/detail/${id}`)
    }

  }
  render() {
    let { formData } = this.props;
    let { product = {} } = formData;
    return (
      <IceFormBinderWrapper
        ref={(formRef) => {
          this.formRef = formRef;
        }}
        value={this.state.value}
        onChange={this.onFormChange}
      >
        <div>
          <IceContainer>
            <div className="pch-condition form ">
              <Form
                size="large" direction="hoz">
                <legend className="pch-legend">
                  <span className="pch-legend-legline"></span>流程设置
                           </legend>
                <div className="pch-form">
                  <Row wrap >
                    <Col xxs={24} xs={12} l={8} xl={6}>
                      <FormItem {...formItemLayout} label="业务类型：">
                        <label className="process-lable">车贷业务</label>
                      </FormItem>
                    </Col>
                    <Col xxs={24} xs={12} l={8} xl={6}>
                      <FormItem {...formItemLayout} label="资方：">
                        <IceFormBinder name="tenantId">
                          <label className="process-lable">中国银行</label>
                        </IceFormBinder>
                      </FormItem>
                    </Col>
                    <Col xxs={24} xs={12} l={8} xl={6}>
                      <FormItem {...formItemLayout} label="产品类型：">
                        <IceFormBinder name="prodType" >
                          <label className="process-lable">{product.productType}</label>
                        </IceFormBinder>
                      </FormItem>
                    </Col>
                    <Col xxs={24} xs={12} l={8} xl={6}>
                      <FormItem {...formItemLayout} label="产品名称：">
                        <IceFormBinder name="prodName" >
                          <label className="process-lable">{product.name}</label>
                        </IceFormBinder>
                      </FormItem>
                    </Col>

                  </Row>
                  <div className="pc-form-line">
                    <Row wrap>
                      <Col xxs={24} xs={12} l={8} xl={6}>
                        <FormItem {...formItemLayout} label="流程名称：">
                          <IceFormBinder name="processName">
                            <Select
                              size="large"
                              placeholder="请选择"
                              className="select"
                              onChange={this.onChangeProcess.bind(this)}
                            >
                              {
                                this.state.processList.map((item, i) => {
                                  return (
                                    <Option value={item.id} key={i}>{item.processName}</Option>
                                  )
                                })
                              }
                            </Select>
                          </IceFormBinder>
                        </FormItem>
                      </Col>
                      <Col xxs={24} xs={12} l={8} xl={6}>
                        <FormItem {...formItemLayout} label="&nbsp;" className="pch-condition-operate">
                          <Button onClick={this.handleSubmitAddnew.bind(this)} type="secondary" style={{ 'background': '#1AA8F0' }}>
                            新增流程
                                    </Button>
                        </FormItem>
                      </Col>
                      <Col xxs={24} xs={12} l={8} xl={6} style={{ display: this.state.show == true ? '' : 'none' }}>
                        <FormItem {...formItemLayout} label="&nbsp;" className="pch-condition-operate" >
                          <a onClick={this.handleSubmitDetail.bind(this)} type="secondary" className="addThree-detail-btn">
                            查看流程详情
                                    </a>
                        </FormItem>
                      </Col>
                    </Row>

                  </div>
                </div>
                <div className="next-btn-box">
                  <Button type="secondary" size="large" onClick={this.onsubmit}>保存</Button>
                </div>
              </Form>
            </div>
          </IceContainer>
        </div>
      </IceFormBinderWrapper>
    );
  }
}
