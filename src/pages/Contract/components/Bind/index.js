import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as  IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import { hashHistory } from 'react-router';
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
  Upload
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
      dataSourceRight:[]
    }
  }
  componentWillMount() {
    this.seachBindProductList('2979');
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
      this.setState({
        bindProductData:res.data,
        dataSourceRight:res.data,
      })
    })
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
  }
  //删除
  deleteItem(index) {
    let { dataSourceRight }=this.state;
    dataSourceRight.splice(index,1);
    this.setState({
      dataSourceRight
    })
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
                    <Button className="add-btn" onClick={()=>this.addItem()}>>> </Button>
                  </div>
                  <Table dataSource={this.state.dataSourceRight} className="part-right">
                    <Table.Column title="产品类型" dataIndex="productCategory" />
                    <Table.Column title="产品名称" dataIndex="productName" />
                    <Table.Column title="操作" cell={this.renderOperator} />
                  </Table>
                </div>
                <Title title="选择字段" />
                <div className="action-block">
                  <FormModule />
                </div>
            </div>
          </IceFormBinderWrapper>
      </IceContainer>
    )
  }
}

export default Bind;
