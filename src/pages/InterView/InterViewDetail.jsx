import React, { Component } from 'react';
import PbcContractDetail from './components/PbcContractDetail';
import PinganContractDetail from './components/PinganContractDetail';
import LoanDetail from './components/LoanDetail';
import { hashHistory } from 'react-router';

export default class Demo extends Component {

  constructor(props) {
    super(props);
    this.state ={
      component :[]
    }
  }

  /**
   * <InterViewDetail {...this.props} />
   * @return {[type]} [description]
   */

  render  (){
    let { type, id } = this.props.params;
    console.log(type)
    console.log(id)
    if(type && id){
      switch (type){
        case 'pbcContract': {
          return (<PbcContractDetail {...this.props}></PbcContractDetail>)
          break;
        }
        case 'pinganContract': {
          return (<PinganContractDetail {...this.props}></PinganContractDetail>)
          break;
        }
        case 'loan': {
          return (<LoanDetail {...this.props}></LoanDetail>)
          break;
        }
      }
    }
    return null;
  }

  // render() {
  //   return (
  //     this.state.component
  //   );
  // }
}
