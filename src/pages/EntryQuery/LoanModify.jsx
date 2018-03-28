import React, { Component } from 'react';
import LoanModify from './components/LoanModify';
export default class EntryQuery extends Component {
  static displayName = 'EntryQuery';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="entry-query-page">
        <LoanModify  {...this.props}/>
      </div>
    );
  }
}
