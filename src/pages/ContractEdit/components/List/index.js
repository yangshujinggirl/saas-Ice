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
            this.editDialogEvent(record.id);
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
  //编辑
  editDialogEvent(id) {
    // id = '88';//编辑中id
    Req.goEditContractApi(id)
    .then((res) => {
      const { code, data, msg } = res;
      if( code !== 200) {
        if(code == 1000001) {
          Toast.error('该合同正在编辑中，请稍后再试');
        } else {
          Toast.error(msg);
        }
        return;
      }
      let path = {
          pathname: `contractedit/edit/${id}`,
          state: data
      }
      hashHistory.push(path)
    },error => {
      Toast.error(error.msg);
    })
  }
  //取消，退回
  cancelDialog(type,record) {
    this.setState({
      visible:true,
      dialogObj:{
        status:'CANCEL',
        contractId:record.id
      }
    })
  }
  //改纸质弹框
  toPaperDialog(record) {
    Dialog.confirm({
      title:'温馨提示',
      content: "改为纸质后，将不再支持电子签名，您确定要改为纸质吗",
      locale: {
        ok: "确认",
        cancel: "取消",
      },
      onOk:()=>{
        this.toggleContract('paper',record.id)
      }
    });
  }
  //改纸质，改电子Api
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

  //提交取消api
  submitOperate(params) {
    Req.handleContractApi(params)
    .then((res) => {
      const { code,msg } =res;
      if(code != 200) {
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
            submit={this.submitOperate.bind(this)}/>
      </IceContainer>
    )
  }
}

export default ContractList;
