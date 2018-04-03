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
  value = (el)=>{
    var value =el.value;
    if(el.type == 'INT' && el.value == 0){
      value = 0;
    }else {
      if(el.value == 0){
        value = '否'
      }else if(el.value == 1){
        value = '是'
      }
    }
    const valueTips =  <div >{value}</div>;
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

  render() {
    console.log(this.props.dataSource);
    this.state.Component = [];
    if(this.props.dataSource){
      this.props.dataSource.forEach((item,i)=>{
        this.state.Component.push(
          <IceContainer title={item.name} className='subtitle'  key={i}>
            <div className='config-font-box'>
              {item.fields.map((el,ind)=>{
                var list = [];
                if(el.hasAttachedFields){
                  list.push( <div className='config-font colspan' key={el.id}>
                                      {this.label(el.label)}
                                      <span>:</span>
                                      {this.value(el)}
                                    </div>
                            )
                  console.log(el)
                  if(el.attached[el.value]){
                    el.attached[el.value].map((ite,ind)=>{
                      list.push(
                        <div className='config-font' key={ite.id}>
                          {this.label(ite.label)}
                          <span>:</span>
                          {this.value(ite)}
                        </div>
                      )
                    })
                  }
                  return list;
                }else{
                    list.push( <div className='config-font ' key={el.id}>
                        {this.label(el.label)}
                        <span>:</span>
                        {this.value(el)}
                      </div>
                    )
                  return list;
                }
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
