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
  }
  onOk() {
    this.props.onOk();
  }
  onCancel() {
    this.props.onCancel();
  }
  onClose() {
    if(this.props.onClose) {
      this.props.onClose();
    } else {
      this.props.onCancel();
    }
  }

  render() {
      const {
        submitText,
        cancelText,
        visible,
        onOk,
        onCancel,
      } = this.props;
      return (
        <Dialog
          visible={visible}
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
              onClick={()=>onOk()}
              className="dialog-btn">
                {submitText}
            </Button>
            <Button
              type="normal"
              size="large"
              onClick={()=>onCancel()}
              className="dialog-btn">
                {cancelText}
            </Button>
          </div>
        </Dialog>
    );
  }
}

export default PchDialog;
