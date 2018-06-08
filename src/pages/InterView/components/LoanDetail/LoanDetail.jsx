import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';

import { Form, Icon, Input, Button, Checkbox, Select, Switch, Radio, Grid, Field, Dialog } from '@icedesign/base';

const { Row, Col } = Grid;
const Toast = Feedback.toast;
const FormItem = Form.Item;
import {
  FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder, FormError as IceFormError,
} from '@icedesign/form-binder';
import { Title } from 'components';

import FormRender from './FormRender';
import MaterialSubmit from './MaterialSubmit';
import classNames from 'classnames';
import Req from '../../reqs/InterViewReq';
import { Feedback } from '@icedesign/base/index';
import './LoanDetail.scss';

const formItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};

export default class LoanDetail extends Component {
  constructor(props) {
    super(props);
    this.field = new Field(this);
    this.state = {
      index: 0,
      dataSource:[]
    };
    // 请求参数缓存
    this.queryCache = {};
    this.colspans = {
      xxs: 24,
      xs: 12,
      l: 8,
      xl: 6,
    };
  }

  /**
   * 初始化
   */
  componentDidMount() {
    let { actions, params } = this.props;


      this.getProductNum()



  }
  //获取产品列表
  getProductNum() {
    const limit = 990;
    Req.getProductNumApi(limit)
      .then((res) => {
        if (res.data && res.code == '200') {
          console.log(res);
          const { data } = res;
          const { list } = data;
          let dataSource = list.map((el) => {
            return {
              id: el.id,
              label: el.name,
              value: el.productCode,
            };
          });
          console.log(dataSource);
          this.setState({
            dataSource,
          });
        }
      }, (error) => {

      });
  }

  //返回
  back = (e) => {

  };
  renderField = (el) => {
    if (el.type == 'SELECT') {
      if (el.value) {
        if (el.options) {
          for (var i = 0; i < el.options.length; i++) {
            if (el.options[i].value == el.value) {
              return (
                <Col {...this.colspans} key={el.name}>
                  <FormItem {...formItemLayout} label={<span> {el.label}:</span>}>
                    <Input disabled size="large" className="custom-input" value={el.options[i].label}/>
                  </FormItem>
                </Col>
              );
            }
          }
        }
        else {
          if(el.name =='productCode'){
            var value = '';
            this.state.dataSource.map(item=>{
              if(el.value == item.value){
                value = item.label
              }
            })
            return (
              <Col {...this.colspans} key={el.name}>
                <FormItem {...formItemLayout} label={<span> {el.label}:</span>}>
                  <Input disabled size="large" className="custom-input" value={value}/>
                </FormItem>
              </Col>
            );
          }
          return (
            <Col {...this.colspans} key={el.name}>
              <FormItem {...formItemLayout} label={<span> {el.label}:</span>}>
                <Input disabled size="large" className="custom-input" value={el.value}/>
              </FormItem>
            </Col>
          );
        }
      } else {
        return (
          <Col {...this.colspans} key={el.name}>
            <FormItem {...formItemLayout} label={<span> {el.label}:</span>}>
              <Input disabled size="large" className="custom-input" value={el.value}/>
            </FormItem>
          </Col>
        );
      }
    }
    else if (el.type == 'RADIO') {
      if (el.options) {
        var list = [];
        for (var i = 0; i < el.options.length; i++) {
          if (el.options[i].value == el.value) {
            list.push(
              <Col {...this.colspans} key={el.name}>
                <FormItem {...formItemLayout} label={<span> {el.label}:</span>}>
                  <Input disabled size="large" className="custom-input" value={el.options[i].label}/>
                </FormItem>
              </Col>,
            );
            if (el.hasAttachedFields && el.attached[el.value]) {
              el.attached[el.value].map((e, i) => {
                list.push(
                  <Col {...this.colspans} key={i}>
                    <FormItem {...formItemLayout}  label={<span> {e.label}:</span>}>
                      <Input key={i} disabled  className="custom-input" value={e.value}/>
                    </FormItem>
                  </Col>,
                );
              });
            }
            return list;
          }
        }
      } else {
        return (<Input disabled size="large" className="custom-input" value={el.value}/>);
      }
    }
    return (
      <Col {...this.colspans} key={el.name}>
        <FormItem {...formItemLayout} label={<span> {el.label}:</span>}>
          <Input disabled size="large" className="custom-input" value={el.value}/>
        </FormItem>
      </Col>
    );
  };
  goContract() {
    let { formData ={},contract,id,contractId } = this.props ;
    window.open(`${location.origin}/#/contractedit/edit/${contractId}`,'_blank');
  }
  /**
   * 渲染
   */
  render() {
    const formData = this.props.formData || [];
    const contract = this.props.contract;
    console.log(formData);
    return (
      <div className='LoanDetail pch-container'>
        <div className='pch-form'>
          <Form size="large">
            {
              formData.list && formData.list.length > 0 ? formData.list.map(item => {
                return (
                  <IceContainer key={item.name} title={item.name} className='subtitle LoanDetail' style={styles.bg}>
                    <Row wrap>
                      {
                        item.fields && item.fields.map((el) => {
                          return this.renderField(el);
                        })
                      }


                    </Row>

                  </IceContainer>
                );


              }) : (<span></span>)
            }

          </Form>
        </div>
        {
          contract=='1'? (
            <div className='file'>
              <a onClick={this.goContract.bind(this)}  target='_blank'>编辑待签名文件</a>
            </div>
          ) : (
            <span></span>
          )
        }
      </div>
    );
  }
}
const styles = {
  widthbg: {
    backgroundColor: '#fffffB',
  },
  informationBG: {
    background: '#FFFCF7',
    paddingBottom: 0,
  },
  width: {
    width: '100%',
  },
  titleWidth: {
    maxHeight: '135px',
    width: '120px',
  },
};
