import React, { Component } from 'react';
import CreateActivityForm from './components/CreateActivityForm';

export default class Demo extends Component {

  constructor(props) {
    super(props);
    
  }

  render() {
    let {actions, formData} = this.props;

    return (
      <div className="demo-page">
        <CreateActivityForm data={formData} onSubmit={actions.save.bind(this)} {...this.props} />
      </div>
    );
  }
}
