import React, { Component } from 'react';
import DemoForm from './components/CreateActivityForm';

export default class Demo extends Component {

  constructor(props) {
    super(props);

  }

  /**
   * <DemoForm {...this.props} />
   * @return {[type]} [description]
   */
  render() {
    return (
      
      <div 

      className="demo-page">
        <DemoForm 
        {...this.props} />
      </div>
      );
  }
}
