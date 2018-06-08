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
      visible:false,//作废
      elecVisbile:false,//改电子
      signVisible:false,//签字
      fileList:[],//已保存文件列表
      contractId:''
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
            this.cancelDialog(record.id);
            break;
        }
        case this.OPERATE_TYPE.SIGN: {
            this.signDialog(record.id)
            break;
        }
        case this.OPERATE_TYPE.CHANGE: {
            this.elecDialog(record)
            break;
        }
        case this.OPERATE_TYPE.DOWNLOAD: {
            this.downloadEvent(record)
            break;
        }
    }
  }
  //下载
  downloadEvent(record) {
    hashHistory.push(`contractfile/downList/${record.id}/?type=${record.type}`);
  }
  //作废
  cancelDialog(id) {
    this.setState({
      visible:true,
      signVisible:false,
      contractId:id
    })
  }
  //签字
  signDialog(id) {
    Req.searchFilesApi(id)
    .then((res) => {
      const { data, code, msg } =res;
      if( code != 200 || !data) {
        Toast.error(msg);
        return
      }
      let fileList = data.files.map((el) => {
        return {
          fileName:el.fileName,
          imgURL: el.location,
          fileURL: el.location,
          type:el.type
        }
      })
      this.setState({
        signVisible:true,
        visible:false,
        elecVisbile:false,
        contractId:id,
        fileList
      })
    })
  }
  //改电子
  elecDialog(record) {
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
      if( code != 200 ) {
        Toast.error(msg);
        return
      }
      Toast.success("更改成功");
      this.props.actions.search()
      this.setState({
        elecVisbile:false
      })
    })
  }
  //作废api
  submitCancel(values) {
    let params = Object.assign(values, { action:'INVALID',contractId:this.state.contractId });
    Req.handleContractApi(params)
    .then((res) => {
      const { code,msg, } =res;
      if(code != 200 ) {
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
  //保存签字
  saveSign(files) {
    let params = Object.assign({files}, {contractId:this.state.contractId });
    Req.saveFilesApi(params)
    .then((res) => {
      const { code, msg } =res;
      if ( code != 200 ) {
        Toast.error(msg);
        return;
      }
      Toast.success("保存成功");
      this.props.actions.search()
      this.setState({
        signVisible:false
      })
    })
  }
  //提交签字
  submitSign(files) {
    let params = Object.assign({files}, {contractId:this.state.contractId });
    Req.signContractApi(params)
    .then((res) => {
      const { code, msg } =res;
      if ( code != 200 ) {
        Toast.error(msg);
        return;
      }
      Toast.success("上传成功");
      this.props.actions.search()
      this.setState({
        signVisible:false
      })
    })
  }
  //关闭弹框
  onCancel(type) {
    if(type == 'cancel') {
      this.setState({
        visible:false
      })
    } else if(type == 'elec') {
      this.setState({
        elecVisbile:false
      })
    } else if(type == 'sign'){
      this.setState({
        signVisible:false
      })
    }
  }
  render() {
    const { pageData, columns, isFetching } = this.props;
    const {
      visible,
      signVisible,
      fileList,
      elecVisbile
     } =this.state;

    return(
      <IceContainer className="pch-container">
          <Title title="合同归档" />
          <FilterForm onSubmit={this.fetchData} />
          <PchTable isLoading={isFetching} dataSource={pageData.list} columns={columns} onOperateClick={this.handleOperateClick.bind(this)} />
          <PchPagination dataSource={pageData} onChange={this.changePage} />
          <DialogModule
            visible={visible}
            onCancel={()=>this.onCancel('cancel')}
            submit={this.submitCancel.bind(this)}/>
          <SignDialogModule
            fileList={fileList}
            visible={signVisible}
            onClose={()=>this.onCancel('sign')}
            save = {this.saveSign.bind(this)}
            submit={this.submitSign.bind(this)}/>
          <PchDialog
            title={'改为电子后，客户可在面签时采用电子签名？'}
            submitText="确认"
            cancelText="取消"
            visible={elecVisbile}
            onCancel={()=>this.onCancel('elec')}
            onOk={this.submitChangelec.bind(this)}/>
      </IceContainer>
    )
  }
}

export default ContractList;
