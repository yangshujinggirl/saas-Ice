import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { BaseApp } from 'base';
import { Title, PchTable, PchPagination } from 'components';
import FilterForm from './Filter';

import './InterView.scss';

export default class InterView extends BaseApp {
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
    console.log(this.props);
    this.props.actions.search(condition);
  };
  //点击分页
  changePage = (currentPage) => {
    this.props.actions.search({
      page: currentPage,
    });
  };

  /**
   * 处理行列表中操作栏的点击事件
   * @param data 传递给对应事件的行记录数据，okey一般为当前记录的主键
   * @param type 操作类型，根据不同类型处理不同事件
   */
  handleOperateClick(data, type) {
    console.log(data)
    switch (type) {
      //pbcContract, 中国银行合同;
      case this.OPERATE_TYPE.OTHER1: {
        hashHistory.push(`interview/detail/${data.type}/${data.id}`);
        break;
      }
      //pinganContract, 平安银行合同
      case this.OPERATE_TYPE.OTHER2: {
        hashHistory.push(`interview/detail/${data.type}/${data.id}`);
        break;
      }
      //;interviewOnly, 贷款仅面签;creditCard,信用卡仅面签
      case this.OPERATE_TYPE.OTHER3: {
        hashHistory.push(`interview/detail/${data.type}/${data.id}`);
        break;
      }
      //loan, 进件合同;
      case this.OPERATE_TYPE.OTHER4: {
        hashHistory.push(`interview/detail/${data.type}/${data.id}`);
        break;
      }
      //cwloan,车王进件
      case this.OPERATE_TYPE.OTHER5: {

        break;
      }




      case this.OPERATE_TYPE.SEE: {
        hashHistory.push(`interview/see/${data.id}`);
        break;
      }
      case this.OPERATE_TYPE.UPLOAD: {
        hashHistory.push(`interview/upload/${data.id}`);
        break;
      }
      case this.OPERATE_TYPE.SIGN: {
        hashHistory.push(`interview/sign/${data.id}`);
        break;
      }
    }
  }

  /**
   * 渲染
   */
  render() {
    const { pageData, columns } = this.props;
    return (
      <IceContainer className="pch-container">
        <Title title="面签列表"/>
        <FilterForm onSubmit={this.fetchData}/>
        <PchTable dataSource={pageData.list} columns={columns} onOperateClick={this.handleOperateClick.bind(this)}/>
        <PchPagination dataSource={pageData} onChange={this.changePage}/>
      </IceContainer>
    );
  }
}
