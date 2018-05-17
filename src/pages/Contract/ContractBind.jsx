import React, { Component } from 'react';
import Bind from './components/Bind';

class ContractBind extends Component {

  constructor(props) {
    super(props);

  }

  /**
   * <ContractDetail {...this.props} />
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="contract-page">
        <Bind {...this.props}/>
      </div>
    );
  }
}

export default ContractBind;
