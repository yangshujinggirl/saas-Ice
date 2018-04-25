import React, { Component } from 'react';
import FilterTable from './components/FilterTable';

export default class Demo extends Component {

  constructor(props) {
    super(props);
    
  }

  render() {
    let {actions, formData} = this.props;

    return (
      <div className="demo-page">
        <FilterTable {...this.props} />
      </div>
    );
  }
}
