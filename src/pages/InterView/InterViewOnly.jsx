import React, { Component } from 'react';
import InterViewOnly from './components/InterViewOnly';

export default class Demo extends Component {

  constructor(props) {
    super(props);

  }

  /**
   * <InterView {...this.props} />
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="interview-page">
       <InterViewOnly {...this.props}/>
      </div>
    );
  }
}
