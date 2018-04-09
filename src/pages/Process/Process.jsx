import React, { Component } from 'react';
import Process from './components/Process';

export default class Demo extends Component {

  constructor(props) {
    super(props);
    
  }

  /**
   * <Process {...this.props} />
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="process-page">
        <Process {...this.props} />
      </div>
    );
  }
}
