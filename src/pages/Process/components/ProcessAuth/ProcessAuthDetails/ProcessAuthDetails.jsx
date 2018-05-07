import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { BaseApp } from 'base';
import { Form, Icon, Input, Button, Table, Radio, Grid, Field, Dialog } from '@icedesign/base';
const {Row, Col} = Grid;
import { Title, PchTable, PchPagination } from 'components';
import FilterForm from '../Filter';
import { PROCESS_VIEW } from '../../../constants/ProcessViewConstant';
// import ProcessPowerDetails from './ProcessPowerDetails'
import './ProcessAuthDetails.scss'
export default class ProcessAuthDetails extends Component  {
    constructor(props) {
        super(props);
    }
    /**
     * 初始化
     */
    componentWillMount() {
        console.log(this.props)
        // this.props.actions.getProcessPowerDetails()
        // this.fetchData();
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
    // 返回
    handleBack() {
        // hashHistory.push('process');
        console.log('返回。。。')
        
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
        const dataSource = [{power:'总部'},{power:'总部科技部'},{power:'总部测试'}];
        const {data=[], visible, changeView} = this.props;
        return (
            <IceContainer className="pch-container" style={{display: visible ? '' : 'none'}}>
                <Title title="查看权限配置详情" />
                <div className="pc-form">
                    <FilterForm onSubmit={this.fetchData} />
                    <Table className="table-list" dataSource={dataSource}>
                        <Table.Column title="权限" dataIndex="power" align="center"/>
                    </Table>
                    {/* <Button type="primary" className="return-btn">返回</Button> */}
                    <div className="container">
                        <div className="next-btn-box pch-form-buttons">
                        <Button type="primary" className="return-btn" onClick={changeView.bind(this, PROCESS_VIEW.EDITAUTH)}>
                         返回
                        </Button>
                        </div>
                    </div>
                </div>
               
            </IceContainer>
        )
    }
}
