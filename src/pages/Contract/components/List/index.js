import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Dialog, Button, Feedback } from "@icedesign/base";
import { hashHistory } from 'react-router';
import { BaseApp } from 'base'
import { Title, PchTable, PchPagination } from 'components';
import FilterForm from './Filter';
import DialogModule from './DialogModule';
import Req from '../../reqs/ContractReq';

const Toast = Feedback.toast;
class ContractList extends BaseApp {
  constructor(props) {
    super(props);
    this.state = {
      visible:false,
      templateObj:{
        productList:[]
      }
    }
  }
  componentWillMount() {
    this.props.actions.search()
  }
  //表单操作
  handleOperateClick(record, type) {
    switch (type) {
        case this.OPERATE_TYPE.CHANGE: {
            hashHistory.push(`contract/add/${record.id}`)
            break;
        }
        case this.OPERATE_TYPE.VIEW: {
            hashHistory.push(`contract/detail/${record.id}`)
            break;
        }
        case this.OPERATE_TYPE.SWITCH: {
            this.dialogEvent(this.OPERATE_TYPE.SWITCH,record)
            break;
        }
        case this.OPERATE_TYPE.REMOVE: {
            this.dialogEvent(this.OPERATE_TYPE.REMOVE,record)
            break;
        }
        case this.OPERATE_TYPE.BIND: {
          hashHistory.push(`contract/bind/${record.id}`)
          break;
        }
    }
  }
  //表格操作
  dialogEvent(type,record) {
    let status;
    if(type == this.OPERATE_TYPE.SWITCH) {
      if(record.status == 1) {
        status = 1;
      } else if(record.status == 2){
        status = 2;
      }
    } else if (type == this.OPERATE_TYPE.REMOVE) {
        status = 999;
    }
    Req.isBindProductApi(record.id)
    .then((res) => {
      const { data } = res;
      if(data) {
        this.seachBindProductList(record.id);
      }
      this.setState({
        visible:true,
        templateObj:{
          id:record.id,
          status,
          isBind:false,
          productList:[]
        }
      })

    })
  }
  //查询绑定产品列表
  seachBindProductList(id) {
    Req.seachBindTemplateApi(id)
    .then((res) => {
      let productList = res.data.map((ele,index) => ({
        value:ele.id,
        label:ele.productName
      }));
      this.setState({
        templateObj:{
          isBind:true,
          productList
        }
      })
    })
  }
  //查询
  fetchData =(condition)=> {
    this.props.actions.search(condition)
  }
  //点击分页
  changePage = (currentPage) => {
      this.props.actions.search({
          page: currentPage
      });
  }
  //提交启用，停用，删除
  submitOperate(id,status) {
    Req.handleTemplateApi(id,status)
    .then((res) => {
      if(status == 1) {
        Toast.success("启用成功");
      } else if(status == 2) {
        Toast.success("停用成功");
      } else if(status == 999) {
        Toast.success("删除成功");
      }
      location.reload()
    },(error) => {

    })
  }
  render() {
    const { columns } = this.props;
    const { templateObj, visible, productList } =this.state;
    const { list=[] } = this.props.pageData;
    return(
      <IceContainer className="pch-container">
          <Title title="合同管理" />
          <FilterForm onSubmit={this.fetchData} />
          <PchTable dataSource={list} columns={columns} onOperateClick={this.handleOperateClick.bind(this)} />
          <PchPagination dataSource={this.props.pageData} changePage={this.changePage} />
          <DialogModule
            templateObj={templateObj}
            visible={visible}
            submit={this.submitOperate}/>
      </IceContainer>
    )
  }
}

export default ContractList;
