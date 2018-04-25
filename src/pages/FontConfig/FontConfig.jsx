import React, { Component } from 'react';
import FilterTable from './components/FilterTable';

export default class Font extends Component {
  static displayName = 'FilterTable';

  constructor(props) {
    super(props)
  }
  componentWillMount() {

  }

  render() {
    return (
      <div className="font-config-page">
        <FilterTable {...this.props}/>
      </div>
    );
  }
}
// http://172.16.0.218:8080/loan-ft1/
