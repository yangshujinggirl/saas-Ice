import React, { Component } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';

import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  DatePicker,
  Switch,
  Radio,
  Grid,
  Field,
  Table,
} from '@icedesign/base';
import DataBinder from '@icedesign/data-binder';
import IceContainer from '@icedesign/container';
// import CellEditor from './CellEditor';
// form binder 详细用法请参见官方文档
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './addOne.scss';

const { Row, Col } = Grid;
const { Option } = Select;
const { Group: RadioGroup } = Radio;
const { Group:CheckboxGroup} = Checkbox;
const { MonthPicker, YearPicker, RangePicker } = DatePicker;

const generatorData = () => {
  return Array.from({ length: 0 }).map((item, index) => {
    return {
    };
  });
};
const generatorData2 = () => {
  return Array.from({ length: 0 }).map((item, index) => {
    return {
    };
  });
};
const generatorData3 = () => {
  return Array.from({ length: 0 }).map((item, index) => {
    return {
    };
  });
};
const generatorData4 = () => {
  return Array.from({ length: 0 }).map((item, index) => {
    return {
    };
  });
};
const list = [
  {
    value: "allow",
    label: "允许",
    disabled: false
  },
  {
    value: "noallow",
    label: "不允许"
  }
];
export default class AddOne extends Component {
  static displayName = 'AddOne';

  constructor(props) {
    super(props);
    this.state = {
      dataSource: generatorData(),
      dataSource2: generatorData2(),
      dataSource3: generatorData3(),
      dataSource4: generatorData4(),
    };
  }
  //列表编辑删除
  renderOperator = (value, index, record) => {
    return (
      <div>
        <button
          style={styles.removeBtn}
        >
          编辑
        </button>
        <button
          style={styles.removeBtn}
          onClick={this.deleteItem.bind(this, record)}
        >
          删除
        </button>
      </div>
    );
  };
  // 删除一列
  deleteItem = (index) => {
    this.state.dataSource.splice(index, 1);
    this.setState({
      dataSource: this.state.dataSource,
    });
  };

  // 额度期限设置表格操作内容
  renderOperation = (value, index) => {
    return (
      <button onClick={this.deleteItem.bind(this, index)} shape="text" className="deleteBtn">
        删除
      </button>
    );
  };
  // 利率设置 表格内容
  renderText = () => {
    return (
      <Select
        name="size"
        placeholder="请选择"
        style={styles.filterTool}
      >
        <Option value="option1">集团A/经销商A/展厅A</Option>
        <Option value="option2">集团B/经销商B</Option>
        <Option value="option3">集团A/经销商A</Option>
      </Select>
    )
  };

  changeDataSource = (index, valueKey, value) => {
    this.state.dataSource[index][valueKey] = value;
    this.setState({
      dataSource: this.state.dataSource,
    });
  };

  addNewItem = (index) => {
    this.state.dataSource.push({
      applyTermRangeMin:<Input placeholder="最小期限(必填)" />,
      applyTermRangeMax:<Input placeholder="最大期限(必填)" />,
      applyLoanPercentageMax:<Input placeholder="最小成数(必填)" />,
      applyLoanPercentageMax:<Input placeholder="最大成数(必填)" />,
      quotaRemove:<button onClick={this.deleteItem.bind(this, index)} shape="text" className="deleteBtn" type="button">删除</button>,
    });
    this.setState({
      dataSource: this.state.dataSource,
    });
  };
  addNewItem2 = (index) =>{
    this.state.dataSource2.push({
      channelTypes:<Input placeholder="渠道(必填)" />,
      interestRatesRangeMin:<Input placeholder="最小执行年利率(必填)" />,
      interestRatesRangeMax:<Input placeholder="最大执行年利率(必填)" />,
      quotaRemove:<button onClick={this.deleteItem.bind(this, index)} shape="text" className="deleteBtn" type="button">删除</button>,
     
    })
    this.setState({
      dataSource2: this.state.dataSource2,
    });
  }
  addNewItem3 = (index) =>{
    this.state.dataSource3.push({
      repaymentMethods:<Select style={styles.filterTool}> 
                        <option value="Equal_Quota">等额还款</option> 
                        <option value="Equal_Principal">等本还款</option> 
                        <option value="With_Interest">利随本清</option> 
                        <option value="Net_Interest">净息还款</option> 
                        <option value="With_Interest_Extend">利随本清(宽限期)</option> 
                        <option value="Net_Interest_Extend">净息还款(宽限期)</option> 
                        <option value="Fixed_Quota">固定额还款</option> 
                        <option value="Section_End">分段式还款(固定末段外的每段还款额)</option> 
                        <option value="Section_Each">分段式还款(固定各阶段本金偿还比例)</option> 
                        <option value="Ladder">阶梯还款</option> 
                      </Select>,
      fixedAmount:<Input placeholder="固定金额(必填)" />,
      gracePeriod:<Input placeholder="宽限期期限(必填)" />,
      repaymentExpirationGracePeriod:<Select style={styles.filterTool}> 
                      <option value="Equal_Quota">等额还款</option> 
                      <option value="Equal_Principal">等本还款</option> 
                      <option value="With_Interest">利随本清</option> 
                      <option value="Net_Interest">净息还款</option> 
                      <option value="With_Interest_Extend">利随本清(宽限期)</option> 
                      <option value="Net_Interest_Extend">净息还款(宽限期)</option> 
                      <option value="Fixed_Quota">固定额还款</option> 
                      <option value="Section_End">分段式还款(固定末段外的每段还款额)</option> 
                      <option value="Section_Each">分段式还款(固定各阶段本金偿还比例)</option> 
                      <option value="Ladder">阶梯还款</option> 
                  </Select>,
        quotaRemove:<button onClick={this.deleteItem.bind(this, index)} shape="text" className="deleteBtn"type="button">删除</button>,
     
    })
    this.setState({
      dataSource3: this.state.dataSource3,
    });
  }
addNewItem4 = (index) =>{
  this.state.dataSource4.push({
       loanTermMin:<Input placeholder="最小期限(必填)" />,
      loanTermMax:<Input placeholder="最大期限(必填)" />,
      termUnit:<Input placeholder="期限单位(必填)" />,
      penaltyPercentage:<Input placeholder="违约金比例(必填)" />,
      quotaRemove:<button onClick={this.deleteItem.bind(this, index)} shape="text" className="deleteBtn"type="button">删除</button>,
   
  })
  this.setState({
    dataSource4: this.state.dataSource4,
  });
}


formChange = (value) => {
  this.setState({
    value,
  });
};

  changeView = (e) => {
    // this.refs.form.validateAll((errors, values) => {
    //   console.log('values', values);
    // });
    // this.props.changeView('addTwo');
  }
  //下一步
  NextClick = ()=>{
    hashHistory.push('product/addtwo')
  }
  checkRes = (rule, values, callback) => {
    if (!values) {
      callback('请输入...');
    } else if (values < '0'||0) {
      callback('必须大于0');
    } else if (values.length > 16) {
      callback('金额上');
    } else {
      callback();
    }
  };
  render() {
    return (
      <IceFormBinderWrapper
        ref='form'
        value={this.state.value}
        onChange={this.formChange}

        >
        <div>
          <IceContainer>
            <legend className="legend">
              <span className="legLine"></span>基本信息
            </legend>
            <div className="f-box">
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}><label className="label-required">*</label>资金方</label>
                  <IceFormBinder
                    name="fundParty"
                    required
                    message="必填"
                    validator={this.check}
                  >
                   <Select
                      name="fundParty"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="option1">中国</Option>
                      <Option value="option2">美国</Option>
                      
                    </Select>
                  </IceFormBinder>
                  <IceFormError name="productCode" />
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}><label className="label-required">*</label>产品名称</label>
                  <IceFormBinder
                    name="name"
                  >
                    <Input placeholder="产品编号" 
                       required 
                       message="必填"
                    />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}><label className="label-required">*</label>合同显示名称</label>
                  <IceFormBinder
                    name="contractDisplayName"
                  >
                    <Input placeholder="合同显示名称"
                      required 
                      message="必填"
                    />
                  </IceFormBinder>
                  <IceFormError name="contractDisplayName" />
                </Col>
              </Row>
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>产品类型</label>
                  <IceFormBinder
                    name="prodType"
                  >
                    <Select
                      name="prodType"
                      required 
                       message="必填"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="NEW_CAR_LOAN">新车贷款</Option>
                      <Option value="NEW_CAR_RENTAL">新车租赁</Option>
                      <Option value="SECONDHAND_CAR_LOAN">二手车贷款</Option>
                      <Option value="SECONDHAND_CAR_RENTAL">二手车租赁</Option>
                      <Option value="CAR_MORTGAGE_LOAN">汽车抵押贷款</Option>
                      <Option value="CONSUMER_LOAN">消费贷款</Option>
                    </Select>
                  </IceFormBinder>
                  <IceFormError name="prodType"/>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>业务表单</label>
                  <IceFormBinder
                    name="serviceFormType"
                  >
                    <Select
                      name="serviceFormType"
                      required 
                       message="必填"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="NEW_CAR_LOAN">新车贷款</Option>
                      <Option value="NEW_CAR_RENTAL">新车租赁</Option>
                      <Option value="SECONDHAND_CAR_LOAN">二手车贷款</Option>
                      <Option value="SECONDHAND_CAR_RENTAL">二手车租赁</Option>
                      <Option value="CAR_MORTGAGE_LOAN">汽车抵押贷款</Option>
                      <Option value="CONSUMER_LOAN">消费贷款</Option>
                    </Select>
                  </IceFormBinder>
                  <IceFormError name="serviceFormType"/>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>资料收取清单</label>
                  <IceFormBinder
                    name="collectionDetailListId"
                  >
                    <Select
                      name="collectionDetailListId"
                      required 
                      message="必填"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="option1">车抵贷</Option>
                      <Option value="option2">新车贷</Option>
                    </Select>
                  </IceFormBinder>
                  <IceFormError name="collectionDetailListId"/>
                </Col>
              </Row>
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}><span className="label-required">*</span>生效日期</label>
                  <IceFormBinder
                    name="effectiveDate"
                  >
                     <RangePicker format={"YYYY/MM/DD"} style={{width:"200px"}}/> 
                  </IceFormBinder>
                  <IceFormError name="effectiveDate" />
                 
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>允许贴息</label>
                  <IceFormBinder
                    name="isPermittedDiscount"
                  >
                    <Select
                      name="isPermittedDiscount"
                      required 
                      message="必填"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="option1">是</Option>
                      <Option value="option2">否</Option>
                    </Select>
                  </IceFormBinder>
                  <IceFormError name="isPermittedDiscount"/>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>状态</label>
                  <IceFormBinder
                    name="status"
                  >
                    <Select
                      name="status"
                      required 
                      message="必填"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="option1">生效</Option>
                      <Option value="option2">未生效</Option>
                    </Select>
                  </IceFormBinder>
                  <IceFormError name="status"/>
                </Col>
              </Row>
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>尾款产品</label>
                  <IceFormBinder
                    name="isRetainage"
                  >
                    <Select
                      required 
                      message="必填"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="option1">是</Option>
                      <Option value="option2">否</Option>
                    </Select>
                  </IceFormBinder>
                  <IceFormError name="isRetainage"/>
                </Col>
              </Row>
              <Row wrap>
                <Col style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>贷款用途</label>
                  <IceFormBinder name="purposeOfLoan" >
                      <CheckboxGroup
                        className="next-form-text-align"
                        dataSource={[
                          { label: '自用购车', value: 'buyCar' },
                          { label: '消费性', value: 'Consume' },
                          { label: '经营性', value: 'Operate' },
                        ]}
                        defaultValue={['buyCar']}
                      />
                    </IceFormBinder>
                    <div>
                      <IceFormError name="purposeOfLoan" />
                    </div>
                </Col>
              </Row>
              <Row wrap>
                <Col style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>担保方式</label>
                  <IceFormBinder name="guaranteeMethodType" >
                      <CheckboxGroup
                        className="next-form-text-align"
                        dataSource={[
                          { label: '信用', value: 'CREDIT' },
                          { label: '抵押', value: 'MORTGAGE' },
                          { label: '质押', value: 'PLEDGE' },
                        ]}
                        defaultValue={['CREDIT']}
                      />
                    </IceFormBinder>
                    <div>
                      <IceFormError name="guaranteeMethodType" />
                    </div>
                </Col>
              </Row>
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>支付方式</label>
                  <IceFormBinder
                    name="paymentOfLoan"
                    >
                    <Select
                      name="paymentOfLoan"
                      required 
                      message="必填"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="option1">受托支付</Option>
                      <Option value="option2">自助支付</Option>
                    </Select>
                  </IceFormBinder>
                  <IceFormError name="paymentOfLoan"/>
                </Col>
              </Row>
              <Row wrap>
                <label style={styles.filterTitle}>产品描述</label>
                <IceFormBinder
                  name="description"
                  >
                    <Input multiple style={{ width: '50%' }} />
                </IceFormBinder>
                <IceFormError name="description"/>
              </Row>
            </div>
            <legend className="legend">
              <span className="legLine"></span>额度期限设置
            </legend>
            <div className="f-box">
              <Row wrap>
                <Col style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>贷款期限变更</label>
                  <IceFormBinder name="loanTermChange" >
                      <CheckboxGroup
                        className="next-form-text-align"
                        dataSource={[
                          { label: '允许延长', value: 'ALLOW_DELAY' },
                          { label: '允许压缩', value: 'ALLOW_PRESS' },
                          { label: '不允许变更', value: 'NOT_ALLOW_CHANGE' },
                        ]}
                        defaultValue={['ALLOW_DELAY']}
                      />
                    </IceFormBinder>
                    <div>
                      <IceFormError name="loanTermChange" />
                    </div>
                </Col>
              </Row>
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}><label className="label-required">*</label>申请金额范围(元)</label>
                  <IceFormBinder
                    name="principalAmountMin"
                    required 
                    message="必填"
                    validator={this.checkRes}
                  >
                    <Input style={{ width: '95px' }} />
                  </IceFormBinder>
                  <IceFormError name="principalAmountMin" />
                  <div className="lx-mid-line">—</div>
                  <IceFormBinder
                    name="principalAmountMax"
                    required 
                    message="必填"
                  >
                    <Input style={{ width: '95px' }} />

                  </IceFormBinder>
                  <IceFormError name="principalAmountMax" />
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}><label className="label-required">*</label>期限范围(月)</label>
                  <IceFormBinder
                    name="loanTermRangeMin"
                    required 
                    message="必填"
                  >
                    <Input style={{ width: '95px' }} />
                  </IceFormBinder>
                  <IceFormError name="loanTermRangeMin" />
                  <div className="lx-mid-line">—</div>
                  <IceFormBinder
                    name="loanTermRangeMax"
                    required 
                    message="必填"
                  >
                    <Input style={{ width: '95px' }} />

                  </IceFormBinder>
                  <IceFormError name="loanTermRangeMax" />
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}><label className="label-required">*</label>贷款比率(%)</label>
                  <IceFormBinder
                    name="loanPercentageMin"
                    required 
                    message="必填"
                  >
                    <Input style={{ width: '95px' }} />
                  </IceFormBinder>
                  <IceFormError name="loanPercentageMin" />
                  <div className="lx-mid-line">—</div>
                  <IceFormBinder
                    name="loanPercentageMax"
                    required 
                    message="必填"
                  >
                    <Input style={{ width: '95px' }} />

                  </IceFormBinder>
                  <IceFormError name="loanPercentageMax" />
                </Col>
              </Row>
              <div className="table-title">产品成数设置</div>
              <Table
                dataSource={this.state.dataSource}
                hasHeader
                className="table"
              >
                {/* <Table.Column  title="产品成数设置" /> */}
                <Table.Column title="最小期限(月)" dataIndex="applyTermRangeMin" />
                <Table.Column title="最大成数(%)"  dataIndex="applyTermRangeMax"/>
                <Table.Column title="最小成数(%)"  dataIndex="applyLoanPercentageMax"/>
                <Table.Column title="最大期限(月)"  dataIndex="applyLoanPercentageMax"/>
                <Table.Column title="操作" width={80}  dataIndex="quotaRemove"/>
              </Table>
              <div style={styles.addNew}>
                <Button onClick={this.addNewItem} style={styles.addNewItem}>新增一行</Button>
              </div>
            </div>

            <legend className="legend">
              <span className="legLine"></span>利率设置
            </legend>
            <div className="f-box">
              <Row wrap>
                <Col style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>贷款利率变更</label>
                    <IceFormBinder name="interestLoanRateChange" >
                      <CheckboxGroup
                        className="next-form-text-align"
                        dataSource={[
                          { label: '允许变更利率调整方式', value: 'Allow_Change_Rate_Adjust' },
                          { label: '允许变更利率浮动率', value: 'Allow_Change_Rate_float' },
                          { label: '不允许贷款利率变更', value: 'Not_Allow_Change_Account' },
                        ]}
                        defaultValue={['Allow_Change_Rate_Adjust']}
                      />
                    </IceFormBinder>
                    <div>
                      <IceFormError name="interestLoanRateChange" />
                    </div>
                 
                </Col>
              </Row>
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>定价利率规则</label>
                  <IceFormBinder
                      name="interestRateRules"
                      required 
                       message="必填">
                    <Select
                      name="interestRateRules"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="PRODUCT_PRICE">产品定价</Option>
                    </Select>
                  </IceFormBinder>
                  <IceFormError name="interestRateRules"/>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>利率模式</label>
                  <IceFormBinder
                    name="interestRateModel"
                    required 
                    message="必填"
                  >
                    <Select
                      name="interestRateModel"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="FIXED_RATE">固定利率</Option>
                    </Select>
                  </IceFormBinder>
                  <IceFormError name="interestRateModel"/>
                </Col>
              </Row>
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}><label className="label-required">*</label>执行年利率范围(%)</label>
                  <IceFormBinder
                    name="interestRatesRangeMin"
                    required 
                    message="必填"
                  >
                    <Input 
                      
                      style={{ width: '95px' }}
                     />
                  </IceFormBinder>
                  <IceFormError name="interestRatesRangeMin" />
                  <div className="lx-mid-line">—</div>
                  <IceFormBinder
                    name="interestRatesRangeMax"
                    required 
                    message="必填"
                  >
                    <Input style={{ width: '95px' }} 
                    />
                  </IceFormBinder>
                  <IceFormError name="interestRatesRangeMax" />
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>利率基准日
                  </label>
                  <IceFormBinder
                    name="interestRateBaseDate"
                    required 
                    message="必填"
                  >
                    <Select
                      name="interestRateBaseDate"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="ACCOUNT_DATE">出账日</Option>
                      <Option value="CONTRACT_SIGNING_DATE">合同签订日</Option>

                    </Select>
                  </IceFormBinder>
                  <IceFormError name="interestRateBaseDate" />
                </Col>
              </Row>
              <div className="table-title">产品利率设置</div>
              <Table
              dataSource={this.state.dataSource2}
                hasHeader
                className="table"
              >
                <Table.Column title="渠道" width={280} dataIndex="channelTypes" />
                <Table.Column title="最小执行年利率(%)" dataIndex="interestRatesRangeMin"/>
                <Table.Column title="最大执行年利率(%)" dataIndex="interestRatesRangeMax"/>
                <Table.Column title="操作" width={80} dataIndex="quotaRemove"/>
              </Table>
              <div style={styles.addNew}>
                <Button onClick={this.addNewItem2} style={styles.addNewItem}>新增一行</Button>
              </div>
            </div>

            <legend className="legend">
              <span className="legLine"></span>还款设置
            </legend>
            <div className="f-box">
              <Row wrap>
                <Col style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>还款账户变更</label>
                  <IceFormBinder name="repaymentAccountChange" type="array">
                      <CheckboxGroup
                        className="next-form-text-align"
                        dataSource={[
                          { label: '允许变更贷款还款账户', value: 'Allow_Change' },
                          { label: '允许变更授信还款账户', value: 'Allow_Change_Rate' },
                          { label: '不允许还款账户变更', value: 'Not_Allow_Change' },
                        ]}
                        defaultValue={['Allow_Change']}
                      />
                    </IceFormBinder>
                    <div>
                      <IceFormError name="repaymentAccountChange" />
                    </div>
                </Col>
              </Row>
              <Row wrap>
                <Col style={styles.filterCol}> 
                  <label style={styles.filterTitle}> <span className="label-required">*</span>还款周期</label>
                  <IceFormBinder name="repaymentPeriodFrequency" >
                      <CheckboxGroup
                        className="next-form-text-align"
                        dataSource={[
                          { label: '全选', value: 'Allow_ONCLIK' },
                          { label: '按月', value: 'MONTH'},
                          { label: '按季', value: 'YEAR' },
                          { label: '按年', value: 'DISPOSABLE' },
                          { label: '一次', value: 'DISPOSABLE' },
                          { label: '按两周', value: 'TWO_WEEK' },
                          { label: '按半年', value: 'HALF_YEAR' },
                        ]}
                        defaultValue={['MONTH']}
                      />
                    </IceFormBinder>
                    <div>
                      <IceFormError name="repaymentPeriodFrequency" />
                    </div>
                </Col>
               
              </Row>

              <Row wrap>
                <label style={styles.filterTitle}> <span className="label-required">*</span>还款日变更</label>
                <Col style={styles.filterCol}>
                  <RadioGroup dataSource={list} defaultValue={"allow"} name="repaymentDateChange"/> 
                </Col>
              </Row>
              <Row wrap>
                <label style={styles.filterTitle}> <span className="label-required">*</span>宽限期变更</label>
                <Col style={styles.filterCol}>
                  <RadioGroup dataSource={list} defaultValue={"allow"} name="gancePeriodChange"/>
                </Col>
              </Row>
              <Row wrap>
                <label style={styles.filterTitle}> <span className="label-required">*</span>还款方式变更</label>
                <Col style={styles.filterCol}>
                  <RadioGroup dataSource={list} defaultValue={"allow"} name="repaymentMethodChange"/> 
                </Col>
              </Row>
              <div className="table-title">还款方式设置</div>
              <Table
              dataSource={this.state.dataSource3}
                hasHeader
                className="table"
              >
                <Table.Column title="还款方式" width={280} dataIndex="repaymentMethods"/>
                <Table.Column title="固定金额(元)"  dataIndex="fixedAmount"/>
                <Table.Column title="宽限期期限(天)" dataIndex="gracePeriod"/>
                <Table.Column title="宽限期失效后还款方式" dataIndex="repaymentExpirationGracePeriod"/>
                <Table.Column title="操作" width={80} dataIndex="quotaRemove" />
              </Table>
              <div style={styles.addNew}>
                <Button onClick={this.addNewItem3} style={styles.addNewItem}>新增一行</Button>
              </div>
              <Row wrap>
                <label style={styles.filterTitle}> <span className="label-required">*</span>提前还款</label>
                <Col style={styles.filterCol}>
                  <RadioGroup dataSource={list} defaultValue={"allow"}/>
                </Col>
              </Row>
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}><label className="label-required">*</label>最小提前还款金额</label>
                  <IceFormBinder
                    name="prepaymentAmountMin"
                    required 
                    message="必填"
                  >
                    <Input placeholder="最小提前还款金额" />
                  </IceFormBinder>
                  <IceFormError name="prepaymentAmountMin" />
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}><label className="label-required">*</label>早提前还款期数</label>
                  <IceFormBinder
                    name="prepaymentPeriodsLimit"
                    required 
                    message="必填"
                  >
                    <Input placeholder="早提前还款期数" />
                  </IceFormBinder>
                  <IceFormError name="prepaymentPeriodsLimit" />
                </Col>
              </Row>
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>违约金计算基础</label>
                  <IceFormBinder
                     name="penaltyBasicAmount"
                     required 
                     message="必填"
                  >
                    <Select
                      name="penaltyBasicAmount"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="LOAN_AMOUNT">按贷款总额</Option>
                      <Option value="PREPAYMENT">按提前还款金额</Option>
                      <Option value="SURPLUS_PRINCIPAL">按照剩余本金</Option>
                    </Select>
                  </IceFormBinder>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>违约金计算方式</label>
                  <IceFormBinder
                    name="penaltyCalculationType"
                    required 
                    message="必填"
                  >
                    <Select
                      name="penaltyCalculationType"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="PERCENT">按比例</Option>
                    </Select>
                  </IceFormBinder>
                </Col>
              </Row>
              <div className="table-title">提前还款方式设置</div>
              <Table
                dataSource={this.state.dataSource4}
                hasHeader
                className="table"
                primaryKey="id"
              >
                <Table.Column title="最小期限" width={280} dataIndex="loanTermMin"/>
                <Table.Column title="最大期限(元)" dataIndex="loanTermMax"/>
                <Table.Column title="期限单位" dataIndex="termUnit"/>
                <Table.Column title="违约金比例(%)" dataIndex="penaltyPercentage"/>
                <Table.Column title="操作" width={80} dataIndex="quotaRemove" />
              </Table>
              <div style={styles.addNew}>
                <Button onClick={this.addNewItem4} style={styles.addNewItem}>新增一行</Button>
              </div>
              <div className="next-btn-box">
                <div className="next-btn-lx" onClick={this.NextClick}>下一步</div>
              </div>
            </div>
          </IceContainer>
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
    width: '140px',
    textAlign: 'right',
    marginRight: '12px',
    fontSize: '14px',
  },

  filterTool: {
    width: '200px',
  },
  addNew: {
    marginTop: '10px',
    textAlign: 'right',
  },
  addNewItem: {
    hiegth: '30px',
    borderRadius: 0,
    border: 'none',
    background: '#ec9d00',
    color: '#fff',
  },
  batchBtn: {
    // marginRight: '10px',
    float: 'none',
  },
  removeBtn: {
    marginLeft: 10,
    border: 'none',
    background: '#ec9d00',
    color: '#fff',

  },
  pagination: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
