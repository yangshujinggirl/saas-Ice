import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  Button
} from '@icedesign/base';
import { hashHistory } from 'react-router';
import { BaseApp } from 'base'
import { Title, PchTable, PchPagination } from 'components';
import draftToHtml from 'draftjs-to-html';
import './index.scss';

class Preview extends BaseApp {
  constructor(props) {
    super(props);
  }
  render() {
    let { templateContent,templateName, onClick } = this.props;
    if(typeof templateContent != 'string') {
      templateContent = draftToHtml(templateContent);
    }
    return(
      <IceContainer className="pch-container contract-template-detail-page" style={{'display':this.props.display}}>
          <div className="template-title">{templateName}</div>
          <div className="template-detail-content wang-edtor-table-styles">
            <div dangerouslySetInnerHTML={{
              __html:templateContent
            }} />
          </div>
          <div className="btns-wrap">
            <Button
              type="secondary"
              size="large"
              onClick={()=>onClick(0)}>
              返回
            </Button>
          </div>
      </IceContainer>
    )
  }
}

export default Preview;
