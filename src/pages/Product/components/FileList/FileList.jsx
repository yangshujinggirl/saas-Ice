import React, { Component } from 'react';
import { Router, Route, Link, hashHistory } from 'react-router'

import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';

import './FileList.scss';
import DiaLog from './Dialog'
import { FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder, FormError as IceFormError, } from '@icedesign/form-binder';

import { Form, Field, Input, Button, Checkbox, Select, DatePicker, Switch, Radio, Grid, Table, Dialog, Pagination } from '@icedesign/base';

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

const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 12
  }
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
      value: {
        name: '',
        dataType: undefined
      },
      fileList: [{
        dataType: "",
        dataname: '',
        fileTypeL: '',
      }],
      dataSource: '',
    }
  }
  componentDidMount() {
    let { actions } = this.props;
    actions.filesearch();
  }

  //查询
  onSubmit = (data) => {
    let { actions } = this.props;
    this.formRef.validateAll((error, value) => {
      if (error) {
        // 处理表单报错
        return;
      }
      // 提交当前填写的数据
      this.props.actions.filesearch(value); //返回符合条件的数据
    });
  };
  onRowClick = (record, index, e) => {
  };

  //操作
  renderTest = (value, index, record) => {
    return <div>
      <button className="edithbtn" onClick={() => this.open(record)}>编辑</button>
      <button className="deletbtn" onClick={() => this.deleteRow(record.id)}>删除</button>
    </div>
  };

  open = (record) => {

    hashHistory.push(`/product/fileedit/${record.id}`)
  }
  deleteRow = (idx) => {
    let { actions } = this.props;
    actions.fileremove(idx);
    //actions.filesearch();

  }

  addNewItem() {
    this.props.actions.changeFileDetail({
        dataType: '',
        name: '',
        collectionDetails: [{
          dataName: '',
          fileSize: undefined,
          fileType: ''
        }]
      })
    hashHistory.push(`/product/filelistnew`)
  }
  //分页
  changePage = (currentPage) => {
    let { actions } = this.props;
    actions.filesearch({ page: currentPage });
  };
  render() {
    let dataSource = this.state.dataSource
    dataSource = this.props.fileData || {}//data
    dataSource = dataSource.data || {}
    let page = dataSource.page;
    let limit = dataSource.limit;
    let total = dataSource.total;
    dataSource = dataSource.list
    dataSource && dataSource.map((item) => {
      let temp = [];
      item.collectionDetails && item.collectionDetails.map((ditem, j) => {
        temp.push(ditem.fileName);
      })
      item.fileNamestr = temp.join(' ; ')
    })
    let map = new Map()
    return (
      <IceContainer className="pch-container">
        <legend className="pch-legend" >
          <span className="pch-legend-legline"></span>资料查询
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
              <Row>
                <Col s="8" l="8">
                  <FormItem {...formItemLayout} label="清单类型：">
                    <IceFormBinder name="dataType" >
                      <Select
                        placeholder="请选择"
                        hasClear={true}
                        size="large"
                      >
                        <Option value="产品进件">产品进件</Option>
                      </Select>
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col s="8" l="8">
                  <FormItem {...formItemLayout} label="清单名称：">
                    <IceFormBinder name="name" >
                      <Input size="large" placeholder="清单名称" />
                    </IceFormBinder>
                  </FormItem>
                </Col>
                <Col s="8" l="8">
                  <FormItem {...formItemLayout} label="&nbsp;">
                    <Button style={styles.btns1} type="secondary" htmlType='submit' onClick={this.onSubmit}>
                      查询
                    </Button>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </IceFormBinderWrapper>
        <div style={styles.searchTable}>
          <Table
            dataSource={dataSource}
            maxBodyHeight={800}
          >
            <Table.Column title="清单类型" dataIndex="dataType" />
            <Table.Column title="清单名称" dataIndex="name" />
            <Table.Column title="材料名称" dataIndex="fileNamestr" />
            <Table.Column title="操作" dataIndex="time" cell={this.renderTest} width={150} lock="right" />
          </Table>
        </div>
        <div style={styles.addNew}>
          <Button onClick={this.addNewItem.bind(this)} style={styles.addNewItem}>新增</Button>
        </div>
        <div style={styles.pagination}>
          <Pagination
            shape="arrow-only"
            current={page}
            pageSize={limit}
            total={total}
            onChange={this.changePage}
          />
        </div>
      </IceContainer>
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
