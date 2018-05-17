import React, { Component } from 'react';
import Edit from './components/Edit';

class ContractEdit extends Component {

  constructor(props) {
    super(props);

  }

  /**
   * <ContractEditForm {...this.props} />
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="contractedit-page">
        <Edit {...this.props}/>
      </div>
    );
  }
}

export default ContractEdit;
