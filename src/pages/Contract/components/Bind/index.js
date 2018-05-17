import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as  IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import { hashHistory, Link } from 'react-router';
import { BaseApp } from 'base'
import { Title, PchTable, PchPagination } from 'components';
import FilterForm from './Filter';
import {
  Input,
  Button,
  Select,
  Grid,
  Table,
  Form,
  Upload,
  Feedback
} from '@icedesign/base';
import Req from '../../reqs/ContractReq';
import FormModule from './FormModule';
import './index.scss'

const { Row, Col } = Grid;

class Bind extends BaseApp {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow:[],
      bindProductData:[],
      dataSourceRight:[],
      // 合同模版字符串
      contractTemplateHTML: '',
      // 产品字段list
      productNames: [],

      bindProductNames: {
        templateId: this.props.params.id,
        templateProducts: [
          /*
          {
            "productName": "12",
            "productId": "1",
            "contractTemplateId": "2973",
            "productCategory": "1"
          }
          */
        ],
        templateExtends: [
          /*
          {
            "keyChineseName": "888",
            "keyEnglishName": "999",
            "contractTemplateId": "2973"
          }
          */
        ],
        content: ''
      }
    }
  }
  componentWillMount() {
    this.seachBindProductList(this.props.params.id);
    this.props.actions.searchProduct();
  }
  fetchData =(condition)=> {
    this.props.actions.searchProduct(condition);
  }
  //分页
  changePage =(currentPage)=> {
    this.props.actions.searchProduct({page:currentPage});
  }
  tip(res){
    if(!res || typeof res.data != 'object' || !res.data){
      Feedback.toast.error(res.msg || '数据加载异常，请稍后再试')
      return false;
    }
    return true;
  }
  //查询已绑定产品列表
  seachBindProductList(id) {
    Req.seachBindTemplateApi(id)
    .then((res) => {
      if(!this.tip(res))return;
      this.setState({
        bindProductData:res.data.templateProductList || [],
        dataSourceRight:res.data.templateProductList || [],
        contractTemplateHTML: res.data.content
      },function(){
        //console.log(this.state.contractTemplateHTML)
        //this.refs.FormModule.forceUpdate();
        if(this.refs.FormModule.refs.ProductNameForm){}
      })

      let data = res.data.templateProductList.map(p=>p.id)
      this.getProductName(data);
    })
  }
  getProductName(data){
    if(!data instanceof Array)return;
    //查询绑定的产品列表字段
    Req.getProductNameAPi(data).then(res=>{
      if(!this.tip(res))return;
      let data = res.data.map(p=>({
        name: p.name,
        label: p.label
      }))
      this.setState({
        productNames: res.data
      })
    }).catch(err=>err)
  }
  //添加
  addItem() {
    let arrayData = [];
    let { selectedRow } = this.state;

    for(var j=0; j<selectedRow.length; j++) {
      var flag = true;
      for(var i=0; i<arrayData.length;i++) {
        if(arrayData[i].id == selectedRow[j].id ) {
          flag = false;
        }
      }
      if(flag) {
        arrayData.push(selectedRow[i]);
      }
    }

    let arra = [...this.state.bindProductData,...arrayData];
    this.setState({
      dataSourceRight:arra
    })

    this.getProductName(arra.map(p=>p.id))
  }
  //删除
  deleteItem(index) {
    let { dataSourceRight }=this.state;
    dataSourceRight.splice(index,1);
    this.setState({
      dataSourceRight
    })
    this.getProductName(dataSourceRight.map(p=>p.id))
  }
  onChange =(selectedRowKeys,records)=> {
   let selectedRow=[];
   selectedRow = records.map((ele) => (
     {
       productCategory:ele.productType,
       productName:ele.name,
       id:ele.id
     }
   ));
   this.setState({
     selectedRow
   })
  }
  // 保存绑定字段到合同模版
  bindProductName(){
    let dom = this.refs.FormModule.refs.ProductNameForm.cloneNode(true);
    let inputs = [...dom.querySelectorAll('.product-name-select')];
    let templateProducts = []; 
    let templateExtends = [];
    let content = "";
    inputs.forEach(select=>{
      let input = select.querySelector('.select-input');
      let realName = input.getAttribute('data-value');
      let value = input.value;
      let templateProduct = {
        productName: realName,
        //"productId": "1",
        contractTemplateId: this.props.params.id,
        //"productCategory": "1"
      }
      let templateExtend = {
        keyChineseName: value,
        keyEnglishName: realName,
        contractTemplateId: this.props.params.id
      }

      if(/productname\d+/.test(realName)){
        templateExtends.push(templateExtend);
        if(value.length <= 0)value = 'null'
      }else{
        templateproducts.push(templateProduct)
        value = 'null';
      }
      let newNode = document.createElement('em');
      newNode.className = 'blank-em'
      newNode.innerHTML = "_BLANK_"+realName+"_"+value+"_BLANK_";
      select.parentNode.replaceChild(newNode, select)
    })
    content = dom.innerHTML;

    // 发起绑定产品字段的api请求
    Req.saveProductNamesToContractTemplate({
        ...this.state.bindProductNames,
        content: dom.innerHTML,
        templateProducts,
        templateExtends
      }).then(res=>{
      if(res.code!=200)return Feedback.toast.success(res.msg || "绑定失败")
      Feedback.toast.success(res.msg || "绑定成功")
      setTimeout(()=>hashHistory.push("/contract"), 3000)
    }).catch(err=>err)
  }
  //操作
  renderOperator = (value, index, record) => {
    return (
        <Button
          type="primary"
          shape="text"
          onClick={this.deleteItem.bind(this, index)}>
          删除
        </Button>
    );
  };

  render() {
    const { list=[] } = this.props.pageData;
    return(
      <IceContainer className="pch-container contract-bind-page">
          <IceFormBinderWrapper ref="form">
            <div className="pch-form">
                <Title title="选择产品" />
                <FilterForm onSubmit={this.fetchData} />
                <div className="change-product">
                  <div className="product-list">
                    <Table
                      primaryKey="id"
                      dataSource={list}
                      rowSelection={{ onChange: this.onChange }}>
                      <Table.Column title="产品类型" dataIndex="productType" />
                      <Table.Column title="产品名称" dataIndex="name" />
                    </Table>
                    <PchPagination dataSource={this.props.pageData} changePage={this.changePage} />
                  </div>
                  <div className="btn-wrap">
                    <Button className="add-btn" onClick={this.addItem.bind(this)}> >> </Button>
                  </div>
                  <Table dataSource={this.state.dataSourceRight} className="part-right">
                    <Table.Column title="产品类型" dataIndex="productCategory" />
                    <Table.Column title="产品名称" dataIndex="productName" />
                    <Table.Column title="操作" cell={this.renderOperator} />
                  </Table>
                </div>
                <Title title="选择字段" />
                <div className="action-block">
                  <FormModule contractid={this.props.params.id} html={this.state.contractTemplateHTML} productNames={this.state.productNames} ref="FormModule" />
                </div>
                <div style={{'textAlign': 'center'}}>
                  <Button size="large" type="secondary" onClick={this.bindProductName.bind(this)}> 保存 </Button>

                  <Link className="next-btn next-btn-normal next-btn-large" style={{'marginLeft': '24px'}} to="/contract"> 取消 </Link>
                </div>
            </div>
          </IceFormBinderWrapper>
      </IceContainer>
    )
  }
}

export default Bind;
