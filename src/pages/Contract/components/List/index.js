import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Dialog, Button, Feedback } from "@icedesign/base";
import { hashHistory } from 'react-router';
import { BaseApp } from 'base'
import { Title, PchTable, PchPagination, PchDialog } from 'components';
import FilterForm from './Filter';
import DialogModule from './DialogModule';
import Req from '../../reqs/ContractReq';
import './index.scss'
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
        case this.OPERATE_TYPE.COPY: {
          this.copyEvent(record.id)
          break;
        }
    }
  }
  //复制模板
  copyEvent(id) {
    Req.copyTemplateApi(id)
    .then((res) => {
      const { code, msg, data } =res;
      if(code != 200 ) {
        Toast.error(msg);
        return
      }
      hashHistory.push(`contract/add/${data.id}`)
    },(error) => {

    })
  }
  //表格操作
  dialogEvent(type,record) {
    let actionStatus;
    if(type == this.OPERATE_TYPE.SWITCH) {
      if(record.status == 1) {
        actionStatus = 2;//去停用
      } else if(record.status == 2){
        actionStatus = 1;//去启用
      }
    } else if (type == this.OPERATE_TYPE.REMOVE) {
        actionStatus = 999;//去删除
    }
    Req.isBindProductApi(record.id)
    .then((res) => {
      const { data } = res;
      if(data) {
        this.seachBindProductList(record.id,actionStatus);
      } else {
        this.setState({
          templateObj:{
            id:record.id,
            actionStatus,
            isBind:false,
            productList:[]
          }
        })
      }
      this.setState({visible:true})
    })
  }
  //查询绑定产品列表
  seachBindProductList(id,actionStatus) {
    Req.seachBindTemplateApi(id)
    .then((res) => {
      let productList = res.data.map((ele,index) => ({
        value:ele.id,
        label:ele.productName
      }));
      this.setState({
        templateObj:{
          id:id,
          actionStatus,
          isBind:true,
          productList
        }
      })
    })
  }
  //提交启用，停用，删除
  submitOperate(id,actionStatus) {
    Req.handleTemplateApi(id,actionStatus)
    .then((res) => {
      if(actionStatus == 1) {
        Toast.success("启用成功");
      } else if(actionStatus == 2) {
        Toast.success("停用成功");
      } else if(actionStatus == 999) {
        Toast.success("删除成功");
      }
      this.props.actions.search();
      this.setState({
        visible:false
      })
    },(error) => {

    })
  }
  render() {
    const { columns } = this.props;
    const { templateObj, visible, productList } =this.state;
    const { list=[] } = this.props.pageData;
    return(
      <IceContainer className="pch-container contract-template-page">
          <Title title="合同管理" />
          <FilterForm onSubmit={this.fetchData} />
          <PchTable dataSource={list} columns={columns} onOperateClick={this.handleOperateClick.bind(this)} />
          <PchPagination dataSource={this.props.pageData} changePage={this.changePage} />
          <DialogModule
            templateObj={templateObj}
            visible={visible}
            submit={this.submitOperate.bind(this)}/>
      </IceContainer>
    )
  }
}

export default ContractList;
