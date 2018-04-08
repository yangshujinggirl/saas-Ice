import React, { Component } from 'react';
import { Router, Route, Link, hashHistory} from 'react-router'

import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';

import './FileList.scss';
import DiaLog from './Dialog'
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import { Form, Field, Input, Button, Checkbox, Select, DatePicker, Switch, Radio, Grid, Table, Dialog, } from '@icedesign/base';

const { Row, Col } = Grid;
const FormItem = Form.Item;
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


export default class FileList extends Component {
  static displayName = 'FileList';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.field = new Field(this);
    this.state = {
      visible: false,
      align: "cc cc",
      style: {
        width: "70%"
      },
      value:{
        name	:'',
        dataType:''
      },
      fileList:[{
        dataType:"",
        dataname:'',
        fileTypeL:'',
      }],
      dataSource:'',
    }
  }
  componentDidMount() {
    let {actions} = this.props;
      actions.filesearch();
      console.log(this.props)
  };
  componentDidUpdate(dataSource){
    // this.setState({
    //   dataSource
    // })
  }

  //查询
  onSubmit = (data) => {
    let {actions} = this.props;
    this.formRef.validateAll((error, value) => {
      console.log('error', error, 'value', value);
      if (error) {
        // 处理表单报错
        return;
      }
      // 提交当前填写的数据
      this.props.actions.filesearch(value);//返回符合条件的数据
    });
  };
  onRowClick = (record, index, e) => {
    console.log(record, index, e);
  };

//操作
  renderTest = (value, index, record) => {
    return <div>
      <button className="edithbtn" onClick={() => this.open(record)}>编辑</button>
      <button className="deletbtn" onClick={() => this.deleteRow(record.id)}>删除</button>
    </div>
  };

  open =(record) =>{

    hashHistory.push(`/product/fileedit/${record.id}`)
  }
  deleteRow =(idx) => {
    let { actions } = this.props;
    actions.fileremove(idx);
    actions.filesearch();

  }

  addNewItem=()=>{
    hashHistory.push(`/product/filelistnew`)
  }
  render() {
        let dataSource=this.state.dataSource
        dataSource = this.props.fileData || {}//data
        dataSource = dataSource.data||{}
        dataSource = dataSource.list
        dataSource && dataSource.map((item) => {
          let temp = [];
          item.collectionDetails && item.collectionDetails.map((ditem, j) => {
            temp.push(ditem.name);
          })
          item.fileNamestr = temp.join(',')
        })
        let map = new Map()
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
              <legend className="legend">
                <span className="legLine"></span>资料清单
              </legend>
              <div className="f-box">
                <Row wrap>
                  <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                    <label style={styles.filterTitle}>清单类型：</label>
                    <IceFormBinder
                      name="dataType"
                    >
                      <Select
                        placeholder="请选择"
                        style={styles.filterTool}
                        className="custom-select"
                        hasClear={true}
                      >
                        <Option value="产品进件">产品进件</Option>
                      </Select>
                    </IceFormBinder>
                    <IceFormError name="dataType" />
                  </Col>
                  <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                    <label style={styles.filterTitle}>清单名称：</label>
                    <IceFormBinder
                      name="name"
                    >
                      <Input className="custom-input" placeholder="清单名称" />
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
              maxBodyHeight={800}
            >
              <Table.Column title="清单类型" dataIndex="dataType" />
              <Table.Column title="清单名称" dataIndex="name" />
              <Table.Column title="材料名称" dataIndex="fileNamestr"/>
              <Table.Column title="操作" dataIndex="time" cell={this.renderTest} width={150} lock="right" />
            </Table>
          </div>
          <div style={styles.addNew}>
            <Button onClick={this.addNewItem} style={styles.addNewItem}>新增</Button>
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
    background: '#FC9E25',
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
    background: '#FC9E25',
    color: '#fff',
  },
  newCol: {
    hiegth: '30px',
    borderRadius: 0,
    border: 'none',
    marginTop: '20px',
    background: '#1AA8F0',
    color: '#fff',
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
