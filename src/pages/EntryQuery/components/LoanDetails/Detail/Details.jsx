import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Balloon } from '@icedesign/base';

import './loanDetails.scss';
import Req from '../../../reqs/EntryQueryReq';

export default class Details extends Component {
  static displayName = 'Details';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      Component: [],
      dataSource: [],
    };
  }

  componentWillMount() {
    this.getProductNum();
  }

  //获取产品列表
  getProductNum() {
    const limit = 990;
    Req.getProductNumApi(limit)
      .then((res) => {
        if (res.data && res.code == '200') {
          const { data } = res;
          const { list } = data;
          let dataSource = list.map((el) => {
            return {
              id: el.id,
              label: el.name,
              value: el.productCode,
            };
          });
          this.setState({
            dataSource,
          });
        }
      }, (error) => {

      });
  }

  //名字
  label = (label) => {
    const labelTips = <div className='label'>{label}</div>;
    return (
      <Balloon
        type="primary"
        trigger={labelTips}
        closable={false}
        align='rb'
      >
        {label}
      </Balloon>
    );
  };
  //内容value
  value = (el,str) => {
    var value = el.value ;
    if (el.type == 'INT' && el.value == 0) {
      value = 0;
    } else if (el.type == 'SELECT' && el.options && el.options.length) {
      el.options.map((item, index) => {
        if (value == item.value) {
          value = item.label;
        }
      });
    } else if (el.type == 'RADIO') {
      if (el.value == 0) {
        value = '否';
      } else if (el.value == 1) {
        value = '是';
      }
    } else if (el.type == 'SELECT' && el.name == 'productCode') {
      this.state.dataSource.map(item => {
        if (el.value == item.value) {
          value = item.label;
        }
      });
    } else if (el.type == 'DATE') {
      if(value){
        el.dateFormat == 'yyyy-MM-dd' ? value = this.formatDateTime(el.value , 'yyyy-MM-dd') :
          el.dateFormat == 'HH:mm:ss' ? value = this.formatDateTime(el.value, 'HH:mm:ss') :
            el.dateFormat == 'yyyy-MM-dd HH:mm:ss' ? value = this.formatDateTime(el.value, 'yyyy-MM-dd HH:mm:ss') :
              value = el.value;
      }
    }
    if(str && str == 'line'){
      var valueTips = <div className='linevalue'>{value}</div>;
    }else{
      var  valueTips = <div className='value'>{value}</div>;
    }
    if (value) {
      return (
        <Balloon
          type="primary"
          trigger={valueTips}
          closable={false}
          align='t'
        >
          {value}
        </Balloon>
      );
    }
    return;
  };
  //时间格式化
  formatDateTime = (inputTime, format) => {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    if (format == 'HH:mm:ss') {
      return h + ':' + minute + ':' + second;
    } else if (format == 'yyyy-MM-dd') {
      return y + '-' + m + '-' + d;
    }
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  };

  render() {
    console.log(this.props.dataSource);
    this.state.Component = [];
    if (this.props.dataSource) {
      this.props.dataSource.forEach((item, i) => {
        this.state.Component.push(
          <div className='review-detail' key={i} id={item.name}>
            <span className='name'>{item.name}</span>
            <div className='config-font-box'>
              {item.fields.map((el, ind) => {
                var list = [];
                if (el.hasAttachedFields) {
                  list.push(<div className='config-font colspan' key={el.id}>
                      {this.label(el.label)}
                      <span>:</span>
                      {this.value(el)}
                    </div>,
                  );
                  console.log(el);
                  if (el.attached[el.value]) {
                    el.attached[el.value].map((ite, ind) => {
                      list.push(
                        <div className='config-font' key={ite.id}>
                          {this.label(ite.label)}
                          <span>:</span>
                          {this.value(ite)}
                        </div>,
                      );
                    });
                  }
                  return list;
                } else if (el.line == 1 || el.type == 'TEXT' || el.type == 'CHECKBOX' || el.type == 'RADIO' ||
                                el.type == 'ADDRESS' || (el.type == 'SELECT' && el.name == 'car.id') ) {
                  list.push(<div className='config-font colspan' key={el.id}>
                      {this.label(el.label)}
                      <span>:</span>
                        {this.value(el,'line')}
                    </div>,
                  );
                  return list;
                }
                else {
                  list.push(<div className='config-font ' key={el.id}>
                      {this.label(el.label)}
                      <span>:</span>
                      {this.value(el)}
                    </div>,
                  );
                  return list;
                }
              })
              }
            </div>
          </div>,
        );

      });
    }
    return (
      <div>
        {this.state.Component}
      </div>
    );
  }
}
