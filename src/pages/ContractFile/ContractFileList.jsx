import React, { Component } from 'react';
import List from './components/List';

class ContractFileList extends Component {

  constructor(props) {
    super(props);

  }

  /**
   * <ContractFile {...this.props} />
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="contractfile-page">
        <List {...this.props}/>
      </div>
    );
  }
}

export default ContractFileList;
