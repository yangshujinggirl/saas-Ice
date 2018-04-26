import React, { Component } from 'react';
import LoanApplication from './components/LoanApplication';
export default class Application extends Component {
  static displayName = 'Application';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="entry-query-page">
        <LoanApplication  {...this.props}/>
      </div>
    );
  }
}
