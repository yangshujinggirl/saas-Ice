import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { BaseApp } from 'base'
import { Title, PchTable, PchPagination } from 'components';
import './index.scss';

class Detail extends BaseApp {
  fetchData() {

  }
  render() {
    const { columns } = this.props;
    const dataDemo = `
    <p style="text-align:left;"><span style="color: rgb(102,102,102);font-size: 14px;font-family: tahoma, 微软雅黑;">贷款方：________________</span></p>
    <p style="text-align:left;"><span style="color: rgb(102,102,102);font-size: 14px;font-family: tahoma, 微软雅黑;">地址：________________</span></p>
    <p style="text-align:left;"><span style="color: rgb(102,102,102);font-size: 14px;font-family: tahoma, 微软雅黑;">邮编：——————电话：_______________借款方：银行账号：______________________________</span></p>
    <p style="text-align:left;"><span style="color: rgb(102,102,102);font-size: 14px;font-family: tahoma, 微软雅黑;">地址：______________________________</span></p>
    <p style="text-align:left;"><span style="color: rgb(102,102,102);font-size: 14px;font-family: tahoma, 微软雅黑;">邮编：______________电话：______________________</span></p>
    <p style="text-align:left;"><span style="color: rgb(102,102,102);font-size: 14px;font-family: tahoma, 微软雅黑;">根据《中华人民共和国合同法》的规定，经贷款方、借款方、担保方协商一致，签订本合同，共同信守。</span></p>
    <p style="text-align:left;"><span style="color: rgb(102,102,102);font-size: 14px;font-family: tahoma, 微软雅黑;">第一条贷款种类：____________________________________</span></p>
    <p style="text-align:left;"><span style="color: rgb(102,102,102);font-size: 14px;font-family: tahoma, 微软雅黑;">第二条借款金额(大写)：_____________________________________</span></p>
    <p style="text-align:left;"><span style="color: rgb(102,102,102);font-size: 14px;font-family: tahoma, 微软雅黑;">第三条借款用途：________________________________________</span></p>
    <p style="text-align:left;"><span style="color: rgb(102,102,102);font-size: 14px;font-family: tahoma, 微软雅黑;">第四条借款利率：借款利率为月息__%，按月收息，利随本清。</span></p>
    <p style="text-align:left;"><span style="color: rgb(102,102,102);font-size: 14px;font-family: tahoma, 微软雅黑;">第五条借款期限：</span></p>
    `
    return(
      <IceContainer className="pch-container">
          <Title title="模板详情" />
          <div className="template-detail-page-content">
            <div dangerouslySetInnerHTML={{
              __html:dataDemo
            }} />
          </div>
      </IceContainer>
    )
  }
}

export default Detail;
