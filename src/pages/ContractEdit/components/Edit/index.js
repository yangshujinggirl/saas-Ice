import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { BaseApp } from 'base'
import { Title, PchTable, PchPagination } from 'components';

class AddEit extends BaseApp {
  fetchData() {

  }
  handleOperateClick() {

  }
  changePage() {

  }
  render() {
    const { columns } = this.props;
    return(
      <IceContainer className="pch-container">
          <Title title="合同新增" />
          <div>合同新增内容请在这里填写</div>
      </IceContainer>
    )
  }
}

export default AddEit;
