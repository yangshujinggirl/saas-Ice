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
      dialogTitle:''
    }
  }
  componentWillMount() {
    this.props.actions.search()
  }
  //表单操作
  handleOperateClick(record, type) {
    switch (type) {
        case this.OPERATE_TYPE.CHANGE: {
            hashHistory.push(`contract/detail/${record.id}`)
            break;
        }
        case this.OPERATE_TYPE.VIEW: {
            hashHistory.push(`contract/detail/${record.id}`)
            break;
        }
        case this.OPERATE_TYPE.SWITCH: {
            this.dialogEvent(this.OPERATE_TYPE.SWITCH)
            break;
        }
        case this.OPERATE_TYPE.REMOVE: {
            this.dialogEvent(this.OPERATE_TYPE.REMOVE)
            break;
        }
        case this.OPERATE_TYPE.BIND: {
          hashHistory.push(`contract/bind/${record.id}`)
          break;
        }
    }
  }
  dialogEvent(type) {
    let dialogTitle;
    if(type == this.OPERATE_TYPE.SWITCH) {
      dialogTitle = '该模板已绑定以下产品，启用后均能生效，您确定要启用吗'
    } else if (type == this.OPERATE_TYPE.REMOVE) {
      dialogTitle = '该模板目前已被以下产品绑定，您确定删除吗？';
    }
    this.setState({
      visible:true,
      dialogTitle
    })
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
    const { dialogTitle, visible } =this.state;
    // const { list=[] } = this.props.pageData;
    const list = [
      {
        'code':'1001',
        'name':'信用卡专向分期业务资料册',
        'agencyType':'自定义',
        'status':'0',
        'id':'2001'
      },
      {
        'code':'1002',
        'name':'信用卡专向分期业务资料册',
        'agencyType':'自定义模板',
        'status':'0',
        'id':'2002'
      },
      {
        'code':'1003',
        'name':'信用卡专向分期业务资料册',
        'agencyType':'固定模板',
        'status':'1',
        'id':'2003'
      }
    ]
    return(
      <IceContainer className="pch-container">
          <Title title="合同管理" />
          <FilterForm onSubmit={this.fetchData} />
          <PchTable dataSource={list} columns={columns} onOperateClick={this.handleOperateClick.bind(this)} />
          <PchPagination dataSource={list} onChange={this.changePage} />
          <DialogModule
            dialogTitle={dialogTitle}
            visible={visible}
            submit={this.submit}/>
      </IceContainer>
    )
  }
}

export default ContractList;
