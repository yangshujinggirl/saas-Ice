/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import "./addFont.scss"


export default class AddFont extends Component {
  static displayName = 'AddFont';

  constructor(props) {
    super(props);

    // 请求参数缓存
    this.state = {
      fileSet: {},
    };
  }
  toggleCompont = () => { 
    // this.props.toggle
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
          <IceContainer title="选择字段" className='subtitle'>
              <div className="diffence">字段（已锁定）</div>
              <div className="listCode">
                  与主贷人关系我我我
                  <span className="icon">&#xe62c;</span>
              </div>
              <div className="listCode selectCode">
                    与主贷人关系我我我
                    <span className="icon">&#xe62c;</span>
              </div>
              <div className="diffence">字段（可选字段）</div>
              <div className='subDif'>
                    <div>客户信息</div>
                    <div className="select">
                        <span> 全选</span>
                        <span>反选</span>
                    </div>
                    <div className="listCode">
                        与主贷人关系我我我
                        <span className="icon">&#xe62c;</span>
                    </div>
                    <div className="listCode selectCode">
                        与主贷人关系我我我
                        <span className="icon">&#xe62c;</span>
                    </div>
              </div>

              <div className='subDif'>
                  <div>客户基本信息</div>
                  <div className="select">
                        <span> 全选</span>
                        <span>反选</span>
                    </div>
                  <div className="listCode">
                      与主贷人关系我我我
                      <span className="icon">&#xe62c;</span>
                  </div>
                  <div className="listCode selectCode">
                      与主贷人关系我我我
                      <span className="icon">&#xe62c;</span>
                  </div>
              </div>

        </IceContainer>
        <div className='btn-list'>
          <Button onClick={this.props.toggleCompont} type="normal" className='next-btn-search btn'>
              下一步
          </Button>
          <Button className='btn'>
              重置
          </Button>
        </div>
          
      </div>
    );
  }
}
