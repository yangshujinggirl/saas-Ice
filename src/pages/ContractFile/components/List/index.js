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
            this.cancelDialogEvent(record.id);
            break;
        }
        case this.OPERATE_TYPE.SIGN: {
            this.signDialogEvent()
            break;
        }
        case this.OPERATE_TYPE.CHANGE: {
            this.changeDialog(record)
            break;
        }
    }
  }
  //作废
  cancelDialogEvent(id) {
    this.setState({
      visible:true,
      signVisible:false,
      dialogObj:{
        contractId:id
      }
    })
  }
  //签字
  signDialogEvent() {
    this.setState({
      signVisible:true,
      visible:false
    })
  }
  //改纸质
  changeDialog(record) {
    Dialog.confirm({
      title:'温馨提示',
      content: "改为电子后，客户可在面签时采用电子签名？",
      locale: {
        ok: "确认",
        cancel: "取消",
      },
      onOk:()=>{
        this.toggleContract('electronic',record.id)
      }
    });
  }
  //改电子Api
  toggleContract(to,contractId) {
    Req.toggleContractApi(to,contractId)
    .then((res) => {
      const { code, msg } = res;
      if( code != 200) {
        Toast.error(msg);
        return
      }
      Toast.success("更改成功");
    })
  }
  //提提交作废api
  submitCancel(params) {
    Req.handleContractApi(params)
    .then((res) => {
      const { code,msg } =res;
      if(code != 200) {
        Toast.error(msg);
        return
      }
      Toast.success("作废成功");
      this.props.actions.search()
      this.setState({
        visible:false
      })
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
            submit={this.submitCancel.bind(this)}/>
          <SignDialogModule
            visible={signVisible}
            submit={this.submitSign}/>
      </IceContainer>
    )
  }
}

export default ContractList;
