import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button } from "@icedesign/base";
import { hashHistory } from 'react-router';
import { BaseApp } from 'base';
import Req from '../../reqs/ContractFileReq';
import { Title, PchTable, PchPagination } from 'components';
import './index.scss';

const testData= {
      "contractContent": "ZGRk",
      "contractExtendSource": ['第一条','第二条'],
      "contractNo": "001"
      }

class Detail extends BaseApp {
  constructor(props) {
    super(props);
    this.state = {
      lastDisabled:true,
      nextDisabled:false
    }
  }
  componentWillMount() {
    this.props.actions.getDetail(this.props.params.id)
  }

  //上一份
  lastContract() {

  }

  //下一份
  firstContract() {

  }
  //返回
  returnBack() {

  }
  //打印
  printContract() {

  }
  render() {
    // const { contractContent } = this.props.formData;
    const contractContent = testData.contractExtendSource[0];
    const { lastDisabled ,nextDisabled } = this.state;

    return(
      <IceContainer className="pch-container contract-file-pages">
          <Title title="合同归档详情" />
          <div>
            <div dangerouslySetInnerHTML={{
              __html:contractContent
            }} />
          </div>
          <div className="handle-btn-list-wrap">
            <Button
              type="secondary"
              disabled={lastDisabled}
              onClick={this.lastContract.bind(this)}>
                上一份
             </Button>
            <Button
              type="secondary"
              disabled={nextDisabled}
              onClick={this.firstContract}>
                下一份
             </Button>
            <Button
              type="secondary"
              onClick={this.returnBack}>
                返回
             </Button>
            <Button
              type="secondary"
              onClick={this.printContract}>
                打印
             </Button>
          </div>
      </IceContainer>
    )
  }
}

export default Detail;
