import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { BaseApp } from 'base'
import { Title, PchTable, PchPagination } from 'components';
import './index.scss';

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
    const { columns } = this.props;
    let { templateContent,templateName } = this.props.pageData;
    templateContent = Base64.decode(templateContent);
    console.log(templateContent)
    return(
      <IceContainer className="pch-container contract-template-detail-page">
          <Title title="模板详情" />
          <div className="template-title">{templateName}</div>
          <div className="template-detail-content">
            <div dangerouslySetInnerHTML={{
              __html:templateContent
            }} />
          </div>
      </IceContainer>
    )
  }
}

export default Detail;
