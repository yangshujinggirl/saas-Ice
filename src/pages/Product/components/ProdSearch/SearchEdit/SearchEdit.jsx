import React, { Component } from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';
import axios from 'axios';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import Req from '../../../reqs/ProductReq'
import './SearchEdit.scss';

import {
    FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder, FormError as IceFormError,
} from '@icedesign/form-binder';

import {
    Input, Button, Feedback, Select, DatePicker, Switch, Grid, Table, Pagination, Form,
} from '@icedesign/base';
import { Title } from 'components';

const { Row, Col } = Grid;

// FormBinder 用于获取表单组件的数据，通过标准受控 API value 和 onChange 来双向操作数据
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
//组件引入
// import SearchEditer from './searchEditer/searchEditer';
const formItemLayout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 12
    }
};

export default class SearchEdit extends Component {
    static displayName = 'SearchEdit';

    static defaultProps = {};

    constructor(props) {
        super(props);

        this.state = {
            processList: [],
            value: {

            }
        };
    }

    componentDidMount() {
        let { actions, prodInfo, params, formData } = this.props;

        actions.edit(params.id);
        actions.getDetail(params.id);

        //流程名称获取
        Req._processList({
            limit: 99999
        }).then((data) => {
            let temp = data.data.list;
            this.setState({
                processList: temp
            });
        });
    }

    /**
     * 编辑产品
     * @return {[type]} [description]
     */
    upData = () => {
        let { actions, pageData, params, formData } = this.props;
        let prod = formData.product || {}
        this.formRef.validateAll((error, value) => {
            console.log('error', error, 'value', value);
            if (error) {
                // 处理表单报错
                return;
            }

            // 提交当前填写的数据
            value.effectiveDate = value.time[0]
            value.expirationDate = value.time[1];
            value.id = params.id;
            value.name = prod.name;
            value.processId = this.state.processId;
            value.processName = this.state.processName;

            //保存
            actions.prodrevise(value);
            //编辑成功提示
            // Feedback.toast.show({
            //     type: 'success',
            //     content: '编辑成功！',
            //     afterClose: () => {
            //         actions.prodrevise(value);
            //         hashHistory.push('/product/search');
            //     }
            // });
        });
    }

    onFormChange = (value) => {
        this.setState({
            value
        })
    }

    //流程名称的id值
    onChangeProcess = (value, option) => {

        this.setState({
            processId: option.value,
            processName: option.label
        })
    }

    renderProcessName(value, index, record){
        return <Link to={`process/detail/${record.processId}`}>{value}</Link>
    }


    render() {
        let { prodInfo, formData, isSubmiting } = this.props;
        let name = formData.product || {};

        name = name.name || ''
        let dataSource = [];
        if (prodInfo) {
            dataSource = prodInfo.data;
        }
        dataSource && dataSource.map((item) => {
            let temptime = [];
            if (item.times) {
                item.temptime = item.times.join('~')
            }
            switch (item.status) {
                case 1:
                    item.status = '生效'
                    break;
                case 0:
                    item.status = '关闭'
                    break;
                // case 2:
                //     item.status = '失效'
                //     break;

                default:
                    break;
            }
        })

        return (
            <IceContainer className="pch-container">
                <Title title="产品编辑" />
                <IceFormBinderWrapper ref={(formRef) => {
                    this.formRef = formRef;
                }} value={this.state.value} onChange={this.onFormChange}>
                    <div className="pch-form">
                        <Form style={{
                            width: '80%'
                        }} size="large" labelAlign="left">
                            <Row wrap>
                                <Col s={12} l={12}>
                                    <FormItem {...formItemLayout} label={<span><span className="label-required">*</span>产品名称:</span>}>
                                        <IceFormBinder name="name" message="产品名称必填">
                                            <span className="pch-from-searchedit-name">{name}</span>
                                            {/* <Input size="large" placeholder="产品名称" value={name} className="custom-input" /> */}
                                        </IceFormBinder>
                                        <div>
                                            <IceFormError name="name" />
                                        </div>
                                    </FormItem>
                                </Col>
                                <Col s={12} l={12}>
                                    <FormItem {...formItemLayout} label={<span><span className="label-required">*</span>生效期限:</span>}>
                                        <IceFormBinder name="time" required message="生效期限必填" valueFormatter={(date, dateStr) => dateStr}>
                                            <RangePicker size="large" format={"YYYY-MM-DD"} className="custom-select" />
                                        </IceFormBinder>
                                        <div>
                                            <IceFormError name="time" />
                                        </div>
                                    </FormItem>
                                </Col>
                                <Col s={12} l={12}>
                                    <FormItem {...formItemLayout} label={<span><span className="label-required">*</span>流程名称:</span>}>
                                        <IceFormBinder name="processId" required message="流程名称必填">
                                            <Select size="large" placeholder="请选择" className="custom-select" onChange={this.onChangeProcess}>
                                                {this.state.processList.map((item, i) => {
                                                    return (
                                                        <Option value={item.id.toString()} key={i} processId={item.id}>
                                                            {item.processName}
                                                        </Option>
                                                    )
                                                })}
                                            </Select>
                                        </IceFormBinder>
                                        <div>
                                            <IceFormError name="processId" />
                                        </div>
                                    </FormItem>
                                </Col>
                                <Col s={12} l={12}>
                                    <FormItem {...formItemLayout} label={<span><span className="label-required">*</span>状态:</span>}>
                                        <IceFormBinder name="status" required message="状态必填">
                                            <Select className="custom-select" hasClear={true} placeholder="请选择" size="large">
                                                <Option value="1">
                                                    生效
                                                </Option>
                                                <Option value="0">
                                                    关闭
                                                </Option>
                                                
                                            </Select>
                                        </IceFormBinder>
                                        <div>
                                            <IceFormError name="status" />
                                        </div>
                                    </FormItem>
                                </Col>
                                <div className="next-btn-box pch-form-buttons">
                                    <Button type="normal" size="large" onClick={() => {
                                                             javascript:history.back(-1);
                                                         }}>
                                        返回
                                    </Button>
                                    <Button type="secondary" size="large" className="return-btn buttonsBack" onClick={this.upData} disabled={isSubmiting}>
                                        保存
                                    </Button>
                                </div>
                            </Row>
                        </Form>
                        <div className="searchedit-history">产品历史版本</div>
                        <Table dataSource={dataSource} isLoading={this.state.isLoading} sort={{
                            id: '=desc'
                        }}>
                            <Table.Column title="版本" dataIndex="id" width={120} />
                            <Table.Column title="生效期限" dataIndex="temptime" width={250} />
                            <Table.Column title="状态" dataIndex="status" width={160} />
                            <Table.Column title="流程" dataIndex="processName" width={100} cell={this.renderProcessName} />
                            <Table.Column title="时间" dataIndex="operateAt" width={120} />
                            <Table.Column title="操作人" dataIndex="operateName" width={120} />
                        </Table>
                    </div>
                </IceFormBinderWrapper>
            </IceContainer>
        );
    }
}
