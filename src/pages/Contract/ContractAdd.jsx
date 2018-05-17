import React, { Component } from 'react';
import AddEdit from './components/AddEdit';

export default class Demo extends Component {

  constructor(props) {
    super(props);
    console.log(this.props)
  }

  /**
   * <ContractForm {...this.props} />
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="contract-page">
        <AddEdit {...this.props}/>
      </div>
    );
  }
}
