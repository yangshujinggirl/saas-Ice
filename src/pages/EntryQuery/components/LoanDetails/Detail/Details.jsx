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
    this.state.Component = [];
    if(this.props.dataSource.length){
      this.props.dataSource.forEach((item,i)=>{
        this.state.Component.push(
          <IceContainer title={item.name} className='subtitle' key={i}>
            <div className='config-font-box'>
              {item.fields.map((el,ind)=>{
                return(
                  <div className='config-font' key={el.id}>
                    <div>{el.label}</div>
                    <span>:</span>
                    <div>{el.value}</div>
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
