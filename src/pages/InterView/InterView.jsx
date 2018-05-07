import React, { Component } from 'react';
import InterView from './components/InterView';

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
       <InterView {...this.props}/>
      </div>
    );
  }
}
