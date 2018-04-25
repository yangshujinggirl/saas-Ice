import React, { Component } from 'react';
import UserLogin from './components/Login';

export default class Demo extends Component {

  constructor(props) {
    super(props);
    
  }

  /**
   * <Account {...this.props} />
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="account-page">
        <UserLogin {...this.props} />
      </div>
    );
  }
}
