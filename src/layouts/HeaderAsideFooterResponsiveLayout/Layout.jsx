/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import { Icon, Loading } from '@icedesign/base';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/menu';
import { Link } from 'react-router';
import FoundationSymbol from 'foundation-symbol';
import { enquire } from 'enquire-js';
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import Logo from './../../components/Logo';
import { asideNavs } from './../../navs';
import { Storage, Cookie } from '../../base/utils';
import './scss/light.scss';
// import './scss/dark.scss';
import CommonReq from '../../base/reqs/CommonReq';

const logoImg = require('./img/logo.svg');

// 设置默认的皮肤配置，支持 dark 和 light 两套皮肤配置
// const theme = typeof THEME === 'undefined' ? 'dark' : THEME;
const theme = 'light';

export default class HeaderAsideFooterResponsiveLayout extends Component {
    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);

        this.state = {
            collapse: false,
            openDrawer: false,
            isScreen: undefined,
            openKeys,
        };
        const openKeys = this.getOpenKeys([]);
        this.openKeysCache = openKeys;
    }

    componentDidMount() {
        this.enquireScreenRegister();

        CommonReq.getSaasMenu().then((res) => {
            if (res.code == 200) {
                let leafs = res.data.leaf;
                Storage.set('MENUS', leafs);
                this.setState({
                    MENUS: leafs,
                    openKeys: this.getOpenKeys(leafs)
                })
            }
        });

        CommonReq.getUserInfo().then((res) => {
            if (res.code == 200) {
                Storage.set("USERINFO", res.data);
                this.setState({
                    USERINFO: res.data
                });
            }
        });

        CommonReq.getUserIdentityList().then((res) => {
            if (res.code == 200) {
                Storage.set("IDENTITYLIST", res.data.list);
                this.setState({
                    IDENTITYLIST: res.data.list
                });
            }
        });
    }

    /**
     * 注册监听屏幕的变化，可根据不同分辨率做对应的处理
     */
    enquireScreenRegister = () => {
        const isMobile = 'screen and (max-width: 720px)';
        const isTablet = 'screen and (min-width: 721px) and (max-width: 1199px)';
        const isDesktop = 'screen and (min-width: 1200px)';

        enquire.register(isMobile, this.enquireScreenHandle('isMobile'));
        enquire.register(isTablet, this.enquireScreenHandle('isTablet'));
        enquire.register(isDesktop, this.enquireScreenHandle('isDesktop'));
    };

    enquireScreenHandle = (type) => {
        let collapse;
        if (type === 'isMobile') {
            collapse = false;
        } else if (type === 'isTablet') {
            collapse = true;
        } else {
            collapse = this.state.collapse;
        }

        const handler = {
            match: () => {
                this.setState({
                    isScreen: type,
                    collapse,
                });
            },
            unmatch: () => {
                // handler unmatched
            },
        };

        return handler;
    };

    /**
     * 左侧菜单收缩切换
     */
    toggleCollapse = () => {
        const {collapse} = this.state;
        const openKeys = !collapse ? [] : this.openKeysCache;

        this.setState({
            collapse: !collapse,
            openKeys,
        });
    };

    /**
     * 响应式通过抽屉形式切换菜单
     */
    toggleMenu = () => {
        const {openDrawer} = this.state;
        this.setState({
            openDrawer: !openDrawer,
        });
    };

    /**
     * 当前展开的菜单项
     */
    onOpenChange = (openKeys) => {
        this.setState({
            openKeys,
        });
        this.openKeysCache = openKeys;
    };

    /**
     * 响应式时点击菜单进行切换
     */
    onMenuClick = () => {
        this.toggleMenu();
    };

    /**
     * 获取当前展开的菜单项
     */
    getOpenKeys = (leafs) => {
        const {routes} = this.props;
        const matched = routes[0].path;
        let openKeys = [];
        let allAsideNav = asideNavs || [];

        // let leafs = Storage.get('MENUS') || [];
        //let leafs = this.state.MENUS || [];
        allAsideNav = allAsideNav.concat(leafs);

        allAsideNav &&
        allAsideNav.length > 0 &&
        allAsideNav.map((item, index) => {
            if (item.value && item.value.value.toLowerCase() === matched.toLowerCase()) {
                openKeys = [`${index}`];
            }
        });

        return openKeys;
    };

    processLinkWithOwnerId(link) {
        // let userInfo = Storage.get('USERINFO');
        let userInfo = this.state.USERINFO;
        if (userInfo && userInfo.ownerId) {
            link += (link.indexOf('?') >= 0 ? '&' : '?') + 'ownerId=' + userInfo.ownerId;
            link += '&userId=' + userInfo.id;
            link += '&type=saas';
        }
        return link;
    }

    render() {
        const {location = {}, routes} = this.props;
        const {pathname} = location;
        let allAsideNav = asideNavs || [];

        // let leafs = Storage.get('MENUS') || [];
        let leafs = this.state.MENUS || [];
        allAsideNav = allAsideNav.concat(leafs);

        const tipLoader1 = (
        <div className="pch-load-container pch-load-jump">
            <div className="loader">
                loading...
            </div>
        </div>
        );

        return (
            <Layout style={{
                   minHeight: '100vh'
               }} className={cx(`ice-design-header-aside-footer-responsive-layout-${theme}`,
                                                                                        {
                                                                                            'ice-design-layout': true
                                                                                        })}>
                {this.state.isScreen === 'isMobile' && (
                 <a className="menu-btn" onClick={this.toggleMenu}>
                     <Icon type="category" size="small" />
                 </a>
                 )}
                {this.state.openDrawer && (
                 <div className="open-drawer-bg" onClick={this.toggleMenu} />
                 )}
                <Layout.Aside theme={theme} className={cx('ice-design-layout-aside', {
                                                           'open-drawer': this.state.openDrawer,
                                                       })}>
                    {/* 侧边菜单项 begin */}
                    {/*{this.state.isScreen !== 'isMobile' && (
                                                                                                                                                                <a className="collapse-btn" onClick={this.toggleCollapse}>
                                                                                                                                                                  <Icon
                                                                                                                                                                    type={this.state.collapse ? 'arrow-right' : 'arrow-left'}
                                                                                                                                                                    size="small"
                                                                                                                                                                  />
                                                                                                                                                                </a>
                                                                                                                                                              )}*/}
                    <div className="pc-menu">
                        <img id='logo' src={logoImg} alt="" />
                    </div>
                    <Menu
                        inlineCollapsed={this.state.collapse}
                        mode="inline"
                        selectedKeys={[pathname]}
                        openKeys={this.state.openKeys}
                        defaultSelectedKeys={[pathname]}
                        onOpenChange={this.onOpenChange}
                        onClick={this.onMenuClick}>
                        {allAsideNav &&
                         allAsideNav.length > 0 &&
                         allAsideNav.map((nav, index) => {
                             let navData = nav.value;
                             if (nav.leaf && nav.leaf.length > 0) {
                                 return (
                                     <SubMenu key={index} title={<span>{navData.icon ? (
                                                            <i className="icon icon-menu" dangerouslySetInnerHTML={{
                                                                                                                       __html: navData.icon
                                                                                                                   }}></i>
                                                            ) : null} <span className="ice-menu-collapse-hide">{navData.name}</span>
                                                     <div className="icon-nav-more icon-nav-more"></div>
                                                     </span>}>
                                         {nav.leaf.map((item) => {
                                              const linkProps = {};
                                              let itemData = item.value || {};
                                              if (itemData.target == '_blank' || itemData.value.indexOf('http://') != -1) {
                                                  linkProps.href = this.processLinkWithOwnerId(itemData.value);
                                                  if (itemData.target == '_blank') {
                                                      linkProps.target = '_blank';
                                                  }
                                              } else if (itemData.external) {
                                                  linkProps.href = itemData.value;
                                              } else {
                                                  linkProps.to = itemData.value;
                                              }
                                              return (
                                                  <MenuItem key={itemData.value}>
                                                      <Link {...linkProps}>
                                                          {itemData.name}
                                                      </Link>
                                                  </MenuItem>
                                                  );
                                          })}
                                     </SubMenu>
                                     );
                             }
                             const linkProps = {};
                             if (navData.target == '_blank') {
                                 linkProps.href = this.processLinkWithOwnerId(navData.value);
                                 linkProps.target = '_blank';
                             } else if (navData.external) {
                                 linkProps.href = navData.value;
                             } else {
                                 linkProps.to = navData.value;
                             }
                             return (
                                 <MenuItem key={navData.value}>
                                     <Link {...linkProps}>
                                         <span>{navData.icon ? (
                                                <i className="icon icon-menu" dangerouslySetInnerHTML={{
                                                                                                           __html: navData.icon
                                                                                                       }}></i>
                                                ) : null} <span className="ice-menu-collapse-hide">{navData.name}</span></span>
                                     </Link>
                                 </MenuItem>
                                 );
                         })}
                    </Menu>
                    {/* 侧边菜单项 end */}
                </Layout.Aside>
                <Layout.Section>
                    <Header
                        theme={theme}
                        menus={allAsideNav}
                        pathname={pathname}
                        routes={routes}
                        isMobile={this.state.isScreen !== 'isDesktop' ? true : undefined}
                        userinfo={this.state.USERINFO}
                        identityList={this.state.IDENTITYLIST} />
                    {/* 主体内容 */}
                    <Layout.Main>
                        {this.props.children}
                    </Layout.Main>
                </Layout.Section>
                {/* <Footer /> */}
            </Layout>
            );
    }
}
