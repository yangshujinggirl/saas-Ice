import React, { Component } from 'react';
import InterViewForm from './components/InterViewForm';

export default class Demo extends Component {

  constructor(props) {
    super(props);
    
  }

  /**
   * <InterViewForm {...this.props} />
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="interview-page">
        <InterViewForm {...this.props}/>
      </div>
    );
  }
}
