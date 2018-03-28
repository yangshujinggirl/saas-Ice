import React, { Component } from 'react';
import UserLogin from './components/UserLogin';

export default class Demo extends Component {

  constructor(props) {
    super(props);
    
  }

  componentDidMount(){
    this.props.actions.search();
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
