import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { BaseApp } from 'base'
import { Title, PchTable, PchPagination } from 'components';
import './index.scss';
import '../../../../base/scss/tableEdtor.scss';

class Detail extends BaseApp {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.actions.getDetail(this.props.params.id);
  }
  fetchData() {
    this.props.actions.getDetail();
  }
  render() {
    let { templateContent,templateName } = this.props.pageData;
    return(
      <IceContainer className="pch-container contract-template-detail-page">
          <Title title="模板详情" />
          {/* <div className="template-title">{templateName}</div> */}
          <div className="template-detail-content wang-edtor-table-styles">
            <div dangerouslySetInnerHTML={{
              __html:templateContent
            }} />
          </div>
      </IceContainer>
    )
  }
}

export default Detail;
