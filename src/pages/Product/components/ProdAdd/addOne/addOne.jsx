import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import {
  Input,
  Button,
  Checkbox,
  Select,
  DatePicker,
  Switch,
  Radio,
  Grid,
  Table,
} from '@icedesign/base';

const { Row, Col } = Grid;

// FormBinder 用于获取表单组件的数据，通过标准受控 API value 和 onChange 来双向操作数据
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;

// Switch 组件的选中等 props 是 checked 不符合表单规范的 value 在此做转换
const SwitchForForm = (props) => {
  const checked = props.checked === undefined ? props.value : props.checked;

  return (
    <Switch
      {...props}
      checked={checked}
      onChange={(currentChecked) => {
        if (props.onChange) props.onChange(currentChecked);
      }}
    />
  );
};

export default class CreateActivityForm extends Component {
  static displayName = 'CreateActivityForm';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value:{
        tenantId:'',
        name:'',
        contractDisplayName:'',
        prodType:'',
        serviceFormType:'',
        collectionDetailListId:'',
        effectiveDate:[],
        isPermittedDiscount:'',
        status:'',
        isRetainage:'',
        purposeOfLoan:['buyCar'],
        guaranteeMethodType:['CREDIT'],
        paymentOfLoan:'',
        description:'',
        loanTermChange:['ALLOW_DELAY'],
        principalAmountMin:'',
        principalAmountMax:'',
        loanTermRangeMin:'',
        loanTermRangeMax:'',
        loanPercentageMin:'',
        loanPercentageMax:'',
        interestLoanRateChange:['Allow_Change_Rate_Adjust'],
        interestRateRules:'',
        interestRateModel:'',
        interestRatesRangeMin:'',
        interestRatesRangeMax:'',
        interestRateBaseDate:'',
        repaymentAccountChange:['Allow_Change'],
        repaymentPeriodFrequency:['MONTH'],
        repaymentDateChange:'allow',
        gancePeriodChange:'allow',
        repaymentMethodChange:'allow',
        isEarlyRepaymentAllowed:'allow',
        prepaymentAmountMin:'',
        prepaymentPeriodsLimit:'',
        penaltyBasicAmount:'',
        penaltyCalculationType:'',
      },
      data:{}
    };
  }

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  submit = () => {
    this.formRef.validateAll((error, value) => {
      console.log('error', error, 'value', value);
      if (error) {
        // 处理表单报错
        return;
      }
      // 提交当前填写的数据
      this.props.actions.save(value);
    });
  };
  componentWillMount(){
    this.props.actions.prodActions();
  }
  render() {
    let data = this.props.prodActions|| {}
    console.log(data)
    return (
      <div className="create-activity-form">
        <IceContainer >
          <IceFormBinderWrapper
            ref={(formRef) => {
              this.formRef = formRef;
            }}
            value={this.state.value}
            onChange={this.onFormChange}
          >
            <div>
            <legend className="legend">
              <span className="legLine"></span>基本信息
            </legend>
            <div className="f-box">
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}><label className="label-required">*</label>资金方</label>
                  <IceFormBinder
                    name="tenantId"
                    required
                    message="必填"
                    validator={this.check}
                  >
                   <Input value="资金方" disabled/>
                  </IceFormBinder>
                  <IceFormError name="tenantId" />
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}><label className="label-required">*</label>产品名称</label>
                  <IceFormBinder
                    name="name"
                  >
                    <Input placeholder="产品名称" 
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
                      {data.productType&&data.productType.map((val,i)=>{
                        return(
                          <Option value={val.value} key={i}>{val.desc}</Option>
                        )
                    })}
                    </Select> 
                  </IceFormBinder>
                  <IceFormError name="prodType"/>
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
                      {data.serviceFormType&&data.serviceFormType.map((val,i)=>{
                        return(
                          <Option value={val.value} key={i}>{val.desc}</Option>
                        )
                    })}
                      {/* <Option value="option1">车抵贷</Option>
                      <Option value="option2">新车贷</Option> */}
                    </Select>
                  </IceFormBinder>
                  <IceFormError name="collectionDetailListId"/>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}><span className="label-required">*</span>生效日期</label>
                  <IceFormBinder
                    name="effectiveDate"
                    // 使用 RangePicker 组件输出的第二个参数字符串格式的日期
                    valueFormatter={(date, dateStr) => dateStr}
                  >
                    <RangePicker format={"YYYY/MM/DD"} style={{width:"200px"}}/> 
                  </IceFormBinder>
                  
                </Col>
              </Row>
              <Row wrap>
                
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
                      <Option value="0">是</Option>
                      <Option value="1">否</Option>
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
                      <Option value="0">生效</Option>
                      <Option value="1">未生效</Option>
                      <Option value="2">实效</Option>
                    </Select>
                  </IceFormBinder>
                  <IceFormError name="status"/>
                </Col>
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
                      <Option value="0">是</Option>
                      <Option value="1">否</Option>
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
                        className="next-form-text-align">
                        {data.purposeOfLoan&&data.purposeOfLoan.map((val,i)=>{
                          return(
                            <Checkbox value={val.value} key={i}>{val.desc}</Checkbox>
                          )
                        })}
                       
                        </CheckboxGroup>
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
                        className="next-form-text-align" >
                        {data.guaranteeMethodType&&data.guaranteeMethodType.map((val,i)=>{
                          return(
                            <Checkbox value={val.value} key={i}>{val.desc}</Checkbox>
                          )
                        })}
                      </CheckboxGroup>
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
                    {data.paymentOfLoan&&data.paymentOfLoan.map((val,i)=>{
                          return(
                            <Option value={val.value} key={i}>{val.desc}</Option>
                          )
                        })}
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
                        className="next-form-text-align">
                        {data.loanTermChange&&data.loanTermChange.map((val,i)=>{
                          return(
                            <Checkbox value={val.value} key={i}>{val.desc}</Checkbox>
                          )
                        })}
                        </CheckboxGroup>
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
                        className="next-form-text-align">
                        {data.interestLoanRateChange&&data.interestLoanRateChange.map((val,i)=>{
                          return(
                            <Checkbox value={val.value} key={i}>{val.desc}</Checkbox>
                          )
                        })}
                    </CheckboxGroup>
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
                        {data.interestRateRules&&data.interestRateRules.map((val,i)=>{
                          return(
                            <Option value={val.value} key={i}>{val.desc}</Option>
                          )
                        })}
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
                     {data.interestRateModel&&data.interestRateModel.map((val,i)=>{
                          return(
                            <Option value={val.value} key={i}>{val.desc}</Option>
                          )
                        })}
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
                     {data.interestRateBaseDate&&data.interestRateBaseDate.map((val,i)=>{
                          return(
                            <Option value={val.value} key={i}>{val.desc}</Option>
                          )
                        })}
                    </Select>
                  </IceFormBinder>
                  <IceFormError name="interestRateBaseDate" />
                </Col>
              </Row>
              <div className="table-title">产品利率设置</div>
              <Table
              
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
                      >
                        {data.repaymentAccountChange&&data.repaymentAccountChange.map((val,i)=>{
                          return(
                            <Checkbox value={val.value} key={i}>{val.desc}</Checkbox>
                          )
                        })}
                      </CheckboxGroup>
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
                      >
                        {data.repaymentPeriodFrequency&&data.repaymentPeriodFrequency.map((val,i)=>{
                          return(
                            <Checkbox value={val.value} key={i}>{val.desc}</Checkbox>
                          )
                        })}
                        </CheckboxGroup>
                    </IceFormBinder>
                    <div>
                      <IceFormError name="repaymentPeriodFrequency" />
                    </div>
                </Col>
               
              </Row>

              <Row wrap>
                <label style={styles.filterTitle}> <span className="label-required">*</span>还款日变更</label>
                <Col style={styles.filterCol}>
                <IceFormBinder name="repaymentDateChange" >
                  <RadioGroup
                      className="next-form-text-align"
                      dataSource={[
                        { label: '是', value: 'allow' },
                        { label: '否', value: 'not_allow' },
                      ]}
                    />
                </IceFormBinder>
                    <div>
                      <IceFormError name="repaymentDateChange" />
                    </div>
                  
                </Col>
              </Row>
              <Row wrap>
                <label style={styles.filterTitle}> <span className="label-required">*</span>宽限期变更</label>
                <Col style={styles.filterCol}>
                <IceFormBinder name="gancePeriodChange" >
                <RadioGroup
                      className="next-form-text-align"
                      dataSource={[
                        { label: '是', value: 'allow' },
                        { label: '否', value: 'not_allow' },
                      ]}
                    />
                </IceFormBinder>
                    <div>
                      <IceFormError name="gancePeriodChange" />
                    </div>
                  
                </Col>
              </Row>
              <Row wrap>
                <label style={styles.filterTitle}> <span className="label-required">*</span>还款方式变更</label>
                <Col style={styles.filterCol}>
                <IceFormBinder name="repaymentMethodChange" >
                <RadioGroup
                      className="next-form-text-align"
                      dataSource={[
                        { label: '是', value: 'allow' },
                        { label: '否', value: 'not_allow' },
                      ]}
                    />
                </IceFormBinder>
                    <div>
                      <IceFormError name="repaymentMethodChange" />
                    </div>
                  
                </Col>
              </Row>
              <div className="table-title">还款方式设置</div>
              <Table
              
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
                <IceFormBinder name="isEarlyRepaymentAllowed" >
                <RadioGroup
                      className="next-form-text-align"
                      dataSource={[
                        { label: '是', value: 'allow' },
                        { label: '否', value: 'not_allow' },
                      ]}
                    />
                </IceFormBinder>
                    <div>
                      <IceFormError name="isEarlyRepaymentAllowed" />
                    </div>
                  
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
                     {data.penaltyBasicAmount&&data.penaltyBasicAmount.map((val,i)=>{
                          return(
                            <Option value={val.value} key={i}>{val.desc}</Option>
                          )
                        })}
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
                     {data.penaltyCalculationType&&data.penaltyCalculationType.map((val,i)=>{
                          return(
                            <Option value={val.value} key={i}>{val.desc}</Option>
                          )
                        })}
                    </Select>
                  </IceFormBinder>
                </Col>
              </Row>
              <div className="table-title">提前还款方式设置</div>
              <Table
                
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
                <div className="next-btn-lx" onClick={this.submit}>下一步</div>
              </div>
            </div>
            </div>
          </IceFormBinderWrapper>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '25px',
  },
  formLabel: {
    textAlign: 'right',
  },
  btns: {
    margin: '25px 0',
  },
  resetBtn: {
    marginLeft: '20px',
  },filterCol: {
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
