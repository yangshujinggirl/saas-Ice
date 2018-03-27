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

  render() {
    let dataSource = this.props.formData;
    return (
      <IceFormBinderWrapper
        value={this.props.value}
        onChange={this.props.onChange}
      >
        <div>
          <div className="pch-breadcrumb">
            <span className="layui-breadcrumb">
              <a>平常金服</a>
              <span className="lay-separator">/</span>
              <a>产品管理</a>
              <span className="lay-separator">/</span>
              <a>
                <cite>产品新增</cite>
              </a>
            </span>
          </div>
          <IceContainer>
            <legend className="legend">
              <span className="legLine"></span>基本信息
            </legend>
            <div className="f-box">
              <Row wrap >
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>资金方：</label>
                  <span >{dataSource.title}</span>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>产品名称：</label>
                  <span >{dataSource.title}</span>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>合同显示名称：</label>
                  <span >{dataSource.title}</span>
                </Col>
              </Row>
            <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>产品类型：</label>
                <span >{dataSource.title}</span>
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>业务表单：</label>
                <span >{dataSource.title}</span>
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>资料收取清单：</label>
                <span >{dataSource.title}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}><span className="label-required">*</span>生效日期：</label>
                <span >{dataSource.title}</span>
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>允许贴息：</label>
                <span >{dataSource.title}</span>
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>状态：</label>
                <span >{dataSource.title}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>尾款产品：</label>
                <span >{dataSource.title}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col style={styles.filterCol}>
                <label style={styles.filterTitle}>贷款用途：</label>
                <span >{dataSource.title}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col style={styles.filterCol}>
                <label style={styles.filterTitle}>担保方式：</label>
                <span >{dataSource.title}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>支付方式：</label>
                <span >{dataSource.title}</span>
              </Col>
            </Row>
            <Row wrap>
              <label style={styles.filterTitle}>产品描述：</label>
              <span >{dataSource.title}</span>
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
                <span >{dataSource.title}</span>
                <div className="lx-mid-line">—</div>
                <span >{dataSource.title}</span>
              </Col>
              
            </Row>
            <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>期限范围(月)：</label>
                <span >{dataSource.title}</span>
                <div className="lx-mid-line">—</div>
                <span >{dataSource.title}</span>
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>贷款比率(%)：</label>
                <span >{dataSource.title}</span>
                <div className="lx-mid-line">—</div>
                <span >{dataSource.title}</span>
              </Col>
            </Row>
            <div className="table-title">产品成数设置</div>
            <div className="table-box">
              <div className="table ">最小期限(月)	</div>
              <div className="table table-center">最大期限(月)</div>
              <div className="table ">最小成数(%)</div>
              <div className="table ">最大成数(%)</div>
            </div>
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
                <span >{dataSource.title}</span>
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>利率模式：</label>
                <span >{dataSource.title}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>执行年利率范围(%)：</label>
                <span >{dataSource.title}</span>
                <div className="lx-mid-line">—</div>
                <span >{dataSource.title}</span>
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>利率基准日：</label>
                <span >{dataSource.title}</span>
              </Col>
            </Row>
            <div className="table-title">产品利率设置</div>
            <div className="table-box">
              <div className="table ">渠道</div>
              <div className="table table-center">最小执行年利率(%)</div>
              <div className="table ">最大执行年利率(%)</div>
            </div>
          </div>

          <legend className="legend">
            <span className="legLine"></span>还款设置
          </legend>
          <div className="f-box">
            <Row wrap>
              <Col style={styles.filterCol}>
                <label style={styles.filterTitle}>还款账户变更：</label>
                <span >{dataSource.title}</span>
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
                <span >{dataSource.title}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col style={styles.filterCol}>
              <label style={styles.filterTitle}>宽限期变更：</label>              
              <span >{dataSource.title}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col style={styles.filterCol}>
              <label style={styles.filterTitle}>还款方式变更：</label>              
              <span >{dataSource.title}</span>
              </Col>
            </Row>
            <div className="table-title">还款方式设置</div>
            <div className="table-box">
              <div className="table ">还款方式</div>
              <div className="table table-center">固定金额(元)</div>
              <div className="table ">宽限期期限(天)</div>
              <div className="table ">宽限期失效后还款方式</div>
            </div>
            <Row wrap>
              <Col style={styles.filterCol}>
                <label style={styles.filterTitle}>提前还款：</label>
                <span >{dataSource.title}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>最小提前还款金额：</label>
                <span >{dataSource.title}</span>
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>早提前还款期数：</label>
                <span >{dataSource.title}</span>
              </Col>
            </Row>
            <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>违约金计算基础：</label>
                <span >{dataSource.title}</span>
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>违约金计算方式：</label>
                <span >{dataSource.title}</span>
              </Col>
            </Row>
            <div className="table-title">提前还款方式设置</div>
            <div className="table-box">
              <div className="table ">最小期限</div>
              <div className="table table-center">最大期限</div>
              <div className="table ">期限单位</div>
              <div className="table ">违约金比例</div>
            </div>
            
            <legend className="legend">
            <span className="legLine"></span>按品牌/车厂/车系/车型
            </legend>
            <div className="f-box">
              <div className="table-title">品牌/车厂/车系/车型</div>
              <div className="table-box">
                <div className="table ">类型</div>
                <div className="table table-center">名称</div>
              </div>
            </div>

            <legend className="legend">
              <span className="legLine"></span>按集团/渠道/厅店
            </legend>
            <div className="f-box">
              <div className="table-title">集团/渠道/厅店</div>
              <div className="table-box">
                <div className="table ">类型</div>
                <div className="table table-center">名称</div>
              </div>
            </div>

            <legend className="legend">
              <span className="legLine"></span>资金方信息
            </legend>
            <div className="f-box">
              <Row wrap>
                <Col style={styles.filterCol}>
                <label style={styles.filterTitle}>资金方：</label>              
                <span >{dataSource.title}</span>
                </Col>
              </Row>
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
