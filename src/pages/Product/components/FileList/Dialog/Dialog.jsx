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

import FileListDetail from './FileListDetail';


export default class DiaLog extends Component {
  static displayName = 'Dialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value:{
        fileList:{},
        dd:this.fileList
      }
    }

    this.defaultFileTypes = [
      {
        name: '文档',
        exts: ['全部', 'pdf','xls','doc','txt']
      }, {
        name: '图形',
        exts: ['全部', 'jpg','png','bmp','gif']
      }, {
        name: '压缩',
        exts: ['全部', 'rar','zip','7z','tar']
      }
    ];
  }

  componentDidMount() {
    this.props.actions.fileDetail(this.props.params.id);
  }

  addNewRow() {
    let tempData = this.props.editData;
    tempData.collectionDetails.push({
      dataName: '',
      fileSize: undefined,
      fileType: ''
    })
    this.props.actions.changeFileDetail(tempData);
  }

  removeRow(id, idx) {
    if(!id){
      // 不存在id即为新增加的行，不调用接口直接删除
      let tempData = this.props.editData;
      tempData.collectionDetails.splice(idx, 1);
      this.props.actions.changeFileDetail(tempData);
    }else {
      ProductReq.fileRemoveDes(id).then((res) => {
        if(!res || res.code != 200) return;
        this.setState({ fileList });
      })
    }
  }

  onOk(id) {//确定按钮
    let {actions} = this.props;
    this.formRef.validateAll((error, value) => {
      console.log('error', error, 'value', value);
      if (error) {
        // 处理表单报错
        return;
      }

      // 提交当前填写的数据
      actions.fileEditSave(value,id);
    });

  }

  setFileTypeChecked(fileTypeValueArr){
    let newFileTypes = [
      {
        name: '文档',
        exts: ['全部', 'pdf','xls','doc','txt']
      }, {
        name: '图形',
        exts: ['全部', 'jpg','png','bmp','gif']
      }, {
        name: '压缩',
        exts: ['全部', 'rar','zip','7z','tar']
      }
    ];

    newFileTypes.map((item, i) => {
      let value = [];
      let hasAllChecked = true;
      item.exts.map((eitem, j) => {
        if(eitem != '全部'){
          let flag = false;
          fileTypeValueArr.map((vitem, k) => {
            if(eitem == vitem){
              flag = true;
              value.push(vitem);
            }
          })

          if(!flag){
            hasAllChecked = false;
          }
        }
      })

      if(hasAllChecked){
        value.splice(0, 0, '全部');
      }

      item.value = value;
    })

    return newFileTypes;
  }

  handleChangeType(idx, j, checkedValues, e){
    let tempData = this.props.editData;
    let tempFileTypeArr = tempData.collectionDetails[idx].fileTypeArr;
    let curFileTypeExtArr = tempFileTypeArr[j].exts;
    let tempFileType = tempData.collectionDetails[idx].fileType;
    let checkedValueStr = checkedValues.join(',');
    let tempArr = [];//当前选中的选项

    if(e.target.value == '全部'){
      //点击了全部选项
      if(checkedValueStr.indexOf('全部') != -1){
        //勾选了全部
        checkedValueStr = curFileTypeExtArr.join(',');
        checkedValueStr = checkedValueStr.replace('全部,', '');
        let tempArr1 = [tempFileType,checkedValueStr].join(',');
        tempArr = tempArr1.split(',');
      }else{
        //取消勾选全部
        tempFileType.split(',').map((item, i) => {
          let shouldRemove = false;
          curFileTypeExtArr.map((sitem, j) => {
            if(item == sitem){
              shouldRemove = true;
              return;
            }
          })

          if(!shouldRemove){
            tempArr.push(item);
          }
        })
      }
    }else{
      //点击其它选项
      tempFileType.split(',').map((item, i) => {
        let shouldRemove = false;
        curFileTypeExtArr.map((sitem, j) => {
          if(item == sitem){
            shouldRemove = true;
            return;
          }
        })

        if(!shouldRemove){
          tempArr.push(item);
        }
      })

      checkedValueStr = checkedValueStr.replace('全部,', '');
      tempArr = tempArr.concat(checkedValueStr.split(','));
    }

    tempArr = this.reduceArr(tempArr);
    tempData.collectionDetails[idx].fileType = tempArr.join(',');
    this.props.actions.changeFileDetail(tempData);
  }

  reduceArr(arr){
      let tempObj = {}
      arr.map((item) => {
        tempObj[item] = 1;
      })
      arr = [];
      for(var x in tempObj){
        arr.push(x);
      }

      return arr;
  }
  
  render() {
    let data = this.props.editData || {}

    data.collectionDetails && data.collectionDetails.map((item, i) => {
      let fileTypeValueArr = item.fileType.split(',');
      item.fileTypeArr = this.setFileTypeChecked(fileTypeValueArr);
    })

    console.log('render', data)

    return (
      <IceContainer>
        <IceFormBinderWrapper
          ref={(formRef) => {
            this.formRef = formRef;
          }}
          value={data}
          >
          <Form className="dialog-form">
            <Row wrap>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>清单类型：</label>
                <label>{data.dataType}</label>
              </Col>
              <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                <label style={styles.filterTitle}>清单名称：</label>
                <label>{data.name}</label>
              </Col>
            </Row>
            <FileListDetail
              data={data.collectionDetails}
              onRemove={this.removeRow.bind(this)}
              onChangeType={this.handleChangeType.bind(this)}
            />
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