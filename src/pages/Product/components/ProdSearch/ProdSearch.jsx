import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router'

import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';

import './ProdSearch.scss';

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
//组件引入
import SearchEditer from './searchEditer/searchEditer'

const getMockData = () => {
  const result = [];
  for (let i = 0; i < 10; i++) {
    result.push({
      id: 100 + i,
      title: {
        name: `宝马 ${3 + i}.0`,
      },
      type: 'demo示例',
      template: '是',
      status: '已发布',
      publisher: '小马',
      rate: '5',
      time: 2000 + i,
    });
  }
  return result;
};
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

export default class ProdSearch extends Component {
  static displayName = 'ProdSearch';

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      selectedRowKeys: [],
      dataSource: getMockData(),
    };
  }

  clearSelectedKeys = () => {
    this.setState({
      selectedRowKeys: [],
    });
  };

  deleteSelectedKeys = () => {
    const { selectedRowKeys } = this.state;
    console.log('delete keys', selectedRowKeys);
  };
  //删除
  deleteItem = (record) => {
    const { id } = record;
    console.log('delete item', id);
  };
  //编辑
  editItem = (record) => {
    const { id } = record;
    let {actions} = this.props;
    actions.getDetail(record.id);
  }
  renderOperator = (value, index, record) => {
    return (
      <div>
        <button 
          className="editbtn"
          onClick={this.editItem.bind(this, record)}
        >
          编辑</button>
        <button
          className="deletbtn"
          onClick={this.deleteItem.bind(this, record)}
        >
          删除
        </button>
      </div>
    );
  };

  render() {
    return (
      <div className="create-activity-form" style={styles.container}>
        {/* <SearchEditer /> */}
        <IceContainer title="" >
          <IceFormBinderWrapper>
            <div>
              <legend style={styles.legend}>
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
                    <IceFormError name="name" />
                  </Col>
                  <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                    产品名称：
                  </Col>
                  <Col s="4" l="4">
                    <IceFormBinder
                      name="prodName"
                    >
                      <Input style={{ width: '175px' }} placeholder="产品名称" />
                    </IceFormBinder>
                    <IceFormError name="name" />
                  </Col>

                  <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                    产品类型：
                  </Col>
                  <Col s="4" l="4">
                    <Select
                      placeholder="请选择"
                      style={{ width: '175px' }}
                    >
                      <Option value="option1">新车贷款</Option>
                      <Option value="option2">二手车贷款</Option>
                      <Option value="option3">车抵贷贷款</Option>
                      <Option value="option4">附加费贷款</Option>
                      <Option value="option5">保费贷</Option>
                    </Select>
                  </Col>
                </Row>
                <Row wrap style={styles.formItem}>
                  <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                      状态：
                  </Col>
                  <Col s="4" l="4">
                    <Select
                      placeholder="请选择"
                      style={{ width: '175px' }}
                    >
                      <Option value="yes">生效</Option>
                      <Option value="no">未生效</Option>
                    </Select>
                  </Col>

                  <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                    合同名称：
                  </Col>
                  <Col s="4" l="4">
                    <IceFormBinder
                      name="contractName"
                    >
                      <Input style={{ width: '175px' }} placeholder="合同名称" />
                    </IceFormBinder>
                    <IceFormError name="name" />
                  </Col>

                  <Col xxs="6" s="2" l="2" style={styles.formLabel}></Col>
                  <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                    <button style={styles.btns} type='submit' onClick={this.onSubmit}>
                      查询
                    </button>
                  </Col>
                </Row>
              </div>
            </div>
          </IceFormBinderWrapper>
          <Table
              dataSource={this.state.dataSource}
              isLoading={this.state.isLoading}
              isZebra={true}
            >
              <Table.Column title="产品编号" dataIndex="id" width={120} />
              <Table.Column title="产品名称" dataIndex="title.name" width={250} />
              <Table.Column title="合同显示名称" dataIndex="type" width={160} />
              <Table.Column title="状态" dataIndex="template" width={100} />
              <Table.Column title="产品类型" dataIndex="status" width={120} />
              <Table.Column title="生效期限" dataIndex="rate" width={120} />
              <Table.Column title="尾款产品" dataIndex="publisher" width={120} />
              <Table.Column title="资金方" dataIndex="time" width={120} />
              <Table.Column title="金额范围(元)" dataIndex="time" width={120} />
              <Table.Column title="期限范围(月)" dataIndex="time" width={120} />
              <Table.Column title="贷款比率(%)" dataIndex="time" width={120} />
              <Table.Column title="执行年利率范围(%)" dataIndex="time" width={160} />
              <Table.Column
                title="操作"
                cell={this.renderOperator}
                lock="right"
                width={140}
              />
            </Table>
            <div style={styles.pagination}>
              <Pagination shape="arrow-only" onChange={this.change} />
            </div>
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
