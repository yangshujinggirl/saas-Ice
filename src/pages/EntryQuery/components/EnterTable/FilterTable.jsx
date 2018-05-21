/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { Table, Pagination } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';
import FilterForm from './Filter';
import {browserHistory, hashHistory} from 'react-router';
import { Title, PchTable, PchPagination } from 'components';
import  { BaseApp } from 'base'

export default class EnhanceTable extends BaseApp {
  static displayName = 'EnhanceTable';

  static defaultProps = {};

  constructor(props) {
    super(props);

    // 请求参数缓存
    this.queryCache = {};
    this.state = {
      filterFormValue: {},
      list: [],
      total: 100,
      pageSize: 10,
      currentPage: 1,
      statusList:[
        {key:'DRAFT',value:'待提交'},
        {key:'RETURNED',value:'退回'},
        {key:'SUBMIT',value:'提交'},
        // {key:'CREDIT',value:'征信'},
        {key:'AUDIT',value:'审查审批'},
        {key:'MAKEUP',value:'补录'},
        {key:'REJECTED',value:'审批拒绝'},
        {key:'INTERVIEW',value:'面签'},
        {key:'LENDING_APPLY',value:'出账申请'},
        {key:'LENDING_AUDIT',value:'出账审核'},
        {key:'LENDING',value:'已放款'}
      ]
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = (condition) => {
    console.log(condition)
    this.props.actions.search(condition);
  }


  renderStatus = (value) => {
    return (
      <IceLabel inverse={false} status="default">
        {value}
      </IceLabel>
    );
  };
  //点击分页
  changePage = (currentPage) => {
    this.props.actions.search({
      page: currentPage
    });
  }

  filterFormChange = (value) => {
    this.setState({
      filterFormValue: value,
    });
  };


  /**
   * 处理行列表中操作栏的点击事件
   * @param data 传递给对应事件的行记录数据，okey一般为当前记录的主键
   * @param type 操作类型，根据不同类型处理不同事件
   */
  handleOperateClick(data, type) {
    switch (type) {
      //详情
      case this.OPERATE_TYPE.VIEW: {
        hashHistory.push('/entryQuery/detail/'+data.id);
        break;
      }
      // 修改
      case this.OPERATE_TYPE.EDIT: {
        if(data.status == 'DRAFT' ||  data.status == 'RETURNED' ){
          hashHistory.push('/entryQuery/loanapplicationOne/'+data.id);
        }
        if(data.status == 'MAKEUP'){
          hashHistory.push('/entryQuery/loanapplicationOne/'+data.id);
        }
        break;
      }
    }
  }

  render() {
    // const tableData = this.props.bindingData.tableData;
    const tableData = this.props.pageData || {};
    const {pageData ={}, columns} = this.props;
    const { filterFormValue } = this.state;

    return (
      <IceContainer className="pch-container">
        <Title title="车贷查询"/>
        <FilterForm onSubmit={this.fetchData} />
          {/*<Table*/}
            {/*dataSource={tableData.list}*/}
            {/*isLoading={this.props.isFetching}*/}
            {/*className="basic-table"*/}
            {/*hasBorder={false}*/}
          {/*>*/}
            {/*<Table.Column*/}
              {/*title="贷款编号"*/}
              {/*width={200}*/}
              {/*align={'left'}*/}
              {/*dataIndex="code"*/}
            {/*/>*/}
            {/*<Table.Column*/}
              {/*title="贷款状态"*/}
              {/*width={150}*/}
              {/*align={'left'}*/}
              {/*cell={this.renderStatus}*/}
            {/*/>*/}
            {/*<Table.Column title="主贷人姓名" dataIndex="borrowerName" width={150}  align={'left'}/>*/}
            {/*<Table.Column*/}
              {/*title="证件号码"*/}
              {/*dataIndex="borrowerIdNo"*/}
              {/*width={150}*/}
              {/*align={'left'}*/}
            {/*/>*/}

            {/*<Table.Column*/}
              {/*title="手机号"*/}
              {/*dataIndex="borrowerMobile"*/}
              {/*width={150}*/}
              {/*align={'left'}*/}
            {/*/>*/}
            {/*<Table.Column*/}
              {/*title="申请金额"*/}
              {/*dataIndex="principalAmount"*/}
              {/*width={150}*/}
              {/*align={'left'}*/}
            {/*/>*/}
            {/*<Table.Column*/}
              {/*title="贷款产品"*/}
              {/*dataIndex="productName"*/}
              {/*width={150}*/}
              {/*align={'left'}*/}
            {/*/>*/}
            {/*<Table.Column*/}
              {/*title="展厅名称"*/}
              {/*dataIndex=""*/}
              {/*width={150}*/}
              {/*align={'left'}*/}
            {/*/>*/}
            {/*<Table.Column*/}
              {/*title="申请时间"*/}
              {/*dataIndex="createdAt"*/}
              {/*width={150}*/}
              {/*align={'left'}*/}
            {/*/>*/}
            {/*<Table.Column*/}
              {/*lock="right"*/}
              {/*title="操作"*/}
              {/*dataIndex="operation"*/}
              {/*width={150}*/}
              {/*cell={this.renderOperations}*/}
              {/*align={'center'}*/}
            {/*/>*/}
          {/*</Table>*/}
          <PchTable dataSource={pageData.list} columns={columns} onOperateClick={this.handleOperateClick.bind(this)} />
          <PchPagination dataSource={pageData} onChange={this.changePage} />
        </IceContainer>
    );
  }
}
