import React, { Component } from 'react';
import BaseConfig from '../../config/BaseConfig';

/**
 * 组件的基类
 * 1. 提供上传组件的通用配置，地址、请求头、响应格式等
 */
class BaseComponent extends Component {
  constructor(props, store, action) {
    super(props);

    // 上传配置，用于上传组件使用
    this.UPLOAD_CONFIG = {
      action: BaseConfig.SAAS_HOST + '/file/upload',
      data: {
        'path': 'path/to/file'
      },
      formatter: (res) => {
        return {
          code: res.length > 0 ? '0' : '1',
          imgURL: res[0].downloadUrl
        }
      }
    };
  }

  /**
   * 组件生命周期事件-加载完成
   * @return {[type]} [description]
   */
  componentDidMount() {

  }

  /**
   * 组件生命周期时间-组件将要移除
   * @return {[type]} [description]
   */
  componentWillUnmount() {

  }
}

export default BaseComponent;
