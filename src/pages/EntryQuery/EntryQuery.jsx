import React, { Component } from 'react';
import FilterTable from './components/EnterTable/FilterTable';
import LoanDetails from './components/LoanDetails';
export default class EntryQuery extends Component {
  static displayName = 'EntryQuery';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="entry-query-page">
        <FilterTable  {...this.props}/>
      </div>
    );
  }
}
