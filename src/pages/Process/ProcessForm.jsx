import React, { Component } from 'react';
import ProcessForm from './components/ProcessForm';

export default class Demo extends Component {

  constructor(props) {
    super(props);
    
  }

  /**
   * <ProcessForm {...this.props} />
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="process-page">
        <ProcessForm {...this.props}/>
      </div>
    );
  }
}
