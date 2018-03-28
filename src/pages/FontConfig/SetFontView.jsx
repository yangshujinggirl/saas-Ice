import React, { Component } from 'react';
import SetFontView from './components/SetFontView';



export default class Font extends Component {
  static displayName = 'SetFontView';

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="font-config-page">
        <SetFontView {...this.props}/>
      </div>
    );
  }
}
// http://172.16.0.218:8080/loan-ft1/