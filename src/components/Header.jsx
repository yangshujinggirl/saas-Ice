import React, { PureComponent, Component } from 'react';
import { Balloon, Icon, Badge, Breadcrumb, Dropdown } from '@icedesign/base';
import IceImg from '@icedesign/img';
import Layout from '@icedesign/layout';
import Menu from '@icedesign/styled-menu';
import FoundationSymbol from 'foundation-symbol';
import { Link, hashHistory } from 'react-router';
import { headerNavs } from './../navs';
import Logo from './Logo';
import {Recrysuve, Storage, Cookie} from '../base/utils';
import AccountReq from '../pages/Account/reqs/AccountReq';

export default class Header extends PureComponent {
  getBreadCrumb(data,pathname){
    let result = Recrysuve(data, pathname, 'value', 'leaf', 'breadcrumb')[0]
    return result;
  }
  logout(e){
    e.preventDefault();
    
    AccountReq.logout().then((res) => {
      Storage.remove('MENUS');
      Storage.remove('USERINFO');
      Cookie.remove('PCTOKEN');
      
      this._redirectToLogin();
    })
  }
  /**
   * 未登陆跳转到登陆页
   * 1. 匹配包含域名pingchang666才跳转，否则不处理
   * 2. 替换当前系统关键字成login，例如贷前daikuan->login
   * @return {[type]} [description]
   */
  _redirectToLogin() {
    let _host = location.host;
    if(_host.indexOf('pingchang666') == -1){
      return;
    }

    _host = _host.replace('daikuan', 'login');
    location.href = '//' + _host + '/#/account/' + encodeURIComponent(location.href);
    // hashHistory.push('/account');
  }
  render() {
    let { width, theme, isMobile, menus, pathname, routes, userinfo } = this.props;
    // let data = this.getBreadCrumb(menus, pathname);
    // let result = data ? [data.parentNode, data.node] : [{name: '未知页面'}];

    if(routes && routes.length > 0 && (routes[0].path == '/' || routes[0].path == '/dashboard')){
      // 特殊处理默认首页的路由名称
        routes[0].name = 'DASHBOARD';
        routes = [routes[0]];
    }

    let nickname = '--';
    //获取登陆用户信息
    // let userinfo = Storage.get('USERINFO');
    if(userinfo){
      nickname = userinfo.realName || userinfo.userName;
    }

    return (
      <Layout.Header
        theme={theme}
        className="ice-design-layout-header"
        style={{ width }}
      >
        
        <Breadcrumb className='all-breadcrumb'>
          {routes && routes.map((item, i) => {
            return <Breadcrumb.Item link="javascript:void(0);" key={i}>{item.name || '未知'}</Breadcrumb.Item>
          })}
        </Breadcrumb>
        <div
          className="ice-design-layout-header-menu"
          style={{ display: 'flex' }}
        >
          {/* Header 菜单项 begin */}
          {headerNavs && headerNavs.length > 0 ? (
            <Menu mode="horizontal" selectedKeys={[]}>
              {headerNavs.map((nav, idx) => {
                const linkProps = {};
                if (nav.newWindow) {
                  linkProps.href = nav.to;
                  linkProps.target = '_blank';
                } else if (nav.external) {
                  linkProps.href = nav.to;
                } else {
                  linkProps.to = nav.to;
                }
                return (
                  <Menu.Item key={idx}>
                    <Link {...linkProps}>
                      {nav.text}
                      {idx == 1 ? <Badge count={25} /> : ''}
                      {/* <Badge count={25} /> */}
                    </Link>
                  </Menu.Item>
                );
              })}
            </Menu>
          ) : null}
          {/* Header 菜单项 end */}

          {/* Header 右侧内容块 */}
          <div className="ice-layout-header-right">
              <UserPanel
                offset={[0, 11]}
                size={20}
                shape="circle"
                userName={nickname}
                avatar="//img.alicdn.com/tfs/TB1JLbBQXXXXXcUapXXXXXXXXXX-215-185.png"
                style={{marginRight: 20}}
              >
                <div>
                  <Menu
                    style={{
                      minWidth: 120,
                      boxShadow: '0 0 2px #ccc'
                    }}
                  >
                    {/*<Menu.Item>
                      <a href="/">信息中心</a>
                    </Menu.Item>
                    <Menu.Item>
                      <a href="/">设置</a>
                    </Menu.Item>*/}
                    <Menu.Item>
                      <a href="#" onClick={this.logout}>退出</a>
                    </Menu.Item>
                  </Menu>
                </div>
              </UserPanel>
            </div>

          {/* Header 右侧内容块 */}
          
        </div>
      </Layout.Header>
    );
  }
}

// 项目内敛 用户面板 组件
class UserPanel extends Component {
  static displayName = 'UserPanel';


  static defaultProps = {
    size: 50,
    shape: 'sharp',
    type: 'cover',
    avatar: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      dropdownVisible: false
    };
  }

  handleDropChange = value => {
    this.setState({
      dropdownVisible: value
    });
  };

  render() {
    const {
      offset,
      size,
      shape,
      type,
      avatar,
      style,
      children,
      className = ''
    } = this.props;
    const hasChildren = React.Children.count(children) > 0;
    const trigger = (
      <div
        className={`ice-user-panel ${className}`}
        style={{
          ...style,
          overflow: 'hidden',
          cursor: hasChildren ? 'pointer' : 'default'
        }}
      >
        <div className="avatar" style={{ float: 'left', display: 'none' }}>
          <IceImg
            height={size}
            width={size}
            type={type}
            shape={shape}
            src={avatar}
          />
        </div>
        <div
          className="user-name"
          style={{
            float: 'left',
            height: size,
            lineHeight: `${size}px`
          }}
        >
          <span style={{ padding: '10px' }}>
            {this.props.userName}
          </span>
          <Icon
            type={this.state.dropdownVisible ? 'arrow-up' : 'arrow-down'}
            size="xxs"
          />
        </div>
      </div>
    );
    if (hasChildren) {
      return (
        <Dropdown
          offset={offset}
          align="tr br"
          trigger={trigger}
          onVisibleChange={this.handleDropChange}
        >
          {this.props.children}
        </Dropdown>
      );
    } else {
      return trigger;
    }
  }
}
