import React, { Component } from 'react';

import BasicInformation from './components/BasicInformation';
import ConfigInformation from './components/ConfigInformation';

class LoanApplication extends Component {
  static displayName = 'LoanApplication';

  constructor(props) {
    super(props);
    this.state = {
      iscompont: '',
      status: 'Base'//Base 基本字段 Config配置信息
    };
  }
  componentWillMount() {
  }

  changeComponent(type) {
    let status;
    switch (type) {
      case 'Base':
        status = 'Base';
        break;
      case 'Config':
        status = 'Config';
        break;
      default:
        break;
    }
    this.setState({ status });
  }

  render() {
    const { status } = this.state;
    let Mod;
    if(status == 'Base') {
      Mod = BasicInformation
    } else {
      Mod = ConfigInformation
    }
    return (
      <div className="loan-application-page">
        <Mod toggleComponent={(type)=> this.changeComponent(type)}/>
      </div>
    );
  }
}
export default LoanApplication;
