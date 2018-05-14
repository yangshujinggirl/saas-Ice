import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Dialog, Button, Feedback } from "@icedesign/base";
import { hashHistory } from 'react-router';
import { BaseApp } from 'base'
import { Title, PchTable, PchPagination, PchDialog } from 'components';
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
      elecVisbile:false,
      contractId:'',
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
            this.signDialogEvent(record.id)
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
      contractId:id
    })
  }
  //签字
  signDialogEvent(id) {
    this.setState({
      signVisible:true,
      visible:false,
      contractId:id
    })
  }
  //改纸质
  changeDialog(record) {
    this.setState({
      elecVisbile:true,
      visible:false,
      signVisible:false,
      contractId:record.id
    })
  }
  //改电子Api
  submitChangelec() {
    const { contractId } = this.state;
    Req.toggleContractApi(contractId)
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
  submitCancel(values) {
    let params = Object.assign(values, { action:'INVALID',contractId:this.state.contractId });
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
  submitSign(files) {
    let params = Object.assign({files}, {contractId:this.state.contractId });
    Req.signContractApi(params)
    .then((res) => {
      const { code, msg } =res;
      if ( code != 200) {
        Toast.error(msg);
        return;
      }
      Toast.success("上传成功");
      this.setState({
        signVisible:false
      })
    })
  }
  render() {
    const { columns } = this.props;
    const { list=[] } =this.props.pageData;
    const { visible, signVisible, elecVisbile, contractId } =this.state;

    return(
      <IceContainer className="pch-container">
          <Title title="合同编辑" />
          <FilterForm onSubmit={this.fetchData} />
          <PchTable dataSource={list} columns={columns} onOperateClick={this.handleOperateClick.bind(this)} />
          <PchPagination dataSource={this.props.pageData} onChange={this.changePage} />
          <DialogModule
            visible={visible}
            submit={this.submitCancel.bind(this)}/>
          <SignDialogModule
            visible={signVisible}
            submit={this.submitSign.bind(this)}/>
          <PchDialog
            title={'改为纸质后，将不再支持电子签名，您确定要改为纸质吗'}
            visible={elecVisbile}
            onOk={this.submitChangelec.bind(this)}/>
      </IceContainer>
    )
  }
}

export default ContractList;
