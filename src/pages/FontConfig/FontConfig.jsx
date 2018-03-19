import React, { Component } from 'react';
import FilterTable from './components/FilterTable';

export default class FontConfig extends Component {
  static displayName = 'FontConfig';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="font-config-page">
        <FilterTable />
      </div>
    );
  }
}
