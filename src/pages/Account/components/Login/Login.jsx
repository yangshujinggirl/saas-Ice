/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Input, Button, Checkbox, Grid } from '@icedesign/base';
import { FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder, FormError as IceFormError, } from '@icedesign/form-binder';
import IceIcon from '@icedesign/icon';
import './Login.scss';

const {Row, Col} = Grid;

// 寻找背景图片可以从 https://unsplash.com/ 寻找
const backgroundImage = require('./admin-login-bg.png');
const adminLogo = require('./admin-logo.png');

import { hashHistory } from 'react-router';
import { Storage, Cookie, Tools } from 'utils';
import AccountReq from '../../reqs/AccountReq';

export default class Login extends Component {
    static displayName = 'UserLogin';

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            value: {
                userName: undefined,
                password: undefined,
                checkbox: false
            },
            isLoging: false
        };
    }

    componentDidMount() {
        let remember = Storage.get('REMEMBER');
        if (remember) {
            this.setState({
                value: {
                    ...remember
                }
            });
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

            this.setState({
                isLoging: true
            });

            AccountReq.login(values).then((res) => {
                this.setState({
                    isLoging: false
                });

                if (values.checkbox) {
                    //记住账号
                    Storage.set('REMEMBER', values);
                } else {
                    Storage.remove('REMEMBER');
                }

                let lastLoginName = Storage.get('LASTLOGINNAME');
                let isSameLoginName = values.userName == lastLoginName;
                Storage.set('LASTLOGINNAME', values.userName);

                let fromUrl = this.props.params.from;
                let isSameSystem = false;
                let system = res.data.type || 'daikuan';

                AccountReq.tipSuccess('登录成功');
                // 判断登录账号的所属系统和当前跳转地址的系统是否同一个
                system = system.toLowerCase();
                isSameSystem = fromUrl && fromUrl.indexOf(system) != -1;

                // 跳转规则
                // 1. 开发环境登录账号同上一次直接往fromUrl跳转（非域名访问都作为开发环境）否则跳转到默认页
                // 1. 系统相同且登录账号同上一次则往来源地址跳转（系统相同则一定有来源地址）
                // 2. 如果有来源则往来源地址跳转
                // 3. 默认往当前登录用户的所属系统地址跳转
                if (location.host.indexOf('pingchang666') == -1) {
                    // TODO 还有可能当前来源页并不是当前用户的权限内的
                    location.href = fromUrl ? decodeURIComponent(fromUrl) : '/';
                } else {
                    if (isSameSystem && isSameLoginName) {
                        location.href = decodeURIComponent(fromUrl);
                    } else {
                        //默认进入登录用户的所属系统，替换登录域名成相应系统的域名，
                        //eg:login-staging.pingchang666.com=>daikuan-staging.pingchang666.com
                        location.href = '//' + location.host.replace('login', system);
                    }
                }
            }).catch((data) => {
                this.setState({
                    isLoging: false
                });
                AccountReq.tipError(data.msg);
            });
        });
    };

    render() {
        let {isLoging} = this.state;

        return (
            <div className="user-login">
                <div className="user-login-bg" style={{
                                                          backgroundImage: `url(${backgroundImage})`
                                                      }} />
                <div className="pch-login-form">
                    <div className="login-form-header">
                        <div className="login-logo">
                            <img src={adminLogo} />
                        </div>
                    </div>
                    <IceFormBinderWrapper value={this.state.value} onChange={this.formChange} ref="form">
                        <form className="layui-form layui-form-pane" onSubmit={this.handleSubmit}>
                            <Row className="layui-form-item">
                                <Col className="layui-input-block">
                                    <IceIcon className="layui-input-icon" type="person" />
                                    <IceFormBinder name="userName" required message="请输入账号">
                                        <Input
                                            maxLength={20}
                                            autoComplete="off"
                                            className="layui-input"
                                            placeholder="请输入账号(手机号码)"
                                            autoFocus={true} />
                                    </IceFormBinder>
                                </Col>
                                <Col className="layui-form-error">
                                    <IceFormError name="userName" />
                                </Col>
                            </Row>
                            <Row className="layui-form-item">
                                <Col className="layui-input-block">
                                    <IceIcon className="layui-input-icon lx-iconfont input-icon" type="lock" />
                                    <IceFormBinder name="password" required message="请输入密码">
                                        <Input className="layui-input" autoComplete="off" htmlType="password" placeholder="请输入密码" />
                                    </IceFormBinder>
                                </Col>
                                <Col className="layui-form-error">
                                    <IceFormError name="password" />
                                </Col>
                            </Row>
                            <Row className="layui-form-item">
                                <Col>
                                    <IceFormBinder name="checkbox">
                                        <Checkbox checked={this.state.value.checkbox}>
                                            记住账号
                                        </Checkbox>
                                    </IceFormBinder>
                                </Col>
                            </Row>
                            <div className="layui-form-item">
                                <Button className="layui-btn layui-btn-sm submit-btn" htmlType="submit" disabled={isLoging}>
                                    {isLoging ? '登录中' : '登录'}
                                </Button>
                            </div>
                        </form>
                    </IceFormBinderWrapper>
                </div>
            </div>
            );
    }
}

