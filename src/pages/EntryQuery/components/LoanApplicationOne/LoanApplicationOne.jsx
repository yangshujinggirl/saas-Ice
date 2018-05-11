import React, { Component } from 'react';
import {hashHistory} from 'react-router';
import IceContainer from '@icedesign/container';
import {
  Input,
  Grid,
  Form,
  Button,
  Select,
  Field,
  NumberPicker,
  Dialog,
  Balloon
 } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import FormRender from './FormRender'
import Req from '../../reqs/EntryQueryReq'

import  './LoanApplicationOne.scss'
import classNames from 'classnames';

const { Options } = Select;
const { Row, Col } = Grid;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 8 },
};
const labels =(name) => (
  <span>
    <Balloon
      type="primary"
      trigger={<span>{name}:</span>}
      closable={false}
      triggerType="hover">
      {name}
    </Balloon>
  </span>
);
const value = {};
class LoanApplicationOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadId:this.props.params.id,
      dataSource:[],
      month:1,
      index : 0
    };
    this.field = new Field(this);
    // 请求参数缓存
    this.queryCache = {};
  }
  componentDidMount() {
    this.getProductNum()
    this.actionType()
  }

  actionType() {
    const { loadId } = this.state;
    if(loadId) {
      this.changeInfomation(loadId)
    } else {
      this.props.actions.searchField({isFixed:true});
    }
  }

  changeInfomation(productId) {

  }

  getProductNum() {
    const limit = 990;
    Req.getProductNumApi(limit)
    .then((res) => {
      if(res.data && res.code == '200'){
        console.log(res)
        const { data } = res;
        const { list } = data;
        let dataSource = list.map((el) => {
          return {
            id : el.id,
            label:el.name,
            value:el.productCode,
          }
        });
        console.log(dataSource)
        this.setState({
          dataSource
        })
      }
    },(error) => {

    })
  }
  //提交表单
  handleSubmit(e) {
    e.preventDefault();
    this.field.validate((errors, values) => {
      let parmas = this.field.getValues();
      if (errors) {
        return;
      }
      this.addLoanApi(parmas)
    });
  }

  //增加进件
  addLoanApi(parmas) {
    Req.addLoanApi(parmas)
    .then((data) => {
      let { code, message } = data;
      if(data && code == 200 ) {
        let { id } = data.data;
        hashHistory.push(`/entryQuery/update/${id}`)
      }
    },(error) => {
      console.log(error)
    })
  }
  //秒拒提示
  warnTips(name) {
    const { borrowerName, borrowerIdNo, borrowerMobile } = this.field.getValues();
    if(name== 'borrowerName' || name== 'borrowerIdNo' || name== 'borrowerMobile') {
      if(borrowerName && borrowerIdNo && borrowerMobile) {
        // this.secondsfrom()
      }
    } else {
      return
    }

  }
  secondsfrom() {
    Dialog.confirm({
      content: '秒拒功能',
      locale: {
        ok: "确认"
      }
    });
  }

  formChange(){

  }
  //标题点击
  titleClick = (index,name)=>{
    // e.preventDefault();
    this.setState({
      index:index
    })
    this.scrollToAnchor(name)
  }
  //渲染标题
  renderTitle = (data) =>{
    console.log(data)
    const  list = [];
    if(!this.isEmptyObject(data)){
      data.map((item,index)=>{
        var btnClass = classNames({
          'active': this.state.index == index,
        });
        list.push(
          <li key={index} ><a   className={btnClass}  onClick={this.titleClick.bind(this,index,item.name)}>{item.name}</a></li>
        )
      })
    }
    return list;
  }

  //title跳转
  scrollToAnchor = (anchorName) => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if(anchorElement) { anchorElement.scrollIntoView(); }
    }
  }
  //判断Json是否为kong
  isEmptyObject(e) {
    var t;
    for (t in e)
      return false;
    return true;
  }

  //新增列表一列传递的方法
  addColumn = (data)=>{
    this.setState({
      tableList:data
    })
  }
  //next下一步
  next = (e)=>{
      e.preventDefault();
      this.field.validate((errors, values) => {
        if (errors) {
          console.log("Errors in form!!!");
          return;
        }
        console.log("Submit!!!");
        // console.log(values);
        for(var key in values){
          if(values[key] != undefined){
            if(values[key] != 'undefined'){
              if(this.isCheckBox(key)){
                console.log("多选")
                console.log(values[key])
                // alert("123")
                if(typeof (values[key]) == 'object'){
                  values[key] = values[key].join(',');
                }
              }
              this.queryCache[key] = values[key];
            }
          }
        }
        console.log(this.queryCache)
        // this.queryCache.status = 'save'
        Req.addLoanApi(this.queryCache).then((res)=>{
          console.log(res)
          if(res &&  res.data && res.code == 200){
            // hashHistory.push('/entryQuery/loanApplication/'+ res.data.id);
            hashHistory.push({
              pathname: '/entryQuery/loanApplication/'+ res.data.id
            })
          }
        }).catch((errors)=>{
          console.log(errors);
        });
      });
  }
  //判断是否为CheckBox
  isCheckBox(key){
    console.log(this.props.fieldList.list)
    const { list =[] } = this.props.fieldList || [];
    for(var i =0 ; i<list.length;i++){
      for(var j=0; j<list[i].fields.length;j++){
        if(list[i].fields[j].type== 'CHECKBOX'&& list[i].fields[j].name == key){
          return true;
        }
      }
    }
    return false;
  }

  render() {
    const { list =[] } = this.props.fieldList || [];
    const { init } = this.field;
    const { loadId } = this.state;
    const { dataSource } = this.state;
    console.log(list)
    return (
      !loadId ?
        <IceContainer className="pch-container">
          <legend className="pch-legend" >
            <span className="pch-legend-legline"></span>车贷申请
          </legend>
          <IceFormBinderWrapper value={value} onChange={this.formChange} className='loan' >
            <Row>
              <Col  className='review-form'>
                <div className='review-page'>
                  <div className='title'>
                    <ul>
                      {this.renderTitle(list)}
                    </ul>
                  </div>
                </div>
                <div className="rcontent-edito modify-form">
                  <IceFormBinderWrapper
                    value={this.state.value}
                    onChange={this.formChange}
                  >
                    <Form
                      labelAlign= "left"
                      field={this.field}
                      size="large"
                    >
                      <FormRender {...this.props} data={list} init = {init}  productList={ dataSource  }  field={this.field} addColumn ={this.addColumn.bind(this)} ></FormRender>
                    </Form>
                  </IceFormBinderWrapper>
                  <div className='botton-box'>
                    <Button className='botton' onClick={this.next}>下一步</Button>
                  </div>
                </div>
              </Col>
            </Row>
          </IceFormBinderWrapper>
        </IceContainer> : <div>接口未提供暂时未开发</div>
    );
  }
}

const styles = {
  form: {
    marginTop: 30,
  },
  cats: {
    width: '100%',
  },
  botton:{
    backgroundColor :'#FC9E25'
  },
  select:{
    width:'200px'
  },
  top:{
    maginTop : '20px'
  }
};


export default LoanApplicationOne;
