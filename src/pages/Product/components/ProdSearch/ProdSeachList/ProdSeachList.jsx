import React, { Component } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import axios from 'axios';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';

import './ProdSeachList.scss';

import {
  FormBinderWrapper as  IceFormBinderWrapper,
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
  Pagination,
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

export default class ProdSeachList extends Component {
  static displayName = 'ProdSearch';
  constructor(props) {
    super(props);
    this.state = {
      value:{
        productCode:'',
        name:'',
        productType	:'',
        status:'',
        contractDisplayName:''
      },
    };
  }
  componentWillMount() {
    this.props.actions.search();
  }
  //查看
  searchItem = (record) => {
    hashHistory.push(`product/proddetail/${record.id}`)//+ record.id);
  };

  //编辑
  editItem = (record) => {
    hashHistory.push(`product/searchedit/${record.id}`)
  }
  //金额范围
  moneyRange(value, index, record) {
    return `${record.principalAmountMin}~${record.principalAmountMax}`
  }
  //生效期限
  timeRange(value, index, record) {
    return `${record.effectiveDate}~${record.expirationDate}`
  }
  //期限范围
  monthRange(value, index, record) {
    return `${record.loanTermRangeMin}~${record.loanTermRangeMax}`
  }
  //期限范围
  loanNpiRange(value, index, record) {
    return `${record.loanPercentageMin}~${record.loanPercentageMax}`
  }
  //期限范围
  interestRateRange(value, index, record) {
    return `${record.interestRatesRangeMin}~${record.interestRatesRangeMax}`
  }
  //是否尾品
  isRetainage(value, index, record) {
    return record.isRetainage? '是':'否'
  }
  renderOperator = (value, index, record) => {
    return (
      <div>
        <button
          className="editbtn"
          onClick = {()=>this.editItem(record)}
        >
          编辑</button>
        <button
          className="searchbtn"
          onClick={()=>this.searchItem(record)}
        >
          查看
        </button>
      </div>
    );
  };
  //查询
  submit = () =>{
    let {actions,pageData} = this.props;
    this.formRef.validateAll((error, value) => {
      if (error) {
        // 处理表单报错
        return;
      }
      // 提交当前填写的数据
      this.props.actions.search(value);//返回符合条件的数据

    });
  };
  //分页
  changePage = (currentPage) => {
    this.props.actions.search({page:currentPage});
  };

  render() {
    const { list=[], total, limit, page} =this.props.pageData;
    return (
      <div className="create-activity-form" style={styles.container}>
        <IceContainer title="" >
          <IceFormBinderWrapper
            ref={(formRef) => {
              this.formRef = formRef;
            }}
            value={this.state.value}
            onChange={this.onFormChange}
          >
            <div>
              <legend style={styles.legend}  >
                <span style={styles.legLine}></span>查询
              </legend>
              <div style={styles.fieldBox}>
                <Row style={styles.formItem}>
                  <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                    产品编号：
                  </Col>
                  <Col s="4" l="4">
                    <IceFormBinder
                      name="productCode"
                    >
                      <Input style={{ width: '175px' }} placeholder="产品编号" />
                    </IceFormBinder>
                    <IceFormError name="productCode" />
                  </Col>
                  <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                    产品名称：
                  </Col>
                  <Col s="4" l="4">
                    <IceFormBinder
                      name="name"
                    >
                      <Input style={{ width: '175px' }} placeholder="产品名称" />
                    </IceFormBinder>
                    <IceFormError name="name" />
                  </Col>

                  <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                    产品类型：
                  </Col>
                  <Col s="4" l="4">
                    <IceFormBinder
                        name="productType"
                      >
                       <Select
                          placeholder="请选择"
                          style={{ width: '175px' }}
                        >
                          <Option value="NEW_CAR_LOAN">新车贷款</Option>
                          <Option value="NEW_CAR_RENTAL">新车租赁</Option>
                          <Option value="SECONDHAND_CAR_LOAN">二手车贷款</Option>
                          <Option value="SECONDHAND_CAR_RENTAL">二手车租赁</Option>
                          <Option value="CAR_MORTGAGE_LOAN">汽车抵押贷款</Option>
                          <Option value="CONSUMER_LOAN">消费贷款</Option>
                        </Select>
                      </IceFormBinder>
                    <IceFormError name="productType" />

                  </Col>
                </Row>
                <Row wrap style={styles.formItem}>
                  <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                      状态：
                  </Col>
                  <Col s="4" l="4">
                    <IceFormBinder
                        name="status"
                      >
                        <Select
                          placeholder="请选择"
                          style={{ width: '175px' }}
                        >
                          <Option value="yes">生效</Option>
                          <Option value="no">未生效</Option>
                        </Select>
                      </IceFormBinder>
                      <IceFormError name="status" />

                  </Col>

                  <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                    合同名称：
                  </Col>
                  <Col s="4" l="4">
                    <IceFormBinder
                      name="contractDisplayName"
                    >
                      <Input style={{ width: '175px' }} placeholder="合同名称" />
                    </IceFormBinder>
                    <IceFormError name="contractDisplayName" />
                  </Col>

                  <Col xxs="6" s="2" l="2" style={styles.formLabel}></Col>
                  <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                    <button style={styles.btns} type='submit' onClick={this.submit}>
                      查询
                    </button>
                  </Col>
                </Row>
              </div>
            </div>
          </IceFormBinderWrapper>
          <Table
              dataSource={list}
              isLoading={this.state.isLoading}
              isZebra={true}
            >
              <Table.Column title="产品编号" dataIndex="productCode" width={160} />
              <Table.Column title="产品名称" dataIndex="name" width={200} />
              <Table.Column title="合同显示名称" dataIndex="contractDisplayName" width={160} />
              <Table.Column title="状态" dataIndex="status" width={100} />
              <Table.Column title="产品类型" dataIndex="productType" width={160} />
              <Table.Column title="生效期限" cell={this.timeRange} width={250} />
              <Table.Column title="尾款产品" cell={this.isRetainage} width={120} />
              <Table.Column title="资金方" dataIndex="createdUser" width={120} />
              <Table.Column title="金额范围(元)" width={200} cell={this.moneyRange} />
              <Table.Column title="期限范围(月)" cell={this.monthRange} width={120} />
              <Table.Column title="贷款比率(%)" cell={this.loanNpiRange} width={120} />
              <Table.Column title="执行年利率范围(%)" cell={this.interestRateRange} width={160} />
              <Table.Column
                title="操作"
                cell={this.renderOperator}
                lock="right"
                width={140}
              />
            </Table>
            {
              list.length>0 && <div style={styles.pagination}>
                                <Pagination
                                  shape="arrow-only"
                                  current={page}
                                  pageSize={limit}
                                  total={total}
                                  onChange={this.changePage}
                                />
                              </div>
            }

        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  legend: {
    marginLeft: 0,
    paddingLeft: '15px',
    paddingTop: '12px',
    paddingBottom: '12px',
    backgroundColor: '#fff',
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '25px',
  },
  legLine: {
    display: 'inline-block',
    zoom: 1,
    verticalAlign: 'top',
    marginRight: '12px',
    width: '4px',
    height: '25px',
    backgroundColor: '#ec9d00',
  },
  fieldBox: {
    margin: '0 15px',
    padding: '25px 0 0 0',
    borderTop: '1px solid #d8d8d8',
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '25px',
  },
  formLabel: {
    marginLeft: '85px',
    textAlign: 'right',
  },
  btns: {
    width: '90px',
    height: '32px',
    lineHeight: '32px',
    border: 'none',
    fontSize: '16px',
    borderRadius: 'none !important',
    color: '#fff',
    backgroundColor:'#ec9d00'
  },
  searchTable: {
    width: '1400px',
    margin: '25px',
  },
  pagination: {
    textAlign: 'left',
    paddingTop: '26px',
  },
};
