import React, { Component } from 'react';
import AddEdit from './components/AddEdit';

export default class Demo extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="contract-page">
        <AddEdit {...this.props}/>
      </div>
    );
  }
}
