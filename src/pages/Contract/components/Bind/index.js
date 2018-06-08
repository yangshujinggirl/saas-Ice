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
import ProductTypeMap from '../../../../base/constants/ProductTypeMap';
import './index.scss';
import '../../../../base/scss/tableEdtor.scss';

const { Row, Col } = Grid;

class Bind extends BaseApp {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow:[],
      dataSourceRight:[],
      // 合同模版字符串
      contractTemplateHTML: '',
      // 产品字段list
      productNames: [],

      bindProductNames: {
        templateId: this.props.params.id,
        templateProducts: [],
        templateExtends: [],
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
  //查询已绑定产品列表
  seachBindProductList(id) {
    Req.seachBindTemplateApi(id)
    .then((res) => {
      let { templateProductList = [], content = ""} = res.data || {};
      let data = templateProductList.map(p=>p.productCode);
      let formDataList = templateProductList.map(p=>({
        productCategory: p.productCategory,
        productName: p.productName,
        id: p.productCode
      }))

      this.setState({
        dataSourceRight:formDataList,
        contractTemplateHTML: content
      })
      if(data.length > 0)this.getProductName(data);
    })
  }
  //查询绑定的产品列表字段
  getProductName(data){
    if(!data instanceof Array)return;
    //查询绑定的产品列表字段
    Req.getProductNameAPi(data).then(res=>{
      let names = res.data || [];
      names = res.data.map(p=>({
        name: p.name,
        label: p.label
      }))
      this.setState({
        productNames: names
      })
    }).catch(err=>err)
  }
  //添加
  addItem() {
    let arrayData = [];
    let { selectedRow, dataSourceRight } = this.state;
    let totalData = [...selectedRow,...dataSourceRight];

    //去重
    var hash = {};
    for (var i = 0, elem; totalData[i]&&(elem = totalData[i].id) != null; i++) {
      if (!hash[elem]) {
        arrayData.push(totalData[i]);
        hash[elem] = true;
      }
    }

    // for(var j=0; j<totalData.length; j++) {
    //   var flag = true;
    //   for(var i=0; i<arrayData.length;i++) {
    //     if(arrayData[i].productCode == totalData[j].productCode ) {
    //       flag = false;
    //     }
    //   }
    //   if(flag) {
    //     arrayData.push(totalData[i]);
    //   }
    // }

    let arra = [...arrayData];
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
     records = records.map((ele) => (
       {
         productCategory: ele.productTypeName,
         productName: ele.name,
         id: ele.productCode
       }
     ));
     let selectedRow=[...records];
     this.setState({
       selectedRow
     })
  }
  // 保存绑定字段到合同模版
  bindProductName(){
    let dom = this.refs.FormModule.refs.ProductNameForm.cloneNode(true);
    let inputs = [...dom.querySelectorAll('.product-name-select')];
    let templateProducts = [...this.state.dataSourceRight.map(p=>{
      p.productCode = p.id;
      delete p.id
      return p
    })];
    let templateExtends = [];
    let content = "";
    inputs.forEach(select=>{
      let input = select.querySelector('.select-input');
      let realName = input.getAttribute('data-value');
      let value = input.value;
      if(/productname\d+/.test(realName)){
        if(value.length <= 0)value = 'null'
      }else{
        //templateproducts.push(templateProduct)
        value = 'null';
      }
      let templateExtend = {
        "keyChineseName": value,
        "keyEnglishName": realName,
        "keyValue": value
      }
      templateExtends.push(templateExtend);
      let newNode = document.createElement('span');
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
      if(res.code!=200)return Req.tipError(res.msg || "绑定失败")
      Req.tipSuccess(res.msg || "绑定成功", 500, ()=>{
        hashHistory.push("/contract")
      })
    }).catch(err=>err)
  }
  renderProductCategory(value, index, record) {
    return ProductTypeMap[record.productCategory]
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
                      dataSource={list}
                      rowSelection={{ onChange: this.onChange }}>
                      <Table.Column title="产品类型" dataIndex="productType" />
                      <Table.Column title="产品名称" dataIndex="name" />
                    </Table>
                    <PchPagination dataSource={this.props.pageData} onChange={this.changePage} />
                  </div>
                  <div className="btn-wrap">
                    <Button className="add-btn" onClick={this.addItem.bind(this)}> >> </Button>
                  </div>
                  <Table dataSource={this.state.dataSourceRight} className="part-right">
                    <Table.Column title="产品类型" cell={this.renderProductCategory} />
                    <Table.Column title="产品名称" dataIndex="productName" />
                    <Table.Column title="操作" cell={this.renderOperator} />
                  </Table>
                </div>
                <Title title="选择字段" />
                <div className="action-block wang-edtor-table-styles">
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
