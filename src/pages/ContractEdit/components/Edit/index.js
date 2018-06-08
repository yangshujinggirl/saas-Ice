import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { BaseApp } from 'base';
import { Title } from 'components';
import { Button, Feedback } from '@icedesign/base';
import './index.scss';
import Req from '../../reqs/ContractEditReq';
import '../../../../base/scss/tableEdtor.scss';

const Toast = Feedback.toast;

class AddEit extends BaseApp {
  submitContent = [];//存储编辑保存接口参数
  keyArray = {//默认不可编辑字段
    borrowerName: true,//主贷款人姓名
    borrowerIdNo: true, //主贷款人证件号码
    principalAmount: true, //申请贷款金额
    loanTerms: true, //申请期限(月)
    productName: true, //产品名称
    interestRates: true, //执行年利率(%)
    repaymentMethod: true, //还款方式
    repaymentInterval: true, //还款周期
    paymentMethod: true, //支付方式
  };

  constructor(props) {
    super(props);
    this.state = { currentIndex: 0, contractContent: '' };//currentIndex 当前第几份 contractContent 当前展示的html
  }

  componentWillMount() {
    this.props.actions.getDetail(this.props.params.id);
  }

  componentWillUpdate(nextProps, nextState) {
    //当接口获取到数据则初始化要展示的html
    if (nextProps.formData[0] && !this.props.formData[0]) {
      this.initFormData(nextProps.formData[this.state.currentIndex], this.state.currentIndex);
    }
  }

  //点击上一份
  preContract() {
    this.handlerSubmitData();
    this.initFormData(this.submitContent[this.state.currentIndex - 1] || this.props.formData[this.state.currentIndex - 1], this.state.currentIndex - 1);
    this.setState({ currentIndex: this.state.currentIndex - 1 });
  }

  //点击下一份
  nextContract() {
    this.handlerSubmitData();
    this.initFormData(this.submitContent[this.state.currentIndex + 1] || this.props.formData[this.state.currentIndex + 1], this.state.currentIndex + 1);
    this.setState({ currentIndex: this.state.currentIndex + 1 });
  }

  //点击返回
  backPage() {
    hashHistory.push(`contractedit`);
  }

  //点击重置
  resetSubmitData() {
    this.handlerSubmitData();
    this.initFormData(this.submitContent[this.state.currentIndex] || this.props.formData[this.state.currentIndex], this.state.currentIndex);

    setTimeout(() => {
      this.submitContent[this.state.currentIndex] = undefined;
      this.initFormData(this.props.formData[this.state.currentIndex], this.state.currentIndex);
    }, 0);
  }

  //点击确定提交数据
  handleSubmit() {
    this.handlerSubmitData();
    let params = {
      contractId: this.props.params.id,
      contractEdit: this.submitContent,
    };
    Req.submitEditContractApi(params)
      .then((res) => {
        const { code, msg } = res;
        if (code != 200) {
          Toast.error(msg);
          return;
        }
        hashHistory.push(`contractedit`);
      });
  }

  //处理要提交的数组的某个元素的contractContent属性值
  handlerSubmitData = () => {
    // let domArry= this.refs.contractEdit.querySelectorAll('input[key|=key]');
    let domArry = this.refs.contractEdit.querySelectorAll('input');
    let count = 0;
    // let reg_option = /_BLANK_([^]*?)_BLANK_/ig;
    let reg_option = /_BLANK_(.*?)_BLANK_/ig;
    let contractContent;
    if (this.submitContent[this.state.currentIndex]) {
      contractContent = this.submitContent[this.state.currentIndex].contractContent;
    } else {
      contractContent = this.props.formData[this.state.currentIndex].contractContent;
    }
    this.submitContent[this.state.currentIndex].contractContent = contractContent.replace(reg_option, function (s, value) {
      let arry = value.split('_');
      let val = domArry[count].value || 'null';
      count++;
      return `_BLANK_${arry[0]}_${val}_BLANK_`;
    });
  };

  //初始化要提交的数组
  initSubmitData = (obj, index) => {
    let item = obj;
    this.submitContent[index] = {
      contractId: item.contractId,
      templateId: item.templateId,
      contractContent: item.contractContent,
    };
  };

  //处理要展示的html
  initFormData = (obj, index) => {
    let contractContent;
    // if(obj.updateContractContent){//如果是第一次编辑取contractContent字段否则取updateContractContent
    //   contractContent = obj.updateContractContent;
    // }else{
    contractContent = obj.contractContent;
    // }

    let contractContentCopy = JSON.stringify(contractContent);
    contractContentCopy = JSON.parse(contractContentCopy);

    let reg_option = /_BLANK_([^]*?)_BLANK_/ig;

    let this_1 = this;

    //把所有_BLANK_key_value_BLANK_字段的地方都替换成input输入框
    contractContentCopy = contractContentCopy.replace(reg_option, function (s, value) {
      let arry = value.split('_');
      arry[1] = arry[1] === 'null' ? '' : arry[1];

      // let val_one = "";
      // if (!this_1.submitContent[index]) {//如果第一次渲染该份合同则没值的地方展示接口返回值
      //   obj.contractExtendSource&&obj.contractExtendSource.map((item, index) => {
      //     if (item.keyEnglishName === arry[0]) {
      //       val_one = item.keyValue;
      //     }
      //   });
      // }

      let val = arry[1] || '';
      return `<input value='${val}' key='${arry[0]}' ${this_1.keyArray[arry[0]] ? 'disabled' : ''} class='${this_1.keyArray[arry[0]] ? 'input-disabled' : ''}'/>`;
    })
      .replace(/↵/ig, function (s, value) {
        return '</br>';
      });

    this.setState({ contractContent: contractContentCopy });

    if (!this.submitContent[index]) {
      this.initSubmitData(obj, index);
    }
  };

  componentWillUnmount() {
    this.props.actions.clearData();//清理数据
  }

  render() {
    console.log(this.state.contractContent)
    return (
      <IceContainer className="pch-container contract-eidt-pages">
        <Title title="合同编辑"/>

        {this.props.formData[this.state.currentIndex] ?
          <div>
            <div className="main-contract-main-action wang-edtor-table-styles" ref='contractEdit'>
              <div dangerouslySetInnerHTML={{
                __html: this.state.contractContent,
              }}/>
            </div>
            <div className="contract-edit-bottom-div">
              <Button disabled={this.state.currentIndex === 0}
                      type="secondary"
                      onClick={this.preContract.bind(this)}>
                上一份
              </Button>
              <Button
                disabled={!this.props.formData.length || this.state.currentIndex === (this.props.formData.length - 1)}
                type="secondary"
                onClick={this.nextContract.bind(this)}>
                下一份
              </Button>
              <Button type="secondary" onClick={this.backPage.bind(this)}>
                返回
              </Button>
              <Button type="secondary" onClick={this.resetSubmitData.bind(this)}>
                重置
              </Button>
              <Button type="secondary" onClick={this.handleSubmit.bind(this)}>
                确定
              </Button>
            </div>
          </div>
          :
          <div>
            <div className="no-data-title">
              该合同没有可以编辑的文件
            </div>
            <div className="contract-edit-bottom-div">
              <Button type="secondary" onClick={this.backPage.bind(this)}>
                返回
              </Button>
            </div>
          </div>}


      </IceContainer>
    );
  }
}

export default AddEit;
