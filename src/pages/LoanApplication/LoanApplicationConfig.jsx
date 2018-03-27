import React, { Component } from 'react';

import ConfigInformation from './components/ConfigInformation';

class LoanApplication extends Component {
  static displayName = 'LoanApplication';

  constructor(props) {
    super(props);
    console.log(this.props)
  }

  render() {

    return (
      <div className="loan-application-page">
        <ConfigInformation />
      </div>
    );
  }
}
export default LoanApplication;
