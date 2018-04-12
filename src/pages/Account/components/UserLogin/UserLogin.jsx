/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Input, Button, Checkbox, Grid, Feedback } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/icon';
import './UserLogin.scss';

const { Row, Col } = Grid;

// 寻找背景图片可以从 https://unsplash.com/ 寻找
const backgroundImage = require('./admin-login-bg.png');

import {hashHistory} from 'react-router';
import {Storage, Cookie} from '../../../../base/utils';
import AccountReq from '../../reqs/AccountReq';

export default class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        userName: undefined,
        password: undefined,
        checkbox: false,
        isLoging: false
      },
    };
  }

  componentDidMount(){
    let remember = Storage.get('REMEMBER');
    if(remember){
      this.setState({value:{...remember}});
    }
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }

      this.setState({value: {isLoging: true}});

      AccountReq.login(values).then((res) => {
        this.setState({value: {isLoging: false}});
        if(!res || res.code != 200) return;
        Feedback.toast.success('登录成功');

        if(values.checkbox){
          //记住账号
          Storage.set('REMEMBER', values);
        }else{
          Storage.remove('REMEMBER');
        }

        Storage.set('MENUS', (res.data.leaf));

        AccountReq.getUserInfo().then((res) => {
          if(res || res.code == 200){
            Storage.set("USERINFO", res.data);
            setTimeout(function(){
              // hashHistory.push('/dashboard') //跳转首页
              locaiton.href = '/#/dashboard';
            },500)
          }
        })
      });
    });
  };

  render() {
    let {isLoging} = this.state.value;

    return (
      <div style={styles.userLogin} className="user-login">
        
      </div>
    );
  }
}

const styles = {
  userLogin: {
    position: 'relative',
    height: '100vh',
  },
  userLoginBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '30px 40px',
    background: '#fff',
    borderRadius: '6px',
    boxShadow: '1px 1px 2px #eee',
  },
  formItem: {
    position: 'relative',
    marginBottom: '25px',
    flexDirection: 'column',
  },
  formTitle: {
    margin: '0 0 20px',
    textAlign: 'center',
    color: '#3080fe',
    letterSpacing: '12px',
  },
  inputIcon: {
    position: 'absolute',
    left: '0px',
    top: '3px',
    color: '#999',
  },
  submitBtn: {
    width: '240px',
    background: '#3080fe',
    borderRadius: '28px',
  },
  checkbox: {
    marginLeft: '5px',
  },
  tips: {
    textAlign: 'center',
  },
  link: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '13px',
  },
  line: {
    color: '#dcd6d6',
    margin: '0 8px',
  },
};
