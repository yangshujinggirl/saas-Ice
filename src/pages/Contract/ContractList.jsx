import React, { Component } from 'react';
import List from './components/List';

export default class ContractList extends Component {

  constructor(props) {
    super(props);

  }

  /**
   * <Contract {...this.props} />
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="contract-page">
        <List {...this.props}/>
      </div>
    );
  }
}
