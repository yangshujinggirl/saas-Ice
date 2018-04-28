import React, { Component } from 'react';
import ReviewApproveDetail from './components/ReviewApproveDetail';

export default class Demo extends Component {

  constructor(props) {
    super(props);

  }

  /**
   * <ReviewApproveDetail {...this.props} />
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="reviewapprove-page">
        <ReviewApproveDetail  {...this.prop}></ReviewApproveDetail>
      </div>
    );
  }
}
