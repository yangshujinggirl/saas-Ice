import React, { Component } from 'react';
import Detail from './components/Detail';

export default class Demo extends Component {

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
        <Detail {...this.props}/>
      </div>
    );
  }
}
