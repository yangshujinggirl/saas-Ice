import React, { Component } from 'react';
import CreateActivityForm from './components/CreateActivityForm';

export default class Demo extends Component {

  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <div className="demo-page">
        <CreateActivityForm {...this.props} />
      </div>
    );
  }
}
