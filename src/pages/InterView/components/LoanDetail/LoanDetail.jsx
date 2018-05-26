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

    if (params.id) {
      actions.getDetail(params.id);
    }
    console.log(this.props.params.id);

  }

  // 取消
  handleCancel() {
  }

  //标题点击
  titleClick = (index, name) => {
    // e.preventDefault();
    this.setState({
      index: index,
    });
    this.scrollToAnchor(name);
  };
  //渲染标题
  renderTitle = (data) => {
    console.log(data);
    const list = [];
    const titleList = [];
    if (!this.isEmptyObject(data)) {
      var materialsFalg = false;//材料标志falg
      var trackFalg = false;//轨迹标志falg
      data.map((el, i) => {
        if (el.name == '材料提交') {
          materialsFalg = true;
        }
        if (el.name == '流程轨迹') {
          trackFalg = true;
        }
        titleList.push(el);
      });
      if (!trackFalg) {
        titleList.unshift({ name: '流程轨迹', fields: [] });
      }
      if (!materialsFalg) {
        titleList.push({ name: '材料提交', fields: [] });
      }

      titleList.map((item, index) => {
        var btnClass = classNames({
          'active': this.state.index == index,
        });
        list.push(
          <li key={index}><a className={btnClass} onClick={this.titleClick.bind(this, index, item.name)}>{item.name}</a>
          </li>,
        );
      });
    }
    return list;
  };

  //title跳转
  scrollToAnchor = (anchorName) => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if (anchorElement) {
        anchorElement.scrollIntoView();
      }
    }
  };

  //判断Json是否为kong
  isEmptyObject(e) {
    var t;
    for (t in e) {
      return false;
    }
    return true;
  }

  //新增列表一列传递的方法
  addColumn = (data) => {
    this.setState({
      tableList: data,
    });
  };
  //提交
  submit = (e, data) => {
    e.preventDefault();
    this.field.validate((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('Submit!!!');
      for (var key in values) {
        if (values[key] != undefined) {
          if (values[key] != 'undefined') {
            // if(this.isCheckBox(key)){
            //   console.log("多选")
            //   console.log(values[key])
            //   // alert("123")
            //   if(typeof (values[key]) == 'object'){
            //     values[key] = values[key].join(',');
            //   }
            // }
            this.queryCache[key] = values[key];
          }
        }
      }
      console.log(this.queryCache);
      var dataJson = {
        'choose': data.choose,
        'approveMsg': data.approveMsg,
        // "loanDetail" : this.queryCache,
        businessId: this.props.routeParams.id,
        // "proInstId"  : this.props.params.proInstId,
        // "taskId"     : this.props.params.taskId,
      };
      console.log(dataJson);
      Req.submitReview(dataJson)
        .then((res) => {
          if (res && res.code == 200) {

            hashHistory.push(`creditinformation`);
            Toast.show({
              type: 'success',
              content: '提交成功～',
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  //是否为复选框
  isCheckBox(key) {
    let list = this.props.details.list;
    for (var i = 0; i < list.length; i++) {
      for (var j = 0; j < list[i].fields.length; j++) {
        if (list[i].fields[j].type == 'CHECKBOX' && list[i].fields[j].name == key) {
          return true;
        }
      }
    }
    return false;
  }

  //返回
  back = (e) => {
    e.preventDefault();
    hashHistory.push('/reviewApprove');
  };
  renderField = (el) => {
    if (el.type == 'STRING') {
      return (<Input disabled size="large" className="custom-input" value={el.value}/>);
    }
    else if (el.type == 'SELECT') {
      if (el.value) {
        if (el.options) {
          for (var i = 0; i < el.options.length; i++) {
            if (el.options[i].value = el.value) {
              return (<Input disabled size="large" className="custom-input" value={el.label}/>);
            }
          }
        } else {
          return (<Input disabled size="large" className="custom-input" value={el.value}/>);
        }
      } else {
        return (<Input disabled size="large" className="custom-input" value={el.value}/>);
      }
    }
    else if(el.type == 'SELECT'){

    }
    return (<span></span>);
  };

  /**
   * 渲染
   */
  render() {
    const details = this.props.details || [];
    console.log(details);
    return (
      <div className='pch-form'>
        <Form>
          {
            details.list && details.list.length > 0 ? details.list.map(item => {
              return (
                <IceContainer key={item.name} title={item.name} className='subtitle LoanDetail' style={styles.bg}>
                  <Row wrap>
                    {
                      item.fields && item.fields.map((el) => {
                        return (
                          <Col {...this.colspans} key={el.name}>
                            <FormItem {...formItemLayout} label={<span> {el.label}:</span>}>

                              {
                                this.renderField(el)
                              }
                            </FormItem>
                          </Col>
                        );
                      })
                    }


                  </Row>

                </IceContainer>
              );


            }) : (<span></span>)
          }

        </Form>
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
