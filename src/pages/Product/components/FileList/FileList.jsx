import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router'

import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';

import './FileList.scss';

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
} from '@icedesign/base';

const { Row, Col } = Grid;

// FormBinder 用于获取表单组件的数据，通过标准受控 API value 和 onChange 来双向操作数据
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;

const render = () => {
  return <div>
          <button className="edithbtn">编辑</button>  
          <button className="deletbtn">删除</button>
        </div>
};
const dataSource = [{
  id: 1,
  productCode: 'XCD0000000058',
  productName: 'chanp',
  time: '暂无',

}];
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


export default class FileList extends Component {
  static displayName = 'ProdSearch';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount(){
    
    console.log("dddd")
  };
  onFormChange = (value) => {
    this.setState({
      value,
    });
  };
  onSubmit = (data) => {
    console.log("ok");
  };
  onRowClick = (record, index, e) => {
    console.log(record, index, e);
  };

  render() {
    return (
      <div className="create-activity-form" style={styles.container}>
        <IceContainer title="" >
          <IceFormBinderWrapper>
            <div>
              <legend style={styles.legend}>
                <span style={styles.legLine}></span>资料清单
              </legend>
              <div className="f-box">
                <Row wrap>
                  <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                    <label style={styles.filterTitle}>清单类型：</label>
                    <IceFormBinder
                      name="listType"
                    >
                      <Select
                      name="size"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="option1">产品进件</Option>
                    </Select>
                    </IceFormBinder>
                    <IceFormError name="name" />
                  </Col>
                  <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                    <label style={styles.filterTitle}>清单名称：</label>
                    <IceFormBinder
                      name="listName"
                    >
                      <Input placeholder="清单名称" />
                    </IceFormBinder>
                    <IceFormError name="name" />
                  </Col>
                  <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                    <label style={styles.filterTitle}></label>
                    <button style={styles.btns} type='submit' onClick={this.onSubmit}>
                      查询
                    </button>
                  </Col>
                </Row>
              </div>
            </div>
          </IceFormBinderWrapper>
          <div style={styles.searchTable}>
            <Table
              dataSource={dataSource}
              onRowClick={this.onRowClick}
              maxBodyHeight={800}
            >
              <Table.Column title="产品编号" dataIndex="id" />
              <Table.Column title="产品名称" dataIndex="productCode"  />
              <Table.Column title="合同显示名称" dataIndex="productName" />
              <Table.Column title="状态" dataIndex="time"  />
              <Table.Column title="操作" dataIndex="time" cell={render} width={150} lock="right" />              
            </Table>
          </div>
          <div style={styles.addNew}>
            <Button onClick={this.addNewItem} style={styles.addNewItem}>新增一行</Button>
          </div>
        </IceContainer>    
      </div>
    );
  }
}

const styles = {
  filterCol: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
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

  filterTitle: {
    width: '140px',
    textAlign: 'right',
    marginRight: '12px',
    fontSize: '14px',
  },

  filterTool: {
    width: '200px',
  },
  btns: {
    width: '90px',
    height: '32px',
    lineHeight: '32px',
    border: 'none',
    fontSize: '16px',
    borderRadius: 'none !important',
    background: '#ec9d00',
    color: '#fff',
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
  pagination: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};