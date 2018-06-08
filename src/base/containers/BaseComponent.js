import React, { Component } from 'react';
import BaseConfig from '../../config/BaseConfig';
import Cookie from '../utils/Cookie';
import { Feedback } from "@icedesign/base";
/**
 * 组件的基类
 * 1. 提供上传组件的通用配置，地址、请求头、响应格式等
 */
const Toast = Feedback.toast;

export default class BaseComponent extends Component {
  constructor(props) {
    super(props);

    // 配置信息
    this._config = BaseConfig;

    // 上传配置，用于上传组件使用
    this.UPLOAD_CONFIG = {
      action: this._config.SAAS_HOST + '/file/upload',
      headers:{
        'Authorization':`PCTOKEN ${Cookie.get('PCTOKEN')}`
      },
      data: {
        'path': 'path/to/file'
      },
      formatter: (res) => {
        let isArray = Object.prototype.toString.call(res.data) === '[object Array]';
        if(!res.data) {
          Toast.error('上传失败，请重新上传');
          return;
        }
        if(isArray) {
          return {
            code: res.code == 200 ? '0' : '1',
            imgURL: res.data[0].downloadUrl,
            fileName:res.data[0].filename || res.data[0].name,
            fileURL: res.data[0].downloadUrl,
            type:res.data[0].contentType,
            size: res.data[0].size
          }
        } else {
          return {
            code: res.code == 200 ? '0' : '1',
            imgURL: res.data.fileUrl,
            fileName:res.data.filename,
            fileURL: res.data.fileUrl,
            type:res.data.fileType,
          }
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
