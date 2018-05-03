import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import './ProcessForm.scss';
import { hashHistory } from 'react-router';

import { Form, Icon, Input, Button, Checkbox, Select, Switch, Radio, Grid, Field } from '@icedesign/base';

const {Row, Col} = Grid;

import { FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder, FormError as IceFormError,
} from '@icedesign/form-binder';
import Req from '../../reqs/ProcessReq';
import { Title } from 'components';

import ProcessFormName from './ProcessFormName';
import ProcessFormModule from './ProcessFormModule';
import ProcessFormItem from './ProcessFormItem';

Array.prototype.remove = function(val) {
    let index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

Array.prototype.removeItem = function(key, val) {
    let data = this;
    for (let i in data) {
        if (data[i][key] === val) {
            this.splice(i, 1);
        }
    }
};

// "taskDefId": "", // 任务定义ID
// "taskOrder": 1, // 任务在页面上的顺序号
// "taskTypeId": 1, // 任务类型ID，对应表T_PROCESS_TASK_TYPE的id，如1对应进件
// "taskTypeName": "进件", // 任务类型名称，如：进件
// "taskAlias": "中行进件", // 任务别名，存为activiti的任务定义名称
// "transitionItems": [ // 该任务的跳转条件
//  {
//    "conditionType": "SUBMIT", // 对应枚举类ActivitiTransitionEnum
//    "conditionName": "已提交", // 对应枚举类ActivitiTransitionEnum
//    "transToTaskOrder": 2, // 跳转到任务的顺序号
//    "transToTaskName": "秒批决策" // 跳转到任务的名称
//  }
// ],
// "pageId": 100, // 对应进件页面id
// "pageName": "小贷进件专用页面", // 对应进件页面名称
export default class ProcessForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initFlag: true,
            customMenuList: [],
            selectList: [],
            value: {
                processDefId: "", //activiti中流程定义id
                processName: "中行小贷", // 流程名称
                processType: "LOAN", // 流程类型，如：进件流程
                businessTypeId: 1000, // 业务类型ID
                businessTypeName: "贷款业务", // 业务类型名称
                tenantId: 10086, // 租户ID
                tenantName: "中国银行", // 租户名称
                taskItems: [] // 任务定义
            },
        };
    }

    field = new Field(this, {
        scrollToFirstError: true
    });

    /**
     * 初始化
     */
    componentDidMount() {
        let { actions, params } = this.props;

        if(params.id){
          //编辑数据
          actions.getDetail(params.id);
        }
        actions.getCustomMenuList();
        // this.fetchData();
    }

    /**
     * 编辑时处理数据，关联详情数据的模块数据
     * @return {[type]} [description]
     */
    assignTaskItems(customMenuList, formData){
        if(!formData || !formData.taskItems || formData.taskItems.length == 0 || !customMenuList || customMenuList.length == 0){
            return;
        }

        // 只处理一次
        if(this.hasProcess){
            return;
        }
        this.hasProcess = true;

        formData.taskItems.map((item, i) => {
            customMenuList.map((citem, j) => {
                if(item.taskTypeId == citem.id){
                    citem.limitedAddTimes--;
                    item = Object.assign(item, citem);
                }
            })
            // item.cid = i;
        })

        // console.log('assignTaskItems', formData.taskItems)

    }

    getSelectList = (order) => {
        let result = [];
        this.props.formData.taskItems.map((item) => {
            if(item.taskOrder != order){
                result.push({
                    name: item.taskAlias,
                    value: item.taskOrder,
                });
            }
        });
        // console.log(data);
        return result;
    };

    //模块添加删除
    setModule = (data, type, index) => {
        let taskItems = this.props.formData.taskItems;

        if (type === 'add') {
            //添加模块
            data.limitedAddTimes--;
            let newsData = Object.assign({}, data);
            //newsData.taskAlias = data.taskTypeName + (data.count || '');
            //let cid = data.id + '-' + data.count;
            newsData.taskOrder = taskItems.length;
            // this.addItem(newsData, cid);
            // data.count++;
            taskItems.push(newsData);
        } else {
            let customMenuList = this.props.customMenuList;
            customMenuList.map((item, i) => {
                if(item.id == data.taskTypeId){
                    item.limitedAddTimes++;
                }
            });
            taskItems.splice(index, 1);
        }
        //状态更新
        this.setState({
            customMenuList: this.state.customMenuList,
            value: this.state.value,
        });

    };

    //表单校验change
    formChange = value => {
        this.setState({
            value: value,
        });
    }

    //校验
    handleSubmit = () => {
        this.refs.form.validateAll((errors, values) => {
            console.log('errors', errors, 'values', values);
            return false;
        });
    }

    handleCancel() {
        hashHistory.push('process');
    }

    /**
     * 渲染
     */
    render() {
        const locationInfo = this.props.location.state;
        const { taskItems } = this.state.value;
        let { customMenuList, formData = {}, params } = this.props;

        if(params.id){
            this.assignTaskItems(customMenuList, formData);
        }


        return (
            <IceContainer className="pch-container pch-process">
                <Title title="流程新增/修改" />
                <div className="pch-form">
                    <IceFormBinderWrapper value={formData} onBlur={this.formChange} ref="form">
                        <Form size="large" labelAlign="left">
                            <ProcessFormName info={locationInfo} />
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
                                    <div className="next-btn-box">
                                        <Button type="secondary" size="large" onClick={this.handleSubmit}>
                                            提交
                                        </Button>
                                        <Button type="normal" size="large" onClick={this.handleCancel} style={{
                                                                                                                  marginLeft: 10
                                                                                                              }}>
                                            取消
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
