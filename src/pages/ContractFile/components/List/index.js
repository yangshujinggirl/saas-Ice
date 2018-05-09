import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Dialog, Button, Feedback } from "@icedesign/base";
import { hashHistory } from 'react-router';
import { BaseApp } from 'base'
import { Title, PchTable, PchPagination } from 'components';
import FilterForm from './Filter';
import DialogModule from './DialogModule';
import SignDialogModule from './SignDialogModule';
import Req from '../../reqs/ContractFileReq';

const Toast = Feedback.toast;

class ContractList extends BaseApp {
  constructor(props) {
    super(props);
    this.state = {
      visible:false,
      dialogObj:{},
      signVisible:false
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
        case this.OPERATE_TYPE.VIEW: {
            hashHistory.push(`contractfile/detail/${record.id}`)
            break;
        }
        case this.OPERATE_TYPE.CANCEL: {
            this.cancelDialogEvent();
            break;
        }
        case this.OPERATE_TYPE.SIGN: {
            this.signDialogEvent()
            break;
        }
        case this.OPERATE_TYPE.CHANGE: {
            this.changeDialog(record.id)
            break;
        }
    }
  }
  cancelDialogEvent() {
    let dialogObj = {
      labelOne:'请选择作废原因',
      dataSource:['1','2','3'],
      labelTwo:'请输入(200字符)'
    }
    this.setState({
      visible:true,
      dialogObj,
      signVisible:false
    })
  }
  signDialogEvent() {
    this.setState({
      signVisible:true,
      visible:false
    })
  }
  changeDialog(id) {
    Dialog.confirm({
      content: "改为电子后，客户可在面签时采用电子签名？",
      locale: {
        ok: "确认",
        cancel: "取消",
      },
      onOk:()=>{
        this.toggleContract(record.id,'paper',record.id)
      }
    });
  }
  //改纸质，改电子Api
  toggleContract(id,to,contractId) {
    Req.toggleContractApi(id,to,contractId)
    .then((res) => {
      console.log(res)
    })
  }
  //提交作废
  submitCancel(params) {
    Req.cancelContractApi(params)
    .then((res) => {
      Toast.success("作废成功");
    },error => {
      Toast.error(error);
    })
  }
  //提交签字
  submitSign(params) {
    //签字api
  }
  render() {
    const { columns } = this.props;
    const { list=[] } =this.props.pageData;
    const { dialogObj, visible, signVisible } =this.state;

    return(
      <IceContainer className="pch-container">
          <Title title="合同编辑" />
          <FilterForm onSubmit={this.fetchData} />
          <PchTable dataSource={list} columns={columns} onOperateClick={this.handleOperateClick.bind(this)} />
          <PchPagination dataSource={this.props.pageData} onChange={this.changePage} />
          <DialogModule
            dialogObj={dialogObj}
            visible={visible}
            submit={this.submitCancel}/>
          <SignDialogModule
            visible={signVisible}
            submit={this.submitSign}/>
      </IceContainer>
    )
  }
}

export default ContractList;
