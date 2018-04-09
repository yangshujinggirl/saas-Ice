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
  Dialog
} from '@icedesign/base';

import Chanpinchengshu from './Chanpinchengshu';
import Chanpinlilv from './Chanpinlilv';
import Huankuanfangshi from './Huankuanfangshi';
import Tiqianhuankuanfangshi from './Tiqianhuankuanfangshi';

const { Row, Col } = Grid;

// FormBinder 用于获取表单组件的数据，通过标准受控 API value 和 onChange 来双向操作数据
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;


export default class CreateActivityForm extends Component {
  static displayName = 'CreateActivityForm';

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      value:{
            tenantId:'12',
            name:'',
            contractDisplayName:undefined,
            productType:undefined,
            serviceFormType:null,
            collectionDetailListId:undefined,
            effectiveDate:[],
            isPermittedDiscount:undefined,
            status:undefined,
            enable:1,
            isRetainage:undefined,
            purposeOfLoan:['BUY_CAR'],
            guaranteeMethodType:['CREDIT'],
            paymentOfLoan:undefined,
            description:'',
            loanTermChange:['ALLOW_DELAY'],
            principalAmountMin:'',
            principalAmountMax:'',
            loanTermRangeMin:'',
            loanTermRangeMax:'',
            loanPercentageMin:'',
            loanPercentageMax:'',
            interestLoanRateChange:['ALLOW_CHANGE_RATE_ADJUST'],
            interestRateRules:undefined,
            interestRateModel:undefined,
            interestRatesRangeMin:'',
            interestRatesRangeMax:'',
            interestRateBaseDate:undefined,
            repaymentAccountChange:['ALLOW_CHANGE'],
            repaymentPeriodFrequency:['MONTH'],
            repaymentDateChange:'true',
            gracePeriodChange:'true',
            repaymentMethodChange:'true',
            isEarlyRepaymentAllowed:'true',
            prepaymentAmountMin:'',
            prepaymentPeriodsLimit:'',
            penaltyBasicAmount:undefined,
            penaltyCalculationType:undefined,
            percentageSetting: [],
            ratesSetting: [],
            repaymentMethodsSetting: [],
            prepaymentSetting: [],
            productScope: []
      },
     
    };
  }
  onFormChange = (value) => {
    this.setState({
      value,
    });
  };
  AllValue=(value)=>{
    return(
      {
        product:{
          tenantId:value.tenantId,
          name:value.name,
          contractDisplayName:value.contractDisplayName,
          productType:value.productType,
          serviceFormType:value.serviceFormType,
          collectionDetailListId:value.collectionDetailListId,
          effectiveDate:value.effectiveDate,
          expirationDate:value.expirationDate,
          isPermittedDiscount:value.isPermittedDiscount,
          status:value.status,
          enable:value.enable,
          isRetainage:value.isRetainage,
          purposeOfLoan:value.purposeOfLoan,
          guaranteeMethodType:value.guaranteeMethodType,
          paymentOfLoan:value.paymentOfLoan,
          description:value.description,
          loanTermChange:value.loanTermChange,
          principalAmountMin:value.principalAmountMin,
          principalAmountMax:value.principalAmountMax,
          loanTermRangeMin:value.loanTermRangeMin,
          loanTermRangeMax:value.loanTermRangeMax,
          loanPercentageMin:value.loanPercentageMin,
          loanPercentageMax:value.loanPercentageMax,
          interestLoanRateChange:value.interestLoanRateChange,
          interestRateRules:value.interestRateRules,
          interestRateModel:value.interestRateModel,
          interestRatesRangeMin:value.interestRatesRangeMin,
          interestRatesRangeMax:value.interestRatesRangeMax,
          interestRateBaseDate:value.interestRateBaseDate,
          repaymentAccountChange:value.repaymentAccountChange,
          repaymentPeriodFrequency:value.repaymentPeriodFrequency,
          repaymentDateChange:value.repaymentDateChange,
          gracePeriodChange:value.gracePeriodChange,
          repaymentMethodChange:value.repaymentMethodChange,
          isEarlyRepaymentAllowed:value.isEarlyRepaymentAllowed,
          prepaymentAmountMin:value.prepaymentAmountMin,
          prepaymentPeriodsLimit:value.prepaymentPeriodsLimit,
          penaltyBasicAmount:value.penaltyBasicAmount,
          penaltyCalculationType:value.penaltyCalculationType,
        },
      percentageSetting: value.percentageSetting,
      ratesSetting:value.ratesSetting,
      repaymentMethodsSetting: value.repaymentMethodsSetting,
      prepaymentSetting: value.prepaymentSetting,
      productScope: value.productScope
      }
    )
  }
  submit = () => {
    this.formRef.validateAll((error, value) => {
      if (error) {
        // 处理表单报错
        return;
      }
      // 提交当前填写的数据
      value.effectiveDate= value.time[0];
      value.expirationDate = value.time[1]
      let AllValue = this.AllValue(value);
      this.props.actions.save(AllValue);
    });
  };
  componentDidMount(){
    this.props.actions.prodActions();
    this.props.actions.filesearch()
  }
  addNewItem(key){
    let newData = this.state.value[key];
    newData.push({})
    this.setState({
      newData
    })
  }

  removeItem(key, index){
    let oldData = this.state.value[key]
      oldData.splice(index, 1);
      this.setState({
        oldData
      });
  }
 Option=(data)=>{
    let coll =[];
    let test=[]
    for(var i=0;i<data.length;i++){
      data.map((val,j)=>{
        coll.push({
          id:val.id,
          name:val.name,
        })
      })
    }
    //去重
    for(var i=0;i<coll.length;i++){
      　　var flag = true;
      　　for(var j=0;j<test.length;j++){
      　　　　if(coll[i].name == test[j].name){
      　　　　　　flag = false;
      　　　　};
      　　}; 
      　　if(flag){
      test.push(coll[i]);
      　　};
      };
    return test;
  }

//是否提前还款
tiQian=(data)=>{
  return (
    <div>
      <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}><label className="label-required">*</label>最小提前还款金额</label>
                <IceFormBinder
                  name="prepaymentAmountMin"
                  required 
                  message="最小提前还款金额必填"
                 
                >
                  <Input placeholder="最小提前还款金额"  className="custom-input" />
                </IceFormBinder>
                <IceFormError name="prepaymentAmountMin" />
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}><label className="label-required">*</label>早提前还款期数</label>
                <IceFormBinder
                  name="prepaymentPeriodsLimit"
                  required 
                  message="早提前还款期数必填"
                >
                 
                  <Input placeholder="早提前还款期数" className="custom-input"   />
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
                    message="违约金计算基础必填"
                >
                  <Select
                    name="penaltyBasicAmount"
                    placeholder="请选择"
                    style={styles.filterTool}
                    className="custom-select"
                  >
                    {data.penaltyBasicAmount&&data.penaltyBasicAmount.map((val,i) =>{
                        return(
                          <Option value={val.value} key={i}>{val.desc}</Option>
                        )
                      })}
                  </Select>
                </IceFormBinder>
                <IceFormError name="penaltyBasicAmount" />
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}> <span className="label-required">*</span>违约金计算方式</label>
                <IceFormBinder
                  name="penaltyCalculationType"
                  required 
                  message="违约金计算方式必填"
                >
                  <Select
                    name="penaltyCalculationType"
                    placeholder="请选择"
                    style={styles.filterTool}
                    className="custom-select"
                  >
                    {data.penaltyCalculationType&&data.penaltyCalculationType.map((val,i) =>{
                        return(
                          <Option value={val.value} key={i}>{val.desc}</Option>
                        )
                      })}
                  </Select>
                </IceFormBinder>
                <IceFormError name="penaltyCalculationType" />
              </Col>
            </Row>
            <Tiqianhuankuanfangshi
              styles={styles}
              items={this.state.value.prepaymentSetting}
              addItem={this.addNewItem.bind(this, 'prepaymentSetting')}
              removeItem={this.removeItem.bind(this, 'prepaymentSetting')}
            />
    </div>
  )
};

//贷款期限不允许变更时其他不可被选
loanTermChange=(data)=>{
  data.map((item,i)=>{
    if(item=='NOT_ALLOW_CHANGE'){
      this.state.value.loanTermChange=['NOT_ALLOW_CHANGE']
    }
  })
};

//贷款利率不允许变更时其他不可被选
interestLoanRateChange=(data)=>{
  data.map((item,i)=>{
    if(item=='NOT_ALLOW_CHANGE_ACCOUNT'){
      this.state.value.interestLoanRateChange=['NOT_ALLOW_CHANGE_ACCOUNT']
    }
  })
};

//还款账户不允许变更时其他不可被选
repaymentAccountChange=(data)=>{
  data.map((item,i)=>{//
    if(item=='NOT_ALLOW_CHANGE'){
      this.state.value.repaymentAccountChange=['NOT_ALLOW_CHANGE']
    }
  })
};

  render() {
    let data = this.props.prodActions|| {}
    data = data.data ||{}
    let data1 = this.props.fileData||{}
        data1= data1.data||{}
        data1= data1.list ||[]
    let collData = this.Option(data1)
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
            <legend className="pch-legend">
              <span className="pch-legend-legline"></span>基本信息
            </legend>
            <div className="pch-condition">
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}><label className="label-required">*</label>资金方</label>
                  <IceFormBinder
                    name="tenantId"
                    validator={this.check}
                  >
                   <Input value="资金方" disabled  className="custom-input"/>
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
                       message="产品名称必填"
                       className="custom-input"
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
                      message="合同显示名称必填"
                      className="custom-input"
                    />
                  </IceFormBinder>
                  <IceFormError name="contractDisplayName" />
                </Col>
              </Row>
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>产品类型</label>
                  <IceFormBinder
                    name="productType"
                  >
                    <Select
                      name="productType"
                      required 
                      message="产品类型必填"
                      placeholder="请选择"
                      style={styles.filterTool}
                      className="custom-select"
                    >
                      {data.productType&&data.productType.map((val,i) => {
                        return(
                          <Option value={val.value} key={i}>{val.desc}</Option>
                        )
                    })}
                    </Select> 
                  </IceFormBinder>
                  <IceFormError name="productType"/>
                </Col>
                
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>资料收取清单</label>
                  <IceFormBinder
                    name="collectionDetailListId"
                  >
                    <Select
                      name="collectionDetailListId"
                      required 
                      message="资料收取清单必填"
                      placeholder="请选择"
                      style={styles.filterTool}
                      className="custom-select"
                    > 
                    {collData.map((val,i) => {
                      return(
                        <Option value={val.id} key={i}>{val.name}</Option>
                      )
                    })}
                    </Select>
                  </IceFormBinder>
                  <IceFormError name="collectionDetailListId"/>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}><span className="label-required">*</span>生效期限</label>
                  <IceFormBinder
                    name="time"
                    // 使用 RangePicker 组件输出的第二个参数字符串格式的日期
                    valueFormatter={(date, dateStr) => dateStr}
                  >
                    <RangePicker format={"YYYY-MM-DD"} style={{width:"200px"}} style={{width:'220px',height:'34px',lineHeight:'33px'}}/> 
                  </IceFormBinder>
                  <IceFormError name="time"/>
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
                      message="允许贴息必填"
                      placeholder="请选择"
                      style={styles.filterTool}
                      className="custom-select"
                    >
                      <Option value="true">是</Option>
                      <Option value="false">否</Option>
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
                      message="状态必填"
                      placeholder="请选择"
                      style={styles.filterTool}
                      className="custom-select"
                    >
                      <Option value="1">生效</Option>
                      <Option value="0">未生效</Option>
                      <Option value="2">失效</Option>
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
                      message="尾款产品必填"
                      placeholder="请选择"
                      style={styles.filterTool}
                      className="custom-select"
                    >
                      <Option value="true">是</Option>
                      <Option value="false">否</Option>
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
                        className="next-form-text-align " >
                        {data.purposeOfLoan&&data.purposeOfLoan.map((val,i) =>{
                          return(
                            <Checkbox value={val.value} key={i} className="checkboxCurr">{val.desc}</Checkbox>
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
                        {data.guaranteeMethodType&&data.guaranteeMethodType.map((val,i) =>{
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
                      message="支付方式必填"
                      placeholder="请选择"
                      style={styles.filterTool}
                      className="custom-select"
                    >
                    {data.paymentOfLoan&&data.paymentOfLoan.map((val,i) =>{
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
            <legend className="pch-legend">
              <span className="pch-legend-legline"></span>额度期限设置
            </legend>
            <div className="pch-condition">
              <Row wrap>
                <Col style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>贷款期限变更</label>
                  <IceFormBinder name="loanTermChange" >
                      <CheckboxGroup
                        className="next-form-text-align">
                        {data.loanTermChange&&data.loanTermChange.map((val,i) =>{
                          return(
                            <Checkbox value={val.value}  key={i} onChange={this.loanTermChange(this.state.value.loanTermChange)}>{val.desc}</Checkbox>
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
                    <Input style={{ width: '100px' ,height:'34px'}} />
                  </IceFormBinder>
                  <IceFormError name="principalAmountMin" />
                  <div className="lx-mid-line">—</div>
                  <IceFormBinder
                    name="principalAmountMax"
                    required 
                    message="必填"
                  >
                    <Input style={{ width: '100px' ,height:'34px'}} />

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
                    <Input style={{ width: '100px',height:'34px'} }/>
                  </IceFormBinder>
                  <IceFormError name="loanTermRangeMin" />
                  <div className="lx-mid-line">—</div>
                  <IceFormBinder
                    name="loanTermRangeMax"
                    required 
                    message="必填"
                  >
                    <Input style={{ width: '100px' ,height:'34px'}} />

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
                    <Input style={{ width: '100px',height:'34px'} } />
                  </IceFormBinder>
                  <IceFormError name="loanPercentageMin" />
                  <div className="lx-mid-line">—</div>
                  <IceFormBinder
                    name="loanPercentageMax"
                    required 
                    message="必填"
                  >
                    <Input style={{ width: '100px' ,height:'34px'}} />

                  </IceFormBinder>
                  <IceFormError name="loanPercentageMax" />
                </Col>
              </Row>
              <Chanpinchengshu 
                styles={styles}
                items={this.state.value.percentageSetting}
                addItem={this.addNewItem.bind(this, 'percentageSetting')}
                removeItem={this.removeItem.bind(this, 'percentageSetting')}
              />
            </div>
            
            <legend className="pch-legend">
              <span className="pch-legend-legline"></span>利率设置
            </legend>
            <div className="pch-condition">
              <Row wrap>
                <Col style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>贷款利率变更</label>
                    <IceFormBinder name="interestLoanRateChange" >
                    <CheckboxGroup
                        className="next-form-text-align">
                        {data.interestLoanRateChange&&data.interestLoanRateChange.map((val,i) =>{
                          return(
                            <Checkbox value={val.value} key={i} onChange={this.interestLoanRateChange(this.state.value.interestLoanRateChange)}>{val.desc}</Checkbox>
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
                       message="定价利率规则必填">
                    <Select
                      name="interestRateRules"
                      placeholder="请选择"
                      style={styles.filterTool}
                      className="custom-select"
                    >
                        {data.interestRateRules&&data.interestRateRules.map((val,i) =>{
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
                    message="利率模式必填"
                  >
                    <Select
                      name="interestRateModel"
                      placeholder="请选择"
                      style={styles.filterTool}
                      className="custom-select"
                    >
                     {data.interestRateModel&&data.interestRateModel.map((val,i) =>{
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
                      
                      style={{ width: '100px',height:'34px' }}
                     />
                  </IceFormBinder>
                  <IceFormError name="interestRatesRangeMin" />
                  <div className="lx-mid-line">—</div>
                  <IceFormBinder
                    name="interestRatesRangeMax"
                    required 
                    message="必填"
                  >
                    <Input style={{ width: '100px' ,height:'34px'}} 
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
                    message="利率基准日必填"
                  >
                    <Select
                      name="interestRateBaseDate"
                      placeholder="请选择"
                      style={styles.filterTool}
                      className="custom-select"
                    >
                     {data.interestRateBaseDate&&data.interestRateBaseDate.map((val,i) =>{
                          return(
                            <Option value={val.value} key={i}>{val.desc}</Option>
                          )
                        })}
                    </Select>
                  </IceFormBinder>
                  <IceFormError name="interestRateBaseDate" />
                </Col>
              </Row>
              <Chanpinlilv
                styles={styles}
                items={this.state.value.ratesSetting}
                addItem={this.addNewItem.bind(this, 'ratesSetting')}
                removeItem={this.removeItem.bind(this, 'ratesSetting')}
              />
            </div>
            <legend className="pch-legend">
              <span className="pch-legend-legline"></span>还款设置
            </legend>
            <div className="pch-condition">
              <Row wrap>
                <Col style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>还款账户变更</label>
                  <IceFormBinder name="repaymentAccountChange" type="array">
                      <CheckboxGroup
                        className="next-form-text-align"
                      >
                        {data.repaymentAccountChange&&data.repaymentAccountChange.map((val,i) =>{
                          return(
                            <Checkbox value={val.value} key={i} onChange={this.repaymentAccountChange(this.state.value.repaymentAccountChange)}>{val.desc}</Checkbox>
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
                        {data.repaymentPeriodFrequency&&data.repaymentPeriodFrequency.map((val,i) =>{
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
                        { label: '是', value: 'true' },
                        { label: '否', value: 'false' },
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
                <IceFormBinder name="gracePeriodChange" >
                <RadioGroup
                      className="next-form-text-align"
                      dataSource={[
                        { label: '是', value: 'true' },
                        { label: '否', value: 'false' },
                      ]}
                    />
                </IceFormBinder>
                    <div>
                      <IceFormError name="gracePeriodChange" />
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
                        { label: '是', value: 'true' },
                        { label: '否', value: 'false' },
                      ]}
                    />
                </IceFormBinder>
                    <div>
                      <IceFormError name="repaymentMethodChange" />
                    </div>
                  
                </Col>
              </Row>
              <Huankuanfangshi
                styles={styles}
                items={this.state.value.repaymentMethodsSetting}
                data={this.props.prodActions && this.props.prodActions.data}
                addItem={this.addNewItem.bind(this, 'repaymentMethodsSetting')}
                removeItem={this.removeItem.bind(this, 'repaymentMethodsSetting')}
              />
              <Row wrap>
                <label style={styles.filterTitle}> <span className="label-required">*</span>提前还款</label>
                <Col style={styles.filterCol}>
                <IceFormBinder name="isEarlyRepaymentAllowed" >
                <RadioGroup
                      className="next-form-text-align"
                      dataSource={[
                        { label: '是', value: 'true' },
                        { label: '否', value: 'false' },
                      ]}
                    />
                </IceFormBinder>
                    <div>
                      <IceFormError name="isEarlyRepaymentAllowed" />
                    </div>
                  
                </Col>
              </Row>
            {this.state.value.isEarlyRepaymentAllowed=='true'?this.tiQian(data):''}
              
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
    background: '#FC9E25',
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
