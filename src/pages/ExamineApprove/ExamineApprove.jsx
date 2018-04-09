import React, { Component } from 'react';
import ExamineApproveComponent from './components/ExamineApproveComponent';

export default class Demo extends Component {

  constructor(props) {
    super(props);

  }

  /**
   * <ExamineApprove {...this.props} />
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="examineapprove-page">
        <ExamineApproveComponent {...this.props}/>
      </div>
    );
  }
}
