/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
// import { SortableContainer } from 'react-anything-sortable';
import "./SetFont.scss"
// import 'react-anything-sortable/sortable.css';


export default class setFont extends Component {
  static displayName = 'SetFont';

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

      <div className="setFont">
          <IceContainer className='subtitle'>
              <div className="pageName">
                  <label>页面名称</label>
                  <input type="text" name='' />
              </div>
            </IceContainer>
            <div className="container">
                <div className="container-left">
                    <ul>
                        <li className="active">
                            客户申请信息
                        </li>
                        <li>材料提交</li>
                    </ul>    
                </div>
                <div className="container-right">
                {/* <SortableContainer>
                    <div>
                        your item
                    </div>
                </SortableContainer> */}
                </div>                  
            </div>
      </div>
    );
  }
}
