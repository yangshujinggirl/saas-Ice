import React, { PureComponent } from 'react';
import { Balloon, Icon, Badge, Breadcrumb } from '@icedesign/base';
import IceImg from '@icedesign/img';
import Layout from '@icedesign/layout';
import Menu from '@icedesign/styled-menu';
import FoundationSymbol from 'foundation-symbol';
import { Link } from 'react-router';
import { headerNavs } from './../navs';
import Logo from './Logo';

export default class Header extends PureComponent {
  render() {
    const { width, theme, isMobile } = this.props;
    console.log(this.props);
    return (
      <Layout.Header
        theme={theme}
        className="ice-design-layout-header"
        style={{ width }}
      >
        
        <Breadcrumb className='all-breadcrumb'>
          {/* <Icon type="form" size='xl' />     */}
          <Breadcrumb.Item link="javascript:void(0);" className='breadcrumb'>业务配置</Breadcrumb.Item>
          <Breadcrumb.Item link="javascript:void(0);" className='breadcrumb'>字段配置</Breadcrumb.Item>
          <Breadcrumb.Item link="javascript:void(0);" className='breadcrumb'>
            字段配置新增
          </Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="ice-design-layout-header-menu"
          style={{ display: 'flex' }}
        >
          {/* Header 菜单项 begin */}
          <div className="persion-msg">员工： <span>{432432432}</span></div>
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
          
        </div>
      </Layout.Header>
    );
  }
}
