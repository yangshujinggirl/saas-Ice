import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { BaseApp } from 'base'
import { Title, PchTable, PchPagination } from 'components';
import FilterForm from '../../components/Filter';

import './Process.scss';

export default class Process extends BaseApp {
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
        let id = data.processDefId;

        switch (type) {
            case this.OPERATE_TYPE.EDIT: {
                // 修改
                hashHistory.push(`process/edit/${id}`)
                break;
            }
            case this.OPERATE_TYPE.VIEW: {
                // 详情
                hashHistory.push(`process/detail/${id}`)
                break;
            }
            case this.OPERATE_TYPE.OTHER: {
                // 产品
<<<<<<< HEAD
                hashHistory.push(`process/config/${data.id}`)
=======
                hashHistory.push(`process/detail/${id}`)
>>>>>>> 6da4cb0a992c764f95d0963a2a56ae09f6052f3f
                break;
            }
            case this.OPERATE_TYPE.OTHER1: {
                // 复制，复制该流程进入流程修改页面
                this.props.actions.copyProcess(id);
                // hashHistory.push(`process/edit/${id}`)
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
