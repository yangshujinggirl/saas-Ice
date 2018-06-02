import React, { Component } from 'react';
import PbcContractDetail from './components/PbcContractDetail';
import PinganContractDetail from './components/PinganContractDetail';
import LoanDetail from './components/LoanDetail';
import InterviewOnlyDetail from './components/InterviewOnlyDetail';
import { hashHistory } from 'react-router';
import Req from './reqs/InterViewReq';
import { Feedback } from '@icedesign/base/index';
const Toast = Feedback.toast;
export default class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      component: [],
      formData: {},
    };
  }

  componentDidMount() {
    var id = '',
      type = '';
    if (this.props.id) {
      id = this.props.id || '';
      type = this.props.type || '';
    } else {
      type = this.props.params.type;
      id = this.props.params.id;
    }
    if (type && id) {
      if (type == 'interviewOnly' || type == 'creditCard') {
        Req.getInterViewOnlyDetail(id)
          .then((res) => {
            this.setState({
              formData: res.data,
            });
          })
          .catch((error) => {
            Toast.show({
              type: 'error',
              content: error.msg,
            });
          });
      } else if (type == 'pbcContract' || type == 'pinganContract') {
        Req.getInterViewDetail(id)
          .then((res) => {
            this.setState({
              formData: res.data.chinateContracResponse,
            });
          })
          .catch((error) => {
            Toast.show({
              type: 'error',
              content: error.msg,
            });
          });

      } else if (type == 'loan') {
        this.props.actions.getDetail(id);
        Req.getDetail(id).then(res=>{
          this.setState({
            formData: res.data,
          });
          }
        ).catch(error=>{
          Toast.show({
            type: 'error',
            content: error.msg,
          });
        })

      }

    }
  }

  /**
   * <InterViewDetail {...this.props} />
   * @return {[type]} [description]
   */

  render() {
    let id = '',
      type = '';
    if (this.props.id) {
      id = this.props.id || '';
      type = this.props.type || '';
    } else {
      type = this.props.params.type;
      id = this.props.params.id;
    }
    if (type && id) {
      switch (type) {
        case 'pbcContract': {
          return (<PbcContractDetail {...this.props} formData={this.state.formData}></PbcContractDetail>);
          break;
        }
        case 'pinganContract': {
          return (<PinganContractDetail {...this.props} formData={this.state.formData}></PinganContractDetail>);
          break;
        }
        case 'loan': {
          return (<LoanDetail {...this.props} formData={this.state.formData}></LoanDetail>);
          break;
        }
        case 'interviewOnly': {
          return (
            <InterviewOnlyDetail {...this.props} type={type} formData={this.state.formData}></InterviewOnlyDetail>);
          break;
        }
        case 'creditCard': {
          return (
            <InterviewOnlyDetail {...this.props} type={type} formData={this.state.formData}></InterviewOnlyDetail>);
          break;
        }
      }
    }
    return '';
  }

  // render() {
  //   return (
  //     this.state.component
  //   );
  // }
}
