import React, { Component } from 'react';
import Detail from './components/Detail';

class ContractFileDetail extends Component {

  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div className="contractfile-page">
        <Detail {...this.props}/>
      </div>
    );
  }
}

export default ContractFileDetail;
