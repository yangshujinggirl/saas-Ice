import React, { Component } from 'react';
import ReviewApprove from './components/ReviewApprove';

export default class Demo extends Component {

  constructor(props) {
    super(props);

  }

  /**
   * <ReviewApprove {...this.props} />
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="reviewapprove-page">
        <ReviewApprove  {...this.props}></ReviewApprove>
      </div>
    );
  }
}
