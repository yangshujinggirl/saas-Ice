import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { BaseApp } from 'base'
import { Title, PchTable, PchPagination } from 'components';
import ProcessProduct from '../../ProcessFormProduct/ProcessFormProduct'
import './AddProcess.scss';

export default class AddProcess extends BaseApp {
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
       
    }
    //点击分页
    changePage = (currentPage) => {
        
    }

    /**
     * 处理行列表中操作栏的点击事件
     * @param data 传递给对应事件的行记录数据，okey一般为当前记录的主键
     * @param type 操作类型，根据不同类型处理不同事件
     */
    
    /**
     * 渲染
     */
    render() {
        const { pageData,columns} = this.props;
        return (
            <IceContainer className="pch-container">
                <ProcessProduct />
            </IceContainer>
        )
    }
}
