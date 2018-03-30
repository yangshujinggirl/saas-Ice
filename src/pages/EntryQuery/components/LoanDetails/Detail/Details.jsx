import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {  Balloon } from '@icedesign/base';

import './loanDetails.scss'
export default class Details extends Component {
  static displayName = 'Details';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      Component :[],
    };
  }
  //名字
  label = (label)=>{
    const labelTips =  <div>{label}</div>;
    return(
      <Balloon
        type="primary"
        trigger={labelTips}
        closable={false}
        align='rb'
      >
        {label}
      </Balloon>
    )
  }
  //内容value
  value = (value)=>{
    if(value){
      const valueTips =  <div>{value}</div>;
      return(
        <Balloon
          type="primary"
          trigger={valueTips}
          closable={false}
          align='t'
        >
          {value}
        </Balloon>
      )
    }
  }

  render() {
    console.log(this.props.dataSource);
    this.state.Component = [];
    if(this.props.dataSource.length){
      this.props.dataSource.forEach((item,i)=>{
        this.state.Component.push(
          <IceContainer title={item.name} className='subtitle'  key={i}>
            <div className='config-font-box'>
              {item.fields.map((el,ind)=>{
                return(
                  <div className='config-font' key={el.id}>
                    {this.label(el.label)}
                    <span>:</span>
                    {this.value(el.value)}
                  </div>
                )
              })
              }
            </div>
          </IceContainer>
        )

      })
    }
    return (
          <div>
            { this.state.Component}
          </div>
    );
  }
}
