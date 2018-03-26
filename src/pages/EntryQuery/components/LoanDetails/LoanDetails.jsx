import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Select } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
} from '@icedesign/form-binder';
import DataBinder from '@icedesign/data-binder/lib/index';



@DataBinder({
  details: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: 'http://172.16.0.242:7300/mock/5a52d55884e9091a31919308/example/loan/derails',
    defaultBindingData: {
      list: [],
      total: 100,
      pageSize: 10,
      currentPage: 1,
    },
  },
})

export default class LoanDetails extends Component {
  static displayName = 'LoanDetails';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      dataList:{}
    };
    // 请求参数缓存
    this.queryCache = {};
  }
  toggleComponent(){
    this.props.toggleComponent('ConfigInformation');
  }

  details = () =>{

  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.props.updateBindingData('details', {
      data:this.queryCache ,
    });
  };


  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };


  //下一步
  next = (event) =>{
    event.preventDefault()
  }

  handleSubmit = () => {
    this.postForm.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
      if (errors) {
        return false;
      }

      // ajax values
    });
  };


  render() {
    return (
      <div className="rcontent-edito">
        <IceFormBinderWrapper
          ref={(refInstance) => {
            this.postForm = refInstance;
          }}
          value={this.state.value}
          onChange={this.formChange}
        >
          <IceContainer title="车贷申请" className='subtitle'>


          </IceContainer>
        </IceFormBinderWrapper>
      </div>
    );
  }
}

const styles = {
  form: {
    marginTop: 30,
  },
  cats: {
    width: '100%',
  },
  botton:{
    backgroundColor :'#FC9E25'
  },
  select:{
    width:'200px'
  }
};
