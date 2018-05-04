import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Dialog, Button } from "@icedesign/base";
import { hashHistory } from 'react-router';
import { BaseApp } from 'base'
import { Title, PchTable, PchPagination } from 'components';
import FilterForm from './Filter';
import DialogModule from './DialogModule';
import SignDialogModule from './SignDialogModule';


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
  //表单操作
  handleOperateClick(record, type) {
    switch (type) {
        case this.OPERATE_TYPE.VIEW: {
            hashHistory.push(`contractfile/detail/${record.id}`)
            break;
        }
        case this.OPERATE_TYPE.CANCEL: {
            this.dialogEvent();
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
  dialogEvent() {
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
          cur_page: currentPage
      });
  }
  submitCancel() {
    alert('1111')
  }

  submitSign() {
    alert('2222')
  }
  render() {
    const { columns } = this.props;
    const { dialogObj, visible, signVisible } =this.state;
    const testList = [
            {
              'loanCode':'1001',
              'contractCode':'1001',
              'name':'邓超',
              'idType':'身份证',
              'identification':'333333',
              'contractType':'自定义',
              'status':'0',
              'id':'10023'
            },
          ]
    return(
      <IceContainer className="pch-container">
          <Title title="合同编辑" />
          <FilterForm onSubmit={this.fetchData} />
          <PchTable dataSource={testList} columns={columns} onOperateClick={this.handleOperateClick.bind(this)} />
          <PchPagination dataSource={[]} onChange={this.changePage} />
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
