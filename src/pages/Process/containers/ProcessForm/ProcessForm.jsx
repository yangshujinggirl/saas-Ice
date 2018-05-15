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
import ProcessAuthEdit from '../../components/ProcessAuth/ProcessAuthEdit';
import { PROCESS_VIEW } from '../../constants/ProcessViewConstant';
import SetFont_ from '../../../FontConfig/components/SetFont/SetFont_';
import SetFontView_ from '../../../FontConfig/components/SetFontView/SetFontView_';

export default class ProcessForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: PROCESS_VIEW.EDITFORM
        };
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

    componentWillUnmount() {
        this.props.actions.changeHasProcess(false);
    }

    componentWillReceiveProps(nextProps) {
        let {customMenuList, formData = {}, params, hasProcess} = nextProps;

        if (!hasProcess) {
            this.assignTaskItems(params, customMenuList, formData);
        }
    }

    /**
     * 处理流程数据
     * 1. 该方法仅在初始化且获取完数据之后执行一次
     * 1. 新增时默认选择第一个进件模块
     * 2. 编辑时获取详情数据关联模块数据并计算模块的使用数量
     * @return {[type]} [description]
     */
    assignTaskItems(params, customMenuList, formData) {
        console.log('ProcessForm assignTaskItems')
        if (params.id) {
            if (!formData || !formData.taskItems || formData.taskItems.length == 0 || !customMenuList || customMenuList.length == 0) {
                return;
            }

            formData.taskItems.map((item, i) => {
                customMenuList.map((citem, j) => {
                    if (item.taskTypeId == citem.id) {
                        citem.limitedAddTimes--;
                        item = Object.assign(item, citem);
                    }
                })
            // item.cid = i;
            })

            // 只处理一次
            this.props.actions.changeHasProcess(true);
        } else {
            if (!customMenuList || customMenuList.length == 0) {
                return;
            }

            customMenuList[0].limitedAddTimes--;
            formData.taskItems = [];
            formData.taskItems.push(Object.assign({
                taskOrder: 0,
                taskAlias: customMenuList[0].taskTypeName,
                taskTypeId: customMenuList[0].id
            }, customMenuList[0]));

            // 只处理一次
            this.props.actions.changeHasProcess(true);
        }
    }

    //模块添加删除
    setModule = (data, type, index) => {
        console.log('setModule', data)
        let taskItems = this.props.formData.taskItems;

        if (type === 'add') {
            //添加模块
            data.limitedAddTimes--;
            taskItems.push(Object.assign({
                taskOrder: taskItems.length,
                // 默认别名同模块名称，多次使用模块被多次使用后，默认别名后加数字区分，模块别名不可重复
                taskAlias: data.taskTypeName + taskItems.length,
                taskTypeId: data.id
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
        this.props.formData = value;
    }

    //保存
    handleSave = () => {
        this.refs.form.validateAll((errors, values) => {
            console.log('errors', errors, 'values', values);
            if (errors) {
                return false;
            }
            // "status": 0, 状态:0=未保存（保存）;1=当前(提交)
            values.status = 0;
            if(this.props.params.id){
                values.id = this.props.params.id;
            }
            this.props.actions.save(values);
        });
    }

    //提交
    handleSubmit = () => {
        this.refs.form.validateAll((errors, values) => {
            console.log('errors', errors, 'values', values);
            if (errors) {
                return false;
            }
            // "status": 0, 状态:0=未保存（保存）;1=当前(提交)
            values.status = 1;
            values.processType = 'LOAN';
            if(this.props.params.id){
                values.id = this.props.params.id;
            }
            this.props.actions.save(values);
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
     * 切换显示的view
     * @param  {[type]} view [description]
     * @return {[type]}      [description]
     */
    changeView(view, item) {
        console.log('changeView', view);
        let { actions, formData = {} } = this.props;

        if(!view || typeof view != 'string'){
            // 默认返回当前编辑页，约定返回不传参数
            view = PROCESS_VIEW.EDITFORM;
        }

        let idx = formData.taskItems.indexOf(item);
        
        switch (view) {
            case PROCESS_VIEW.VIEWFIELD : {
                // 查看必要字段
                actions.getTasksFields(item.taskTypeId);
                break;
            }
            case PROCESS_VIEW.EDITAUTH : {
                // TODO 获取权限编辑的列表
                // 编辑权限传入当前已选的权限
                actions.getPrivilegeOrgs()
                this.setState({
                    privilegeItems: item.privilegeItems,
                    taskOrder: idx
                });
            }
            case PROCESS_VIEW.EDITPAGE : {
                // 编辑页面
                // 有页面id的直接获取页面详情（编辑）
                // 没有id的获取页面字段（新增）
                if(item.pageId){
                    actions.getPageDetail(item.pageId);
                    this.setState({
                        pageId: item.pageId,
                        taskOrder: idx
                    });
                }else{
                    actions.getPageFields({
                        step: this.getStepFromData(formData.taskItems, idx),
                        excludeScreens: this.getExcludeScreens(formData.taskItems, idx)
                    });
                    actions.getAllPageFields();
                    this.setState({
                        pageId: item.pageId,
                        taskOrder: idx
                    });
                }
                break;
            }
            case PROCESS_VIEW.PREVIEWPAGE : {
                if(!item.pageId){
                    return;
                }

                actions.getPageDetail(item.pageId);
                this.setState({
                    pageId: item.pageId,
                });
                break;
            }
        }

        this.setState({
            view
        })
    }
    //保存权限编辑之后，返回编辑页面
    authSave(privilegeItems){
        console.log(privilegeItems)
        let order = this.state.taskOrder;
        let formData = this.props.formData;

        formData.taskItems[order].privilegeItems = privilegeItems;
        this.setState({
            view: PROCESS_VIEW.EDITFORM
        })
    }
    /**
     * 保存页面之后，设置页面id，跳转回编辑页
     * @param  {[type]} pageId [description]
     * @return {[type]}        [description]
     */
    handleSavePage(pageId){
        let order = this.state.taskOrder;
        let formData = this.props.formData;

        formData.taskItems[order].pageId = pageId;
        this.setState({
            view: PROCESS_VIEW.EDITFORM
        })
    }

    /**
     * 获取进件页面配置的step参数
     * 1. 默认从1开始
     * 2. 当前编辑页面在列表的位置
     * @param  {[type]} taskItems 整个模块列表
     * @param  {[type]} taskOrder 当前点击编辑页面的模块序号、从0开始
     * @return {[type]}           [description]
     */
    getStepFromData(taskItems, taskOrder){
        if(taskOrder == 0){
            return 1;
        }

        let count = 1;
        taskItems.map((item, i) => {
            if(i < taskOrder && item.haveConfigPage){
                count++
            }
        })

        return count;
    }

    /**
     * 获取排除的页面IDS
     * 例: 已有页面配置id为1, 里面包含10个字段, 需要查询除了已配置的这10个字段之外的其它字段时,
     * 设置此参数, 多个id以逗号分隔
     * @param  {[type]} taskItems [description]
     * @param  {[type]} taskOrder [description]
     * @return {[type]}           [description]
     */
    getExcludeScreens(taskItems, taskOrder){
        let result = [];
        taskItems.map((item, i) => {
            if(i != taskOrder && item.haveConfigPage && item.pageId){
                result.push(item.pageId);
            }
        })

        return result.join(',');
    }
    
    /**
     * 渲染
     */
    render() {
        const locationInfo = this.props.location.state;
        let {customMenuList, formData = {}, params, tasksFields = {}, pageFields, allPageFields, orgsData={}} = this.props;
        let {privilegeItems} = this.state;

        if (!params.id) {
            // 新增时使用传递的数据设置
            // 默认名称为"新流程-MMddhhmmss"
            if (locationInfo && !locationInfo.processName) {
                locationInfo.processName = '新流程-' + Tools.formatDate(new Date().getTime(), 'MMddhhmmss');
            }
            formData = Object.assign(formData, locationInfo);
        }

        return (
            <div className="">
                <IceContainer className="pch-container pch-process" style={{
                                                                               display: this.state.view == PROCESS_VIEW.EDITFORM ? '' : 'none'
                                                                           }}>
                    <Title title="流程新增/修改" />
                    <div className="pch-form">
                        <IceFormBinderWrapper value={formData} onBlur={this.formChange} ref="form">
                            <Form size="large" labelAlign="left">
                                <ProcessFormName info={formData} />
                                {/*顶部结束*/}
                                <div className="container">
                                    {/*渲染左边  */}
                                    <ProcessFormModule customMenuList={customMenuList} setModule={this.setModule.bind(this)} />
                                    {/*右边*/}
                                    <div className="container-right">
                                        <ProcessFormItemList taskItems={formData.taskItems} setModule={this.setModule.bind(this)} changeView={this.changeView.bind(this)} />
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
                <ProcessFields formData={formData} data={tasksFields.requiredFields} visible={this.state.view == PROCESS_VIEW.VIEWFIELD} changeView={this.changeView.bind(this)} />
                <SetFont_ id={this.state.pageId} resData={pageFields} allPageFields={allPageFields} visible={this.state.view == PROCESS_VIEW.EDITPAGE} changeView={this.changeView.bind(this)} onSave={this.handleSavePage.bind(this)} />
                <ProcessAuthEdit formData={formData}  orgsData={orgsData} data={privilegeItems} visible={this.state.view == PROCESS_VIEW.EDITAUTH} changeView={this.changeView.bind(this)} onSave={this.authSave.bind(this)} />
                <SetFontView_ id={this.state.pageId} resData={pageFields} visible={this.state.view == PROCESS_VIEW.PREVIEWPAGE} changeView={this.changeView.bind(this)}  />
            </div>
            );
    }
}
