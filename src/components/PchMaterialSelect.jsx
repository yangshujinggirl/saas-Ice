import React, { Component } from 'react';
import { Select } from "@icedesign/base";
import CommonReq from '../base/reqs/CurdReq';

export default class PchMaterialSelect extends Component {
    state = {
        dataSource: []
    };

    componentDidMount(){
        this.onSearch();
    }

    render() {
        return (
            <Select
                showSearch
                size="large"
                dataSource={this.state.dataSource}
                onSearch={this.onSearch}
                filterLocal={false}/>
            );
    }

    onSearch = value => {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        this.searchTimeout = setTimeout(() => {
            let options = {
                url: `/loan-ft1/product/collect`,
                method: 'get',
                contentType: 'application/x-www-form-urlencoded',
                params: {
                    name: value
                }
            }
            new CommonReq().fetchData(options).then(data => {
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
