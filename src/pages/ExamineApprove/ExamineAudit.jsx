import React, { Component } from 'react';
import AuditList from './components/AuditList';

export default class Demo extends Component {

  constructor(props) {
    super(props);

  }

  /**
   * <ExamineApproveForm {...this.props} />
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="examineapprove-page">
        <AuditList {...this.props}/>
      </div>
    );
  }
}
