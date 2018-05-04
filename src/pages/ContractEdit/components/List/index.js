import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Dialog, Button } from "@icedesign/base";
import { hashHistory } from 'react-router';
import { BaseApp } from 'base'
import { Title, PchTable, PchPagination } from 'components';
import FilterForm from './Filter';
import DialogModule from './DialogModule';


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
            this.dialogEvent(this.OPERATE_TYPE.CANCEL);
            break;
        }
        case this.OPERATE_TYPE.RETURN: {
            this.dialogEvent(this.OPERATE_TYPE.RETURN)
            break;
        }
        case this.OPERATE_TYPE.CHANGE: {
            this.changeDialog(record.id)
            break;
        }
    }
  }
  //取消，退回
  dialogEvent(type) {
    let dialogObj={};
    if(type == this.OPERATE_TYPE.CANCEL) {
      dialogObj = {
        labelOne:'请选择取消原因',
        dataSource:['1','2','3'],
        labelTwo:'请输入(200字符)'
      }
    } else if(type == this.OPERATE_TYPE.RETURN) {
      dialogObj = {
        labelOne:'请选退回步骤',
        dataSource:['第1步','第2步','第3步'],
        labelTwo:'请输入退回原因'
      }
    }
    this.setState({
      visible:true,
      dialogObj
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
  submit() {
    alert('11111111')
  }
  render() {
    const { columns } = this.props;
    const { dialogObj, visible } =this.state;
    // const { list=[] } =this.props.pageData;
    const list = [
      {
        'loanNo':'1001',
        'contractNo':'1001',
        'name':'邓超',
        'documentCode':'自定义',
        'capital':'大众',
        'id':'10023'
      },
    ]

    return(
      <IceContainer className="pch-container">
          <Title title="合同编辑" />
          <FilterForm onSubmit={this.fetchData} />
          <PchTable dataSource={list} columns={columns} onOperateClick={this.handleOperateClick.bind(this)} />
          <PchPagination dataSource={[]} onChange={this.changePage} />
          <DialogModule
            dialogObj={dialogObj}
            visible={visible}
            submit={this.submit}/>
      </IceContainer>
    )
  }
}

export default ContractList;
