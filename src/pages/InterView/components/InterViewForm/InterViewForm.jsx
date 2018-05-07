import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { BaseApp } from 'base'
import { Title, PchTable, PchPagination } from 'components';
import FilterForm from './Filter';

import './InterViewForm.scss';

export default class InterViewForm extends BaseApp {
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
    columns = () => {
       
        return _columns
    }
    
    /**
     * 处理行列表中操作栏的点击事件
     * @param data 传递给对应事件的行记录数据，okey一般为当前记录的主键
     * @param type 操作类型，根据不同类型处理不同事件
     */
    handleOperateClick(data, type) { 
        switch (type) {
            case this.OPERATE_TYPE.DETAIL: {
                hashHistory.push(`interviewform/detail/${data.id}`)
                break;
            }
            case this.OPERATE_TYPE.EDIT: {
                hashHistory.push(`interview/edit/${data.id}`)
                break;
            }
            // case this.OPERATE_TYPE.UPLOAD: {
            //     hashHistory.push(`interview/upload/${data.id}`)
            //     break;
            // }
            // case this.OPERATE_TYPE.SIGN: {
            //     hashHistory.push(`interview/sign/${data.id}`)
            //     break;
            // }
        }
    }
    /**
     * 渲染
     */
    render() {
        const { pageData ,columns2} = this.props;
        return (
            <IceContainer className="pch-container">
                <Title title="签字查询" />
                <FilterForm onSubmit={this.fetchData} />
                <PchTable  dataSource={pageData.list} columns={columns2} onOperateClick={this.handleOperateClick.bind(this)} />
                {/* <PchTable  dataSource={pageData.list} columns={_columns} /> */}
                <PchPagination dataSource={pageData} onChange={this.changePage} />
            </IceContainer>
        )
    }
}
