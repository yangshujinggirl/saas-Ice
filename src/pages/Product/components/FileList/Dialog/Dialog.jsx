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

const formItemLayout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 12
    }
};

import FileListDetail from './FileListDetail';
import { Title, BtnAddRow } from 'components';

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
      // 先进入编辑后再进入添加页需要清除上次的表单数据
      this.props.actions.changeFileDetail({
        dataType: null,
        name: '',
        collectionDetails: [{
          dataName: '',
          fileSize: undefined,
          fileType: '',
          orderId: 0
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
      fileType: '',
      orderId: tempData.collectionDetails.length
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
      }).catch((res)=>{
        return	ProductReq.tipError('该材料清单明细已关联进件数据，不能删除！',3000)

      })
    }
  }

  onOk(id) {//确定按钮
    let { actions } = this.props;
    this.formRef.validateAll((error, value) => {
      if (error) {
        return;
      }
       let id = this.props.params.id;
      value.collectionDetails && value.collectionDetails.map((item, i) => {
        item.orderId = i;
        item.name = value.name;
        item.collectionId = id

      });

      // 提交当前填写的数据
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
  nameRepeat=(rule,value,callback) =>{

    if(rule.required && !value){
      callback('清单名称必填')
      return;
    }
    
    let reg = /\s|\xA0/g;
    if(reg.test(value)){
      callback('不能有空格');
      return
    }
    // let reg2=/[，\s_'’‘\"”“|\\~#$@%^&*!()。;\/<>\?？]/;  
    // if(reg2.test(value)){
    //   callback('不能有特殊字符');
    //   return
    // }

    ProductReq.fileNameRepeat(value).then((res) =>{
      if(res.data){
        callback("该名已存在")
      }
      callback()
    })
    callback()
  }
  
  testName=(id,data) =>{
    if(id){
      return(<p className="next-form-text-align">{data.name}</p>)
    }else{
      
      return(
        <span>
          <IceFormBinder
            name="name"
            validator={this.nameRepeat}
            required
          >
            <Input 
              size="large" 
              className="custom-input" 
              placeholder="请输入清单名称"
              />
          </IceFormBinder>
          <div><IceFormError name="name"/></div>
        </span>
      )
    }
  }
  testType=(id,data) =>{
    if(id){
      return(<p className="next-form-text-align">{data.dataType}</p>)
    }else{
      return(
        <span>
          <IceFormBinder
            name="dataType"
            required
            message="清单类型必选"
          >
            <Select size="large" placeholder="请选择" className="custom-select">
              <Select.Option value="产品进件">产品进件</Select.Option>
          </Select>
          </IceFormBinder>
          <div><IceFormError name="dataType"/></div>
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
        <Title title={this.props.params.id?'材料编辑':'材料新增'} />
        <IceFormBinderWrapper
          ref={(formRef) => {
            this.formRef = formRef;
          }}
          value={data}
          >
          <div className="pch-form">
            <Form size="large">
              <Row wrap>
                <Col xxs={24} xs={12} l={8} xl={6}>
                  <FormItem {...formItemLayout} label={<span><span className="label-required">*</span>清单类型:</span>}>
                      {this.testType(this.props.params.id,data)}
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8} xl={6}>
                  <FormItem {...formItemLayout} label={<span><span className="label-required">*</span>清单名称:</span>}>
                      {this.testName(this.props.params.id,data)}
                  </FormItem>
                </Col>
              </Row>
              <FileListDetail
                data={data.collectionDetails}
                onRemove={this.removeRow.bind(this)}
                onChangeType={this.handleChangeType.bind(this)}
              />
              <BtnAddRow text="添加一行" onClick={this.addNewRow.bind(this)} style={{marginTop: 14}} />
              <div className="filelist-btns">
                <Button size="large" type="secondary" onClick={this.onOk.bind(this,data.id)}>提交</Button>
              </div>
            </Form>
          </div>
        </IceFormBinderWrapper>

      </IceContainer>
    )
  }
}
