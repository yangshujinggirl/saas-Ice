import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { BaseApp } from 'base';
import { Form, Icon, Input, Button, Table, Radio, Grid, Field, Dialog } from '@icedesign/base';
const {Row, Col} = Grid;
import { Title, PchTable, PchPagination } from 'components';
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
    orgDetails(value, index, record){
        return `${record.orgName}-${record.roleName}`
        //record.roleName?`${record.orgName}-${record.departmentName}-${record.roleName}`:record.departmentName
    // return record.roleName==record.departmentName?record.roleName:(record.roleName?`${record.orgName}-${record.departmentName}-${record.roleName}`:`${record.departmentName}`)
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
        const {formData,data=[], visible, changeView,privilegeItems} = this.props;
        
        return (
            <IceContainer className="pch-container" style={{display: visible ? '' : 'none'}}>
                <Title title="查看权限配置详情" />
                <div className="pc-form pch-condition">
                <Form size="large" direction="hoz">
                        <Row className="row">
                            <Col span={6}>
                                业务类型:{formData.businessTypeName}
                            </Col>
                            <Col span={6}>
                                资方:{formData.tenantName}
                            </Col>
                            <Col span={6}>
                                流程名称:{formData.processName}
                            </Col>
                        </Row>
                    </Form>
                    <p className="title-p">审批-权限配置详情</p>
                    <Table className="table-list" dataSource={privilegeItems}>
                        <Table.Column title="权限" cell={this.orgDetails}/>
                    </Table>
                    {/* <Button type="primary" className="return-btn">返回</Button> */}
                    <div className="container">
                        <div className="next-btn-box pch-form-buttons">
                        <Button type="secondary" className="return-btn" onClick={changeView.bind(this, PROCESS_VIEW.DETAIL)}>
                         返回
                        </Button>
                        </div>
                    </div>
                </div>
               
            </IceContainer>
        )
    }
}
