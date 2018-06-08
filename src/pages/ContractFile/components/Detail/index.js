import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button, Feedback } from "@icedesign/base";
import { hashHistory } from 'react-router';
import { BaseApp } from 'base';
import Req from '../../reqs/ContractFileReq';
import { Title, PchTable, PchPagination } from 'components';
import './index.scss';
import '../../../../base/scss/tableEdtor.scss';

const Toast = Feedback.toast;

class Detail extends BaseApp {
  constructor(props) {
    super(props);
    this.state = {
      lastDisabled:true,
      nextDisabled:true,
      templateData:[],
      isHasFile:true,
      contractContent:'',//html
      currentIndex:0,
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
    },error => {
      if( error.code == '1000063' ) {
        this.setState({
          isHasFile:false
        })
      }
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
    this.initHtml(templateData[this.state.currentIndex].contractContent);
  }


  //上一份
  lastContract() {
    let { currentIndex, templateData } =this.state;
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
    this.initHtml(templateData[currentIndex].contractContent);
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
    this.initHtml(templateData[currentIndex].contractContent);
  }
  //返回
  returnBack() {
    hashHistory.push(`contractfile`)
  }
  //打印
  printContract() {
    window.print()
  }
  initHtml(contractContent) {
    let regex = /_BLANK_([^]*?)_BLANK_/ig;

    contractContent = contractContent.replace(regex,(s,value)=> {
      let keyValues = value.split('_');
      keyValues[1] = keyValues[1] === 'null' ? '___' : keyValues[1];
      let val = keyValues[1];
      return `<span className="value-styles">${val}</span>`
    })

    this.setState({
      contractContent
    })

  }
  render() {
    const { templateData, currentIndex, contractContent, isHasFile } = this.state;
    const { lastDisabled ,nextDisabled } = this.state;

    return(
      <IceContainer className="pch-container contract-file-pages">
          <Title title="合同归档详情" />
          {
            isHasFile ?
            <div id="section-to-print" className="main-content wang-edtor-table-styles">
              <div dangerouslySetInnerHTML={{
                __html:contractContent
              }} />
            </div>
            :
            <div className="no-template">该合同没有文件</div>
          }
          {
            isHasFile ?
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
            :
            <div className="handle-btn-list-wrap">
              <Button
                type="secondary"
                onClick={this.returnBack}>
                  返回
               </Button>
            </div>
          }


      </IceContainer>
    )
  }
}

export default Detail;
