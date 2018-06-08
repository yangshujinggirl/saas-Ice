import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { BaseApp } from 'base'
import { Title, PchTable, PchPagination } from 'components';
import FilterForm from '../../components/Filter';
import Req from '../../reqs/CreditInformationReq';
import  './CreditInformation.scss'

export default class CreditInformation extends BaseApp {
    constructor(props) {
        super(props);
    }

    /**
     * 初始化
     */
    componentDidMount() {
        this.fetchData();
    }

    fetchData = (condition) => {
        this._condition = Object.assign(this._condition, condition);
        console.log(this._condition)
        this.props.actions.search(this._condition);
    }

    /**
     * 点击分页
     */
    changePage = (currentPage) => {
        this._condition.page = currentPage;
        this.props.actions.search(this._condition);
    }
    //点击签收
    signIN = (loanId)=>{
      Req.signIn({
        loanId: loanId
      }).then((res)=>{
          this.fetchData();
      }).catch((error)=>{

      });

    }

    /**
     * 处理行列表中操作栏的点击事件
     * @param data 传递给对应事件的行记录数据，okey一般为当前记录的主键
     * @param type 操作类型，根据不同类型处理不同事件
     */
    handleOperateClick(data, type) {
        switch (type) {
            // 详情
            case this.OPERATE_TYPE.VIEW: {
                hashHistory.push(`creditinformation/detail/${data.loanId}/${data.taskId}/${data.proInstId}`)
                break;
            }
            // 签收
            case this.OPERATE_TYPE.OTHER1: {
              this.signIN(data.loanId);
              break;
            }
            // 征信录入
            case this.OPERATE_TYPE.OTHER2: {
              hashHistory.push(`creditinformation/add/${data.loanId}/${data.taskId}/${data.proInstId}`)
              break;
            }
        }
    }
    /**
     * 渲染
     */
    render() {
        const {pageData, columns, isFetching} = this.props;
        return (
            <IceContainer className="pch-container">
                <Title title="查询" />
                <FilterForm onSubmit={this.fetchData} />
                <PchTable isLoading={isFetching} dataSource={pageData.list} columns={columns} onOperateClick={this.handleOperateClick.bind(this)} />
                <PchPagination dataSource={pageData} onChange={this.changePage} />
            </IceContainer>
        )
    }
}
