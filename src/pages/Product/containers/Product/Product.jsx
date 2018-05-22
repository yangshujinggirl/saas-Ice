import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { BaseApp } from 'base'
import { Title, PchTable, PchPagination } from 'components';
import FilterForm from '../../components/ProdSearch/Filter';

import './Product.scss';

export default class Product extends BaseApp {
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
        this._condition = Object.assign(this._condition, condition);
        this.props.actions.search(this._condition);
    }
    //点击分页
    changePage = (currentPage) => {
        this._condition.page = currentPage;
        this.props.actions.search(this._condition);
    }

    /**
     * 处理行列表中操作栏的点击事件
     * @param data 传递给对应事件的行记录数据，okey一般为当前记录的主键
     * @param type 操作类型，根据不同类型处理不同事件
     */
    handleOperateClick(data, type) {
        let id = data.id;

        switch (type) {
            case this.OPERATE_TYPE.EDIT: {
                // 修改
                hashHistory.push(`product/searchedit/${id}`);
                break;
            }
            case this.OPERATE_TYPE.VIEW: {
                // 详情
                hashHistory.push(`product/proddetail/${id}`);
                break;
            }
        }
    }
    /**
     * 渲染
     */
    render() {
        const {pageData, columns, isFetching} = this.props;
        return (
            <IceContainer className="pch-container">
                <Title title="产品查询" />
                <FilterForm onSubmit={this.fetchData} />
                <PchTable isLoading={isFetching} dataSource={pageData.list} columns={columns} onOperateClick={this.handleOperateClick.bind(this)} />
                <PchPagination dataSource={pageData} onChange={this.changePage} />
            </IceContainer>
        )
    }
}
