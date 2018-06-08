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
      contractId:'',
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
            this.changeDialog(record.id);
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
    hashHistory.push(`contract/add/${id}?action=copy`)
  }
  //修改
  changeDialog(id) {
    this.isBindProduct(id,(result)=> {
      if(result) {
        Toast.error('您已绑定过产品，不可修改模板');
      } else {
        hashHistory.push(`contract/add/${id}`);
      }
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
    this.isBindProduct(record.id,(result)=> {
      if(result) {
        this.seachBindProductList(record.id,actionStatus);
      } else {
        this.setState({
          templateObj:{
            actionStatus,
            isBind:false,
            productList:[]
          },
          contractId:record.id,
          visible:true
        })
      }
    })
  }
  //是否绑定产品
  isBindProduct(id,callback) {
    Req.isBindProductApi(id)
    .then((res) => {
      const { code, msg, data } = res;
      if(code !=200 ) {
        Toast.error(msg);
        return;
      }
      'function' == typeof callback && callback(data.result);
    })
  }
  //查询绑定产品列表
  seachBindProductList(id,actionStatus) {
    Req.seachBindTemplateApi(id)
    .then((res) => {
      const { data, code, msg} =res;
      if( code !=200 || !data) {
        Toast.error(msg);
        return;
      }
      let productList = data.templateProductList.map((ele,index) => ({
        value:ele.id,
        label:ele.productName
      }));
      this.setState({
        templateObj:{
          actionStatus,
          isBind:true,
          productList
        },
        contractId:id,
        visible:true
      })
    })
  }
  //提交启用，停用，删除
  submitOperate(actionStatus) {
    let params = {
      id:this.state.contractId,
      status:actionStatus
    }
    Req.handleTemplateApi(params)
    .then((res) => {
      const { code, msg} =res;
      if(code !=200 ) {
        Req.tipError(msg);
        return;
      }
      if(actionStatus == 1) {
        Req.tipSuccess("启用成功");
      } else if(actionStatus == 2) {
        Req.tipSuccess("停用成功");
      } else if(actionStatus == 999) {
        Req.tipSuccess("删除成功");
      }
      this.props.actions.search();
      this.setState({
        visible:false
      })
    },(error) => {

    })
  }
  onCancel() {
    this.setState({
      visible:false
    })
  }
  render() {
    const { pageData, columns, isFetching } = this.props;
    const { templateObj, visible, productList } =this.state;
    return(
      <IceContainer className="pch-container contract-template-page">
          <Title title="合同管理" />
          <FilterForm onSubmit={this.fetchData} />
          <PchTable isLoading={isFetching} dataSource={pageData.list} columns={columns} onOperateClick={this.handleOperateClick.bind(this)} />
          <PchPagination dataSource={pageData} onChange={this.changePage} />
          <DialogModule
            templateObj={templateObj}
            visible={visible}
            onCancel={this.onCancel.bind(this)}
            submit={this.submitOperate.bind(this)}/>
      </IceContainer>
    )
  }
}

export default ContractList;
