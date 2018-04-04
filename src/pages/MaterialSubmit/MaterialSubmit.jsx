import React, { Component } from 'react';
import Submit from './components/MaterialSubmit';

export default class MaterialSubmit extends Component {

  constructor(props) {
    super(props);

  }

  /**
   * <MaterialSubmit {...this.props} />
   * @return {[type]} [description]
   */
  render() {
    return (
      <Submit  {...this.props}></Submit>
    );
  }
}
