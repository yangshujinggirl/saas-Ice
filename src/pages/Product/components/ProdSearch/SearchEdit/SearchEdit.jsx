import React, { Component } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import axios from 'axios';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';

import './SearchEdit.scss';

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
// import SearchEditer from './searchEditer/searchEditer';


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

export default class SearchEdit extends Component {
  static displayName = 'SearchEdit';

  static defaultProps = {};

  constructor(props) {
    super(props);

    // 请求参数缓存
    this.queryCache = {};
    this.state = {
      filterFormValue: {},
    };

  }
  componentDidMount(){
    // console.log(this.props.formData)
  }
  //查看
  searchItem = (record) => {
    hashHistory.push(`product/proddetail/${record.productCode}`)//+ record.id);
  };

  //编辑
  editItem = (record) => {
    let {actions} = this.props;
    // hashHistory.push(`product/proddetail/${record}`)
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
  

  componentWillMount(){ 
    console.log(this.props)
    console.log(this.props.pageData)
   console.log( this.props.actions.search())
    
  }
  componentDidMount() {
  
  }

  render() {
    let dataSource = this.props.pageData || {};
    console.log(dataSource)
    return (

      <div className="create-activity-form" style={styles.container}>
        {/* <SearchEditer /> */}
        <IceContainer title="" >
          <IceFormBinderWrapper>
            <div>
              <legend style={styles.legend}>
                <span style={styles.legLine}></span>产品编辑
              </legend>
              <div style={styles.fieldBox}>
                <Row style={styles.formItem}>
                  <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                    产品名称：
                  </Col>
                  <Col s="4" l="4">
                    <IceFormBinder
                      name="name	"
                    >
                      <Input placeholder="产品名称" />
                    </IceFormBinder>
                    <IceFormError name="name" />
                  </Col>
                  <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                    生效日期：
                  </Col>
                  <Col s="4" l="4">
                    <IceFormBinder
                      name="effectiveDate"
                    >
                      <RangePicker format={"YYYY/MM/DD"} style={{width:"200px"}}/> 
                    </IceFormBinder>
                    <IceFormError name="effectiveDate" />
                  </Col>
                </Row>

                <Row wrap style={styles.formItem}>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                      流程名称：
                  </Col>
                  <Col s="4" l="4">
                    <IceFormBinder
                        name="lineName"
                      >
                        <Select
                          placeholder="请选择"
                          style={{ width: '200px' }}
                        >
                          <Option value="yes">为该资方下所有已定义流程名称</Option>
                          <Option value="no">为该资方下所有已定义流程名称</Option>
                        </Select>
                      </IceFormBinder>
                      <IceFormError name="lineName" />
                  </Col>
                  <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                      状态：
                  </Col>
                  <Col s="4" l="4">
                    <IceFormBinder
                        name="status	"
                      >
                        <Select
                          placeholder="请选择"
                          style={{ width: '200px' }}
                        >
                          <Option value="yes">生效</Option>
                          <Option value="no">未生效</Option>
                        </Select>
                      </IceFormBinder>
                      <IceFormError name="status" />
                  </Col>
                </Row>
                <Row wrap style={styles.formItem} >
                  <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                      
                  </Col>
                  <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                    <a  className="back-btn" href="javascript:history.back(-1);" >返回</a>
                  </Col>

                  <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <a className="dete-btn" >确定</a>
                  </Col>
                </Row>
                <Row wrap >
                <Table
                  dataSource={this.state.dataSource}
                  isLoading={this.state.isLoading}
                  style={{width:"80%"}}
                >
                  <Table.Column title="版本" dataIndex="id" width={120} />
                  <Table.Column title="生效日期" dataIndex="title.name" width={250} />
                  <Table.Column title="状态" dataIndex="type" width={160} />
                  <Table.Column title="流程" dataIndex="template" width={100} />
                  <Table.Column title="时间" dataIndex="status" width={120} />
                  <Table.Column title="操作人" dataIndex="rate" width={120} />
              </Table>
              </Row>
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
