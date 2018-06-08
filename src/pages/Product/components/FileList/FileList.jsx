import React, { Component } from 'react';
import { Route, Link, hashHistory } from 'react-router'
import IceContainer from '@icedesign/container';
import { Button, Table } from '@icedesign/base';
import { Title, PchPagination } from 'components';
import FilterForm from './Filter';

import './FileList.scss';

export default class FileList extends Component {
    static displayName = 'FileList';

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            align: "cc cc",
            style: {
                width: "70%"
            },
            value: {
                name: '',
                dataType: undefined
            },
            fileList: [{
                dataType: "",
                dataname: '',
                fileTypeL: '',
            }],
            dataSource: '',
        }
    }
    componentDidMount() {
        let {actions} = this.props;
        actions.filesearch();
    }

    //操作
    renderTest = (value, index, record) => {
        return <div className="pch-table-operation">
                   <a href="javascript:;" onClick={() => this.open(record)}>
                       编辑
                   </a>
                   <a href="javascript:;" onClick={() => this.deleteRow(record.id)}>
                       删除
                   </a>
               </div>
    };

    open = (record) => {

        hashHistory.push(`/product/fileedit/${record.id}`)
    }
    deleteRow = (idx) => {
        let {actions} = this.props;
        actions.fileremove(idx);
        //actions.filesearch();
    }

    //分页
    changePage = (currentPage) => {
        let {actions} = this.props;
        actions.filesearch({
            page: currentPage
        });
    };

    fetchData = (condition) => {
        this.props.actions.filesearch(condition);
    }

    render() {
        let isFetching = this.props.isFetching;
        let dataSource = this.props.fileData || {} //data
        dataSource = dataSource.data || {}
        // let page = dataSource.page;
        // let limit = dataSource.limit;
        // let total = dataSource.total;
        // dataSource = dataSource.list
        dataSource.list && dataSource.list.map((item) => {
            let temp = [];
            item.collectionDetails && item.collectionDetails.map((ditem, j) => {
                temp.push(ditem.fileName);
            })
            item.fileNamestr = temp.join(' ; ')
        })
        return (
            <IceContainer className="pch-container">
                <Title title="材料查询" />
                <FilterForm onSubmit={this.fetchData} />
                <Table isLoading={isFetching} dataSource={dataSource.list} maxBodyHeight={800}>
                    <Table.Column title="ID" dataIndex="id" />
                    <Table.Column title="清单类型" dataIndex="dataType" />
                    <Table.Column title="清单名称" dataIndex="name" />
                    <Table.Column title="材料名称" dataIndex="fileNamestr" />
                    <Table.Column
                        title="操作"
                        dataIndex="time"
                        cell={this.renderTest}
                        width={150}
                        lock="right" />
                </Table>
                <PchPagination dataSource={dataSource} onChange={this.changePage} />
            </IceContainer>
            );
    }
}
