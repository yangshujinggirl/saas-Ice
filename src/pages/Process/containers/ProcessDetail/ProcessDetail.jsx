import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';

import { Form, Icon, Input, Button, Checkbox, Select, Switch, Radio, Grid, Field, Dialog } from '@icedesign/base';

const {Row, Col} = Grid;

import { FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder, FormError as IceFormError,
} from '@icedesign/form-binder';
import { Title } from 'components';

import ProcessFormName from '../../components/ProcessFormName';
import ProcessFormItemList from '../../components/ProcessFormItemList';
import ProcessFields from '../../components/ProcessFields';
import { PROCESS_VIEW } from '../../constants/ProcessViewConstant';

import ProcessAuthDetails from '../../components/ProcessAuth/ProcessAuthDetails'
import ProcessAuthEdit from '../../components/ProcessAuth/ProcessAuthEdit';
export default class ProcessDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: PROCESS_VIEW.DETAIL
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

    // 取消
    handleCancel() {
        hashHistory.push('process');
    }

    /**
     * 切换显示的view
     * @param  {[type]} view [description]
     * @return {[type]}      [description]
     */
    changeView(view){
        console.log('changeView', view)
        this.setState({view})
    }

    /**
     * 渲染
     */
    render() {
        let {customMenuList, formData = {}, params} = this.props;

        this.assignTaskItems(params, customMenuList, formData);

        return (
            <div className="">
                <IceContainer className="pch-container pch-process" style={{display: this.state.view == PROCESS_VIEW.DETAIL ? '' : 'none'}}>
                    <Title title="流程详情" />
                    <div className="pch-form">
                        <IceFormBinderWrapper value={formData} ref="form">
                            <Form size="large" labelAlign="left">
                                <ProcessFormName info={formData} editable={false} />
                                {/*顶部结束*/}
                                <div className="container">
                                    <ProcessFormItemList taskItems={formData.taskItems} setModule={this.setModule} changeView={this.changeView.bind(this)} editable={false} />
                                    <div className="next-btn-box pch-form-buttons">
                                        <Button type="normal" size="large" onClick={this.handleCancel}>
                                            返回
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        </IceFormBinderWrapper>
                    </div>
                </IceContainer>
                <ProcessFields visible={this.state.view == PROCESS_VIEW.VIEWFIELD} changeView={this.changeView.bind(this)} />
                <ProcessAuthEdit visibled={this.state.view == PROCESS_VIEW.EDITAUTH}  changeView={this.changeView.bind(this)} />
                <ProcessAuthDetails visible={this.state.view == PROCESS_VIEW.VIEWAUTH}  changeView={this.changeView.bind(this)} />
                
            </div>
            );
    }
}
