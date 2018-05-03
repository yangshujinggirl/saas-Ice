import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import './ProcessForm.scss';
import { hashHistory } from 'react-router';

import { Form, Icon, Input, Button, Checkbox, Select, Switch, Radio, Grid, Field, Dialog } from '@icedesign/base';

const {Row, Col} = Grid;

import { FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder, FormError as IceFormError,
} from '@icedesign/form-binder';
import { Title } from 'components';
import { Tools } from 'utils';

import ProcessFormName from './ProcessFormName';
import ProcessFormModule from './ProcessFormModule';
import ProcessFormItem from './ProcessFormItem';

export default class ProcessForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    /**
     * 初始化
     */
    componentDidMount() {
        let {actions, params} = this.props;

        if (params.id) {
            actions.getDetail(params.id);
        }
        actions.getCustomMenuList();
    }

    /**
     * 处理流程数据
     * 1. 该方法仅在初始化且获取完数据之后执行一次
     * 1. 新增时默认选择第一个进件模块
     * 2. 编辑时获取详情数据关联模块数据并计算模块的使用数量
     * @return {[type]} [description]
     */
    assignTaskItems(params, customMenuList, formData) {
        if (params.id) {
            if (!formData || !formData.taskItems || formData.taskItems.length == 0 || !customMenuList || customMenuList.length == 0) {
                return;
            }
            // 只处理一次
            if (this.hasProcess) {
                return;
            }
            this.hasProcess = true;

            formData.taskItems.map((item, i) => {
                customMenuList.map((citem, j) => {
                    if (item.taskTypeId == citem.id) {
                        citem.limitedAddTimes--;
                        item = Object.assign(item, citem);
                    }
                })
            // item.cid = i;
            })
        } else {
            if (!customMenuList || customMenuList.length == 0) {
                return;
            }
            // 只处理一次
            if (this.hasProcess) {
                return;
            }
            this.hasProcess = true;

            customMenuList[0].limitedAddTimes--;
            formData.taskItems = [];
            formData.taskItems.push(Object.assign({
                taskOrder: 0,
                taskAlias: customMenuList[0].taskTypeName
            }, customMenuList[0]));
        }
    }

    getSelectList = (order) => {
        let result = [];

        // 所有模块另默认加一个“结束”模块
        result.push({
            name: '结束',
            value: -1
        });

        this.props.formData.taskItems.map((item) => {
            if (item.taskOrder != order) {
                result.push({
                    name: item.taskAlias,
                    value: item.taskOrder,
                });
            }
        });

        return result;
    }

    //模块添加删除
    setModule = (data, type, index) => {
        let taskItems = this.props.formData.taskItems;

        if (type === 'add') {
            //添加模块
            data.limitedAddTimes--;
            taskItems.push(Object.assign({
                taskOrder: taskItems.length,
                taskAlias: data.taskTypeName + taskItems.length
            }, data));
        } else {
            let customMenuList = this.props.customMenuList;
            customMenuList.map((item, i) => {
                if (item.id == data.taskTypeId) {
                    item.limitedAddTimes++;
                }
            });
            taskItems.splice(index, 1);
        }

        //状态更新
        this.setState({
            value: this.state.value,
        });

    };

    //表单校验change
    formChange = value => {
        this.setState({
            value: value,
        });
    }

    //保存
    handleSave = () => {

    }

    //提交
    handleSubmit = () => {
        this.refs.form.validateAll((errors, values) => {
            console.log('errors', errors, 'values', values);
            return false;
        });
    }

    // 取消
    handleCancel() {
        // 取消后本次操作将不被保存，您确定吗？
        Dialog.confirm({
            content: "取消后本次操作将不被保存，您确定吗？",
            locale: {
                ok: "确认",
                cancel: "取消"
            },
            onOk() {
                hashHistory.push('process');
            }
        });
    }

    /**
     * 渲染
     */
    render() {
        const locationInfo = this.props.location.state;
        let {customMenuList, formData = {}, params} = this.props;

        this.assignTaskItems(params, customMenuList, formData);

        if(!params.id){
            // 新增时使用传递的数据设置
            // 默认名称为新流程-MMddhhmmss
            if(locationInfo && !locationInfo.processName){
                locationInfo.processName = '新流程-' + Tools.formatDate(new Date().getTime(), 'MMddhhmmss');
            }
            formData = Object.assign(formData, locationInfo);
        }

        return (
            <IceContainer className="pch-container pch-process">
                <Title title="流程新增/修改" />
                <div className="pch-form">
                    <IceFormBinderWrapper value={formData} onBlur={this.formChange} ref="form">
                        <Form size="large" labelAlign="left">
                            <ProcessFormName info={formData} />
                            {/*顶部结束*/}
                            <div className="container">
                                {/*渲染左边  */}
                                <ProcessFormModule customMenuList={customMenuList} setModule={this.setModule} />
                                {/*右边*/}
                                <div className="container-right">
                                    <div className="con">
                                        <Row className="container-right-title">
                                            <Col xxs="6" s="2" l="2">
                                            </Col>
                                            <Col xxs="6" s="3" l="3">
                                                模块
                                            </Col>
                                            <Col xxs="6" s="2" l="6" className="pch-target-name">
                                                <span>条件</span><span>跳转</span>
                                            </Col>
                                            <Col xxs="6" s="2" l="3">
                                                页面
                                            </Col>
                                            <Col xxs="6" s="2" l="3">
                                                材料清单
                                            </Col>
                                            <Col xxs="6" s="2" l="2">
                                                权限
                                            </Col>
                                            <Col xxs="6" s="3" l="2">
                                                必要数据
                                            </Col>
                                            <Col xxs="6" s="2" l="3">
                                                方式
                                            </Col>
                                        </Row>
                                        {/*内容区域*/}
                                        {formData.taskItems && formData.taskItems.map((item, index) => {
                                             return (
                                                 <ProcessFormItem
                                                     key={index}
                                                     index={index}
                                                     item={item}
                                                     selectData={this.getSelectList(item.taskOrder)}
                                                     setModule={this.setModule} />
                                                 );
                                         })}
                                    </div>
                                    <div className="next-btn-box pch-form-buttons">
                                        <Button type="normal" size="large" onClick={this.handleCancel}>
                                            取消
                                        </Button>
                                        <Button type="primary" size="large" onClick={this.handleSave}>
                                            保存
                                        </Button>
                                        <Button type="secondary" size="large" onClick={this.handleSubmit}>
                                            提交
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </IceFormBinderWrapper>
                </div>
            </IceContainer>
            );
    }
}
