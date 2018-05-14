import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button } from "@icedesign/base";
import { hashHistory } from 'react-router';
import { BaseApp } from 'base';
import Req from '../../reqs/ContractFileReq';
import { Title, PchTable, PchPagination } from 'components';
import './index.scss';


class Detail extends BaseApp {
  constructor(props) {
    super(props);
    this.state = {
      lastDisabled:true,
      nextDisabled:true,
      templateData:[],
      currentIndex:0
    }
  }
  componentWillMount() {
    this.getTemplateList(this.props.params.id)
  }
  getTemplateList(id) {
    Req.contractDetailApi(id)
    .then((res) => {
      const { data } =res;
      this.initPageStatus(data);
    })
  }
  initPageStatus(templateData) {
    let  lastDisabled, nextDisabled;
    if(templateData.length == 0) {
      return;
    }
    if (templateData.length>1) {
      lastDisabled = true;
      nextDisabled = false;
    } else if(templateData.length == 1){
      lastDisabled = true;
      nextDisabled = true;
    }
    this.setState({
      lastDisabled,
      nextDisabled,
      templateData
    })
  }


  //上一份
  lastContract() {
    let { currentIndex } =this.state;
    let lastDisabled;
    currentIndex--;
    if(currentIndex == 0) {
      lastDisabled = true;
    } else {
      lastDisabled = false;
    }
    this.setState({
      currentIndex,
      lastDisabled,
      nextDisabled:false
    })
  }
  //下一份
  firstContract() {
    let { currentIndex, templateData } =this.state;
    let  nextDisabled;
    currentIndex++;
    if(currentIndex == (templateData.length-1)) {
      nextDisabled = true;
    } else {
      nextDisabled = false;
    }
    this.setState({
      currentIndex,
      lastDisabled:false,
      nextDisabled
    })
  }
  //返回
  returnBack() {
    hashHistory.push(`contractfile`)
  }
  //打印
  printContract() {
    window.print()
  }
  render() {
    const { templateData, currentIndex } = this.state;
    const { lastDisabled ,nextDisabled } = this.state;
    const Module = () =>{
      if(templateData.length>0) {
        return templateData[currentIndex].content
      } else {
        return;
      }
    }
    return(
      <IceContainer className="pch-container contract-file-pages">
          <Title title="合同归档详情" />
          <div id="section-to-print">
            <div dangerouslySetInnerHTML={{
              __html:Module()
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
              onClick={this.firstContract.bind(this)}>
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
