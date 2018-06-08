import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import classNames from 'classnames';
import { Grid, Form, Button, Field, Radio, Upload } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import DataBinder from '@icedesign/data-binder/lib/index';
import { browserHistory, hashHistory } from 'react-router';
import FormRender from './FormRender';
import './LoanApplication.scss';
import Req from '../../reqs/EntryQueryReq';
import { Feedback } from '@icedesign/base/index';

const { Row, Col } = Grid;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { DragUpload } = Upload;
const Toast = Feedback.toast;
export default class LoanApplication extends Component {
  static displayName = 'LoanApplication';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.field = new Field(this, {
      autoUnmount: true,
    });
    this.state = {
      index: 0,
      tableList: [],
      visible: false,
      value: {},
      dataSource: [],
      data: [],
      disabled :false
    };
    // 请求参数缓存
    this.queryCache = {};
  }

  componentWillMount() {
    this.queryCache.id = this.props.params.id;
    this.fetchData();
  }

  //请求数据
  fetchData = (flag) => {
    let { actions } = this.props;

    this.getProductNum();
    Req.getDetail(
      {
        id: this.props.params.id,
        // step: 1,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          data: res.data.list,
          hasCollection: res.data && res.data.hasCollection,
        });
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          content: error.msg,
        });
      });
  };

  //获取产品列表
  getProductNum() {
    const limit = 990;
    Req.getProductNumApi(limit)
      .then((res) => {
        if (res.data && res.code == '200') {
          console.log(res);
          const { data } = res;
          const { list = [] } = data;
          let dataSource = list && list.map((el) => {
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
    const list = [];
    if (data) {
      data.map((item, index) => {
        var btnClass = classNames({
          'active': this.state.index == index,
        });
        list.push(
          <a key={index} className={btnClass} onClick={this.titleClick.bind(this, index, item.name)}>{item.name}</a>,
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

  //save
  save = (str) => {
    this.field.validate((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('Submit!!!');
      // console.log(values);
      for (var key in values) {
        if (values[key] != undefined) {
          if (values[key] != 'undefined') {
            if (this.isCheckBox(key)) {
              console.log('多选');
              console.log(values[key]);
              // alert("123")
              if (typeof (values[key]) == 'object') {
                values[key] = values[key].join(',');
              }
            }
            if (values[key] != '') {
              this.queryCache[key] = values[key];
            }

          }
        }
      }
      console.log(this.queryCache);
      if(str == 'submit'){
        this.queryCache['id'] = this.props.params.id
        this.queryCache['status'] = 'SUBMIT'
      }
      // this.queryCache.status = 'save'
      this.setState({
        disabled : true
      })
      Req.saveFrom(this.queryCache)
        .then((res) => {
          this.setState({
            disabled : false
          })
          if(str == 'submit'){
            Req.tipSuccess('提交成功');
            hashHistory.push('/entryQuery');
          }else{
            hashHistory.push('/MaterialSubmit/' + this.props.params.id);
          }
        })
        .catch((error) => {
          this.setState({
            disabled : false
          })
          Req.tipError(error.msg)
        });
    });
  };

  //判断是否为CheckBox
  isCheckBox(key) {
    // console.log(this.props.detail.list);
    let list = this.state.data;
    for (var i = 0; i < list.length; i++) {
      for (var j = 0; j < list[i].fields.length; j++) {
        if (list[i].fields[j].type == 'CHECKBOX' && list[i].fields[j].name == key) {
          return true;
        }
      }
    }
    return false;
  }

  //新增列表一列传递的方法
  addColumn = (data) => {
    this.setState({
      tableList: data,
    });
  };

  render() {
    // const details = this.props.detail || {};
    const { data = [] } = this.state;
    console.log(data);
    const init = this.field.init;
    const { dataSource = [] } = this.state;
    return (
      <IceContainer className="loanApplication pch-container">
        <legend className="pch-legend">
          <span className="pch-legend-legline"></span>车贷申请
        </legend>

        <div className='pch-form'>
          <IceFormBinderWrapper value={this.state.value} onChange={this.formChange}>
            <Row>
              <Col className='review-form'>
                <div className='review-page'>
                  <div className='title'>
                    <ul>
                      {this.renderTitle(data)}
                    </ul>
                  </div>
                </div>
                <div className="rcontent-edito modify-form">
                  <IceFormBinderWrapper
                    value={this.state.value}
                    onChange={this.formChange}
                  >
                    <Form
                      labelAlign="left"
                      field={this.field}
                      size="large"
                    >
                      <FormRender {...this.props} data={data} init={init} productList={dataSource}
                                  field={this.field} addColumn={this.addColumn.bind(this)}></FormRender>
                      <div className='botton-box pch-form-buttons'>
                        {
                          this.state.hasCollection ? (
                              <Button size="large" type="secondary" disabled={ this.state.disabled}  onClick={this.save.bind(this,'save')}>下一步</Button>
                            ) :
                            (
                              <Button size="large" type="secondary"  disabled={ this.state.disabled} onClick={this.save.bind(this,'submit')}>提交</Button>
                            )
                        }

                      </div>
                    </Form>
                  </IceFormBinderWrapper>


                </div>
              </Col>
            </Row>
          </IceFormBinderWrapper>
        </div>

      </IceContainer>
    );
  }
}
const styles = {
  bg: {
    backgroundColor: '#fffffB',
  },

};
