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
    processDataForEdit(){

    }

    fetchData = () => {
        let {actions} = this.props;




// 必要数据
// 是否可以配置页面
// 是否可选择材料清单

        // {
        //  "id": 1,
        //  "taskTypeName": "进件",
        //  "activitiTaskType": "USERTASK",
        //  "canPrivilegeEditable": 1,//是否可配置权限
        //  "limitedAddTimes": 1,//添加次数（同一模块在同一流程中可出现多少次）
        //  "execMode": 1,
        //  "orderId": 0,
        //  "createdAt": "2018-04-04 14:21:46",
        //  "createdBy": 10000
        // }
        Req.getCustomMenuList()
            .then((res) => {
                if (res.code == 200) {
                    let customMenuList = res.data;
                    this.state.customMenuList = customMenuList;
                    
                    // 赋值右侧数据
                    if (customMenuList && customMenuList.length) {
                        //customMenuList[0].limitedAddTimes -= 1;
                        // this.addItem(customMenuList[0], cid);
                        this.setModule(customMenuList[0], 'add');
                    }
                    //状态更新
                    this.setState({
                        customMenuList: this.state.customMenuList,
                        value: this.state.value,
                    });

                }
            })
            .catch((ex) => {
                console.log(ex);
            });

            // actions.getCustomMenuList();

    };

    /**
     * methods
     */
    //获取数组元素id对应index
    getArrayKey = (data, key, val) => {
        let inde = null;
        for (let i in data) {
            if (data[i][key] === val) {
                inde = i;
            }
        }
        return inde;
    };
    //初始化右侧可选择select
    initSelectList = () => {
        let result = [];
        this.state.value.taskItems.map((item) => {
            result.push({
                name: item.moduleName,
                value: item.moduleName,
                uid: item.id,
                cid: item.cid,
            });
        });
        this.setState({
            selectList: result,
        }, () => {
            this.watchIoSelect(event);
        });
    };
    getSelectList = (cid, name) => {
        let data = this.state.selectList.filter((item) => {
            return item.cid != cid;
        });
        return data;
    };


    addItem = (data, cid) => {
        let name = data.name || '';
        // this.state.value.taskItems.push({
        //     taskDefId: "", // 任务定义ID
        //     taskOrder: 1, // 任务在页面上的顺序号
        //     taskTypeId: 1, // 任务类型ID，对应表T_PROCESS_TASK_TYPE的id，如1对应进件
        //     taskTypeName: data.taskTypeName || "进件", // 任务类型名称，如：进件
        //     taskAlias: name || "中行进件", // 任务别名，存为activiti的任务定义名称
        //     transitionItems: [ // 该任务的跳转条件
        //         {
        //             conditionType: "SUBMIT", // 对应枚举类ActivitiTransitionEnum
        //             conditionName: "已提交", // 对应枚举类ActivitiTransitionEnum
        //             transToTaskOrder: 2, // 跳转到任务的顺序号
        //             transToTaskName: "秒批决策" // 跳转到任务的名称
        //         }
        //     ],
        //     pageId: 100, // 对应进件页面id
        //     pageName: "小贷进件专用页面", // 对应进件页面名称
            
        //     type: undefined,
        //     uid: data.id,
        //     cid: cid,
        // });
        this.state.value.taskItems.push(Object.assign({
            uid: data.id,
            cid: cid,
            transitionItems: []
          }, data))
        this.setState({
            value: this.state.value,
        }, () => {
            this.initSelectList();
        });
    }
    //模块添加删除
    setModule = (data, type, index) => {
        let taskItems = this.state.value.taskItems;

        if (type === 'add') {
            //添加模块
            data.limitedAddTimes--;
            let newsData = Object.assign({}, data);
            newsData.taskAlias = data.taskTypeName + (data.count || '');
            let cid = data.id + '-' + data.count;
            newsData.cid = cid;
            this.addItem(newsData, cid);
            data.count++;
        } else {
            let defaultArray = this.state.customMenuList;
            defaultArray[defaultArray, this.getArrayKey('id', data.id)].limitedAddTimes++;
            // 删除count可能出现重复，暂未想到其他解决方法
            // defaultArray[defaultArray, this.getArrayKey('id', data.id)].count--;
            taskItems.splice(index, 1);
            this.initSelectList();
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
    };

    moduleChange = (event) => {
        this.setState({
            value: this.state.value
        }, () => {
            this.initSelectList();
        });
    };

    //尝试监听数据变化清空选择
    watchIoSelect = () => {
        let data = this.state.value.taskItems;
        let selectList = this.state.selectList;
        let targetList = selectList.map((item) => {
            return item.name;
        });

        const diffArray = (name) => {
            let count = 0;
            targetList.map((item) => {
                if (item === name) {
                    count++;
                }
            });
            return count;
        };
        // data.map((item, index) => {
        //     if (item.targetName.length) {
        //         item.targetName.map((list, i) => {
        //             if (!diffArray(list)) {
        //                 this.state.value.taskItems[index].targetName[i] = null
        //             }
        //         });
        //     }
        // });
        this.setState({
            value: this.state.value,
        }, () => {
            //console.log(this.state.value);
        });
        return false;
    };

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
        const { formData } = this.props;
        console.log(this.state)

        return (
            <IceContainer className="pch-container pch-process">
                <Title title="流程新增/修改" />
                <div className="pch-form">
                    <IceFormBinderWrapper value={this.state.value} onBlur={this.formChange} ref="form">
                        <Form size="large" labelAlign="left">
                            <ProcessFormName info={locationInfo} />
                            {/*顶部结束*/}
                            <div className="container">
                                {/*渲染左边  */}
                                <ProcessFormModule customMenuList={this.state.customMenuList} setModule={this.setModule} />
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
                                        {taskItems && taskItems.map((item, index) => {
                                             return (
                                                 <ProcessFormItem
                                                     key={index}
                                                     index={index}
                                                     item={item}
                                                     selectData={this.getSelectList(item.cid)}
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
