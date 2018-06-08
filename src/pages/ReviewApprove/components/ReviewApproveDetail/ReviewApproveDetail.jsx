import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Loading, Select, Feedback } from '@icedesign/base';
// import  Detail from './Detail/index'
// import  MaterialSubmit from './MaterialSubmit/index'
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import EntryTrack from './EntryTrack/index';
import ApprovalBox from './ApprovalBox/index';
import FormRender from './FormRender/index';
import MaterialSubmit from './MaterialSubmit/index';

import './ReviewApproveDetail.scss';
import { browserHistory, hashHistory } from 'react-router';
import classNames from 'classnames';
import { Field } from '@icedesign/base/index';
import Req from '../../reqs/ReviewApproveReq';

const { Row, Col } = Grid;
const Toast = Feedback.toast;

export default class ReviewApproveDetail extends Component {
  static displayName = 'ReviewApproveDetail';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.field = new Field(this);
    this.state = {
      index: 0,
      value: {},
      dataList: {},
      result: {},
      _list: [],
      dataSource: [],
      disabled : false
    };
    // 请求参数缓存
    this.queryCache = {};
  }

  componentDidMount() {
    this.fetchData();

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
          <li><a key={index} className={btnClass} onClick={this.titleClick.bind(this, index, item.name)}>{item.name}</a>
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

  //返回
  back = (e) => {
    e.preventDefault();
    hashHistory.push('/reviewApprove');
  };
  //请求数据
  fetchData = () => {
    let { actions } = this.props;
    // console.log(this.props)

    actions.getTrackDetail({
      businessId: this.props.params.id,
      isApproveInfo: true,
    });

    actions.getDetail(this.props.params.id);
    this.getProductNum();

  };

  //获取产品列表
  getProductNum() {
    const limit = 990;
    Req.getProductNumApi(limit)
      .then((res) => {
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
      }, (error) => {
        Req.tipError(error.msg)
      });
  }

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
      console.log(values);
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
            this.queryCache[key] = values[key];
          }
        } else {
          this.queryCache[key] = null;
        }
      }
      console.log(this.queryCache);
      console.log(this.props.detail.list);
      // var _josn ={}
      // this.props.detail.list.map(item=>{
      //   item.fields.map(el=>{
      //     _josn[el.name] = el.label
      //   })
      // })

      var dataJson = {
        'choose': data.choose,
        'approveMsg': data.approveMsg,
        'changeFields': this.queryCache,
        'businessId': this.props.params.id,
        // "proInstId"  : this.props.params.proInstId,
        // "taskId"     : this.props.params.taskId,
      };
      console.log(dataJson);
      this.setState({
        disabled : true
      })
      Req.submitReview(dataJson)
        .then((res) => {
          this.setState({
            disabled : false
          })
          hashHistory.push(`reviewApprove/3`);
          Toast.show({
            type: 'success',
            content: '提交成功～',
          });
        })
        .catch((error) => {
          this.setState({
            disabled : false
          })
          Toast.show({
            type: 'error',
            content: error.msg,
          });
        });
    });
  };

  //是否为复选框
  isCheckBox(key) {
    let list = this.props.detail.list;
    for (var i = 0; i < list.length; i++) {
      for (var j = 0; j < list[i].fields.length; j++) {
        if (list[i].fields[j].type == 'CHECKBOX' && list[i].fields[j].name == key) {
          return true;
        }
      }
    }
    return false;
  }

  //渲染
  render() {
    const details = this.props.detail || {};
    const chooseMap = this.props.trackDetail ? this.props.trackDetail.chooseMap : {};
    const { dataSource = [] } = this.state;
    const init = this.field.init;
    return (
      <IceContainer title="进件审批查询-审批（平常风控）-流程轨迹" className='subtitle pch-container ReviewApproveDetail' style={styles.bg}>
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


              <div className="rcontent-edito modify-form">
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
                    <FormRender {...this.props} data={details.list} init={init} field={this.field} productList={dataSource}
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
              <ApprovalBox disabled={ this.state.disabled} {...this.props} reviewList={chooseMap} submit={this.submit.bind(this)} ></ApprovalBox>
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
