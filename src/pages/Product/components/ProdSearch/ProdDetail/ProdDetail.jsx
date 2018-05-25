import React, { Component } from 'react';
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

import IceContainer from '@icedesign/container';
// import CellEditor from './CellEditor';
// form binder 详细用法请参见官方文档
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import './ProdDetail.scss';
const { Row, Col } = Grid;
const { Option } = Select;
const { Group: RadioGroup } = Radio;


const product1 ={
  title: '产品各种详情'
}
export default class ProdDetail extends Component {
  static displayName = 'ProdDetail';
  
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  addNewItem = () => {
    this.state.dataSource.push({
      todo: '暂无',
      memo: '暂无',
      validity: '暂无',
    });
    this.setState({
      dataSource: this.state.dataSource,
    });
  };
//组件加载后
  componentDidMount(){
    let {actions,pageData, params} = this.props;
    this.props.actions.getDetail(params.id);//传参数，eg:ID
  }
  //判断品牌／车型／车系
  relatedType=(value, index, record)=>{
   let itemPath= record.relatedPath.split('/');
   return itemPath.length==3?'品牌':(itemPath.length==4?'车系':'车型')
  }

  //多选框展示
  checkboxShow=(data)=>{
    let temp = ''
    for(var key in data){
      if(key<data.length-1){
        temp += data[key]+' 、 ' 
      }else{
        temp += data[key]
      }
    }
   return temp;
  }
  render() {
    let product = this.props.formData.product||[];//基本信息
    let percentageSetting = this.props.formData.percentageSetting ||[];//贷款成数设置
    let ratesSetting = this.props.formData.ratesSetting || [];//利率设置    
    let repaymentMethodsSetting = this.props.formData.repaymentMethodsSetting ||[];//还款方式设置    
    let prepaymentSetting = this.props.formData.prepaymentSetting ||[];//提前还款设置
    let productScopes =this.props.formData.productScopes ||[]
    
    return (
      <IceFormBinderWrapper
        value={this.props.value}
        onChange={this.props.onChange}
      >
        <div>
          <IceContainer>
            <legend className="pch-legend">
              <span className="pch-legend-legline"></span>基本信息
            </legend>
            <div className="pch-condition">
              <Row wrap >
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>资金方：</label>
                  <span >{product.tenantName}</span>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>产品名称：</label>
                  <span >{product.name}</span>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>合同显示名称：</label>
                  <span >{product.contractDisplayName}</span>
                </Col>
              </Row>
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}>产品类型：</label>
                  <span >{product.productType}</span>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}>材料收取清单：</label>
                  <span >{product.productCollectionName}</span>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}>生效期限：</label>
                  <span >{product.effectiveDate}～{product.expirationDate}</span>
                </Col>
              </Row>
              <Row wrap>
                
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}>允许贴息：</label>
                  <span >{product.isPermittedDiscount==true?'是':'否'}</span>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}>状态：</label>
                  <span >{product.status=='1'?'生效':(product.status=='0'?'关闭':'失效')}</span>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}>尾款产品：</label>
                  <span >{product.isRetainage==true?'是':'否'}</span>
                </Col>
              </Row>
             
              <Row wrap>
                <Col style={styles.filterCol}>
                  <label style={styles.filterTitle}>贷款用途：</label>
                  <span >{this.checkboxShow(product.purposeOfLoan)}</span>
                </Col>
              </Row>
              <Row wrap>
                <Col style={styles.filterCol}>
                  <label style={styles.filterTitle}>担保方式：</label>
                  <span >{this.checkboxShow(product.guaranteeMethodType)}</span>
                </Col>
              </Row>
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}>支付方式：</label>
                  <span >{product.paymentOfLoan}</span>
                </Col>
              </Row>
              <Row wrap>
                <label style={styles.filterTitle}>产品描述：</label>
                <span >{product.description}</span>
              </Row>
            </div>
          <legend className="pch-legend" style={{marginTop:"30px"}}>
            <span className="pch-legend-legline"></span>额度期限设置
            </legend>
          <div className="pch-condition">
            <Row wrap>
              <Col style={styles.filterCol}>
                <label style={styles.filterTitle}>贷款期限变更：</label>
                <span >{this.checkboxShow(product.loanTermChange)}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>申请金额范围(元)：</label>
                <span >{product.principalAmountMin}</span>
                <div className="lx-mid-line">—</div>
                <span >{product.principalAmountMax}</span>
              </Col>
              
            </Row>
            <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>期限范围(月)：</label>
                <span >{product.loanTermRangeMin}</span>
                <div className="lx-mid-line">—</div>
                <span >{product.loanTermRangeMax}</span>
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>贷款比率(%)：</label>
                <span >{product.loanPercentageMin}</span>
                <div className="lx-mid-line">—</div>
                <span >{product.loanPercentageMax}</span>
              </Col>
            </Row>
            <div className="table-title">产品成数设置</div>
            <Table
                dataSource={percentageSetting}
                hasHeader
                className="table"
              >
                <Table.Column title="最小期限(月)" dataIndex="loanTermRangeMin" />
                <Table.Column title="最大期限(月)"  dataIndex="loanTermRangeMax"/>
                <Table.Column title="最小成数(%)"  dataIndex="loanPercentageMin"/>
                <Table.Column title="最大成数(%)"  dataIndex="loanPercentageMax"/>
              </Table>
          </div>

          <legend className="pch-legend" style={{marginTop:"30px"}}>
            <span className="pch-legend-legline"></span>利率设置
            </legend>
          <div className="pch-condition">
            <Row wrap>
              <Col style={styles.filterCol}>
                <label style={styles.filterTitle}>贷款利率变更：</label>
                <span >{this.checkboxShow(product.interestLoanRateChange)}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>定价利率规则：</label>
                <span >{product.interestRateRules}</span>
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>利率模式：</label>
                <span >{product.interestRateModel}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>执行年利率范围(%)：</label>
                <span >{product.interestRatesRangeMin}</span>
                <div className="lx-mid-line">—</div>
                <span >{product.interestRatesRangeMax}</span>
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>利率基准日：</label>
                <span >{product.interestRateBaseDate}</span>
              </Col>
            </Row>
            <div className="table-title">产品利率设置</div>
              <Table
                dataSource = {ratesSetting}
                hasHeader
                className="table"
              >
                <Table.Column title="渠道" width={280} dataIndex="channelTypes" />
                <Table.Column title="最小执行年利率(%)" dataIndex="interestRatesRangeMin"/>
                <Table.Column title="最大执行年利率(%)" dataIndex="interestRatesRangeMax"/>
              </Table>
          </div>

          <legend className="pch-legend" style={{marginTop:"30px"}}>
            <span className="pch-legend-legline"></span>还款设置
          </legend>
          <div className="pch-condition">
            <Row wrap>
              <Col style={styles.filterCol}>
                <label style={styles.filterTitle}>还款账户变更：</label>
                <span >{this.checkboxShow(product.repaymentAccountChange)}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col style={styles.filterCol}>
                <label style={styles.filterTitle}>还款周期：</label>
                <span >{this.checkboxShow(product.repaymentPeriodFrequency)}</span>
              </Col>
            </Row>

            <Row wrap>
              <Col style={styles.filterCol}>
                <label style={styles.filterTitle}>还款日变更：</label>
                <span >{product.repaymentDateChange==true?'是':'否'}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col style={styles.filterCol}>
              <label style={styles.filterTitle}>宽限期变更：</label>              
              <span >{product.gracePeriodChange==true?'是':'否'}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col style={styles.filterCol}>
              <label style={styles.filterTitle}>还款方式变更：</label>              
              <span >{product.repaymentMethodChange==true?'是':'否'}</span>
              </Col>
            </Row>
            <div className="table-title">还款方式设置</div>
              <Table
                dataSource ={repaymentMethodsSetting}
                hasHeader
                className="table"
                style={{marginBottom:"30px"}}
              >
                <Table.Column title="还款方式" width={280} dataIndex="repaymentMethods"/>
                <Table.Column title="固定金额(元)"  dataIndex="fixedAmount"/>
                <Table.Column title="宽限期期限(天)" dataIndex="gracePeriod"/>
                <Table.Column title="宽限期失效后还款方式" dataIndex="repaymentExpirationGracePeriod"/>
              </Table>
            <Row wrap>
              <Col style={styles.filterCol}>
                <label style={styles.filterTitle}>提前还款：</label>
                <span >{product.isEarlyRepaymentAllowed==true?'是':'否'}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>最小提前还款金额：</label>
                <span >{product.prepaymentAmountMin}</span>
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>提前还款期数：</label>
                <span >{product.prepaymentPeriodsLimit}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>违约金计算基础：</label>
                <span >{product.penaltyBasicAmount}</span>
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>违约金计算方式：</label>
                <span >{product.penaltyCalculationType}</span>
              </Col>
            </Row>
            <div className="table-title">提前还款方式设置</div>
              <Table
                dataSource = {prepaymentSetting}
                hasHeader
                className="table"
                primaryKey="id"
              >
                <Table.Column title="最小期限" width={280} dataIndex="loanTermMin"/>
                <Table.Column title="最大期限" dataIndex="loanTermMax"/>
                <Table.Column title="期限单位" dataIndex="termUnit"/>
                <Table.Column title="违约金比例(%)" dataIndex="penaltyPercentage"/>
              </Table>
          </div>
          <legend className="pch-legend" style={{marginTop:"30px"}}>
            <span className="pch-legend-legline"></span>按品牌/车系/车型
            </legend>
            <div className="pch-condition">
            <div className="table-title">按品牌/车系/车型</div>
            <Table
              dataSource={productScopes}
                hasHeader
                className="table"
                primaryKey="id"
              >
                <Table.Column title="类型" cell={this.relatedType}/>
                <Table.Column title="名称" dataIndex="relatedPathName"/>
              </Table>
            </div>
          </IceContainer>
        </div>
      </IceFormBinderWrapper >
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
infoItems: {
    padding: 0,
    marginLeft: '25px',
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
