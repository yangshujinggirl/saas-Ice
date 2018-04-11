import React, { Component } from 'react';
// import ProcessDetail from './components/ProcessDetail';
import { Icon, Input, Button, Checkbox, Select, Switch, Radio, Grid, Field } from '@icedesign/base';

export default class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title:1
    }
  }

  /**
   * <ProcessDetail {...this.props} />
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="process-page">
        <Input defaultValue={this.state.title}/>
      </div>
    );
  }
}
