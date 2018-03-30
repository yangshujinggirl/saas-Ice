import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router'

import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';

import './Dialog.scss';
import ProductReq from '../../../reqs/ProductReq'
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import { Form, Field, Input, Button, Checkbox, Select, DatePicker, Switch, Radio, Grid, Table } from '@icedesign/base';

const { Row, Col } = Grid;
const FormItem = Form.Item;
// FormBinder 用于获取表单组件的数据，通过标准受控 API value 和 onChange 来双向操作数据
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;


export default class DiaLog extends Component {
  static displayName = 'Dialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.props.actions.fileDetail(this.props.params.id)
    this.state = {
      value:{
        fileList:{},
        dd:this.fileList
      }
    }

    this.defaultFileTypes = [
      {
        id: 1,
        name: '文档',
        exts: [{
          name: 'pdf',
          checked: false
        }, {
          name: 'xls',
          checked: false
        }, {
          name: 'doc',
          checked: false
        }, {
          name: 'txt',
          checked: false
        }]
      }, {
        id: 2,
        name: '图形',
        exts: [{
          name: 'jpg',
          checked: false
        }, {
          name: 'png',
          checked: false
        }, {
          name: 'bmp',
          checked: false
        }, {
          name: 'gif',
          checked: false
        }]
      }, {
        id: 3,
        name: '压缩',
        exts: [{
          name: 'rar',
          checked: false
        }, {
          name: 'zip',
          checked: false
        }, {
          name: '7z',
          checked: false
        }
          , {
          name: 'tar',
          checked: false
        }]
      }
    ];
  }

  addNewRow() {
    let fileList = this.state.value.fileList;
    fileList.push({
      id: 1,
      fileName: '',
      fileTypeArr: this.defaultFileTypes,
      fileSize: 0,
      fileType: ''
    })
    this.setState({
      fileList
    })
  }
  removeRow(idx) {
    console.log(this.props)
    // this.props.actions.fileRemoveDes(idx,this.props.params.id);
    ProductReq.fileRemoveDes(idx).then((res) => {
      if(!res || res.code != 200) return;
      this.setState({ fileList });
    })
  }


  All_Chekcd = (e) => {
    console.log(e.taget)

  }

  onOk(id) {//确定按钮
    let {actions,pageData} = this.props;
    this.formRef.validateAll((error, value) => {
      console.log('error', error, 'value', value);
      if (error) {
        // 处理表单报错
        return;
      }
      // 提交当前填写的数据
      this.props.actions.prodrevise(value,id);//
      // hashHistory.push('/product/search')
    });

  }

  setFileTypeChecked(fileTypes, fileTypeValueArr){
    fileTypes.map((item, i) => {
      item.exts.map((eitem, j) => {
        fileTypeValueArr.map((vitem, k) => {
          if(eitem.name == vitem){
            eitem.checked = true;
          }
        })
      })
    })
  }
  componentDidMount() {
    console.log(this.props);
    this.props.actions.fileDetail(this.props.params.id);
    let editData = this.props.editData ||{};
        editData = editData.data || {};
    let collects = editData.collectionDetails || [];
    let fileName= [];
    let fileType = '';
    let fileSize = '';
  }
  
  /**
   * {
   * name: '',
   * fileType: ''
   * }
   */
  renderRow(data){
    return 
  }
  render() {
    let data = this.props.editData || {}
    data = data.data || {}//data.data
    let dataType = data.dataType || ''
    let names = data.name || {}

    let collects = data.collectionDetails || [];
      collects.map((item, i) => {
      let fileTypeValueArr = item.fileType.split(',')
      item.fileTypeArr = this.defaultFileTypes;
      this.setFileTypeChecked(item.fileTypeArr, fileTypeValueArr);
    })
    this.state.value.fileList=collects;
    console.log(this.state.value.fileList)
    return (
      <IceContainer>
        <IceFormBinderWrapper
          ref={(formRef) => {
            this.formRef = formRef;
          }}
          value={this.state.value.dd}
          >
          <Form className="dialog-form">
            <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>清单类型：</label>
                <IceFormBinder
                  name="dataType"
                >
                  <label>{`${dataType}`}</label>
                </IceFormBinder>
                <IceFormError name="dataType" />
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>清单名称：</label>
                <IceFormBinder
                  name="name"
                >
                  <Input placeholder="清单名称" value={`${names}`}/>
                </IceFormBinder>
                <IceFormError name="name" />
              </Col>
            </Row>
            <ul className="dialog-form-ul">
              <li className="liColor">资料名称</li>
              <li className="liTow liColor">文件类型</li>
              <li className="liColor">限制大小</li>
              <li className="liColor">操作</li>

              {this.state.value.fileList&& this.state.value.fileList.map((item, i) => {
                return (<ul key={i}>
                      <li className="liType">
                      <IceFormBinder
                          name="fileName"
                        >
                         <Input placeholder="清单名称" style={{ width: "150px" }} />
                        </IceFormBinder>
                        <IceFormError name="fileName" />
                      </li>
                  <li className="liTow liType">
                    {item.fileTypeArr && item.fileTypeArr.map((typeItem, j) => {
                      return (
                      <Col key={j}>
                        <label style={styles.filterTitle}>{typeItem.name}</label>
                        <IceFormBinder
                          name="All_pdf"
                        >
                          <Checkbox id="All_pdf" onChange={this.All_Chekcd} />
                        </IceFormBinder>
                        <label htmlFor="All_pdf" className="next-checkbox-label">全部</label>
                        {typeItem.exts && typeItem.exts.map((extItem, k) => {
                          return <span>
                            <IceFormBinder
                              name="pdf"
                            >
                              <Checkbox id="" defaultChecked={extItem.checked} />
                            </IceFormBinder>
                            <label htmlFor="pdf" className="next-checkbox-label">{extItem.name}</label>
                          </span>
                        })}
                      </Col>)
                    })}
                  </li>
                  <li className="liType">
                    <Input style={{ width: "90px" }} value={`${item.fileSize}`}/>M
                  </li>
                  <li className="liType">
                    <Button onClick={this.removeRow.bind(this,item.id)} style={styles.newCol}>删除</Button>
                  </li>
                </ul>)
              })}

            </ul>
            <div style={styles.btn}>
              <Button onClick={this.addNewRow.bind(this)} style={styles.newCol}>新增一行</Button>
              <Button onClick={this.onOk.bind(this,data.id)} style={styles.sureBtn}>确定</Button>
            </div>
          </Form>
        </IceFormBinderWrapper>

      </IceContainer>
    )
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
  btn: {
    overFlow: 'hidden',
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
    background: '#ec9d00',
    color: '#fff',
  },
  sureBtn: {
    hiegth: '30px',
    borderRadius: 0,
    border: 'none',
    marginTop: '20px',
    background: '#ec9d00',
    color: '#fff',
    float: 'right'
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};