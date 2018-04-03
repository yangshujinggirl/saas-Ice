import React, { Component } from 'react';

import BasicInformation from './components/BasicInformation';

class LoanApplication extends Component {
  static displayName = 'LoanApplication';
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="loan-application-page">
        <BasicInformation {...this.props}/>
      </div>
    );
  }
}
export default LoanApplication;
