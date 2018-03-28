import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

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
  render() {
    console.log(this.props.dataSource);
    if(this.props.dataSource){
      this.props.dataSource.forEach((item,index)=>{
        this.state.Component.push(
          <IceContainer title={item.name} className='subtitle' key={index}>
            <div className='config-font-box'>
              {item.fields.map((i,index1)=>{
                return(
                  <div className='config-font' key={index1}>
                    <div>{i.name}</div>
                    <span>:</span>
                    <div>{i.value}</div>
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
