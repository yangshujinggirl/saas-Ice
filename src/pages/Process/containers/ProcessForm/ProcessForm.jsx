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

import ProcessFormName from '../../components/ProcessFormName';
import ProcessFormModule from '../../components/ProcessFormModule';
import ProcessFormItemList from '../../components/ProcessFormItemList';
import ProcessFields from '../../components/ProcessFields';

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
            <div className="">
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
                                        <ProcessFormItemList taskItems={formData.taskItems} setModule={this.setModule}/>
                                        <div className="next-btn-box pch-form-buttons">
                                            <Button type="normal" size="large" onClick={this.handleCancel}>
                                                返回
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
                <ProcessFields />
            </div>
            );
    }
}
