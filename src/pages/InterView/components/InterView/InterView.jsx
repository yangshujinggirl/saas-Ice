import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { BaseApp } from 'base';
import { Title, PchTable, PchPagination } from 'components';
import FilterForm from './Filter';

import './InterView.scss';

import Req from '../../reqs/InterViewReq';
import { Feedback } from '@icedesign/base/index';

const Toast = Feedback.toast;
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
    console.log(data);
    switch (type) {
      //类型 加id的路由形式;
      case this.OPERATE_TYPE.OTHER1: {
        if(data.type == 'loan'){
          hashHistory.push(`interview/detail/${data.type}/${data.loanId}`);
        }else{
          hashHistory.push(`interview/detail/${data.type}/${data.id}`);
        }
        break;
      }
      //下载视频
      case this.OPERATE_TYPE.OTHER2: {
        const w = window.open('about:blank');
        w.location.href = data.videoDownloadUrl;
        break;
      }
      //查看报告
      case this.OPERATE_TYPE.DOWN: {

        break;
      }
      //上传报告
      case this.OPERATE_TYPE.UP: {

        break;
      }
      case this.OPERATE_TYPE.SIGN: {
        Req.getViewReport(data.id)
          .then(res => {
            if (res && res.code == 200 && res.data && res.data.result == 'success') {
              const w = window.open('about:blank');
              w.location.href = res.data.url;
            }else{
              Toast.show({
                type: 'error',
                content: res.data.msg,
              });
            }
          });
        break;
      }
    }
  }

  /**
   * 渲染
   */
  render() {
    const { pageData, columns, isFetching } = this.props;
    return (
      <IceContainer className="pch-container">
        <Title title="面签列表"/>
        <FilterForm onSubmit={this.fetchData}/>
        <PchTable isLoading={isFetching} dataSource={pageData.list} columns={columns} onOperateClick={this.handleOperateClick.bind(this)}/>
        <PchPagination dataSource={pageData} onChange={this.changePage}/>
      </IceContainer>
    );
  }
}
