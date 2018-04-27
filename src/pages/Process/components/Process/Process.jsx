import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { Title, PchTable, PchPagination } from 'components';
import FilterForm from './Filter';

import './Process.scss';

export default class Process extends Component {
    constructor(props) {
        super(props);
    }
    /**
     * 初始化
     */
    componentDidMount() {
        this.fetchData();
    }
    fetchData = (condition) => {
        this.props.actions.search(condition);
    }
    //点击分页
    changePage = (currentPage) => {
        this.props.actions.search({
            page: currentPage
        });
    }

    /**
     * 处理行列表中操作栏的点击事件
     * @param data 传递给对应事件的行记录数据，okey一般为当前记录的主键
     * @param type 操作类型，根据不同类型处理不同事件
     */
    handleOperateClick(data, type) {
        switch (type) {
            case 'EDIT': {
                hashHistory.push(`process/detail/${record.id}`)
                break;
            }
            case 'VIEW': {
                hashHistory.push(`process/detail/${record.id}`)
                break;
            }
        }
    }
    /**
     * 渲染
     */
    render() {
        const {pageData, columns} = this.props;
        return (
            <IceContainer className="pch-container">
                <Title title="流程配置查询" />
                <FilterForm onSubmit={this.fetchData} />
                <PchTable dataSource={pageData.list} columns={columns} onOperateClick={this.handleOperateClick.bind(this)} />
                <PchPagination dataSource={pageData} onChange={this.changePage} />
            </IceContainer>
        )
    }
}