import React, { Component } from 'react';
import AddFont from './components/AddFont';

export default class Font extends Component {
  static displayName = 'AddFont';

  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className="font-config-page">
        <AddFont {...this.props}/>
      </div>
    );
  }
}
// http://172.16.0.218:8080/loan-ft1/