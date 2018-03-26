import React, { Component } from 'react';

import BasicInformation from './components/BasicInformation';
import ConfigInformation from './components/ConfigInformation';

export default class LoanApplication extends Component {
  static displayName = 'LoanApplication';

  constructor(props) {
    super(props);
    this.state = {
      iscompont: '',
      Component: ''
    };
  }
  componentWillMount() {
    this.state.Component = <BasicInformation toggleComponent={this.changeComponent.bind(this)}/>
    // this.state.Component = <ConfigInformation toggleComponent={this.changeComponent.bind(this)}/></ConfigInformation>
  }

  changeComponent(toggleComponent) {
    this.state.iscompont = toggleComponent
    switch (this.state.iscompont) {
      case 'BasicInformation':
        this.setState({
          Component:<BasicInformation toggleComponent={this.changeComponent.bind(this)}/>
        })
        break;
      case 'ConfigInformation':
        this.setState({
          Component:<ConfigInformation toggleComponent={this.changeComponent.bind(this)}/>
        })
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="loan-application-page">
        {this.state.Component}
      </div>
    );
  }
}
