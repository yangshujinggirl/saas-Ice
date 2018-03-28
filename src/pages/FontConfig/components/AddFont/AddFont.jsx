/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button } from '@icedesign/base';
import axios from 'axios';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import "./addFont.scss"
import FontConfigReq from './../../reqs/FontConfigReq.js'


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
    this.props.router.push('/font/set')
  }
    componentDidMount() {
      console.log(FontConfigReq.getDetail())
        // axios.get('http://172.16.0.218:8080/loan-ft1/fields').then((data) => {
        //     console.log(data)
        // })
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
          <Button onClick={this.toggleCompont} type="normal" className='next-btn-search btn'>
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
