import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Dialog, Button, Feedback } from "@icedesign/base";
import { hashHistory } from 'react-router';
import { BaseApp } from 'base'
import { Title, PchTable, PchPagination, PchDialog } from 'components';
import FilterForm from './Filter';
import DialogModule from './DialogModule';
import Req from '../../reqs/ContractEditReq';

const Toast = Feedback.toast;

class ContractList extends BaseApp {
  constructor(props) {
    super(props);
    this.state = {
      visible:false,
      paperVisbile:false,
      contractId:'',
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
        case this.OPERATE_TYPE.EDIT: {
            hashHistory.push(`contractedit/edit/${record.id}`)
            break;
        }
        case this.OPERATE_TYPE.CANCEL: {
            this.cancelDialog(this.OPERATE_TYPE.CANCEL,record);
            break;
        }
        case this.OPERATE_TYPE.CHANGE: {
            this.toPaperDialog(record)
            break;
        }
    }
  }
  //取消，退回
  cancelDialog(type,record) {
    this.setState({
      visible:true,
      paperVisbile:false,
      contractId:record.id
    })
  }
  //改纸质弹框
  toPaperDialog(record) {
    this.setState({
      visible:false,
      paperVisbile:true,
      contractId:record.id
    })
  }
  //改纸质，Api
  submitChangePaper() {
    const { contractId } = this.state;
    Req.toggleContractApi(contractId)
    .then((res) => {
      const { code, msg } = res;
      if( code != 200 ) {
        Toast.error(msg);
        return
      }
      Toast.success("更改成功");
      this.props.actions.search()
      this.setState({
        paperVisbile:false
      })
    })
  }
  //提交取消api
  submitOperate(values) {
    let params = Object.assign(values,{action:'CANCEL',contractId:this.state.contractId});
    Req.handleContractApi(params)
    .then((res) => {
      const { code, msg} =res;
      if(code != 200 ) {
        Toast.error(msg);
        return
      }
      Toast.success("取消成功");
      this.props.actions.search()
      this.setState({
        visible:false
      })
    },error => {
      Toast.error(error);
    })
  }
  onCancel() {
    this.setState({
      paperVisbile:false
    })
  }
  render() {
    const { columns } = this.props;
    const { visible, paperVisbile } =this.state;
    const { list=[] } = this.props.pageData;
    return(
      <IceContainer className="pch-container">
          <Title title="合同编辑" />
          <FilterForm onSubmit={this.fetchData} />
          <PchTable dataSource={list} columns={columns} onOperateClick={this.handleOperateClick.bind(this)} />
        <PchPagination dataSource={this.props.pageData} onChange={this.changePage} />
          <DialogModule
            visible={visible}
            submit={this.submitOperate.bind(this)}/>
          <PchDialog
            title={'改为纸质后，将不再支持电子签名，您确定要改为纸质吗'}
            submitText="确认"
            cancelText="取消"
            onCancel={()=>this.onCancel()}
            visible={paperVisbile}
            onOk={this.submitChangePaper.bind(this)}/>
      </IceContainer>
    )
  }
}

export default ContractList;
