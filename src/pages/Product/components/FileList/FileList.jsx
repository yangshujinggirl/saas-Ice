import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router'

import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';

import './FileList.scss';

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
      }
    };
  }
  componentDidMount() {
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


  renderTest = () => {
    return <div>
      <button className="edithbtn" onClick={this.open.bind(this)}>编辑</button>
      <button className="deletbtn">删除</button>
    </div>
  };
  onClose() {
    this.setState({
      visible: false
    });
  }
  open() {//打开弹框
    this.setState({
      visible: true
    });
  }
  setPosition() {
    this.setState({
      align: false,
      style: {
        top: "10px"
      }
    });

  }
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
              maxBodyHeight={800}
            >
              <Table.Column title="产品编号" dataIndex="id" />
              <Table.Column title="产品名称" dataIndex="productCode" />
              <Table.Column title="合同显示名称" dataIndex="productName" />
              <Table.Column title="状态" dataIndex="time" />
              <Table.Column title="操作" dataIndex="time" cell={this.renderTest} width={150} lock="right" />
            </Table>
            <Dialog
              visible={this.state.visible}
              onOk={this.onClose.bind(this)}
              onCancel={this.onClose.bind(this)}
              onClose={this.onClose.bind(this)}
              title=""
              style={this.state.style}
              align={this.state.align}
            >
              <Form className="dialog-form">
                <ul className="dialog-form-ul">
                  <li className="liColor">资料名称</li>
                  <li className="liTow liColor">文件类型</li>
                  <li className="liColor">限制大小</li>
                  <li className="liColor">操作</li>

                  <li className="liType">

                    <Input placeholder="清单名称" style={{ width: "150px" }} />
                  </li>
                  <li className="liTow liType">
                    <Col>
                      <label style={styles.filterTitle}>文档</label>
                      <Checkbox id="All_pdf" />
                      <label htmlFor="All_pdf" className="next-checkbox-label">全部</label>
                      <Checkbox id="pdf" defaultChecked={true} />
                      <label htmlFor="pdf" className="next-checkbox-label">pdf</label>
                      <Checkbox id="xls" />
                      <label htmlFor="xls" className="next-checkbox-label">xls </label>
                      <Checkbox id="doc" />
                      <span htmlFor="doc" className="next-checkbox-label">doc</span>
                      <Checkbox id="txt" />
                      <span htmlFor="txt" className="next-checkbox-label">txt</span>
                    </Col>
                    <Col>
                      <label style={styles.filterTitle}>图形</label>
                      <Checkbox id="All_png" />
                      <label htmlFor="All_png" className="next-checkbox-label">全部</label>
                      <Checkbox id="jpg" defaultChecked={true} />
                      <label htmlFor="jpg" className="next-checkbox-label">jpg</label>
                      <Checkbox id="png" />
                      <label htmlFor="png" className="next-checkbox-label">png</label>
                      <Checkbox id="bmp" />
                      <span htmlFor="bmp" className="next-checkbox-label">bmp</span>
                      <Checkbox id="gif" />
                      <span htmlFor="gif" className="next-checkbox-label">gif</span>
                    </Col>
                    <Col>
                      <label style={styles.filterTitle}>压缩</label>
                      <Checkbox id="All_png" />
                      <label htmlFor="All_png" className="next-checkbox-label">全部</label>
                      <Checkbox id="rar" defaultChecked={true} />
                      <label htmlFor="rar" className="next-checkbox-label">rar</label>
                      <Checkbox id="zip" />
                      <label htmlFor="zip" className="next-checkbox-label">zip</label>
                      <Checkbox id="7z" />
                      <span htmlFor="7z" className="next-checkbox-label">7z</span>
                      <Checkbox id="tar" />
                      <span htmlFor="tar" className="next-checkbox-label">tar</span>
                    </Col>
                  </li>
                  <li className="liType">
                    <Input placeholder="清单名称" style={{ width: "90px" }} />M
                  </li>
                  <li className="liType">
                    <Button>删除</Button>
                  </li>
                </ul>
                <Button onClick={this.setPosition.bind(this)} style={styles.newCol}>新增一行</Button>
              </Form>
            </Dialog>
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