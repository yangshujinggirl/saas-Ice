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

import { Form, Field, Input, Button, Checkbox, Select, DatePicker, Switch, Radio, Grid, Table,Feedback} from '@icedesign/base';

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
    let id = this.props.params.id;
    if(id){
      this.props.actions.fileDetail(this.props.params.id);
    }else{
      this.props.actions.changeFileDetail({
        fileType: null,
        fileName: '',
        collectionDetails: [{
          dataName: '',
          fileSize: undefined,
          fileType: ''
        }]
      })
    }
    //
  }

  componentWillReceiveProps(nextProps){
    // console.log('componentWillReceiveProps', this.props.route.path, nextProps.route.path)
    if(this.props.route.path != nextProps.route.path){
      // this.props.actions.changeFileDetail({})
      this.props.actions.changeFileDetail({
        dataType: null,
        name: '',
        collectionDetails: [{
          dataName: '',
          fileSize: undefined,
          fileType: ''
        }]
      })
    }
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
    let fileList = this.state.value.fileList
    if(!id){
      // 不存在id即为新增加的行，不调用接口直接删除
      let tempData = this.props.editData;
      tempData.collectionDetails.splice(idx, 1);
      this.props.actions.changeFileDetail(tempData);
    }else {
      ProductReq.fileRemoveDes(id).then((res) => {
        if(!res || res.code != 200) return;
        let tempData = this.props.editData;
        tempData.collectionDetails.splice(idx, 1);
        this.props.actions.changeFileDetail(tempData);
        // this.setState({ fileList });
      })
    }
  }

  onOk(id) {//确定按钮
    let { actions } = this.props;
    this.formRef.validateAll((error, value) => {
      if (error) {
        return;
      }
      value.collectionDetails && value.collectionDetails.map((item, i) => {
        item.orderId = i;
      });

      // 提交当前填写的数据
      let id = this.props.params.id;
      if(id){
        actions.fileEditSave(value,id);
      }else{
        actions.fileSave(value)
      }
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
        let tempArr1 = tempFileType ? [tempFileType,checkedValueStr].join(',') : checkedValueStr;
        tempArr = tempArr1.split(',');
      }else{
        //取消勾选全部
        tempFileType.split(',').map((item, i) => {
          if(!item) return;
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
        if(!item) return;
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

  //判断清单名称是否已存在
  nameRepeat=(value)=>{
    let { data } =  this.props.fileData
    let { list } = data;
    let boolean = true;
    list.map((item,i)=>{
      if(value==item.name){
        Feedback.toast.show({
          type: 'error',
          content: '该清单名称已存在！！',
        });
        boolean = false
      }
    })
    if (!boolean) return
  }

  testName=(id,data) =>{
    if(id){
      return(<label>{data.name}</label>)
    }else{
      
      return(
        <span>
          <IceFormBinder
            name="name"
          >
            <Input 
              size="large" 
              className="custom-input" 
              placeholder="请输入清单名称"
              onChange={this.nameRepeat}
              />
          </IceFormBinder>
          <IceFormError name="name"/>
        </span>
      )
    }
  }
  testType=(id,data) =>{
    if(id){
      return(<label>{data.dataType}</label>)
    }else{
      return(
        <span>
          <IceFormBinder
            name="dataType"
          >
            <Select name="dataType" size="large" placeholder="请选择" className="custom-select">
              <Select.Option value="产品进件">产品进件</Select.Option>
          </Select>
          </IceFormBinder>
          <IceFormError name="dataType"/>
        </span>
      )
    }
  }
  render() {
    let data = this.props.editData || {}

    data.collectionDetails && data.collectionDetails.map((item, i) => {
      let fileTypeValueArr = item.fileType.split(',');
      item.fileTypeArr = this.setFileTypeChecked(fileTypeValueArr);
    })
    // console.log('render', data)

    return (
      <IceContainer className="pch-container">
        <legend className="pch-legend">
          <span className="pch-legend-legline"></span>
          {this.props.params.id?'材料编辑':'材料新增'} 
        </legend>
        <IceFormBinderWrapper
          ref={(formRef) => {
            this.formRef = formRef;
          }}
          value={data}
          >
          <div className="pch-form">
            <Form size="large" className="dialog-form">
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}>清单类型：</label>
                  {this.testType(this.props.params.id,data)}
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}>清单名称：</label>
                  {this.testName(this.props.params.id,data)}

                </Col>
              </Row>
              <FileListDetail
                data={data.collectionDetails}
                onRemove={this.removeRow.bind(this)}
                onChangeType={this.handleChangeType.bind(this)}
              />
              <div className="btns">
                <Button type="secondary" onClick={this.onOk.bind(this,data.id)} className="sureBtn">提交</Button>
                <Button type="secondary" onClick={this.addNewRow.bind(this)} className="addNewBtn">添加一行</Button>
                
              </div>
            </Form>
          </div>
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

  filterTitle: {
    width: '140px',
    textAlign: 'right',
    marginRight: '12px',
    fontSize: '14px',
  },
};
