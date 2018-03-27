import React, { Component } from 'react';
import SetFont from './components/SetFont';



export default class Font extends Component {
  static displayName = 'SetFont';

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="font-config-page">
        <SetFont {...this.props}/>
      </div>
    );
  }
}
// http://172.16.0.218:8080/loan-ft1/