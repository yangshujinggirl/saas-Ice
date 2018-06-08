import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';

import { Form, Icon, Input, Button, Checkbox, Select, Switch, Radio, Grid, Field, Dialog } from '@icedesign/base';

const { Row, Col } = Grid;
const Toast = Feedback.toast;

import {
  FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder, FormError as IceFormError,
} from '@icedesign/form-binder';
import { Title } from 'components';

import EntryTrack from '../../components/EntryTrack';
import FormRender from '../../components/FormRender';
import MaterialSubmit from '../../components/MaterialSubmit';
import ApprovalBox from '../../components/ApprovalBox';
import classNames from 'classnames';
import Req from '../../reqs/CreditInformationReq';
import { Feedback } from '@icedesign/base/index';
import './CreditInformationDetail.scss';

export default class CreditInformationDetail extends Component {
  constructor(props) {
    super(props);
    this.field = new Field(this);
    this.state = {
      index: 0,
      dataSource: [],
    };
    // 请求参数缓存
    this.queryCache = {};
  }

  /**
   * 初始化
   */
  componentDidMount() {
    let { actions, params } = this.props;

    if (params.id) {
      actions.getDetail(params.id);
      actions.getTrackDetail({
        businessId: this.props.routeParams.id,
        isApproveInfo: true,
      });
      this.getProductNum();

    }
    console.log(this.props.params.id);

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
        Req.tipError(error.msg)
      });
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
    this.setState({
      disabled: true,
    });
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
      this.setState({
        disabled: true,
      });
      Req.submitReview(dataJson)
        .then((res) => {
          this.setState({
            disabled: false,
          });
          hashHistory.push(`creditinformation`);
          Toast.show({
            type: 'success',
            content: '提交成功～',
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            disabled: false,
          });
          Req.tipError(error.msg)
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
    hashHistory.push('/reviewApprove/10');
  };

  /**
   * 渲染
   */
  render() {
    const details = this.props.details || {};
    const chooseMap = this.props.trackDetail ? this.props.trackDetail.chooseMap : {};
    console.log(chooseMap);
    const { dataSource = [] } = this.state;
    const init = this.field.init;
    return (
      <IceContainer title="进件审批查询-征信详情" className='subtitle credit-informartion' style={styles.bg}>
        <div className='pch-form'>
          <Row>
            <Col span="19" className='review-form'>
              <div className='review-page'>
                <div className='title'>
                  <ul style={styles.titleWidth}>
                    {this.renderTitle(details.list)}
                  </ul>
                </div>
              </div>

              <div className="rcontent-edito modify-form" style={styles.width}>
                <div className='review-detail' id='流程轨迹'>
                  <span className='name'>流程轨迹</span>
                  <EntryTrack {...this.props} ></EntryTrack>
                </div>

                <IceFormBinderWrapper
                  value={this.state.value}
                  onChange={this.formChange}
                >
                  <Form
                    labelAlign="left"
                    field={this.field}
                    size="large"
                  >
                    <FormRender {...this.props} data={details.list} init={init} field={this.field}
                                productList={dataSource}
                                addColumn={this.addColumn.bind(this)}></FormRender>
                  </Form>
                </IceFormBinderWrapper>
                <div className='review-detail' id='材料提交'>
                  <span className='name'>材料提交</span>
                  <MaterialSubmit {...this.props}></MaterialSubmit>
                </div>
                <div className='botton-box pch-form-buttons'>
                  <Button size="large" type="secondary" onClick={this.back}>返回</Button>
                </div>
              </div>

            </Col>
            <Col span="5" className='audit-information'>
              <ApprovalBox disabled={this.state.disabled} {...this.props} reviewList={chooseMap}
                           submit={this.submit.bind(this)}></ApprovalBox>
            </Col>
          </Row>

        </div>
      </IceContainer>
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
