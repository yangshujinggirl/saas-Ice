import React, { Component } from 'react';
import SpDataSource from '../utils/SpDataSource';

/**
 * 列表搜索组件的基类
 * 1. 提供搜索框的默认布局（FormItem、Col）
 * 2. 提供默认的搜索、更改表单值方法
 */
export default class BaseCondition extends Component {
  constructor(props, store, action) {
    super(props);

    // 搜索框表单的对应的值，可以设置默认值
    this.state = {
      value: {}
    };

    // 表单的FormItem的布局比例
    this.formItemLayout = {
      labelCol: {
        span: 10
      },
      wrapperCol: {
        span: 12
      }
    };

    // 表单的FormItem的布局比例
    this.formItemLayout2 = {
      labelCol: {
        span: 10
      },
      wrapperCol: {
        span: 14
      }
    };

    // 表单的列布局
    this.colspans = {
      xxs: 24,
      xs: 12,
      l: 6,
      xl: 6
    };

    // 搜索条件中的资方下拉框数据
    this.SpDataSource = SpDataSource;
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

  /**
   * 搜索按钮的提交事件，默认出发props的onsubmit
   * @return {[type]} [description]
   */
  handleSubmit() {
    let value = this.state.value;

    for (let i in value) {
      // 替换搜索条件中字符串的前后空格
      if (typeof value[i] == 'string') {
        value[i] = value[i].replace(/^\s+|\s+$/gm, '');
      }
    }

    this.props.onSubmit && this.props.onSubmit(this.state.value);
  }

  /**
   * 更改表单更新对应的值
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  filterFormChange(value) {
    this.setState({
      value: value
    });
  }
}
