import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import {
  Dialog,
  Button,
} from '@icedesign/base';
import './PchDialog.scss';

class PchDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:this.props.visible
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      visible:props.visible
    })
  }
  onOk() {
    this.props.onOk();
  }
  onClose() {
    this.setState({
      visible:false
    })
  }

  render() {

      return (
        <Dialog
          visible={this.state.visible}
          onCancel={()=>this.onClose()}
          onClose={()=>this.onClose()}
          className="pch-components-dialog-modules"
          footer={[]}>
          <div className="components-dialog-title">{this.props.title||''}</div>
          <div className="components-dialog-content">
            {this.props.children||''}
          </div>
          <div className="components-handle-btns-wrap">
            <Button
              type="secondary"
              size="large"
              onClick={()=>this.onOk()}
              className="dialog-btn">
                确认
            </Button>
            <Button
              type="normal"
              size="large"
              onClick={()=>this.onClose()}
              className="dialog-btn">
                取消
            </Button>
          </div>
        </Dialog>
    );
  }
}

export default PchDialog;
