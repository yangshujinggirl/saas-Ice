import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';

import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Select,
  Switch,
  Balloon,
  Grid,
  Field,
  Dialog,
  Upload,
} from '@icedesign/base';

const { Row, Col } = Grid;
const { DragUpload, ImageUpload } = Upload;
const FormItem = Form.Item;
const Toast = Feedback.toast;

import {
  FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder, FormError as IceFormError,
} from '@icedesign/form-binder';
import { Title } from 'components';
import './CreditInformationForm.scss';
import { Feedback } from '@icedesign/base/index';
import Req from '../../reqs/CreditInformationReq';
import { BaseComponent } from 'base';

const formItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};

export default class CreditInformationForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: {},
      opption: [
        { label: '是', value: 'Y' },
        { label: '否', value: 'N' },
      ],
      dataList: [
        {
          'label': '正常',
          'value': 'NORMAL',
        },
        {
          'label': '无贷款',
          'value': 'NONE',
        },
        {
          'label': '呆账',
          'value': 'BAD_DEBTS',
        },
        {
          'label': '损失',
          'value': 'LOSS',
        },
        {
          'label': '可疑',
          'value': 'SUSPICIOUS',
        },
        {
          'label': '次级',
          'value': 'SECONDARY',
        },
        {
          'label': '关注',
          'value': 'CONCERN',
        },
        {
          'label': '已转出',
          'value': 'OUT',
        },
        {
          'label': '已结清',
          'value': 'CLEAR',
        },
      ],
      formData: {},
      fileList: [],
      upLoadList: [],
      difflist: [],
      flowFlag: 0,

    };
    this.field = new Field(this);
  }

  /**
   * 初始化
   */
  componentDidMount() {
    let { actions, params } = this.props;

    if (params.id) {
      //请求征信接口
      Req.getCreditDetail(params.id)
        .then((res) => {
            this.setState({
              formData: res.data,
            });
            if (res.data.baseDocuments) {
              res.data.baseDocuments.map(item => {
                item.downloadURL = item.location;
                item.fileURL = item.location;
                item.imgURL = item.location;
                item.type = item.type;
              });
              this.setState({
                fileList: res.data.baseDocuments,
              });
            }
            //判断第几个人录入 1 代表第一个  2代表第二个
            console.log(res.data.flowFlag);
            if (res.data.flowFlag) {
              this.setState({
                flowFlag: res.data.flowFlag,
              });
            }
            if (res.data.diffArrStr) {
              //处理不同字段
              this.checkDiff(res.data.diffArrStr);
            }
        })
        .catch((error) => {
          console.log(error);
          Toast.show({
            type: 'error',
            content: error.msg,
          });
        });
    }
  }

  //表单校验change
  formChange = value => {
    this.props.formData = value;
  };

  //保存
  submit = () => {
    this.formRef.validateAll((error, value) => {
      if (error) {
        // 处理表单报错
        return;
      }
      value['loanId'] = this.props.params.id;
      value['baseDocuments'] = [];
      //判断是否为第一个人
      if (this.state.flowFlag == 1) {
        this.state.fileList.map(item => {
          value.baseDocuments.push({
            description: '',
            size: item.size,
            fileName: item.fileName,
            location: item.downloadURL,
            type: item.type,
          });
        });
        console.log(value);
        if (value.baseDocuments.length > 0) {
          this.postData(value)
        } else {
          Toast.show({
            type: 'help',
            content: '请上传文件～',
          });
        }
      } else {
        this.postData(value);
      }

    });
  };
  //保存征信信息
  postData = (value) => {
    Req.postDiff(value)
      .then((res) => {
          if (res.data.diffArrStr) {
            //处理不同字段
            this.checkDiff(res.data.diffArrStr);

            //征信两次不一致弹框
            const dialogConfirm = Dialog.confirm({
              needWrapper: false,
              content: '两次征信数据不一致，是否确认提交数据？',
              title: '提示',
              onOk: () => {
                dialogConfirm.hide();
                Req.saveForm(value)
                  .then((res) => {
                      this.alert();
                  })
                  .catch((error) => {
                    Toast.show({
                      type: 'error',
                      content: error.msg,
                    });
                  });
              },
            });
          } else {
            const dialog = Dialog.confirm({
              content: '是否确认提交数据？',
              onOk: () => {
                dialog.hide();
                return new Promise(resolve => {
                  Req.saveForm(value)
                    .then((res) => {
                        this.alert();
                    })
                    .catch((error) => {
                      Toast.show({
                        type: 'error',
                        content: error.msg,
                      });
                    });
                });
              },
            });
          }
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          content: error.msg,
        });
      });
  };
  //处理不同字段
  checkDiff = (str) => {
    var diffArr = str.split(',');
    if (diffArr.length > 0) {
      this.setState({
        difflist: diffArr,
      });
    }
  };
  //成功提示框
  alert = () => {
    const dialogAlert = Dialog.alert({
      needWrapper: false,
      content: '提交成功',
      title: '提示',
      onOk: () => {
        dialogAlert.hide();
        hashHistory.push(`reviewApprove/10`);
      },
    });
  };

  //验证 正整数 不限制数位
  isInteger = (rule, value, callback) => {
    if (value != 0) {
      if (rule.required && !value) {
        callback('请输入');
        return;
      }
    }
    if (value) {
      console.log(typeof (value));
      if (parseFloat(value) < 0 || String(value)
        .indexOf('.') > -1) {
        callback('只能输入正整数');
        return;
      }
    }
    callback();
  };
  //金额 验证
  priceRange = (rule, value, callback) => {
    if (value != 0) {
      if (rule.required && !value) {
        callback('请输入');
        return;
      }
    }
    if (value && isNaN(value)) {
      callback('只能填写数字');
      return;
    } else if (value && !isNaN(value) && parseFloat(value) < 0) {
      callback('不能小于0');
      return;
    } else if (value && !isNaN(value) && parseFloat(value) > 9999999999999999) {
      callback('不能超过9999999999999999');
      return;
    }
    callback();
  };

  //判断Json是否为kong
  isEmptyObject(e) {
    var t;
    for (t in e) {
      return false;
    }
    return true;
  }

  //判断图片类型
  isImg(url) {
    return /(\.gif|\.png|\.jpg|\.jpeg)+$/i.test(url);
  }

  //上传文件改变时调用
  handleFileChange(info) {
    console.log(info);
    info.fileList.map(item => {
      if (item.status == 'done') {
        // item.size = item.response.size;
        item.downloadURL = item.imgURL;
        item.fileURL = item.imgURL;
        item.type = item.response.type;
        // if (this.isImg(item.imgURL)) {
        //   item.size = item.originFileObj.size;
        //   item.downloadURL = item.imgURL;
        //   item.fileURL = item.imgURL;
        // } else {
        //   if (item.downloadURL) {
        //     item.size = item.originFileObj.size;
        //     item.downloadURL = item.downloadURL;
        //     item.fileURL = item.downloadURL;
        //     item.type = item.response.type;
        //     item.imgURL = '/public/images/creditInformation/filed.png';
        //   }
        //   else {
        //     item.size = item.originFileObj.size;
        //     item.downloadURL = item.imgURL;
        //     item.fileURL = item.imgURL;
        //     item.type = item.response.type;
        //     item.imgURL = '/public/images/creditInformation/filed.png';
        //   }
        // }
      }
    });
    this.setState(
      { fileList: info.fileList },
    );
  }

  //移除文件时调用
  onRemove(info) {

    var arr = this.state.fileList;
    if (this.state.flowFlag == 1) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].downloadURL == info.downloadURL) {
          arr.splice(i, 1);
          i--;
        }
      }
    } else {
      Toast.show({
        type: 'help',
        content: '不能删除文件',
      });
    }
    this.setState({
      fileList: arr,
    });
  }

  //验证是否为不一致字段
  checkFiled = (str, key) => {
    if (str == 'input') {
      if (this.state.difflist.length > 0) {
        for (var i = 0; i <= this.state.difflist.length; i++) {
          if (this.state.difflist[i] == key) {
            return (
              <Input trim state='error' size="large" htmlType='number' placeholder="请输入" className="custom-input"/>);
          }
        }
      }
      return (<Input trim size="large" htmlType='number' placeholder="请输入" className="custom-input"/>);


    }
    if (str == 'select') {
      if (this.state.difflist.length > 0) {
        for (var i = 0; i <= this.state.difflist.length; i++) {
          if (this.state.difflist[i] == key) {
            if (key == 'loanAccountStatus') {
              return (
                <Select style={styles.diff} size="large" placeholder="请选择" className="custom-input"
                        dataSource={this.state.dataList}/>);
            }
            return (
              <Select style={styles.diff} size="large" placeholder="请选择" className="custom-input"
                      dataSource={this.state.opption}/>);
          }
        }
      }
      if (key == 'loanAccountStatus') {
        return (
          <Select size="large" placeholder="请选择" className="custom-input"
                  dataSource={this.state.dataList}/>);
      }
      return (<Select size="large" placeholder="请选择" className="custom-input"
                      dataSource={this.state.opption}/>);

    }
  };


  /**
   * 渲染
   */
  render() {
    let { list = {} } = this.props.details || {};
    let { fileList, tableList, dataSource } = this.state;
    let { differentFiled = {} } = this.state.value;
    console.log(differentFiled);
    let  arr = []
    fileList && fileList.map((item) => {
      arr.push({
        ...item,
        imgURL: this.isImg(item.imgURL) ? item.imgURL : '/public/images/creditInformation/filed.png',
      })

    });


    // console.log(list)

    // let {formData = {}} = this.props;
    return (
      <IceContainer className="pch-container report">
        <Title title="人行报告"/>
        <IceFormBinderWrapper value={this.state.formData} onBlur={this.formChange} ref={(formRef) => {
          this.formRef = formRef;
        }}>
          <div className='pch-form'>
            <div className="material-files-upload">
              <Upload
                {...this.UPLOAD_CONFIG}
                className='material-files-upload-upload'
                fileList={fileList}
                showUploadList={false}
                url="/saas/file/upload"
                disabled={this.state.flowFlag != 1}
                // limit ='10'
                onChange={this.handleFileChange.bind(this)}
              >
                <div className="material-files-upload-button">
                  <div className="icon material-files-upload-button-icon">&#xe628;</div>
                  <p className="material-files-upload-button-text">将文件拖到此处，或<em>点击上传</em></p>
                </div>
              </Upload>
            </div>
            <ImageUpload
              onRemove={this.onRemove.bind(this)}
              className='upload-picture  upload-picture-list'
              listType="picture-card"
              fileList={arr}
            />
            <Form>
              <Row wrap>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>姓名:</span>}>
                    <IceFormBinder
                      name="name"
                      message="请输入"
                    >

                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="name"/></div>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>证件号码:</span>}>
                    <IceFormBinder
                      name="credentialsNo"
                      message="请输入"
                    >

                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>
                    </IceFormBinder>
                    <div><IceFormError name="credentialsNo"/></div>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>手机号码:</span>}>
                    <IceFormBinder
                      name="mobilePhone"
                      message="请输入"
                    >
                      <Input disabled size="large" placeholder="请输入" className="custom-input"/>

                    </IceFormBinder>
                    <div><IceFormError name="mobilePhone"/></div>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout}
                            label={<span> <span className="label-required">*</span>主贷人中征信评分:</span>}>
                    <Balloon style={styles.box} trigger={
                      <div>
                        <IceFormBinder
                          name="customCreditScore"
                          required
                          validator={this.priceRange}
                        >
                          {this.checkFiled('input', 'customCreditScore')}
                          {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}

                        </IceFormBinder>
                        <div><IceFormError name="customCreditScore"/></div>
                      </div>
                    } triggerType="focus">
                      <img src="/public/images/creditInformation/customCreditScore.png" alt=""/>
                    </Balloon>

                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>近3个月贷款审批或信用卡审批查询次数</span>
                  }>
                    <Balloon align='bl'
                             style={styles.box}
                             trigger={
                               <div>
                                 <IceFormBinder
                                   name="threeMonApproveCount"
                                   required
                                   validator={this.isInteger}
                                 >
                                   {this.checkFiled('input', 'threeMonApproveCount')}
                                   {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}

                                 </IceFormBinder>
                                 <div><IceFormError name="threeMonApproveCount"/></div>

                               </div>
                             } triggerType="focus">
                      <img src="/public/images/creditInformation/threeMonApproveCount.png" alt=""/>
                    </Balloon>

                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>信用报告是否空白</span>}>
                    <IceFormBinder
                      name="creditIsBlank"
                      message="请选择"
                      required
                    >
                      {this.checkFiled('select', 'creditIsBlank')}

                    </IceFormBinder>
                    <div><IceFormError name="creditIsBlank"/></div>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout}
                            label={<span className="tip"> <span className="label-required">*</span>信用卡当前逾期总额(元)</span>}>


                    <Balloon style={styles.box} trigger={
                      <div>
                        <IceFormBinder
                          name="creditAmountPastDue"
                          required
                          validator={this.priceRange}
                        >
                          {this.checkFiled('input', 'creditAmountPastDue')}
                          {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}

                        </IceFormBinder>
                        <div><IceFormError name="creditAmountPastDue"/></div>
                      </div>

                    } triggerType="focus">
                      <img src="/public/images/creditInformation/creditAmountPastDue.png" alt=""/>
                    </Balloon>

                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout}
                            label={<span> <span className="label-required">*</span>贷款当前逾期总额(元)</span>}>


                    <Balloon style={styles.box} trigger={
                      <div>
                        <IceFormBinder
                          name="loanAmountExpDue"
                          required
                          validator={this.priceRange}
                        >
                          {this.checkFiled('input', 'loanAmountExpDue')}
                          {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                        </IceFormBinder>
                        <div><IceFormError name="loanAmountExpDue"/></div>

                      </div>

                    } triggerType="focus">
                      <img src="/public/images/creditInformation/loanAmountExpDue.png" alt=""/>
                    </Balloon>

                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>以资抵偿(元)</span>}>


                    <Balloon align='bl' style={styles.box} trigger={
                      <div>
                        <IceFormBinder
                          name="pledgeOfAssets"
                          required
                          validator={this.priceRange}
                        >
                          {this.checkFiled('input', 'pledgeOfAssets')}
                          {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                        </IceFormBinder>
                        <div><IceFormError name="pledgeOfAssets"/></div>
                      </div>
                    } triggerType="focus">
                      <img src="/public/images/creditInformation/pledgeOfAssets.png" alt=""/>
                    </Balloon>

                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout}
                            label={<span> <span className="label-required">*</span>呆账信用卡余额(元)</span>}>

                    <Balloon style={styles.box} trigger={
                      <div>
                        <IceFormBinder
                          name="creditBadDebtsMaxAmount"
                          required
                          validator={this.priceRange}
                        >
                          {this.checkFiled('input', 'creditBadDebtsMaxAmount')}
                          {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                        </IceFormBinder>
                        <div><IceFormError name="creditBadDebtsMaxAmount"/></div>
                      </div>

                    } triggerType="focus">
                      <img src="/public/images/creditInformation/creditBadDebtsMaxAmount.png" alt=""/>
                    </Balloon>

                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>贷款账户状态</span>}>

                    <Balloon align='lb' style={styles.box} trigger={
                      <div>
                        <IceFormBinder
                          name="loanAccountStatus"
                          required
                          type="string"
                          message="请输入"
                        >
                          {this.checkFiled('select', 'loanAccountStatus')}
                          {/*<Select size="large" placeholder="请选择" className="custom-input"*/}
                          {/*dataSource={this.state.dataList}/>*/}
                        </IceFormBinder>

                      </div>

                    } triggerType="focus">
                      <img src="/public/images/creditInformation/loanAccountStatus.png" alt=""/>
                    </Balloon>
                    <div><IceFormError name="loanAccountStatus"/></div>

                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout}
                            label={<span> <span className="label-required">*</span>冻结信用卡余额(元)</span>}>


                    <Balloon align='bl' style={styles.box} trigger={
                      <div>
                        <IceFormBinder
                          name="creditFrozenMaxAmount"
                          required
                          validator={this.priceRange}
                        >
                          {this.checkFiled('input', 'creditFrozenMaxAmount')}
                          {/*<Input size="large" htmlType='number' placeholder="请选择" className="custom-input"/>*/}
                        </IceFormBinder>
                        <div><IceFormError name="creditFrozenMaxAmount"/></div>
                      </div>
                    } triggerType="focus">
                      <img src="/public/images/creditInformation/creditFrozenMaxAmount.png" alt=""/>
                    </Balloon>

                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>60天内信用卡或贷款审批查询次数</span>}>


                    <Balloon style={styles.box} trigger={
                      <div>
                        <IceFormBinder
                          name="twoMonApproveCount"
                          required
                          type="string"
                          validator={this.isInteger}
                        >
                          {this.checkFiled('input', 'twoMonApproveCount')}
                          {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                        </IceFormBinder>
                        <div><IceFormError name="twoMonApproveCount"/></div>
                      </div>
                    } triggerType="focus">
                      <img src="/public/images/creditInformation/twoMonApproveCount.png" alt=""/>
                    </Balloon>

                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>担保代偿(元)</span>}>

                    <Balloon style={styles.box} trigger={
                      <div>
                        <IceFormBinder
                          name="guaranteedCompensatory"
                          required
                          type="string"
                          validator={this.priceRange}
                        >
                          {this.checkFiled('input', 'guaranteedCompensatory')}
                          {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                        </IceFormBinder>
                        <div><IceFormError name="guaranteedCompensatory"/></div>
                      </div>
                    } triggerType="focus">
                      <img src="/public/images/creditInformation/guaranteedCompensatory.png" alt=""/>
                    </Balloon>


                  </FormItem>
                </Col>
              </Row>
              <Row wrap>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className="tip"> <span className="label-required">*</span>单笔信用卡最近24月内大于等于3的数字有几个</span>}>

                    <Balloon style={styles.box} trigger={
                      <div>
                        <IceFormBinder
                          name="creditTwoConsecutiveYear"
                          required
                          validator={this.isInteger}
                        >
                          {this.checkFiled('input', 'creditTwoConsecutiveYear')}
                          {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                        </IceFormBinder>
                        <div><IceFormError name="creditTwoConsecutiveYear"/></div>
                      </div>
                    } triggerType="focus">
                      <img src="/public/images/creditInformation/creditTwoConsecutiveYear.png" alt=""/>
                    </Balloon>

                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className="tip"> <span className="label-required">*</span>单笔信用卡最近12月内大于等于2的数字有几个</span>}>


                    <Balloon style={styles.box} trigger={
                      <div>
                        <IceFormBinder
                          name="creditOneConsecutiveYear"
                          required
                          validator={this.isInteger}
                        >
                          {this.checkFiled('input', 'creditOneConsecutiveYear')}
                          {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                        </IceFormBinder>
                        <div><IceFormError name="creditOneConsecutiveYear"/></div>
                      </div>

                    } triggerType="focus">
                      <img src="/public/images/creditInformation/creditOneConsecutiveYear.png" alt=""/>
                    </Balloon>

                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className="tip"> <span className="label-required">*</span>单笔信用卡最近6月内大于等于1的数字有几个</span>}>

                    <Balloon align='bl' style={styles.box} trigger={
                      <div>
                        <IceFormBinder
                          name="creditHalfConsecutiveYear"
                          required
                          validator={this.isInteger}

                        >
                          {this.checkFiled('input', 'creditHalfConsecutiveYear')}
                          {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                        </IceFormBinder>
                        <div><IceFormError name="creditHalfConsecutiveYear"/></div>
                      </div>
                    } triggerType="focus">
                      <img src="/public/images/creditInformation/creditHalfConsecutiveYear.png" alt=""/>
                    </Balloon>

                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className="tip"> <span className="label-required">*</span>单笔信用卡最近12月内大于等于1的数字有几个</span>}>


                    <Balloon style={styles.box} trigger={
                      <div>
                        <IceFormBinder
                          name="creditOneYear"
                          required
                          validator={this.isInteger}
                        >
                          {this.checkFiled('input', 'creditOneYear')}
                          {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                        </IceFormBinder>
                        <div><IceFormError name="creditOneYear"/></div>
                      </div>
                    } triggerType="focus">
                      <img src="/public/images/creditInformation/creditOneYear.png" alt=""/>
                    </Balloon>

                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout}
                            label={<span> <span className="label-required">*</span>2年内是否有贷款记录</span>}>

                    <Balloon align='lb' style={styles.box} trigger={
                      <div>
                        <IceFormBinder
                          name="twoIsLoanRecord"
                          required
                          type="string"
                          message="请输入"
                        >
                          {this.checkFiled('select', 'twoIsLoanRecord')}
                          {/*<Select size="large" placeholder="请选择" className="custom-input"*/}
                          {/*dataSource={this.state.opption}/>*/}
                        </IceFormBinder>
                      </div>

                    } triggerType="hover">
                      <img src="/public/images/creditInformation/twoIsLoanRecord.png" alt=""/>
                    </Balloon>
                    <div><IceFormError name="twoIsLoanRecord"/></div>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className="tip"> <span className="label-required">*</span>主贷人与共借人均不存在强制执行信息</span>}>

                    <Balloon align='lb' style={styles.box} trigger={
                      <div>
                        <IceFormBinder
                          name="customNonExistEnforce"
                          required
                          type="string"
                          message="请输入"
                        >
                          {this.checkFiled('select', 'customNonExistEnforce')}
                          {/*<Select size="large" placeholder="请选择" className="custom-input"*/}
                          {/*dataSource={this.state.opption}/>*/}
                        </IceFormBinder>
                        <div><IceFormError name="customNonExistEnforce"/></div>
                      </div>
                    } triggerType="hover">
                      <img src="/public/images/creditInformation/customNonExistEnforce.png" alt=""/>
                    </Balloon>

                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout}
                            label={<span> <span className="label-required">*</span>单笔贷款最大逾期期数</span>}>


                    <Balloon style={styles.box} trigger={
                      <div>
                        <IceFormBinder
                          name="loanMaxOverdue"
                          required
                          validator={this.isInteger}
                        >
                          {this.checkFiled('input', 'loanMaxOverdue')}
                          {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                        </IceFormBinder>
                        <div><IceFormError name="loanMaxOverdue"/></div>
                      </div>
                    } triggerType="focus">
                      <img src="/public/images/creditInformation/loanMaxOverdue.png" alt=""/>
                    </Balloon>

                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout}
                            label={<span className="tip"> <span className="label-required">*</span>单笔信用卡最大逾期期数</span>}>


                    <Balloon align='bl' style={styles.box} trigger={

                      <div>
                        <IceFormBinder
                          name="creditMaxOverdue"
                          required
                          validator={this.isInteger}
                        >
                          {this.checkFiled('input', 'creditMaxOverdue')}
                          {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                        </IceFormBinder>
                        <div><IceFormError name="creditMaxOverdue"/></div>
                      </div>

                    } triggerType="focus">
                      <img src="/public/images/creditInformation/creditMaxOverdue.png" alt=""/>
                    </Balloon>

                  </FormItem>
                </Col>

                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className="tip"> <span className="label-required">*</span>单笔贷款最近24月内大于等于3的数字有几个</span>}>


                    <Balloon align='bl' style={styles.box} trigger={
                      <div>
                        <IceFormBinder
                          name="loanTwoConsecutiveYear"
                          required
                          validator={this.isInteger}
                        >
                          {this.checkFiled('input', 'loanTwoConsecutiveYear')}
                          {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                        </IceFormBinder>
                        <div><IceFormError name="loanTwoConsecutiveYear"/></div>
                      </div>

                    } triggerType="focus">
                      <img src="/public/images/creditInformation/loanTwoConsecutiveYear.png" alt=""/>
                    </Balloon>

                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className="tip"> <span className="label-required">*</span>单笔贷款最近12月内大于等于2的数字有几个</span>}>


                    <Balloon style={styles.box} trigger={
                      <div>
                        <IceFormBinder
                          name="loanOneConsecutiveYear"
                          required
                          validator={this.isInteger}
                        >
                          {this.checkFiled('input', 'loanOneConsecutiveYear')}
                          {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                        </IceFormBinder>
                        <div><IceFormError name="loanOneConsecutiveYear"/></div>
                      </div>
                    } triggerType="focus">
                      <img src="/public/images/creditInformation/loanOneConsecutiveYear.png" alt=""/>
                    </Balloon>

                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className="tip"> <span className="label-required">*</span>单笔贷款最近6月内大于等于1的数字有几个</span>}>


                    <Balloon style={styles.box} trigger={
                      <div>
                        <IceFormBinder
                          name="loanHalfConsecutiveYear"
                          required
                          validator={this.isInteger}
                        >
                          {this.checkFiled('input', 'loanHalfConsecutiveYear')}
                          {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                        </IceFormBinder>
                        <div><IceFormError name="loanHalfConsecutiveYear"/></div>
                      </div>
                    } triggerType="focus">
                      <img src="/public/images/creditInformation/loanHalfConsecutiveYear.png" alt=""/>
                    </Balloon>

                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className="tip"> <span className="label-required">*</span>单笔贷款最近12月内大于等于1的数字有几个</span>}>


                    <Balloon align='bl' style={styles.box} trigger={
                      <div>
                        <IceFormBinder
                          name="loanOneYear"
                          required
                          validator={this.isInteger}
                        >
                          {this.checkFiled('input', 'loanOneYear')}
                          {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                        </IceFormBinder>
                        <div><IceFormError name="loanOneYear"/></div>
                      </div>

                    } triggerType="focus">
                      <img src="/public/images/creditInformation/loanOneYear.png" alt=""/>
                    </Balloon>

                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有信用卡最近1个月内小于30天的次数</span>}>
                    <IceFormBinder
                      name="card1MonthLessThan30"
                      required
                      validator={this.isInteger}
                    >
                      {this.checkFiled('input', 'card1MonthLessThan30')}
                      {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                    </IceFormBinder>
                    <div><IceFormError name="card1MonthLessThan30"/></div>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有信用卡最近3个月内小于30天的次数</span>}>
                    <IceFormBinder
                      name="card3MonthLessThan30"
                      required
                      validator={this.isInteger}
                    >
                      {this.checkFiled('input', 'card3MonthLessThan30')}
                      {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                    </IceFormBinder>
                    <div><IceFormError name="card3MonthLessThan30"/></div>
                  </FormItem>
                </Col>


                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有信用卡最近3个月内连续大于等于30天的次数</span>}>
                    <IceFormBinder
                      name="card3MonthMoreThan30"
                      required
                      validator={this.isInteger}
                    >
                      {this.checkFiled('input', 'card3MonthMoreThan30')}
                      {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                    </IceFormBinder>
                    <div><IceFormError name="card3MonthMoreThan30"/></div>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有信用卡最近6个月内小于30天的次数</span>}>
                    <IceFormBinder
                      name="card6MonthLessThan30"
                      required
                      validator={this.isInteger}
                    >
                      {this.checkFiled('input', 'card6MonthLessThan30')}
                      {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                    </IceFormBinder>
                    <div><IceFormError name="card6MonthLessThan30"/></div>
                  </FormItem>
                </Col>

                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有信用卡最近12个月内小于30天的次数</span>}>
                    <IceFormBinder
                      name="card12MonthLessThan30"
                      required
                      validator={this.isInteger}
                    >
                      {this.checkFiled('input', 'card12MonthLessThan30')}
                      {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                    </IceFormBinder>
                    <div><IceFormError name="card12MonthLessThan30"/></div>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有信用卡最近12个月内连续大于等于30天的次数</span>}>
                    <IceFormBinder
                      name="card12MonthMoreThan30"
                      required
                      validator={this.isInteger}
                    >
                      {this.checkFiled('input', 'card12MonthMoreThan30')}
                      {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                    </IceFormBinder>
                    <div><IceFormError name="card12MonthMoreThan30"/></div>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有信用卡最近24个月内小于30天的次数</span>}>
                    <IceFormBinder
                      name="card24MonthLessThan30"
                      required
                      validator={this.isInteger}
                    >
                      {this.checkFiled('input', 'card24MonthLessThan30')}
                      {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                    </IceFormBinder>
                    <div><IceFormError name="card24MonthLessThan30"/></div>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有信用卡最近24个月内连续大于等于30天的次数</span>}>
                    <IceFormBinder
                      name="card24MonthMoreThan30"
                      required
                      validator={this.isInteger}
                    >
                      {this.checkFiled('input', 'card24MonthMoreThan30')}
                      {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                    </IceFormBinder>
                    <div><IceFormError name="card24MonthMoreThan30"/></div>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有信用卡最近24个月内连续大于等于60天的次数</span>}>
                    <IceFormBinder
                      name="card24MonthMoreThan60"
                      required
                      validator={this.isInteger}
                    >
                      {this.checkFiled('input', 'card24MonthMoreThan60')}
                      {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                    </IceFormBinder>
                    <div><IceFormError name="card24MonthMoreThan60"/></div>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>历史贷款和信用卡出现大于等于90天及以上逾期</span>}>
                    <IceFormBinder
                      name="historyMoreThan90"
                      required
                      message="请输入"
                    >
                      {this.checkFiled('select', 'historyMoreThan90')}
                      {/*<Select size="large" placeholder="请选择" className="custom-input"*/}
                      {/*dataSource={this.state.opption}*/}
                      {/*/>*/}
                    </IceFormBinder>
                    <div><IceFormError name="historyMoreThan90"/></div>
                  </FormItem>
                </Col>


                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>申请人已有贷款</span>}>
                    <IceFormBinder
                      name="hasLoan"
                      required
                      message="请输入"
                    >
                      {this.checkFiled('select', 'hasLoan')}
                      {/*<Select size="large" placeholder="请选择" className="custom-input"*/}
                      {/*dataSource={this.state.opption}*/}
                      {/*/>*/}


                    </IceFormBinder>
                    <div><IceFormError name="hasLoan"/></div>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout}
                            label={<span className='tip'> <span
                              className="label-required">*</span>信用卡近6个月平均透支额度</span>}>
                    <IceFormBinder
                      name="overdrawAmount"
                      required
                      validator={this.priceRange}
                    >
                      {this.checkFiled('input', 'overdrawAmount')}
                      {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                    </IceFormBinder>
                    <div><IceFormError name="overdrawAmount"/></div>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout}
                            label={<span className='tip'> <span className="label-required">*</span>申请人配偶已有贷款</span>}>
                    <IceFormBinder
                      name="spouseHasLoan"
                      required
                      message="请输入"
                    >
                      {this.checkFiled('input', 'spouseHasLoan')}
                      {/*<Select size="large" placeholder="请选择" className="custom-input"*/}
                      {/*dataSource={this.state.opption}*/}
                      {/*/>*/}


                    </IceFormBinder>
                    <div><IceFormError name="spouseHasLoan"/></div>
                  </FormItem>
                </Col>

                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>申请人配偶信用卡近6个月平均透支额度</span>}>
                    <IceFormBinder
                      name="spoouseOverdrawAmount"
                      required
                      validator={this.priceRange}
                    >
                      {this.checkFiled('input', 'spoouseOverdrawAmount')}
                      {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                    </IceFormBinder>
                    <div><IceFormError name="spoouseOverdrawAmount"/></div>
                  </FormItem>
                </Col>


                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有贷款最近3个月内小于30天的次数</span>}>
                    <IceFormBinder
                      name="loan3monthLessthan30"
                      required
                      validator={this.isInteger}
                    >
                      {this.checkFiled('input', 'loan3monthLessthan30')}
                      {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                    </IceFormBinder>
                    <div><IceFormError name="loan3monthLessthan30"/></div>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有贷款最近3个月内连续大于等于30天的次数</span>}>
                    <IceFormBinder
                      name="loan3monthMorethan30"
                      required
                      validator={this.isInteger}
                    >
                      {this.checkFiled('input', 'loan3monthMorethan30')}
                      {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                    </IceFormBinder>
                    <div><IceFormError name="loan3monthMorethan30"/></div>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有贷款最近6个月内小于30天的次数</span>}>
                    <IceFormBinder
                      name="loan6monthLessthan30"
                      required
                      validator={this.isInteger}
                    >
                      {this.checkFiled('input', 'loan6monthLessthan30')}
                      {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                    </IceFormBinder>
                    <div><IceFormError name="loan6monthLessthan30"/></div>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有贷款最近12个月内小于30天的次数</span>}>
                    <IceFormBinder
                      name="loan12monthLessthan30"
                      required
                      validator={this.isInteger}
                    >
                      {this.checkFiled('input', 'loan12monthLessthan30')}
                      {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                    </IceFormBinder>
                    <div><IceFormError name="loan12monthLessthan30"/></div>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有贷款最近12个月内连续大于等于30天的次数</span>}>
                    <IceFormBinder
                      name="loan12monthMorethan30"
                      required
                      validator={this.isInteger}
                    >
                      {this.checkFiled('input', 'loan12monthMorethan30')}
                      {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                    </IceFormBinder>
                    <div><IceFormError name="loan12monthMorethan30"/></div>
                  </FormItem>
                </Col><Col xxs={24} xs={12} l={8}>
                <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有贷款最近24个月内小于30天的次数</span>}>
                  <IceFormBinder
                    name="loan24monthLessthan30"
                    required
                    validator={this.isInteger}
                  >
                    {this.checkFiled('input', 'loan24monthLessthan30')}
                    {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                  </IceFormBinder>
                  <div><IceFormError name="loan24monthLessthan30"/></div>
                </FormItem>
              </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有贷款最近24个月内连续大于等于30天的次数</span>}>
                    <IceFormBinder
                      name="loan24monthMorethan30"
                      required
                      validator={this.isInteger}
                    >
                      {this.checkFiled('input', 'loan24monthMorethan30')}
                      {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                    </IceFormBinder>
                    <div><IceFormError name="loan24monthMorethan30"/></div>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={8}>
                  <FormItem {...formItemLayout} label={<span className='tip'> <span className="label-required">*</span>所有贷款最近24个月内连续大于等于60天的次数</span>}>
                    <IceFormBinder
                      name="loan24monthMorethan60"
                      required
                      validator={this.isInteger}
                    >
                      {this.checkFiled('input', 'loan24monthMorethan60')}
                      {/*<Input size="large" htmlType='number' placeholder="请输入" className="custom-input"/>*/}
                    </IceFormBinder>
                    <div><IceFormError name="loan24monthMorethan60"/></div>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className='pch-form-buttons'>

                    <Button size="large" type="secondary" onClick={this.submit}>完成</Button>

                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </IceFormBinderWrapper>
      </IceContainer>
    );

  }
}
const styles = {
  box: {
    width: '780px',
    hegiht: '120px',
    maxWidth: '780px',
  },
  diff: {
    border: 'red 1px solid',
  },
};
