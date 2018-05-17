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
    this.state = {
      // 合同模版字符串
      activeHTML: this.props.html
    }
  }
  componentWillMount(){
    productNameSelect.destory();
  }

  productNameSelect(e){
    let select = e.target;
    let isRoot = select.className.indexOf('product-name-select') > -1;
    let isChild = select.getAttribute('data-parent') == 'product-name-select';
    let arrow;
    
    if(!isRoot){
      if(isChild){
        while(select.className.indexOf('product-name-select') < 0){
          select = select.parentNode;
        }
      }else{
        // 每次点击都要隐藏上次的列表项
        if(this.refs.ProductNameForm.activeSelect){
          this.refs.ProductNameForm.activeSelect.className = 'product-name-select';
        }
        return;
      }
    }
    if(select.className.indexOf('focused') > -1 || e.target.className.indexOf('selected') > -1)return;
    // 每次点击都要隐藏上次的列表项
    if(this.refs.ProductNameForm.activeSelect){
      this.refs.ProductNameForm.activeSelect.className = 'product-name-select';
    }
    if(!select.bindInputEvent){
      // 绑定input输入事件
      select.bindInputEvent = true;
      let input = select.getElementsByTagName('input')[0];
      input.oninput = function(){
        let menu = this.parentNode.getElementsByTagName('div');
        let list = [...this.parentNode.getElementsByTagName('li')];
        let dataName = '';
        if(menu.length < 1 || list.length < 1){
          //如果不存在menu时return
          dataName = this.name;
        }else{
          //将上一个选中项去调
          if(menu.length > 0 && menu[0].activeOption)menu[0].activeOption.className = '';
          let value = this.value;
          let select = list.find(li=>li.innerHTML==value);
          if(select){
            menu[0].activeOption = select;
            select.className = 'selected';
            dataName = select.getAttribute('data-name');
          }else{
            dataName = this.name;
          }  
        }
        //设置input的data-value，即实际name值
        this.setAttribute('data-value', dataName);
        return false
      }
    }
    let options = select.getElementsByTagName('div');
    let opts;
    
    if(options.length < 1){
      opts = this.props.productNames.map(p=>`<li data-parent='product-name-select' data-name=${p.name}>${p.label}</li>`).join('');
      opts = `<ul data-parent='product-name-select'>${opts}</ul>`;
      options = productNameSelect.makeOptions(select, opts)
    }else{
      options = options[0];
      // 每次点击要更新list
      let list = [...options.getElementsByTagName('li')];
      // 筛选出之前选中的项
      let selected, dataName;
      if(list.length > 0){
        while(!selected && list.length > 0){
          selected = list.shift();
          selected = selected.className.indexOf('selected') > -1 && selected;
        }
      }
      if(selected){
        dataName = selected.getAttribute('data-name');
      }
      opts = this.props.productNames.map(p=>p.name== dataName ?`<li data-parent='product-name-select' class='selected' data-name=${p.name}>${p.label}</li>`:`<li data-parent='product-name-select' data-name=${p.name}>${p.label}</li>`).join('')
      opts = `<ul data-parent='product-name-select'>${opts}</ul>`;
      options.innerHTML = opts;
    }
    //存取本次的列表节点
    this.refs.ProductNameForm.activeSelect = select;
    select.className += ' focused';
  }

  parseHTML(){
    let html = this.props.html;
    let kindex = 0;
    html = html.replace(/_{3,}/g, (s, pos)=>{
      let i = kindex++;
      return `<span data-pos='${pos}' data-length='${s.length}' class='product-name-select'>
                <input class='select-input' name='productname${i}' data-value='productname${i}' placeholder='请选择' data-parent='product-name-select'>
                <i class='arrow' data-parent='product-name-select'></i>
              </span>`
    })
    return html
  }
  render() {
    return (<form ref="ProductNameForm" onClick={this.productNameSelect.bind(this)} dangerouslySetInnerHTML={{__html: this.parseHTML()}}></form>)
  }
}

export default FormModule;
