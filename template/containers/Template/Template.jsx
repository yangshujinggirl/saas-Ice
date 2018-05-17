import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { BaseApp } from 'base'
import { Title, PchTable, PchPagination } from 'components';
import FilterForm from '../../components/Filter';

export default class [MODULE] extends BaseApp {
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

    /**
     * 点击分页
     */
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
        switch (type) {
            
            case this.OPERATE_TYPE.VIEW: {
                // 详情
                hashHistory.push(`process/detail/${data.processDefId}`)
                break;
            }
        }
    }
    /**
     * 渲染
     */
    render() {
        const {pageData, columns} = this.props;
        console.log(this.props)
        return (
            <IceContainer className="pch-container">
                <Title title="xx查询" />
                <FilterForm onSubmit={this.fetchData} />
                <PchTable dataSource={pageData.list} columns={columns} onOperateClick={this.handleOperateClick.bind(this)} />
                <PchPagination dataSource={pageData} changePage={this.changePage} />
            </IceContainer>
        )
    }
}
