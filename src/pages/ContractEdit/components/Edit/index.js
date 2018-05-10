import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { BaseApp } from 'base'
import { Title } from 'components';
import './index.scss';

class AddEit extends BaseApp {
  render() {
    const { contractContent } = this.props.location.state;
    console.log(this.props)
    return(
      <IceContainer className="pch-container contract-eidt-pages">
          <Title title="合同新增" />
          <div className="main-contract-main-action">
            <div dangerouslySetInnerHTML={{
              __html:contractContent
            }} />
          </div>
      </IceContainer>
    )
  }
}

export default AddEit;
