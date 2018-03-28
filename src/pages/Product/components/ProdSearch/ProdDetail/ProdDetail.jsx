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


const dataSource1 ={
  title: '产品各种详情'
}
export default class ProdDetail extends Component {
  static displayName = 'ProdDetail';
  
  constructor(props) {
    super(props);
    this.state = {
     
    };
    console.log(this.props.location.params)//id
    // let code = this.props.location.params.id
    // this.actions.getDetail()

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
    console.log('componentDidMount',this.props);
    let {actions,pageData, params} = this.props;
    this.props.actions.getDetail(params.id);//传参数，eg:ID
  }
  render() {
    let dataSource = this.props.formData.product||{};
    return (
      <IceFormBinderWrapper
        value={this.props.value}
        onChange={this.props.onChange}
      >
        <div>
          <IceContainer>
            <legend className="legend">
              <span className="legLine"></span>基本信息
            </legend>
            <div className="f-box">
              <Row wrap >
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>资金方：</label>
                  <span >{dataSource.tenantId}</span>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>产品名称：</label>
                  <span >{dataSource.name}</span>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>合同显示名称：</label>
                  <span >{dataSource.contractDisplayName}</span>
                </Col>
              </Row>
            <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>产品类型：</label>
                <span >{dataSource.title}</span>
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>业务表单：</label>
                <span >{dataSource.productType}</span>
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>资料收取清单：</label>
                <span >{dataSource.collectionDetailListId}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>生效日期：</label>
                <span >{dataSource.effectiveDate}</span>
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>允许贴息：</label>
                <span >{dataSource.isPermittedDiscount}</span>
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>状态：</label>
                <span >{dataSource.status}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>尾款产品：</label>
                <span >{dataSource.isRetainage}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col style={styles.filterCol}>
                <label style={styles.filterTitle}>贷款用途：</label>
                <span >{dataSource.purposeOfLoan}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col style={styles.filterCol}>
                <label style={styles.filterTitle}>担保方式：</label>
                <span >{dataSource.guaranteeMethodType}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>支付方式：</label>
                <span >{dataSource.paymentOfLoan}</span>
              </Col>
            </Row>
            <Row wrap>
              <label style={styles.filterTitle}>产品描述：</label>
              <span >{dataSource.description}</span>
            </Row>
            </div>
          <legend className="legend">
            <span className="legLine"></span>额度期限设置
            </legend>
          <div className="f-box">
            <Row wrap>
              <Col style={styles.filterCol}>
                <label style={styles.filterTitle}>贷款期限变更：</label>
                <span >{dataSource.title}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>申请金额范围(元)：</label>
                <span >{dataSource.principalAmountMin}</span>
                <div className="lx-mid-line">—</div>
                <span >{dataSource.principalAmountMax}</span>
              </Col>
              
            </Row>
            <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>期限范围(月)：</label>
                <span >{dataSource.loanTermRangeMin}</span>
                <div className="lx-mid-line">—</div>
                <span >{dataSource.loanTermRangeMax}</span>
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>贷款比率(%)：</label>
                <span >{dataSource.loanPercentageMin}</span>
                <div className="lx-mid-line">—</div>
                <span >{dataSource.loanPercentageMax}</span>
              </Col>
            </Row>
            <div className="table-title">产品成数设置</div>
            <Table
                // dataSource={dataSource}
                hasHeader
                className="table"
              >
                {/* <Table.Column  title="产品成数设置" /> */}
                <Table.Column title="最小期限(月)" dataIndex="loanTermRangeMin" />
                <Table.Column title="最大成数(%)"  dataIndex="loanTermRangeMax"/>
                <Table.Column title="最小成数(%)"  dataIndex="loanPercentageMin"/>
                <Table.Column title="最大期限(月)"  dataIndex="loanPercentageMax"/>
              </Table>
          </div>

          <legend className="legend">
            <span className="legLine"></span>利率设置
            </legend>
          <div className="f-box">
            <Row wrap>
              <Col style={styles.filterCol}>
                <label style={styles.filterTitle}>贷款利率变更：</label>
                <span >{dataSource.title}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>定价利率规则：</label>
                <span >{dataSource.interestRateRules}</span>
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>利率模式：</label>
                <span >{dataSource.interestRateModel}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>执行年利率范围(%)：</label>
                <span >{dataSource.interestRatesRangeMin}</span>
                <div className="lx-mid-line">—</div>
                <span >{dataSource.interestRatesRangeMax}</span>
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>利率基准日：</label>
                <span >{dataSource.interestRateBaseDate}</span>
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
              </Table>
          </div>

          <legend className="legend">
            <span className="legLine"></span>还款设置
          </legend>
          <div className="f-box">
            <Row wrap>
              <Col style={styles.filterCol}>
                <label style={styles.filterTitle}>还款账户变更：</label>
                <span >{dataSource.repaymentAccountChange}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col style={styles.filterCol}>
                <label style={styles.filterTitle}>还款周期：</label>
                <span >{dataSource.title}</span>
              </Col>
            </Row>

            <Row wrap>
              <Col style={styles.filterCol}>
                <label style={styles.filterTitle}>还款日变更：</label>
                <span >{dataSource.repaymentDateChange}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col style={styles.filterCol}>
              <label style={styles.filterTitle}>宽限期变更：</label>              
              <span >{dataSource.gancePeriodChange}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col style={styles.filterCol}>
              <label style={styles.filterTitle}>还款方式变更：</label>              
              <span >{dataSource.repaymentMethodChange}</span>
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
              </Table>
            <Row wrap>
              <Col style={styles.filterCol}>
                <label style={styles.filterTitle}>提前还款：</label>
                <span >{dataSource.title}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>最小提前还款金额：</label>
                <span >{dataSource.prepaymentAmountMin}</span>
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>提前还款期数：</label>
                <span >{dataSource.prepaymentPeriodsLimit}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>违约金计算基础：</label>
                <span >{dataSource.penaltyBasicAmount}</span>
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>违约金计算方式：</label>
                <span >{dataSource.penaltyCalculationType}</span>
              </Col>
            </Row>
            <div className="table-title">提前还款方式设置</div>
              <Table
                hasHeader
                className="table"
                primaryKey="id"
              >
                <Table.Column title="最小期限" width={280} dataIndex="loanTermMin"/>
                <Table.Column title="最大期限" dataIndex="loanTermMax"/>
                <Table.Column title="期限单位" dataIndex="termUnit"/>
                <Table.Column title="违约金比例(%)" dataIndex="penaltyPercentage"/>
              </Table>
            
            <legend className="legend">
            <span className="legLine"></span>按品牌/车厂/车系/车型
            </legend>
            <div className="f-box">
            <div className="table-title">品牌/车厂/车系/车型</div>
            <Table
                hasHeader
                className="table"
                primaryKey="id"
              >
                <Table.Column title="类型" dataIndex=""/>
                <Table.Column title="名称" dataIndex=""/>
              </Table>
            </div>

            <legend className="legend">
              <span className="legLine"></span>按集团/渠道/厅店
            </legend>
            <div className="f-box">
            <div className="table-title">集团/渠道/厅店</div>
            <Table
                hasHeader
                className="table"
                primaryKey="id"
              >
                <Table.Column title="类型" dataIndex=""/>
                <Table.Column title="名称" dataIndex=""/>
              </Table>
            </div>

            <legend className="legend">
              <span className="legLine"></span>SP信息
            </legend>
            <div className="f-box">
              <Row wrap>
                <Col style={styles.filterCol}>
                <label style={styles.filterTitle}>SP：</label>              
                <span >{dataSource.title}</span>
                </Col>
              </Row>
            </div>
            <legend className="legend">
              <span className="legLine"></span>机构信息
            </legend>
            <div className="f-box">
              <Row wrap>
                <Col style={styles.filterCol}>
                <label style={styles.filterTitle}>机构：</label>              
                <span >{dataSource.title}</span>
                </Col>
              </Row>
            </div>
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
