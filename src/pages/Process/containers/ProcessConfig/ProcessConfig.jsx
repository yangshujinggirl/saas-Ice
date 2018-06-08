import React ,{Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { BaseApp } from 'base'
import { Title, PchTable, PchPagination } from 'components';
import ProcessFormProduct from '../../components/ProcessFormProduct'
export default class ProcessConfig extends BaseApp {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    console.log(this.props)
  }
  componentDidMount(){}

  render(){
    return(
      <IceContainer className="pch-container">
        <Title title="流程配置产品"/>
        <ProcessFormProduct {...this.props}/>
      </IceContainer>
    )
  }
}