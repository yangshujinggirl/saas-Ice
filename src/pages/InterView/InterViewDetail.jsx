import React, { Component } from 'react';
import PbcContractDetail from './components/PbcContractDetail';

export default class Demo extends Component {

  constructor(props) {
    super(props);

  }

  /**
   * <InterViewDetail {...this.props} />
   * @return {[type]} [description]
   */
  render() {
    return (
      <PbcContractDetail {...this.props}></PbcContractDetail>
    );
  }
}
