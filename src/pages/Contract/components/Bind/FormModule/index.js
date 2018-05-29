import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

import {
  FormBinderWrapper as  IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import { hashHistory } from 'react-router';
import { BaseApp } from 'base'
import { Title, PchTable, PchPagination } from 'components';

import {
  Input,
  Button,
  Select,
  Grid,
  Table,
  Form,
  Upload
} from '@icedesign/base';
import './index.scss';
import productNameSelect from './productNameSelect';
const { Row, Col } = Grid;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 }
};
const formItemLayoutLine = {
  labelCol: { span: 3 },
  wrapperCol: { span: 8 }
};



class FormModule extends BaseApp {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    productNameSelect.destory();
    document.body.onclick = null;
  }

  componentDidMount(){
    document.body.onclick = null;
    document.body.onclick = e=>productNameSelect.init(e, this.props.productNames)
  }

  parseHTML(){
    let html = this.props.html;
    if(!html || html.length <= 0)return '';
    let kindex = 0,
        keyVales = [],
        keyValesIndex = 0;
    //当已经绑定过产品字段的合同模版
    if(html.indexOf('_BLANK_') > -1){
      let div = document.createElement('div');
      div.innerHTML = html;
      let emList = [...div.querySelectorAll('.blank-em')];
      emList.forEach(p=>{
        let line = document.createTextNode("******");
        let m = p.innerHTML.match(/_BLANK_(.+)_BLANK_/);
        let kv;
        // 替换自定义的部分
        if(m[1].indexOf('productname') == 0){
          kv = m[1].match(/(productname\d+c\d+)_(.+)/);
        }else{
          // 替换选择给定产品字段部分
          kv = m[1].match(/(.+)_(null)/);
        }
        // 存取绑定部分内容[name_value, name, value]
        keyVales.push(kv)
        p.parentNode.replaceChild(line, p);
      })
      html = div.innerHTML;
      //记录已绑定的产品字段的个数
      kindex = keyVales.length
    }

    html = html.replace(/_{3,}|\*{6}/g, (s, pos)=>{
      let i = 0, val = '', productName, temp;
      if(s.indexOf("_") > -1){
        i = kindex++;
      }else{
        productName = this.props.productNames.length > 0 && this.props.productNames.find(p=>p.name == keyVales[keyValesIndex][1]);
        val = productName && productName.label || keyVales[keyValesIndex][2] || '';
        temp = productName && productName.name || keyVales[keyValesIndex][1] || '';
        val = val == 'null' ? '' : val;
        i = keyValesIndex++
      }
      let dataValue = `productname${i}c${this.props.contractid}`;
      if(temp)dataValue = temp;
      return `<span class='product-name-select'>
                <input class='select-input' name='productname${i}c${this.props.contractid}' data-value='${dataValue}' placeholder='请选择' data-parent='product-name-select' value='${val}'>
                <i class='arrow' data-parent='product-name-select'></i>
              </span>`
    })
    return html
  }
  render() {
    return (<form ref="ProductNameForm" dangerouslySetInnerHTML={{__html: this.parseHTML()}}></form>)
  }
}

export default FormModule;
