import React, { Component } from 'react';

import ConfigInformation from './components/ConfigInformation';

class LoanApplication extends Component {
  static displayName = 'LoanApplication';

  constructor(props) {
    super(props);
    console.log(this.props)
  }
  componentWillMount() {
  }

  render() {

    return (
      <div className="loan-application-page">
        <ConfigInformation {...this.props}/>
      </div>
    );
  }
}
export default LoanApplication;