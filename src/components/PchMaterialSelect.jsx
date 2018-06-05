import React, { Component } from 'react';
import { Select } from "@icedesign/base";
import { BaseComponent } from 'base';
import CommonReq from '../base/reqs/CommonReq';

/**
 * 材料列表的搜索下拉框
 */
export default class PchMaterialSelect extends BaseComponent {
    state = {
        dataSource: []
    };

    componentDidMount(){
        this.onSearch();
    }

    componentWillUnmount(){
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
    }

    render() {
        return (
            <Select
                value ={this.props.defaultVisible}
                showSearch
                size="large"
                dataSource={this.state.dataSource}
                onSearch={this.onSearch}
                onChange={this.props.onChange}
                filterLocal={false}/>
            );
    }

    onSearch = value => {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        this.searchTimeout = setTimeout(() => {
            let options = {
                url: `${this._config.LOAN_HOST}/product/collect`,
                method: 'get',
                contentType: 'application/x-www-form-urlencoded',
                params: {
                    name: value
                }
            }
            CommonReq.fetchData(options).then(data => {
                if (!data || data.code != 200) return;

                const dataSource = data.data.list.map(item => {
                    return {
                        label: item.name,
                        value: item.id.toString()
                    };
                });
                this.setState({
                    dataSource
                });
            });
        }, 100);
    };
}
