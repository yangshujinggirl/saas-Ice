/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import "./SetFont.scss"


export default class AddFont extends Component {
  static displayName = 'AddFont';

  constructor(props) {
    super(props);

    // 请求参数缓存
    this.state = {
      fileSet: {},
    };
  }
  componentDidMount() {

  }
  render() {
    return (

      <div className="addFont">
          <IceContainer className='subtitle'>
              <div className="pageName">
                  <label>页面成名</label>
                  <input type="text" name='' />
              </div>
          </IceContainer>
      </div>
    );
  }
}
