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
  Form,
  Field,
} from '@icedesign/base';

const { Row, Col } = Grid;
const FormItem = Form.Item;

// FormBinder 用于获取表单组件的数据，通过标准受控 API value 和 onChange 来双向操作数据
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 12
  }
};

export default class ProdSeachList extends Component {
  static displayName = 'ProdSearch';
  constructor(props) {
    super(props);
    this.state = {
      value:{
        productCode	:'',
        name:'',
        productType	:undefined,
        status:undefined,
        contractDisplayName:''
      },
    };
    this.field = new Field(this);
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
  //状态
  status(value, index, record){
    let enable = record.enable
    console.log(enable)
    // 0=未生效；1=生效；2=失效  
    return`${enable == '1' ?(record.status=='0'?'关闭':(record.status=='1'?'生效':'失效')):'草稿'}`
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
    let enable = record.enable
    return (
      <div>
        <button
          className="editbtn"
          onClick = {()=>this.editItem(record)}
          style={{display: enable == 0 ? 'none' : ''}}
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
//排序
Order=(dataIndex,order) =>{
    dataIndex:{productCode}
    order:{desc}
}
  render() {
    debugger
    const { list=[], total, limit, page} = this.props.pageData;
    const { init, getValue } = this.field;

    return (
      <IceContainer className="pch-container">
        <legend className="pch-legend" >
          <span className="pch-legend-legline"></span>查询
        </legend>
        <IceFormBinderWrapper
          ref={(formRef) => {
            this.formRef = formRef;
          }}
          value={this.state.value}
          onChange={this.onFormChange}
          >
          <div className="pch-condition">
            <Form
              size="large"
              direction="hoz"
              >
              <Row wrap>
                <Col s="8" l="8">
                  <FormItem {...formItemLayout} label="产品编号：">
                    <IceFormBinder
                      name="productCode"
                    >
                      <Input size="large" placeholder="产品编号" />
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col s="8" l="8">
                  <FormItem {...formItemLayout} label="产品名称：">
                    <IceFormBinder
                    name="name"
                    >
                      <Input size="large" placeholder="产品名称" />
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col s="8" l="8">
                  <FormItem {...formItemLayout} label="产品类型：">
                    <IceFormBinder
                      name="productType"
                    >
                     <Select
                        placeholder="请选择"
                        hasClear={true}
                        size="large"
                      >
                        <Option value="NEW_CAR_LOAN">新车贷款</Option>
                        <Option value="NEW_CAR_RENTAL">新车租赁</Option>
                        <Option value="SECONDHAND_CAR_LOAN">二手车贷款</Option>
                        <Option value="SECONDHAND_CAR_RENTAL">二手车租赁</Option>
                        <Option value="CAR_MORTGAGE_LOAN">汽车抵押贷款</Option>
                        <Option value="CONSUMER_LOAN">消费贷款</Option>
                      </Select>
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col s="8" l="8">
                  <FormItem {...formItemLayout} label="状态：">
                    <IceFormBinder
                      name="status"
                    >
                      <Select
                        placeholder="请选择"
                        hasClear={true}
                        size="large"
                      >
                        <Option value="1">生效</Option>
                        <Option value="0">关闭</Option>
                        <Option value="2">失效</Option>
                        
                      </Select>
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col s="8" l="8">
                  <FormItem {...formItemLayout} label="合同名称：">
                    <IceFormBinder
                      name="contractDisplayName"
                    >
                      <Input size="large" placeholder="合同名称" />
                    </IceFormBinder>
                  </FormItem>
                  </Col>
                <Col s="8" l="8">
                  <FormItem {...formItemLayout} label="&nbsp;">
                    <Button style={styles.btns1} type="secondary" htmlType='submit' onClick={this.submit}>
                      查询
                    </Button>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </IceFormBinderWrapper>
        <Table
            dataSource={list}
            isLoading={this.state.isLoading}
            isZebra={true}
            onSort={this.Order}
          >
            <Table.Column title="产品编号ss" dataIndex="productCode" width={160} />
            <Table.Column title="产品名称" dataIndex="name" width={200} />
            {/* <Table.Column title="合同显示名称" dataIndex="contractDisplayName" width={160} /> */}
            <Table.Column title="状态" cell={this.status} width={100} />
            <Table.Column title="产品类型" dataIndex="productType" width={160} />
            <Table.Column title="生效期限" cell={this.timeRange} width={250} />
            <Table.Column title="尾款产品" cell={this.isRetainage} width={120} />
            <Table.Column title="资方" dataIndex="tenantName" width={120} />
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
    );
  }
}

const styles = {
  fieldBox: {
    margin: '0 15px',
    padding: '25px 0 0 0',
    borderTop: '1px solid #d8d8d8',
  },
  
  formItem: {
    height: '28px',
    lineHeight: '33px',
    marginBottom:'28px'
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
    backgroundColor:'#FC9E25'
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
