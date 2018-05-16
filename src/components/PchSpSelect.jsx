import React, { Component } from 'react';
import { Select } from "@icedesign/base";
import { Storage } from 'utils';
import { BaseComponent } from 'base';

/**
 * 资方下拉框
 * 1. 读取本地存储的用户所属资方
 * 2. 可以设置默认是否选中第一个值
 */
export default class PchSpSelect extends BaseComponent {
    state = {
        dataSource: []
    };

    componentDidMount() {}

    componentWillUnmount() {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
    }

    render() {
        let {onChange} = this.props;
        let dataSource = [];
        let userinfo = Storage.get('USERINFO');
        if (userinfo) {
            dataSource.push({
                label: '位置',
                value: '10086'
            });
            dataSource.push({
                label: 'TES',
                value: '100'
            });
        }

        return (
            <Select size="large" placeholder="请选择" dataSource={dataSource} onChange={onChange} />
            );
    }
}
