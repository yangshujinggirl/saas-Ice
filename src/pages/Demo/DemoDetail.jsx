import React, { Component } from 'react';
// import DemoDetail from './components/DemoDetail';

export default class Demo extends Component {

  constructor(props) {
    super(props);
    
  }

  /**
   * <DemoDetail {...this.props} />
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="demo-page">
        这是详情
      </div>
    );
  }
}
