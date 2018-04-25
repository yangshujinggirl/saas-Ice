import React, { Component } from 'react';
import FilterTable from './components/FilterTable';

export default class DemoForm extends Component {
  static displayName = 'DemoForm';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="demo-form-page">
        <FilterTable />
      </div>
      );
  }
}
