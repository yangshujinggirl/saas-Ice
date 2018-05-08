import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Dialog, Button, Feedback } from "@icedesign/base";
import { hashHistory } from 'react-router';
import { BaseApp } from 'base'
import { Title, PchTable, PchPagination } from 'components';
import FilterForm from './Filter';
import DialogModule from './DialogModule';
import Req from '../../reqs/ContractEditReq';

const Toast = Feedback.toast;

class ContractList extends BaseApp {
  constructor(props) {
    super(props);
    this.state = {
      visible:false,
      dialogObj:{}
    }
  }
  componentWillMount() {
    this.props.actions.search()
  }
  //表单操作
  handleOperateClick(record, type) {
    switch (type) {
        case this.OPERATE_TYPE.EDIT: {
            hashHistory.push(`contractedit/edit/${record.id}`)
            break;
        }
        case this.OPERATE_TYPE.CANCEL: {
            this.dialogEvent(this.OPERATE_TYPE.CANCEL,record);
            break;
        }
        case this.OPERATE_TYPE.RETURN: {
            this.dialogEvent(this.OPERATE_TYPE.RETURN,record)
            break;
        }
        case this.OPERATE_TYPE.CHANGE: {
            this.changeDialog(record.id)
            break;
        }
    }
  }
  //取消，退回
  dialogEvent(type,record) {
    let status,dataSource;
    if(type == this.OPERATE_TYPE.CANCEL) {
      status = 2;
      dataSource = ['1','2','3']
    } else if(type == this.OPERATE_TYPE.RETURN) {
      status = 3;
      dataSource = ['第1步','第2步','第3步']
    }
    this.setState({
      visible:true,
      dialogObj:{
        status:3,
        contractId:record.id,
        dataSource
      }
    })
  }
  //改纸质
  changeDialog(id) {
    Dialog.confirm({
      content: "改为纸质后，将不再支持电子签名，您确定要改为纸质吗",
      locale: {
        ok: "确认",
        cancel: "取消",
      },
      onOk:()=>{
        alert('调用确认删除接口')
      }
    });
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
  submitOperate(params) {
    Req.handleContractApi(params)
    .then((res) => {
      if(params.status == 2) {
        Toast.success("取消成功");
      } else if(params.status == 2) {
        Toast.success("退回成功");
      }
    },error => {
      Toast.error(error);
    })
  }
  render() {
    const { columns } = this.props;
    const { dialogObj, visible } =this.state;
    const { list=[] } = this.props.pageData;
    return(
      <IceContainer className="pch-container">
          <Title title="合同编辑" />
          <FilterForm onSubmit={this.fetchData} />
          <PchTable dataSource={list} columns={columns} onOperateClick={this.handleOperateClick.bind(this)} />
          <PchPagination dataSource={this.props.pageData} changePage={this.changePage} />
          <DialogModule
            dialogObj={dialogObj}
            visible={visible}
            submit={this.submitOperate}/>
      </IceContainer>
    )
  }
}

export default ContractList;
